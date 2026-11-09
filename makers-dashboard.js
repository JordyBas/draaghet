(async()=>{
const root=document.getElementById('hub-private');
const status=document.getElementById('hub-status');
const loggedOut=document.getElementById('hub-logged-out');
if(!window.supabase){status.textContent='De verbinding is niet beschikbaar.';return;}
const db=window.supabase.createClient('https://rjnogcommtnxalzqrsmx.supabase.co','sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc');
const auth=await db.auth.getUser();
if(auth.error||!auth.data?.user){status.hidden=true;loggedOut.hidden=false;return;}
const user=auth.data.user;
const [profile,ideas,settings]=await Promise.all([
 db.from('maker_public_profiles').select('user_id,display_name,handle,is_public').eq('user_id',user.id).maybeSingle(),
 db.from('ideas').select('title,status,category,created_at').eq('user_id',user.id).order('created_at',{ascending:false}).limit(100),
 db.from('maker_studio_settings').select('submissions_enabled').eq('singleton',true).maybeSingle()
]);
if(profile.error||ideas.error){status.textContent='Je dashboard kon niet volledig worden geladen. Probeer het later opnieuw.';return;}
root.hidden=false;status.hidden=true;
const release=document.getElementById('hub-release');
if(release&&(!settings.data?.submissions_enabled||settings.error)){
 release.hidden=false;
 release.textContent='Ideeën bekijken en je makersprofiel beheren kan al. Nieuwe inzendingen openen zodra de veiligheid en voorwaarden zijn goedgekeurd.';
 const cta=document.querySelector('.maker-hub-summary a[href="idee.html"]');
 if(cta)cta.textContent='BEKIJK IDEEËNFORMULIER';
}
const p=profile.data;
const name=document.getElementById('hub-name');
const visibility=document.getElementById('hub-visibility');
const publicLink=document.getElementById('hub-public-link');
if(p){
 name.textContent=p.display_name;
 document.getElementById('hub-avatar').textContent=p.display_name.slice(0,2).toUpperCase();
 visibility.textContent=p.is_public?'Openbaar makersprofiel. Bezoekers kunnen jouw verhaal en gepubliceerde ontwerpen bekijken.':'Je makersprofiel is privé. DRAAGHET kan jouw geselecteerde ontwerpen verkopen zonder je openbare identiteit te tonen.';
 if(p.is_public){publicLink.href='maker.html?id='+encodeURIComponent(user.id);publicLink.hidden=false;}
}else{
 name.textContent='Maak jouw makersprofiel aan';
 visibility.textContent='Je bent ingelogd, maar hebt nog geen makersprofiel. Maak dit eerst aan in de Makers Studio.';
 const btn=document.querySelector('.maker-hub-profile .community-btn.yellow');if(btn){btn.href='idee.html';btn.textContent='START ALS MAKER';}
}
document.getElementById('hub-ideas').textContent=(ideas.data||[]).length;
const monthKey=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Amsterdam',year:'numeric',month:'2-digit'});
const currentMonth=monthKey.format(new Date());
const thisMonth=(ideas.data||[]).filter(x=>monthKey.format(new Date(x.created_at))===currentMonth);
document.getElementById('hub-remaining').textContent=String(Math.max(0,6-thisMonth.length))+' / 6';
const selected=document.getElementById('hub-selected');
if(selected)selected.textContent=String(thisMonth.filter(x=>x.status==='selected').length)+' / 3';
const list=document.getElementById('hub-recent');list.replaceChildren();
const statuses={received:'Ontvangen',reviewing:'In beoordeling',selected:'Geselecteerd',rejected:'Niet geselecteerd'};
const recent=(ideas.data||[]).slice(0,5);
if(!recent.length){list.className='community-empty';list.textContent='Je hebt nog geen ideeën ingestuurd. Begin bij de Makers Studio.';}
else{list.className='';for(const item of recent){const row=document.createElement('div');row.className='maker-hub-idea';const title=document.createElement('strong');title.textContent=item.title;const badge=document.createElement('span');badge.textContent=(statuses[item.status]||'In behandeling')+' · '+new Date(item.created_at).toLocaleDateString('nl-NL');row.append(title,badge);list.append(row);}}
})().catch(()=>{const s=document.getElementById('hub-status');if(s)s.textContent='Het dashboard kon niet worden geladen.';});