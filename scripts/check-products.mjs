/* Validate phase 2 studio mockup contracts without external dependencies. */
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const read=(name)=>readFileSync(name,'utf8');
const data=read('draaghet-capsule.js');
const renderer=read('draaghet-capsule-render.js');
const css=read('draaghet-capsule.css');
const pages=['index.html','shirts.html','product.html'].map(read);
new vm.Script(data,{filename:'draaghet-capsule.js'});
new vm.Script(renderer,{filename:'draaghet-capsule-render.js'});
const sandbox={window:{}};
vm.runInNewContext(data,sandbox,{timeout:1000});
const items=sandbox.window.DRAAGHET_CAPSULE;
assert.ok(Array.isArray(items)&&items.length>=6,'Missing collection items');
const slugs=new Set();
const allowed=new Set(['T-shirt','Sweater','Hoodie']);
for(const item of items){
 assert.match(item.slug,/^[a-z0-9-]+$/);
 assert.ok(!slugs.has(item.slug),'Duplicate slug');
 slugs.add(item.slug);
 assert.ok(allowed.has(item.type),'Unknown garment type');
 assert.ok(item.name&&item.colorNL,'Incomplete item');
 assert.ok(!('model' in item)&&!('article' in item),'Supplier identifiers must not be exposed in public catalog');
 assert.ok(item.line1&&item.line2,'Missing design lines');
 assert.match(item.image,/^https:\/\/images\.nwgmedia\.com\/highres\/[^\s]+\.jpg$/,'Unexpected supplier image URL');
}
assert.match(renderer,/League Spartan/,'Spartan print typeface missing');
assert.doesNotMatch(renderer,/Impact|textLength|scaleX\(/,'Unsupported font or distorted type');
assert.match(renderer,/const zones=/,'Fixed print-zone map missing');
assert.match(renderer,/document\.fonts\?\.ready/,'Font reflow missing');
assert.match(css,/League\+Spartan/,'Webfont missing');
assert.match(css,/aspect-ratio:4\/5/,'Studio proportions missing');
assert.match(css,/@media\(max-width:850px\)/,'Responsive product grid missing');
for(const html of pages){
 assert.match(html,/draaghet-capsule\.js\?v=2/);
 assert.match(html,/draaghet-capsule-render\.js\?v=3/);
 assert.match(html,/draaghet-capsule\.css\?v=3/);
}
assert.doesNotMatch(pages[2],/id="sizes"/,'Unverified size options visible');
const community=read('makers-community.js');
const makerPage=read('maker.html');
const makerCss=read('makers-community.css');
new vm.Script(community,{filename:'makers-community.js'});
assert.ok(makerPage.includes('makers-community.js?v=2'),'Maker profile community script stale');
assert.ok(makerPage.includes('draaghet-capsule-render.js?v=3'),'Maker profile renderer missing');
assert.ok(community.includes('dh-maker-variant-grid'),'Maker triptych presentation missing');
assert.ok(community.includes('VOORBEELDWEERGAVE'),'Demo disclosure missing');
assert.ok(makerCss.includes('grid-template-columns:repeat(3,minmax(0,1fr))'),'Maker triptych columns missing');
for(const price of ['€24,95','€39,95','€44,95'])assert.ok(renderer.includes(price),'Missing preview price: '+price);
assert.ok(renderer.includes('Voorbeeldprijs'),'Concept prices require disclaimer');
assert.ok(!makerPage.includes('Verkoopprijs: €24,95'),'Do not publish actual prices');
assert.match(pages[2],/NOG NIET TE KOOP/,'Unapproved concepts must not be sold');
console.log('Phase 2 source checks passed: '+items.length+' concepts, unique slugs, fixed zones, responsive studio mockups.');
