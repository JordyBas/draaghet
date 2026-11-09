/* DRAAGHET | Consistent Spartan typographic studio mockups.
 * Reference supplier photographs with indicative text overlay, not final production proof.
 * Physical placement and exact print dimensions require a sample approval.
 */
(function(){
'use strict';
const items=window.DRAAGHET_CAPSULE;
if(!Array.isArray(items)||!items.length)return;
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
const zones={
 'T-shirt':{width:40,top:33,height:17},
 'Sweater':{width:40,top:34,height:17},
 'Hoodie':{width:36,top:39,height:14}
};
const font='900 36px "League Spartan",Spartan,Arial,sans-serif';
function wordsFor(item){
 const text=[item.line1,item.line2].filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
 return text||item.name.toLocaleUpperCase('nl-NL');
}
function fitPrint(print,text){
 const canvas=document.createElement('canvas');
 const ctx=canvas.getContext('2d');
 const tokens=text.split(/\s+/).filter(Boolean);
 const measure=(t,size)=>{if(!ctx)return t.length*size*.6;ctx.font='900 '+size+'px "League Spartan",Spartan,Arial,sans-serif';return ctx.measureText(t).width};
 // Find a balanced natural line wrap. Scaling is proportional: never use textLength or transform scaleX.
 let best=null;
 for(let n=1;n<=Math.min(5,tokens.length);n++){
  const limit=Math.max(1,Math.ceil(tokens.length/n));
  const lines=[];let row=[];
  for(const word of tokens){
   if(row.length>=limit){lines.push(row.join(' '));row=[]}
   row.push(word);
  }
  if(row.length)lines.push(row.join(' '));
  let size=36;
  const available=260;
  while(size>12 && lines.some(line=>measure(line,size)>available))size--;
  const totalH=lines.length*size*.98;
  if(totalH>150)size=Math.max(12,Math.floor(150/(lines.length*.98)));
  const score=size - Math.abs(lines.length-2)*1.5;
  if(!best||score>best.score)best={lines,size,score};
 }
 const block=make('div','dh-capsule-print-text');
 block.style.fontSize=best.size+'px';
 for(const line of best.lines)block.append(make('span','',line));
 print.replaceChildren(block);
}
function photo(item,priority=false){
 const media=make('div','dh-capsule-media');
 media.dataset.garment=item.type;
 media.dataset.color=item.color;
 const zone=zones[item.type]||zones['T-shirt'];
 media.style.setProperty('--print-width',zone.width+'%');
 media.style.setProperty('--print-top',zone.top+'%');
 media.style.setProperty('--print-height',zone.height+'%');
 const image=make('img');
 image.src=item.image;
 image.alt=item.name+' op '+item.model+' in '+item.colorNL+' (digitale conceptmockup)';
 image.loading=priority?'eager':'lazy';
 image.decoding='async';
 if(priority)image.fetchPriority='high';
 image.addEventListener('error',()=>{
  image.hidden=true;
  const fallback=make('div','dh-capsule-fallback','PRODUCTFOTO TIJDELIJK NIET BESCHIKBAAR');
  media.prepend(fallback);
 });
 const overlay=make('div','dh-capsule-print');
 overlay.setAttribute('aria-hidden','true');
 media.append(image,overlay);
 fitPrint(overlay,wordsFor(item));
 if(document.fonts?.ready)document.fonts.ready.then(()=>{if(overlay.isConnected)fitPrint(overlay,wordsFor(item))}).catch(()=>{});
 const label=make('span','dh-capsule-label','CONCEPT');
 media.append(label);
 return media;
}
function card(item){
 const article=make('article','dh-capsule-card product');
 article.dataset.type=item.type;
 const link=make('a');link.href='product.html?item='+encodeURIComponent(item.slug);
 link.setAttribute('aria-label','Bekijk '+item.name);
 link.append(photo(item));
 const info=make('div','dh-capsule-meta');
 const summary=make('div');
 summary.append(make('h3','',item.name),make('p','',item.type+' · '+item.colorNL));
 info.append(summary,make('span','dh-capsule-price','Binnenkort'));
 link.append(info);article.append(link);
 return article;
}
function installList(){
 const grids=document.querySelectorAll('#collectie .products,.pagebody .products');
 for(const grid of grids){
  grid.classList.add('dh-capsule-grid');
  grid.replaceChildren(...items.map(card));
  const note=grid.closest('section')?.querySelector('.preview-note');
  if(note)note.textContent='Digitale voorbeelden op productfoto’s van Untagged Movement. Prijzen, maten, bedrukking en beschikbaarheid worden vóór verkoop bevestigd.';
  const filters=document.getElementById('filters');
  if(filters){
   let sweater=filters.querySelector('[data-filter="Sweater"]');
   if(!sweater){sweater=make('button','choice','Sweaters');sweater.type='button';sweater.dataset.filter='Sweater';filters.append(sweater)}
   const show=filter=>{
    filters.querySelectorAll('[data-filter]').forEach(btn=>btn.classList.toggle('active',btn.dataset.filter===filter));
    grid.querySelectorAll('.dh-capsule-card').forEach(el=>{el.hidden=filter!=='all'&&el.dataset.type!==filter});
   };
   filters.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>show(button.dataset.filter)));
  }
 }
}
function installDetail(){
 const root=document.getElementById('art'),name=document.getElementById('name');
 if(!root||!name)return;
 const slug=new URLSearchParams(location.search).get('item');
 const item=items.find(x=>x.slug===slug);
 if(!item){name.textContent='Ontwerp niet gevonden';return;}
 document.title=item.name+' | DRAAGHET';
 name.textContent=item.name;
 const crumb=document.getElementById('crumb');if(crumb)crumb.textContent=item.name;
 const desc=document.getElementById('desc');if(desc)desc.textContent='Een '+item.type.toLowerCase()+' met humor. Basis: '+item.model+'. Bekijk de digitale preview in '+item.colorNL+'.';
 const color=document.getElementById('colorLabel');if(color)color.textContent=item.colorNL;
 const choices=document.getElementById('colors');
 if(choices){choices.replaceChildren();const btn=make('button','choice active',item.colorNL);btn.type='button';btn.setAttribute('aria-pressed','true');btn.disabled=true;choices.append(btn);}
 root.replaceChildren(photo(item,true));root.classList.add('dh-capsule-detail');
 root.style.cssText='background:transparent;display:block;aspect-ratio:auto;overflow:visible';
 const note=document.querySelector('.smallnote');
 if(note)note.textContent='Digitale conceptmockup. Printpositie, werkelijke kleur en exacte afmetingen worden vóór verkoop definitief gecontroleerd.';
 const unavailable=document.querySelector('.unavailable');
 if(unavailable)unavailable.textContent='Nog niet te bestellen. Verkoopprijs, exacte maten, varianten en definitieve bedrukking zijn nog niet vastgesteld.';
 const spec=document.querySelector('.spec');
 if(spec){
  const p=spec.querySelector('p');
  if(p)p.textContent='Basisartikel: '+item.model+' ('+item.article+'), kleur '+item.colorNL+'. Productfoto van de leverancier; bedrukking is een indicatieve digitale weergave.';
 }
}
function init(){installList();installDetail()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
