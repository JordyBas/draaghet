/* DRAAGHET phase 3 preflight: cart behaviour, restricted checkout, own brand. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const read=file=>readFileSync(file,'utf8');
const catalog=read('draaghet-capsule.js'),cartCode=read('draaghet-cart.js');
const renderer=read('draaghet-capsule-render.js');
const cartHtml=read('winkelwagen.html'),productHtml=read('product.html'),checkoutHtml=read('afrekenen.html');
const checkoutScript=read('draaghet-checkout.js');
for(const [name,src] of [['cart',cartCode],['checkout',checkoutScript],['product renderer',renderer]]){
 new vm.Script(src,{filename:name});
}
const storage=new Map();
const window={
 localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,val)=>storage.set(key,String(val))},
 dispatchEvent:()=>{}
};
const context={
 window,
 Event:class Event{constructor(type){this.type=type}},
 document:{readyState:'loading',addEventListener:()=>{}},
};
vm.runInNewContext(catalog,context,{timeout:1000});
vm.runInNewContext(cartCode,context,{timeout:1000});
const cart=window.DRAAGHET_CART,items=window.DRAAGHET_CAPSULE;
assert.ok(cart&&items.length===6,'Cart was not initialized');
assert.equal(cart.lines().length,0);
assert.equal(cart.add('unknown-sku'),false,'Nonexistent SKU must be rejected');
assert.equal(cart.add(items[0].slug),true);
assert.equal(cart.totals().count,1);
assert.equal(cart.totals().subtotal,2495);
cart.quantity(items[0].slug,3);
assert.equal(cart.totals().subtotal,7485);
assert.equal(cart.totals().remaining,15);
for(let i=0;i<50;i++)cart.add(items[0].slug);
assert.equal(cart.totals().count,25,'Quantity must be capped');
cart.quantity(items[0].slug,0);
assert.equal(cart.totals().count,0,'Zero quantity must remove line');
storage.set('draaghet-preview-cart-v1',JSON.stringify([{slug:'hacker-priced-item',qty:5000}]));
assert.equal(cart.lines().length,0,'Unknown product from local storage must be discarded');
cart.add(items.find(x=>x.type==='Hoodie').slug);
assert.equal(cart.totals().subtotal,4495);
cart.clear();assert.equal(cart.totals().subtotal,0);
assert.match(cartHtml,/id="dh-cart-content"/);
assert.match(cartHtml,/draaghet-cart\.js\?v=1/);
assert.match(productHtml,/id="dh-add-preview"/);
assert.match(productHtml,/draaghet-cart\.js\?v=1/);
assert.match(checkoutHtml,/BETALEN BINNENKORT BESCHIKBAAR/);
assert.match(checkoutHtml,/<button[^>]+disabled/);
assert.match(checkoutHtml,/draaghet-checkout\.js\?v=1/);
assert.doesNotMatch(checkoutHtml,/<form[\s>]/,'No personal data capture before launch');
assert.doesNotMatch(cartCode,/(?:service_role|sb_secret_|createPayment|checkout\.sessions\.create)/,'No secret or payment launch from browser');
assert.doesNotMatch(catalog,/Untagged Movement|model:|article:/,'Supplier or article name in publicly served catalog');
assert.doesNotMatch(renderer,/item\.model|item\.article|Untagged Movement/,'Supplier must not be shown to shoppers');
console.log('DRAAGHET phase 3 preflight OK: catalog, preview cart, price rules, checkout lock, and own-label UI.');
