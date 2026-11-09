/* DRAAGHET. | Eenvoudige makersprofielen: naam, bio, gepubliceerde ontwerpen */
(function(){
 const URL='https://rjnogcommtnxalzqrsmx.supabase.co';
 const KEY='sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc';
 const db=window.supabase?.createClient(URL,KEY);
 const $=id=>document.getElementById(id);
 const el=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=value;return x;};
 const avatar=name=>el('div','community-avatar',(name||'?').trim().slice(0,2).toUpperCase());
 const msg=(text)=>{if($('community-status'))$('community-status').textContent=text;};
 async function signedIn(){
  if(!db)return null;
  const result=await db.auth.getUser();
  return result.error?null:result.data.user;
 }
 function card(m){
  const box=el('article','community-card');box.append(avatar(m.display_name));
  box.append(el('h3','',m.display_name),el('p','',m.bio||'Deze maker brengt binnenkort zijn of haar creativiteit tot leven.'));
  const a=el('a','','BEKIJK PROFIEL →');a.href='maker.html?id='+encodeURIComponent(m.user_id);box.append(a);return box;
 }
 async function directory(){
  const root=$('community-list');if(!root)return;
  if(!db){root.textContent='De makers konden niet worden geladen.';return;}
  const r=await db.from('maker_public_profiles').select('user_id,display_name,bio').eq('is_public',true).order('created_at',{ascending:false}).limit(90);
  root.replaceChildren();
  if(r.error){root.className='community-empty';root.textContent='De makers konden niet worden geladen. Probeer het later opnieuw.';return;}
  if(!r.data?.length){root.className='community-empty';root.textContent='De eerste makersprofielen verschijnen hier zodra makers ervoor kiezen hun profiel openbaar te maken.';return;}
  root.className='community-grid';
  for(const m of r.data)root.append(card(m));
 }
 async function showMakerDesigns(root,m){
  // Approved public catalogue: RLS additionally requires an opt-in public profile.
  const section=el('section','dh-maker-designs');
  section.setAttribute('aria-label','Ontwerpen van deze maker');
  section.append(el('h2','','ONTWERPEN VAN DEZE MAKER.'));
  const catalog=window.DRAAGHET_CAPSULE;
  const mockups=window.DRAAGHET_MOCKUPS;
  if(!Array.isArray(catalog)||!mockups){section.append(el('p','dh-maker-desc','De ontwerpen kunnen nu niet worden getoond.'));root.append(section);return;}
  const templates=[
    catalog.find(item=>item.type==='T-shirt'&&item.color==='Black'),
    catalog.find(item=>item.type==='Sweater'&&item.color==='Charcoal'),
    catalog.find(item=>item.type==='Hoodie'&&item.color==='Black')
  ];
  if(templates.some(item=>!item)){section.append(el('p','dh-maker-desc','De ontwerpen zijn tijdelijk niet beschikbaar.'));root.append(section);return;}
  const result=await db.from('maker_showcase').select('id,title,print_line1,print_line2')
    .eq('maker_id',m.user_id).eq('is_live',true).order('created_at',{ascending:false}).limit(12);
  if(result.error){section.append(el('p','dh-maker-desc','De gepubliceerde ontwerpen konden niet worden geladen.'));root.append(section);return;}
  const live=result.data||[];
  const designs=live.length?live:[{title:'SOCIALE BATTERIJ',print_line1:'SOCIALE',print_line2:'BATTERIJ'}];
  if(!live.length)section.append(el('p','dh-maker-desc','Er staan nog geen gepubliceerde ontwerpen op dit profiel. Zo kan een ontwerp er straks op drie kledingstukken uitzien:'));
  for(const design of designs){
    const demo=!live.length;
    const block=el('div','dh-maker-demo');
    if(demo)block.append(el('strong','dh-maker-demo-label','VOORBEELDWEERGAVE · NIET VAN DEZE MAKER'));
    block.append(el('h3','',design.title));
    const grid=el('div','dh-maker-variant-grid');
    for(const item of templates){
      const concept={...item,name:design.title,line1:design.print_line1,line2:design.print_line2};
      const card=el('article','dh-maker-variant');
      card.append(mockups.photo(concept));
      const info=el('div','dh-maker-variant-info');
      info.append(el('strong','',item.type),el('span','',mockups.examplePrice(item.type)));
      card.append(info);grid.append(card);
    }
    block.append(grid);section.append(block);
  }
  section.append(el('p','dh-maker-pricenote','* Voorbeeldprijzen, nog niet definitief. De getoonde kleding is niet bestelbaar. Alleen geselecteerde en gepubliceerde makersontwerpen worden als eigen werk getoond.'));
  root.append(section);
}
async function view(){
  const root=$('community-profile');if(!root)return;
  const id=new URLSearchParams(location.search).get('id');
  if(!id||!/^[a-f0-9-]{36}$/i.test(id)){root.textContent='Geen geldig makersprofiel gevonden.';return;}
  if(!db){root.textContent='De verbinding is niet beschikbaar.';return;}
  const r=await db.from('maker_public_profiles').select('user_id,display_name,handle,bio,is_public').eq('user_id',id).eq('is_public',true).maybeSingle();
  if(r.error||!r.data){root.className='community-empty';root.textContent='Dit profiel bestaat niet of is niet openbaar.';return;}
  const m=r.data;document.title=m.display_name+' | Maker bij DRAAGHET';
  root.className='community-profile';root.replaceChildren();
  const head=el('div','community-profile-header');head.append(avatar(m.display_name));
  const h=el('div','');h.append(el('h1','',m.display_name),el('div','community-handle','@'+m.handle));head.append(h);root.append(head);
  root.append(el('p','community-profile-bio',m.bio||'Deze maker heeft nog geen verhaal toegevoegd.'));
  await showMakerDesigns(root,m);
  const user=await signedIn();
  if(user?.id===m.user_id){
    const actions=el('div','community-profile-actions');
    const edit=el('a','community-btn light','BEWERK MIJN PROFIEL');
    edit.href='mijn-makerprofiel.html';actions.append(edit);root.append(actions);
  }

 }
 async function editor(){
  const form=$('maker-profile-form');if(!form)return;
  if(!db){msg('De verbinding is momenteel niet beschikbaar.');form.hidden=true;return;}
  const user=await signedIn();
  if(!user){msg('Log eerst in om je openbare makersprofiel te beheren.');form.hidden=true;const a=$('maker-login');if(a)a.hidden=false;return;}
  const existing=await db.from('maker_public_profiles').select('handle,display_name,bio,is_public').eq('user_id',user.id).maybeSingle();
  if(existing.error){msg('Je makerprofiel kon niet worden geladen.');form.hidden=true;return;}
  const profile=existing.data||{};let profileExists=!!existing.data;
  $('maker-name').value=profile.display_name||'';
  $('maker-handle').value=profile.handle||'';
  $('maker-bio').value=profile.bio||'';
  $('maker-public').checked=!!profile.is_public;
  const link=$('maker-view-link');
  if(profile.is_public){link.href='maker.html?id='+encodeURIComponent(user.id);link.hidden=false;}
  form.hidden=false;msg(profile.is_public?'Je makersprofiel is zichtbaar voor iedereen.':'Je profiel is privé totdat je het zelf openbaar maakt.');
  form.onsubmit=async e=>{
   e.preventDefault();
   const display_name=$('maker-name').value.trim();
   const handle=$('maker-handle').value.trim().toLowerCase();
   const bio=$('maker-bio').value.trim();
   const is_public=$('maker-public').checked;
   if(display_name.length<2||display_name.length>60||!/^[a-z0-9][a-z0-9_-]{2,29}$/.test(handle)||bio.length>360){msg('Controleer de naam, gebruikersnaam (3-30 tekens) en beschrijving (max. 360 tekens).');return;}
   const submit=form.querySelector('button[type=submit]');submit.disabled=true;msg('Je makersprofiel wordt opgeslagen...');
   const result=profileExists
     ?await db.from('maker_public_profiles').update({handle,display_name,bio,is_public}).eq('user_id',user.id)
     :await db.from('maker_public_profiles').insert({user_id:user.id,handle,display_name,bio,is_public});
   submit.disabled=false;
   if(result.error){msg(result.error.code==='23505'?'Deze gebruikersnaam is al in gebruik. Kies een andere.':'Opslaan is niet gelukt. Controleer je gegevens.');return;}
   profileExists=true;
   msg(is_public?'Je profiel is opgeslagen en openbaar.':'Je profiel is veilig opgeslagen en privé.');
   link.hidden=!is_public;if(is_public)link.href='maker.html?id='+encodeURIComponent(user.id);
  };
 }
 async function start(){await Promise.all([directory(),view(),editor()]);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void start());else void start();
})();