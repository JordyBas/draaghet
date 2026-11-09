/* DRAAGHET fase 1: checks run before each GitHub Pages deployment. */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const html=readFileSync(resolve(root,'index.html'),'utf8');
const css=readFileSync(resolve(root,'draaghet-home-refresh.css'),'utf8');
const shell=readFileSync(resolve(root,'draaghet-site.css'),'utf8');
const count=(re)=>[...html.matchAll(re)].length;
assert.equal(count(/<h1\\b/g),1,'Homepage requires one H1');
assert.match(html,/<title>Grappige Shirts/,'SEO title missing');
assert.match(html,/<meta name="description"/,'Meta description missing');
assert.match(html,/<link rel="canonical"/,'Canonical URL missing');
assert.match(html,/<main\\b[\\s\\S]*?<\\/main>/,'Main structure missing');
assert.match(html,/id="collectie"/,'Collection missing');
assert.match(html,/id="favorieten"/,'Categories missing');
assert.match(html,/id="idee"/,'Maker introduction missing');
assert.match(html,/id="dh-final-title"/,'Closing CTA missing');
assert.match(html,/href="shirts.html">SHOP DE COLLECTIE<\\/a>/,'Primary shop CTA missing');
assert.doesNotMatch(html,/dh-benefit-grid/,'Old numbered benefits should not return');
assert.doesNotMatch(html,/dh-contact-form/,'Old contact form should not return');
assert.match(html,/id="meest-gedragen" hidden/,'Empty bestsellers must be initially hidden');
assert.match(css,/@media\\(max-width:800px\\)/,'Mobile hero styling missing');
assert.match(css,/\\.idea-quote/,'Maker styling missing');
assert.ok(shell.length>1000,'Global stylesheet missing');
const links=[...html.matchAll(/\\bhref="([^"]+)"/g)].map(m=>m[1]);
let checked=0;
for(const url of links){
 if(/^(#|https?:|mailto:|tel:|data:)/i.test(url))continue;
 const file=url.split(/[?#]/)[0];
 if(!file)continue;
 assert.ok(!file.startsWith('/'),'Unexpected absolute file link: '+url);
 assert.ok(existsSync(resolve(root,file)),'Missing homepage link target: '+url);
 checked++;
}
for(const anchor of links.filter(v=>v.startsWith('#')&&v.length>1)){
 const id=anchor.slice(1);
 assert.ok(html.includes('id="'+id+'"'),'Broken anchor: '+anchor);
}
console.log('DRAAGHET fase 1 preflight OK: homepage content, styles and '+checked+' internal file links.');
