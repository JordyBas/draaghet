/* DRAAGHET. | Public maker directory, opt-in profile, follow + like */
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
 const niceCount=n=>new Intl.NumberFormat('nl-NL').format(Number(n)||0);
 function card(m){
  const box=el('article','community-card');box.append(avatar(m.display_name));
  box.append(el('h3','',m.display_name),el('p','',m.bio||'Deze maker brengt binnenkort zijn of haar creativiteit tot leven.'));
  const meta=el('div','community-meta');meta.append(el('span','',niceCount(m.follower_count)+' volgers'),el('span','',niceCount(m.like_count)+' likes'));box.append(meta);
  const a=el('a','','BEKIJK PROFIEL →');a.href='maker.html?id='+encodeURIComponent(m.user_id);box.append(a);return box;
 }
 async function directory(){
  const root=$('community-list');if(!root)return;
  if(!db){root.textContent='De makers konden niet worden geladen.';return;}
  const r=await db.from('maker_public_profiles').select('user_id,display_name,bio,follower_count,like_count').eq('is_public',true).order('follower_count',{ascending:false}).limit(90);
  root.replaceChildren();
  if(r.error){root.className='community-empty';root.textContent='De makers konden niet worden geladen. Probeer het later opnieuw.';return;}
  if(!r.data?.length){root.className='community-empty';root.textContent='De eerste makersprofielen verschijnen hier zodra makers ervoor kiezen hun profiel openbaar te maken.';return;}
  root.className='community-grid';
  for(const m of r.data)root.append(card(m));
 }
 async function view(){
  const root=$('community-profile');if(!root)return;
  const id=new URLSearchParams(location.search).get('id');
  if(!id||!/^[a-f0-9-]{36}$/i.test(id)){root.textContent='Geen geldig makersprofiel gevonden.';return;}
  if(!db){root.textContent='De verbinding is niet beschikbaar.';return;}
  const r=await db.from('maker_public_profiles').select('user_id,display_name,handle,bio,is_public,follower_count,like_count').eq('user_id',id).eq('is_public',true).maybeSingle();
  if(r.error||!r.data){root.className='community-empty';root.textContent='Dit profiel bestaat niet of is niet openbaar.';return;}
  const m=r.data;document.title=m.display_name+' | Maker bij DRAAGHET.';
  root.className='community-profile';root.replaceChildren();
  const head=el('div','community-profile-header');head.append(avatar(m.display_name));
  const h=el('div','');h.append(el('h1','',m.display_name),el('div','community-handle','@'+m.handle));head.append(h);root.append(head);
  root.append(el('p','community-profile-bio',m.bio||'Deze maker heeft nog geen verhaal toegevoegd.'));
  const stats=el('div','community-stats'),fStat=el('div',''),lStat=el('div','');
  const fNum=el('strong','',niceCount(m.follower_count)),lNum=el('strong','',niceCount(m.like_count));
  fStat.append(fNum,el('span','','Volgers'));lStat.append(lNum,el('span','','Likes'));stats.append(fStat,lStat);
  const actions=el('div','community-profile-actions');
  const follow=el('button','community-btn yellow','VOLGEN');const like=el('button','community-btn light','♡ LIKE');
  follow.type=like.type='button';actions.append(follow,like);root.append(actions,stats);
  const status=el('p','community-status','');status.setAttribute('role','status');root.append(status);
  const user=await signedIn();
  if(!user){status.textContent='Log in om makers te volgen of een like te geven.';const login=el('a','community-btn light','INLOGGEN');login.href='account.html?next=makers.html';actions.append(login);follow.hidden=like.hidden=true;return;}
  if(user.id===m.user_id){follow.hidden=like.hidden=true;status.textContent='Dit is jouw openbare makersprofiel.';const own=el('a','community-btn light','BEWERK MIJN PROFIEL');own.href='mijn-makerprofiel.html';actions.append(own);return;}
  const [fr,lr]=await Promise.all([
   db.from('maker_follows').select('maker_id').eq('follower_id',user.id).eq('maker_id',m.user_id).maybeSingle(),
   db.from('maker_profile_likes').select('maker_id').eq('user_id',user.id).eq('maker_id',m.user_id).maybeSingle()
  ]);
  let isFollowing=!!fr.data,isLiked=!!lr.data;
  function renderActions(){follow.textContent=isFollowing?'VOLGEND ✓':'VOLGEN';like.textContent=isLiked?'♥ GELIKET':'♡ LIKE';}
  renderActions();
  async function change(kind){
   const button=kind==='follow'?follow:like;button.disabled=true;status.textContent='';
   const table=kind==='follow'?'maker_follows':'maker_profile_likes';
   const currently=kind==='follow'?isFollowing:isLiked;
   const payload=kind==='follow'?{follower_id:user.id,maker_id:m.user_id}:{user_id:user.id,maker_id:m.user_id};
   const result=currently?await db.from(table).delete().match(payload):await db.from(table).insert(payload);
   if(result.error){status.textContent='Opslaan is niet gelukt. Probeer het opnieuw.';}
   else{
    if(kind==='follow'){isFollowing=!isFollowing;fNum.textContent=niceCount(Number(fNum.textContent.replace(/\D/g,''))+(isFollowing?1:-1));}
    else{isLiked=!isLiked;lNum.textContent=niceCount(Number(lNum.textContent.replace(/\D/g,''))+(isLiked?1:-1));}
    renderActions();
   }
   button.disabled=false;
  }
  follow.onclick=()=>void change('follow');like.onclick=()=>void change('like');
 }
 async function editor(){
  const form=$('maker-profile-form');if(!form)return;
  if(!db){msg('De verbinding is momenteel niet beschikbaar.');form.hidden=true;return;}
  const user=await signedIn();
  if(!user){msg('Log eerst in om je openbare makersprofiel te beheren.');form.hidden=true;const a=$('maker-login');if(a)a.hidden=false;return;}
  const existing=await db.from('maker_public_profiles').select('handle,display_name,bio,is_public').eq('user_id',user.id).maybeSingle();
  if(existing.error){msg('Je makerprofiel kon niet worden geladen.');form.hidden=true;return;}
  const profile=existing.data||{};
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
   const result=await db.from('maker_public_profiles').upsert({user_id:user.id,handle,display_name,bio,is_public},{onConflict:'user_id'});
   submit.disabled=false;
   if(result.error){msg(result.error.code==='23505'?'Deze gebruikersnaam is al in gebruik. Kies een andere.':'Opslaan is niet gelukt. Controleer je gegevens.');return;}
   msg(is_public?'Je profiel is opgeslagen en openbaar.':'Je profiel is veilig opgeslagen en privé.');
   link.hidden=!is_public;if(is_public)link.href='maker.html?id='+encodeURIComponent(user.id);
  };
 }
 async function start(){await Promise.all([directory(),view(),editor()]);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void start());else void start();
})();