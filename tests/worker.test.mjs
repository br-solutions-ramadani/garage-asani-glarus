import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from '../server/worker.mjs';
const allowed={REQUEST_BURST:{limit:async()=>({success:true})},REQUEST_SUSTAINED:{limit:async()=>({success:true})}};
const env={...allowed,ASSETS:{fetch:async()=>new Response('<html>Garage Asani</html>',{headers:{'Content-Type':'text/html'}})}};
function incoming(url, init={}) {
 return new Request(url,{...init,headers:{'CF-Connecting-IP':'192.0.2.1',...init.headers}});
}
test('root and service directories resolve actual index assets',async()=>{
 for(const path of ['/','/leistungen/service-wartung/']){
  let resolved;
  const assets={...allowed,ASSETS:{fetch:async request=>{resolved=new URL(request.url).pathname;return new Response('OK');}}};
  const response=await worker.fetch(incoming('https://garage-asani-glarus.ch'+path),assets);
  assert.equal(response.status,200);assert.equal(resolved,path+'index.html');
 }
});
test('HTTP, www and preview domains redirect while preserving path/query',async()=>{
 for(const host of ['http://garage-asani-glarus.ch','https://www.garage-asani-glarus.ch','https://garage-asani-glarus.c5ymf6mzyn.workers.dev']){
  const r=await worker.fetch(incoming(host+'/kontakt.html?ref=test'),env);
  assert.equal(r.status,308);assert.equal(r.headers.get('Location'),'https://garage-asani-glarus.ch/kontakt.html?ref=test');
 }
});
test('canonical HTTPS serves assets without a redirect loop and with security/cache headers',async()=>{
 const r=await worker.fetch(incoming('https://garage-asani-glarus.ch/kontakt.html'),env);
 assert.equal(r.status,200);assert.match(await r.text(),/Garage Asani/);
 assert.match(r.headers.get('Content-Security-Policy'),/frame-ancestors 'none'/);
 assert.match(r.headers.get('Content-Security-Policy'),/form-action 'none'/);
 assert.doesNotMatch(r.headers.get('Content-Security-Policy'),/formsubmit/);
 assert.equal(r.headers.get('X-Frame-Options'),'DENY');assert.match(r.headers.get('Cache-Control'),/must-revalidate/);
});
test('private source paths and invalid methods cannot expose or persist customer data',async()=>{
 for(const path of ['/.env','/.git/config','/server/worker.mjs','/tests/worker.test.mjs','/wrangler.jsonc','/package.json','/%2eenv']){
  assert.equal((await worker.fetch(incoming('https://garage-asani-glarus.ch'+path),env)).status,404,path);
 }
 assert.equal((await worker.fetch(incoming('https://garage-asani-glarus.ch/',{method:'POST',body:'test'}),env)).status,405);
});

test('burst rejection stops all downstream work and is never cacheable',async()=>{
 let assetCalls=0;let sustainedCalls=0;
 const limited={REQUEST_BURST:{limit:async()=>({success:false})},REQUEST_SUSTAINED:{limit:async()=>{sustainedCalls++;return {success:true};}},ASSETS:{fetch:async()=>{assetCalls++;return new Response('unexpected');}}};
 for(const path of ['/kontakt.html','/assets/logo.webp','/.env']){
  const r=await worker.fetch(incoming('https://garage-asani-glarus.ch'+path),limited);
  assert.equal(r.status,429);assert.equal(r.headers.get('Retry-After'),'10');
  assert.equal(r.headers.get('Cache-Control'),'no-store');assert.equal(r.headers.get('X-Frame-Options'),'DENY');
 }
 const head=await worker.fetch(incoming('https://garage-asani-glarus.ch/',{method:'HEAD'}),limited);
 assert.equal(head.status,429);assert.equal(await head.text(),'');
 assert.equal(assetCalls,0);assert.equal(sustainedCalls,0);
});

test('sustained rejection works even when the burst window permits access',async()=>{
 const limited={...env,REQUEST_SUSTAINED:{limit:async()=>({success:false})}};
 const r=await worker.fetch(incoming('https://garage-asani-glarus.ch/'),limited);
 assert.equal(r.status,429);assert.equal(r.headers.get('Retry-After'),'60');assert.equal(r.headers.get('Cache-Control'),'no-store');
});

test('changing URL, host, method or spoofed forwarding headers cannot reset a client counter',async()=>{
 const keys=[];
 const limited={...env,REQUEST_BURST:{limit:async({key})=>{keys.push(key);return {success:true};}}};
 for(const [url,init] of [
  ['https://garage-asani-glarus.ch/',{}],
  ['https://garage-asani-glarus.ch/kontakt.html?nonce=random',{headers:{'X-Forwarded-For':'198.51.100.5','X-Real-IP':'198.51.100.9'}}],
  ['https://www.garage-asani-glarus.ch/',{method:'HEAD'}],
  ['https://garage-asani-glarus.ch/',{method:'POST',body:'must not be sent'}]
 ]) await worker.fetch(incoming(url,init),limited);
 assert.equal(new Set(keys).size,1);
 await worker.fetch(incoming('https://garage-asani-glarus.ch/',{headers:{'CF-Connecting-IP':'192.0.2.2'}}),limited);
 assert.notEqual(keys.at(-1),keys[0]);
});

test('missing identity or failed limiter closes safely without leaking provider errors',async()=>{
 for(const [request,bindings] of [
  [new Request('https://garage-asani-glarus.ch/'),env],
  [incoming('https://garage-asani-glarus.ch/'),{ASSETS:env.ASSETS}],
  [incoming('https://garage-asani-glarus.ch/'),{...env,REQUEST_BURST:{limit:async()=>{throw Error('private-provider-detail');}}}]
 ]) {
  const r=await worker.fetch(request,bindings);
  assert.equal(r.status,503);assert.equal(r.headers.get('Retry-After'),'60');assert.equal(r.headers.get('Cache-Control'),'no-store');
  assert.doesNotMatch(await r.text(),/private-provider-detail|192\.0\.2/);
 }
});
