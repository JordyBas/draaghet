/* DRAAGHET. | Original capsule presentation on Untagged Movement garments */
(function(){
 const capsule=window.DRAAGHET_CAPSULE;if(!Array.isArray(capsule)||!capsule.length)return;
 const $=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
 const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function printSVG(item){
  const dark=item.mode==='dark',ink=dark?'#171717':'#f9f7ed',accent='#f3e72b';
  const word=(str,y,size=35,weight=900,fill=ink)=>'<text x="150" y="'+y+'" text-anchor="middle" font-family="Impact,Arial Black,Arial,sans-serif" font-size="'+size+'" font-weight="'+weight+'" letter-spacing="-1.2" fill="'+fill+'">'+esc(str)+'</text>';
  const small=(str,y,color=ink)=>'<text x="150" y="'+y+'" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="800" letter-spacing="0.5" fill="'+color+'">'+esc(str)+'</text>';
  let inner='';
  switch(item.family){
   case 'meter':
    inner=small('STATUS: OP ZOEK NAAR RUST',25)+word(item.line1,68,37)+word(item.line2,103,38)+
    '<rect x="63" y="124" width="167" height="33" rx="3" fill="none" stroke="'+ink+'" stroke-width="4"/>'+
    '<rect x="231" y="132" width="8" height="16" fill="'+ink+'"/>'+
    '<rect x="70" y="131" width="11" height="19" fill="'+accent+'"/>'+small(item.small,181,accent);
    break;
   case 'block':
    inner='<rect x="15" y="23" width="270" height="154" fill="none" stroke="'+ink+'" stroke-width="5"/>'+
    word(item.line1,76,43)+word(item.line2,120,34)+
    '<line x1="42" y1="138" x2="258" y2="138" stroke="'+ink+'" stroke-width="2"/>'+small(item.small,160);
    break;
   case 'stack':
    inner=small('PLANNING VANDAAG',31,accent)+word(item.line1,89,58)+
    '<rect x="18" y="103" width="264" height="60" fill="'+accent+'"/>'+word(item.line2,148,43,900,'#171717')+small(item.small,183);
    break;
   case 'stamp':
    inner='<path d="M32 56H268" stroke="'+ink+'" stroke-width="5"/>'+
     word(item.line1,97,46)+word(item.line2,136,31)+
     '<path d="M32 154H268" stroke="'+ink+'" stroke-width="5"/>'+small(item.small,181);
    break;
   case 'badge':
    inner='<rect x="27" y="22" width="246" height="151" rx="18" fill="none" stroke="'+ink+'" stroke-width="4"/>'+
     word(item.line1,84,56)+word(item.line2,129,49)+small(item.small,157,accent);
    break;
   case 'chaos':
    inner=small('DRAAGHET. / DAGELIJKS LEVEN',37,accent)+word(item.line1,92,39)+word(item.line2,137,48)+
    '<path d="M58 153L240 161" stroke="'+accent+'" stroke-width="11" stroke-linecap="square"/>'+small(item.small,187);
    break;
  }
  return '<svg aria-hidden="true" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">'+inner+'</svg>';
 }
 function photo(item){
  const media=$('div','dh-capsule-media');media.dataset.garment=item.type;
  media.style.background=item.color==='Birch'?'#ece9e1':'#e8e7e4';
  const image=$('img');image.src=item.image;image.alt=item.name+' op '+item.model+' '+item.colorNL;image.loading='lazy';image.decoding='async';
  image.onerror=()=>{image.style.display='none';const fallback=$('div','dh-capsule-fallback',item.type+' · '+item.colorNL);fallback.style.cssText='position:absolute;inset:0;display:grid;place-items:center;background:#ddd8ce;color:#6a655c;font-weight:800';media.prepend(fallback)};
  const overlay=$('div','dh-capsule-print');overlay.innerHTML=printSVG(item);
  media.append(image,overlay,$('span','dh-capsule-label','EERSTE COLLECTIE'));
  return media;
 }
 function card(item){
  const el=$('article','dh-capsule-card product');el.dataset.type=item.type;
  const link=$('a');link.href='product.html?item='+encodeURIComponent(item.slug);link.setAttribute('aria-label','Bekijk '+item.name);
  link.append(photo(item));
  const info=$('div','dh-capsule-meta');
  const name=$('div');name.append($('h3','',item.name),$('p','',item.type+' · '+item.colorNL));
  info.append(name,$('span','dh-capsule-price','Binnenkort'));link.append(info);el.append(link);return el;
 }
 function installList(){
  const grids=[...document.querySelectorAll('#collectie .products,.pagebody .products')];
  if(!grids.length)return;
  for(const grid of grids){
   grid.classList.add('dh-capsule-grid');grid.replaceChildren(...capsule.map(card));
   const section=grid.closest('section');const note=section?.querySelector('.preview-note');
   if(note)note.textContent='Digitale mockups op officiële Untagged Movement-kledingfoto’s. Ontwerpen en drukplaatsing zijn indicatief. Producten zijn nog niet te bestellen.';
   const filters=document.getElementById('filters');
   if(filters){
    let sweater=filters.querySelector('[data-filter="Sweater"]');
    if(!sweater){sweater=$('button','choice','Sweaters');sweater.type='button';sweater.dataset.filter='Sweater';filters.append(sweater)}
    filters.querySelectorAll('[data-filter]').forEach(button=>{
     button.onclick=()=>{
      filters.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===button));
      grid.querySelectorAll('.dh-capsule-card').forEach(el=>el.hidden=button.dataset.filter!=='all'&&el.dataset.type!==button.dataset.filter);
     };
    });
   }
  }
 }
 function installDetail(){
  const root=document.getElementById('art'),name=document.getElementById('name');
  if(!root||!name)return;
  const slug=new URLSearchParams(location.search).get('item');
  const item=capsule.find(p=>p.slug===slug);
  if(!item){name.textContent='Ontwerp niet gevonden';return;}
  document.title=item.name+' | DRAAGHET.';
  name.textContent=item.name;
  const crumb=document.getElementById('crumb');if(crumb)crumb.textContent=item.name;
  const desc=document.getElementById('desc');if(desc)desc.textContent='Een '+item.type.toLowerCase()+' met karakter. '+item.model+', kleur '+item.colorNL+'. Dit is een digitale preview van onze eerste collectie.';
  const color=document.getElementById('colorLabel');if(color)color.textContent=item.colorNL;
  const choices=document.getElementById('colors');if(choices){choices.replaceChildren();const c=$('button','choice active',item.colorNL);c.type='button';c.setAttribute('aria-pressed','true');choices.append(c)}
  root.replaceChildren(photo(item));root.classList.add('dh-capsule-detail');root.style.cssText='background:transparent;display:block;aspect-ratio:auto;overflow:visible';
  const note=document.querySelector('.smallnote');if(note&&note.textContent.includes('concept'))note.textContent='Digitale mockup op een officiële productfoto. Plaatsing en afmeting van de print kunnen bij de definitieve productie afwijken.';
  const unavailable=document.querySelector('.unavailable');if(unavailable)unavailable.textContent='Dit is een voorbeeld van de eerste collectie. Beschikbare maten, prijs, definitieve drukuitvoering en betalen volgen bij de opening van de webshop.';
  const spec=document.querySelector('.spec');if(spec){
   const p=spec.querySelector('p');if(p)p.textContent='Basis: '+item.model+' ('+item.article+'), '+item.colorNL+'. De artwork- en productafwerking worden vóór de verkoop definitief vastgesteld.';
  }
 }
 function init(){installList();installDetail();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();