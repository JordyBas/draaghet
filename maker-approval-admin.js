/* DRAAGHET | Admin-only maker application review.
 * Database RLS checks admin membership and controls status updates.
 */
(function(){
'use strict';
const URL='https://rjnogcommtnxalzqrsmx.supabase.co';
const KEY='sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc';
const el=(tag,cls,value)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=value;return x};
let adminId='',db=null;
function status(message){const x=document.getElementById('admin-requests-status');if(x)x.textContent=message}
function humanDate(value){return value?new Date(value).toLocaleDateString('nl-NL'):'onbekend'}
async function show(){
 const root=document.getElementById('admin-requests');if(!root)return;
 const [apps,profiles]=await Promise.all([
   db.from('maker_applications').select('user_id,status,created_at,reviewed_at').order('created_at',{ascending:false}).limit(300),
   db.from('maker_public_profiles').select('user_id,display_name,handle,is_public').limit(300)
 ]);
 if(apps.error||profiles.error){root.hidden=true;status('De aanvragen konden niet veilig worden geladen.');return}
 const names=new Map((profiles.data||[]).map(x=>[x.user_id,x]));
 root.replaceChildren();
 if(!apps.data?.length){root.hidden=false;status('Er zijn nog geen maker-aanvragen.');return}
 for(const application of apps.data){
   const profile=names.get(application.user_id);
   const card=el('article','admin-request');
   const left=el('div');
   left.append(el('h2','',profile?.display_name||'Maker zonder openbare naam'),
     el('p','',profile?.handle?'@'+profile.handle:'Account-ID: '+application.user_id),
     el('p','',profile?.is_public?'Profiel openbaar':'Profiel privé'),
     el('p','','Aangevraagd op '+humanDate(application.created_at)));
   left.append(el('span','admin-request-status','STATUS: '+({pending:'In beoordeling',approved:'Goedgekeurd',rejected:'Afgewezen',suspended:'Gepauzeerd'}[application.status]||application.status)));
   const actions=el('div','admin-actions');
   for(const [value,label] of [['approved','Goedkeuren'],['rejected','Afwijzen'],['suspended','Pauzeren']]){
      if(application.status===value)continue;
      const btn=el('button','',label);btn.type='button';btn.dataset.decision=value;
      btn.setAttribute('aria-label',label+' voor '+(profile?.display_name||'maker'));
      btn.addEventListener('click',async()=>{
       actions.querySelectorAll('button').forEach(x=>x.disabled=true);
       status('Makerstatus bijwerken...');
       const {error}=await db.from('maker_applications')
         .update({status:value,reviewed_at:new Date().toISOString(),reviewed_by:adminId})
         .eq('user_id',application.user_id);
       if(error){status('Bijwerken is niet gelukt. Probeer opnieuw.');actions.querySelectorAll('button').forEach(x=>x.disabled=false);return}
       await show();
      });
      actions.append(btn);
   }
   card.append(left,actions);root.append(card);
 }
 root.hidden=false;status('Je bekijkt '+apps.data.length+' aanvragen. Alleen beheerders kunnen wijzigingen opslaan.');
}
async function init(){
 if(!window.supabase){status('De beveiligde verbinding kon niet worden geladen.');return}
 db=window.supabase.createClient(URL,KEY);
 const auth=await db.auth.getUser();
 if(auth.error||!auth.data?.user){status('Log eerst in met een beheeraccount.');return}
 const user=auth.data.user;
 const member=await db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
 if(member.error||!member.data){status('Geen toegang. Alleen een beheerder kan aanvragen beoordelen.');return}
 adminId=user.id;await show();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void init().catch(()=>status('De maker-aanvragen kunnen nu niet worden geladen.')));
else void init().catch(()=>status('De maker-aanvragen kunnen nu niet worden geladen.'));
})();