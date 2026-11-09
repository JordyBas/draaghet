/* Read-only order review from the preview cart, no payment processing. */
(function(){
'use strict';
function render(){
 const root=document.getElementById('dh-checkout-lines');const cart=window.DRAAGHET_CART;
 if(!root||!cart)return;
 root.replaceChildren();
 const lines=cart.lines();
 if(!lines.length){const p=document.createElement('p');p.textContent='Je proefwinkelwagen is leeg.';root.append(p);return;}
 for(const line of lines){
  const row=document.createElement('div');row.className='dh-checkout-line';
  const name=document.createElement('strong');name.textContent=line.qty+'× '+line.product.name+' ('+line.product.type+')';
  const price=document.createElement('span');price.textContent=cart.money(({'T-shirt':2495,'Sweater':3995,'Hoodie':4495}[line.product.type]||0)*line.qty)+' *';
  row.append(name,price);root.append(row);
 }
 const total=document.createElement('p');total.className='dh-checkout-total';
 const label=document.createElement('span');label.textContent='Indicatief totaal';
 const value=document.createElement('span');value.textContent=cart.money(cart.totals().subtotal)+' *';
 total.append(label,value);root.append(total);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
window.addEventListener('draaghet:cart-change',render);
})();
