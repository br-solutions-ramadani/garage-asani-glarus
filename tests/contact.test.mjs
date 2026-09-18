import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const code=fs.readFileSync(new URL('../contact.js',import.meta.url),'utf8');
function setup(values={},valid=true,clipboard){
  const elements=Object.fromEntries(['preview','body','open','status','heading','prepare','copy'].map(key=>[key,{
    hidden:key==='preview',disabled:key==='prepare',value:'',textContent:'',attributes:{},handlers:{},
    addEventListener(name,fn){this.handlers[name]=fn;},
    setAttribute(name,value){this.attributes[name]=value;},
    removeAttribute(name){delete this.attributes[name];},
    focus(){this.focused=true;},select(){this.selected=true;}
  }]));
  const handlers={};
  const form={dataset:{emailSubject:'Anfrage: Service & Wartung'},values,
    querySelector(selector){return elements[selector.match(/data-email-([a-z]+)/)[1]];},
    reportValidity(){return valid;},
    addEventListener(name,fn){handlers[name]=fn;}
  };
  const forbidden=()=>{throw Error('Unexpected transmission or storage');};
  vm.runInNewContext(code,{
    document:{querySelectorAll:()=>[form]},
    FormData:class{constructor(form){this.values=form.values;} get(name){return this.values[name]??null;}},
    navigator:{clipboard},fetch:forbidden,XMLHttpRequest:forbidden,
    localStorage:{setItem:forbidden},sessionStorage:{setItem:forbidden}
  });
  return {elements,handlers,submit(){let prevented=false;handlers.submit({preventDefault(){prevented=true;}});assert.equal(prevented,true);}};
}
test('invalid entries never submit or create a mail link',()=>{
  const app=setup({},false);app.submit();
  assert.equal(app.elements.preview.hidden,true);
  assert.equal(app.elements.open.attributes.href,undefined);
});
test('draft preserves Unicode, line breaks and service while safely encoding mail headers',()=>{
  const app=setup({Leistung:'Service & Wartung',Vorname:'Jörg',Nachname:'Müller',email:'kunde@example.invalid',Beschreibung:'Öl prüfen & Bremsen?\nText &bcc=attacker@example.invalid #2'});
  app.submit();
  const href=app.elements.open.attributes.href;
  assert.ok(href.startsWith('mailto:garage.asani@gmx.ch?'));
  const query=new URLSearchParams(href.split('?')[1]);
  assert.deepEqual([...query.keys()],['subject','body']);
  assert.equal(query.get('subject'),'Anfrage: Service & Wartung');
  assert.ok(query.get('body').includes('Leistung: Service & Wartung'));
  assert.ok(query.get('body').includes('Öl prüfen & Bremsen?\r\nText &bcc=attacker@example.invalid #2'));
  assert.equal(app.elements.preview.hidden,false);
  assert.equal(app.elements.heading.focused,true);
});
test('preparing a draft does not copy or send; copying happens only on explicit click',async()=>{
  const copied=[];
  const app=setup({Vorname:'Test',Nachname:'Prüfung',Beschreibung:'Test'},true,{writeText:async text=>copied.push(text)});
  app.submit();assert.equal(copied.length,0);
  await app.elements.copy.handlers.click();
  assert.deepEqual(copied,[app.elements.body.value]);
});
test('editing fields invalidates the previous draft and mail link',()=>{
  const app=setup({Beschreibung:'Alte Nachricht'});app.submit();app.handlers.input();
  assert.equal(app.elements.preview.hidden,true);
  assert.equal(app.elements.body.value,'');
  assert.equal(app.elements.open.attributes.href,undefined);
});
test('long messages stay complete and use the copy fallback instead of a truncatable mail URL',async()=>{
  const message='Änderung & Prüfung: '.repeat(160);
  let copied;
  const app=setup({Beschreibung:message},true,{writeText:async text=>{copied=text;}});
  app.submit();
  assert.equal(app.elements.open.hidden,true);
  assert.equal(app.elements.open.attributes.href,undefined);
  assert.ok(app.elements.body.value.includes(message.trim()));
  await app.elements.copy.handlers.click();
  assert.equal(copied,app.elements.body.value);
});
test('clipboard failure leaves a selectable full draft and a usable instruction',async()=>{
  const app=setup({Beschreibung:'Test'},true,{writeText:async()=>{throw Error('denied');}});
  app.submit();await app.elements.copy.handlers.click();
  assert.equal(app.elements.body.selected,true);
  assert.match(app.elements.status.textContent,/markierten Text/);
});
test('all eight forms block native transmission and provide a no-script contact route',()=>{
  const root=new URL('../',import.meta.url);
  const files=fs.readdirSync(root,{recursive:true}).filter(p=>p.endsWith('.html'));
  let forms=0;
  for(const file of files){
    const html=fs.readFileSync(new URL(file.replaceAll(path.sep,'/'),root),'utf8');
    assert.doesNotMatch(html,/https:\/\/formsubmit\.co|action="https?:/i,file);
    if(!html.includes('data-email-composer'))continue;
    forms++;
    assert.match(html,/form-action 'none'/,file);
    assert.match(html,/data-email-prepare disabled/,file);
    assert.match(html,/<noscript>[\s\S]*?mailto:garage\.asani@gmx\.ch[\s\S]*?<\/noscript>/,file);
    assert.match(html,/contact\.js\?v=20260918-8/,file);
    assert.doesNotMatch(html,/name="_[^"]*"|name="Datenschutzhinweis"/,file);
  }
  assert.equal(forms,8);
});

