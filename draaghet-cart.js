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
const api={add,quantity,remove,clear,lines,totals,money,open:openDrawer};
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
let drawer=null,lastFocus=null;
function openDrawer(){
 if(!drawer)createDrawer();
 lastFocus=document.activeElement;
 updateDrawer();
 drawer.panel.hidden=false;drawer.backdrop.hidden=false;
 document.body.classList.add('dh-cart-dialog-open');
 drawer.close.focus();
}
function closeDrawer(){
 if(!drawer)return;
 drawer.panel.hidden=true;drawer.backdrop.hidden=true;
 document.body.classList.remove('dh-cart-dialog-open');
 if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
}
function updateDrawer(){
 if(!drawer)return;
 drawer.content.replaceChildren();
 const all=lines(),t=totals();
 if(!all.length){drawer.content.append(el('p','','Je proefwinkelwagen is leeg.'));return;}
 for(const item of all){
  const row=el('div','dh-drawer-item');
  row.append(el('strong','',item.qty+'× '+item.product.name),el('span','',money(item.qty*(prices[item.product.type]||0))+' *'));
  drawer.content.append(row);
 }
 drawer.content.append(el('p','dh-drawer-total','Voorbeeldtotaal: '+money(t.subtotal)+' *'));
 const link=el('a','dh-cart-mainlink','BEKIJK WINKELWAGEN');link.href='winkelwagen.html';drawer.content.append(link);
 drawer.content.append(el('p','dh-cart-warning','* Indicatieve prijzen. Betalen is nog niet mogelijk.'));
}
function createDrawer(){
 if(drawer)return;
 const backdrop=el('div','dh-drawer-backdrop');backdrop.hidden=true;
 const panel=el('aside','dh-drawer');panel.hidden=true;panel.setAttribute('role','dialog');
 panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','dh-drawer-title');
 const head=el('div','dh-drawer-heading');head.append(el('h2','','WINKELWAGEN'));
 head.querySelector('h2').id='dh-drawer-title';
 const close=el('button','dh-drawer-close','×');close.type='button';close.setAttribute('aria-label','Sluiten');
 head.append(close);
 const content=el('div','dh-drawer-content');panel.append(head,content);
 backdrop.addEventListener('click',closeDrawer);close.addEventListener('click',closeDrawer);
 panel.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const selectable=[...panel.querySelectorAll('a[href],button:not([disabled])')];
  if(!selectable.length)return;
  const first=selectable[0],last=selectable[selectable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)closeDrawer()});
 document.body.append(backdrop,panel);
 drawer={backdrop,panel,close,content};
 w.addEventListener('draaghet:cart-change',()=>{if(!drawer.panel.hidden)updateDrawer()});
}
function init(){
 const main=document.getElementById('dh-cart-content');if(main){render(main);w.addEventListener('draaghet:cart-change',()=>render(main))}
 const count=()=>{
  for(const badge of document.querySelectorAll('.dh-cart-count')){badge.textContent=String(totals().count);badge.hidden=!totals().count}
 };count();w.addEventListener('draaghet:cart-change',count);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})(window);
