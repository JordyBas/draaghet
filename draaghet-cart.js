/* DRAAGHET | Phase 3 preview cart. No purchases or payments until approved catalog. */
(function(w){
'use strict';
const KEY='draaghet-preview-cart-v1', MAX=25;
const prices={'T-shirt':2495,'Sweater':3995,'Hoodie':4495};
const money=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n/100);
const catalog=()=>Array.isArray(w.DRAAGHET_CAPSULE)?w.DRAAGHET_CAPSULE:[];
const product=slug=>catalog().find(p=>p.slug===slug);
function normalize(value){
 const seen=new Map();
 if(!Array.isArray(value))return [];
 for(const line of value.slice(0,100)){
  if(!line||typeof line.slug!=='string'||!product(line.slug))continue;
  const qty=Number(line.qty);
  if(!Number.isInteger(qty)||qty<1)continue;
  seen.set(line.slug,Math.min(MAX,(seen.get(line.slug)||0)+Math.min(MAX,qty)));
 }
 return [...seen].map(([slug,qty])=>({slug,qty}));
}
function read(){try{return normalize(JSON.parse(w.localStorage.getItem(KEY)||'[]'))}catch{return []}}
function save(lines){
 const safe=normalize(lines);
 try{w.localStorage.setItem(KEY,JSON.stringify(safe))}catch{}
 w.dispatchEvent(new Event('draaghet:cart-change'));
 return safe;
}
function add(slug){
 if(!product(slug))return false;
 const lines=read(),old=lines.find(x=>x.slug===slug);
 if(old)old.qty=Math.min(MAX,old.qty+1);else lines.push({slug,qty:1});
 save(lines);return true;
}
function quantity(slug,qty){
 if(!Number.isInteger(qty)||qty<0)return;
 save(read().map(x=>x.slug===slug?{...x,qty}:x).filter(x=>x.qty>0));
}
function remove(slug){save(read().filter(x=>x.slug!==slug))}
function clear(){save([])}
function lines(){return read().map(x=>({...x,product:product(x.slug)})).filter(x=>x.product)}
function totals(){
 const all=lines();
 const subtotal=all.reduce((sum,x)=>sum+(prices[x.product.type]||0)*x.qty,0);
 return {subtotal,count:all.reduce((sum,x)=>sum+x.qty,0),remaining:Math.max(0,7500-subtotal)};
}
const api={add,quantity,remove,clear,lines,totals,money};
w.DRAAGHET_CART=Object.freeze(api);
const el=(tag,className,text)=>{
 const e=document.createElement(tag);if(className)e.className=className;
 if(text!==undefined)e.textContent=text;return e;
};
function render(root){
 if(!root)return;
 root.replaceChildren();
 const all=lines(),sum=totals();
 if(!all.length){
  const empty=el('div','dh-cart-empty');
  empty.append(el('h2','','JE WINKELWAGEN IS LEEG.'),el('p','','Bekijk de conceptcollectie en voeg een ontwerp toe aan je proefwinkelwagen.'));
  const a=el('a','dh-cart-mainlink','BEKIJK DE COLLECTIE');a.href='shirts.html';empty.append(a);
  root.append(empty);return;
 }
 const rows=el('div','dh-cart-rows');
 for(const line of all){
  const row=el('article','dh-cart-item');
  const picture=el('img','dh-cart-thumb');picture.src=line.product.image;picture.alt=line.product.name;picture.loading='lazy';
  const info=el('div','dh-cart-description');
  info.append(el('h3','',line.product.name),el('p','',line.product.type+' · '+line.product.colorNL));
  info.append(el('strong','dh-cart-item-price',money((prices[line.product.type]||0)*line.qty)+' *'));
  const controls=el('div','dh-cart-controls');
  const minus=el('button','','−'),qty=el('output','',String(line.qty)),plus=el('button','','+'),del=el('button','dh-cart-delete','Verwijderen');
  for(const btn of [minus,plus,del])btn.type='button';
  minus.disabled=line.qty===1;plus.disabled=line.qty>=MAX;
  minus.setAttribute('aria-label','Verminder aantal '+line.product.name);plus.setAttribute('aria-label','Verhoog aantal '+line.product.name);
  minus.onclick=()=>quantity(line.slug,line.qty-1);plus.onclick=()=>quantity(line.slug,line.qty+1);del.onclick=()=>remove(line.slug);
  controls.append(minus,qty,plus,del);info.append(controls);row.append(picture,info);rows.append(row);
 }
 const summary=el('aside','dh-cart-summary');summary.append(el('h2','','OVERZICHT'));
 summary.append(el('p','dh-cart-subtotal','Voorbeeldtotaal: '+money(sum.subtotal)));
 const progress=el('div','dh-cart-progress');const inner=el('span');inner.style.width=Math.min(100,sum.subtotal/7500*100)+'%';progress.append(inner);
 summary.append(el('p','',sum.remaining?'Nog '+money(sum.remaining)+' tot €75 (voorbeeldgrens gratis verzending).':'Voorbeeldgrens gratis verzending bereikt.'),progress);
 summary.append(el('p','dh-cart-warning','* Indicatieve prijzen. Nog geen aankoop mogelijk. Definitieve prijzen en verzendkosten worden later vastgesteld.'));
 const a=el('a','dh-cart-mainlink','BEKIJK AFREKENPROCES');a.href='afrekenen.html';summary.append(a);
 const clearButton=el('button','dh-cart-clear','Proefwinkelwagen legen');clearButton.type='button';clearButton.onclick=clear;summary.append(clearButton);
 root.append(rows,summary);
}
function init(){
 const main=document.getElementById('dh-cart-content');if(main){render(main);w.addEventListener('draaghet:cart-change',()=>render(main))}
 const count=()=>{
  for(const badge of document.querySelectorAll('.dh-cart-count')){badge.textContent=String(totals().count);badge.hidden=!totals().count}
 };count();w.addEventListener('draaghet:cart-change',count);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();