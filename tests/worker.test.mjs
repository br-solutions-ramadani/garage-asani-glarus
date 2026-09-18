import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from '../server/worker.mjs';
const env={ASSETS:{fetch:async()=>new Response('<html>Garage Asani</html>',{headers:{'Content-Type':'text/html'}})}};
test('root and service directories resolve actual index assets',async()=>{
 for(const path of ['/','/leistungen/service-wartung/']){
  let resolved;
  const assets={ASSETS:{fetch:async request=>{resolved=new URL(request.url).pathname;return new Response('OK');}}};
  const response=await worker.fetch(new Request('https://garage-asani-glarus.ch'+path),assets);
  assert.equal(response.status,200);assert.equal(resolved,path+'index.html');
 }
});
test('HTTP, www and preview domains redirect while preserving path/query',async()=>{
 for(const host of ['http://garage-asani-glarus.ch','https://www.garage-asani-glarus.ch','https://garage-asani-glarus.c5ymf6mzyn.workers.dev']){
  const r=await worker.fetch(new Request(host+'/kontakt.html?ref=test'),env);
  assert.equal(r.status,308);assert.equal(r.headers.get('Location'),'https://garage-asani-glarus.ch/kontakt.html?ref=test');
 }
});
test('canonical HTTPS serves assets without a redirect loop and with security/cache headers',async()=>{
 const r=await worker.fetch(new Request('https://garage-asani-glarus.ch/kontakt.html'),env);
 assert.equal(r.status,200);assert.match(await r.text(),/Garage Asani/);
 assert.match(r.headers.get('Content-Security-Policy'),/frame-ancestors 'none'/);
 assert.match(r.headers.get('Content-Security-Policy'),/form-action 'none'/);
 assert.doesNotMatch(r.headers.get('Content-Security-Policy'),/formsubmit/);
 assert.equal(r.headers.get('X-Frame-Options'),'DENY');assert.match(r.headers.get('Cache-Control'),/must-revalidate/);
});
test('private source paths and invalid methods cannot expose or persist customer data',async()=>{
 for(const path of ['/.env','/.git/config','/server/worker.mjs','/tests/worker.test.mjs','/wrangler.jsonc','/package.json','/%2eenv']){
  assert.equal((await worker.fetch(new Request('https://garage-asani-glarus.ch'+path),env)).status,404,path);
 }
 assert.equal((await worker.fetch(new Request('https://garage-asani-glarus.ch/',{method:'POST',body:'test'}),env)).status,405);
});
