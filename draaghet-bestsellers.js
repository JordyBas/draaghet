/* DRAAGHET. | Sales-backed top ten; no placeholder products falsely ranked */
(function(){
 const root=document.getElementById('bestseller-carousel');
 const empty=document.getElementById('bestseller-empty');
 const section=document.getElementById('meest-gedragen');
 if(!root||!empty)return;
 const box=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x};
 function isRelativeHref(s){return typeof s==='string'&&/^(shirts\.html|product\.html\?item=[a-z0-9-]{1,90})$/.test(s)}
 function draw(data){
  if(!Array.isArray(data)){root.hidden=true;empty.hidden=true;if(section)section.hidden=true;return}
  const top=data.filter(x=>x&&typeof x.title==='string'&&x.title.trim()&&x.verified_sale===true).slice(0,10);
  root.replaceChildren();
  if(!top.length){root.hidden=true;empty.hidden=true;if(section)section.hidden=true;return}
  const cards=top.map((product,index)=>{
    const item=box('article','dh-best-card');
    const clickable=box('a');clickable.href=isRelativeHref(product.href)?product.href:'shirts.html';clickable.style.textDecoration='none';
    clickable.style.color='inherit';
    const art=box('div','dh-best-art');
    art.append(box('span','dh-best-rank',String(index+1).padStart(2,'0')));
    if(typeof product.image==='string'&&/^https:\/\/[^ ]{1,350}$/.test(product.image)){
       const img=box('img');img.src=product.image;img.alt=product.title;img.loading='lazy';img.decoding='async';art.append(img);
    }else{art.append(box('span','dh-best-placeholder','DRAAGHET'))}
    const info=box('div','dh-best-info');info.append(box('strong','',product.title),box('p','',product.type||'DRAAGHET'));clickable.append(art,info);item.append(clickable);return item;
  });
  for(let i=0;i<2;i++)for(const card of cards){const cloned=card.cloneNode(true);if(i===1){cloned.setAttribute('aria-hidden','true');for(const a of cloned.querySelectorAll('a'))a.tabIndex=-1;}root.append(cloned);}
  root.hidden=false;empty.hidden=true;if(section)section.hidden=false;
  root.style.animationDuration=Math.max(20,top.length*6)+'s';
  const parent=root.closest('.dh-best-viewport');if(parent)parent.classList.toggle('dh-best-single',top.length===1);
 }
 async function init(){
  try{
   const response=await fetch('bestsellers.json',{cache:'no-store'});
   if(!response.ok)throw new Error('missing');
   const data=await response.json();draw(data);
  }catch{draw([]);}
 }
 document.addEventListener('draaghet:bestsellers',e=>draw(e.detail));
 void init();
})();