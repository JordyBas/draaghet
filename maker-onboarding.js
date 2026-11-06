/* DRAAGHET. Makers onboarding | Step zero of the Makers Studio.
   Every maker creates a public alias before their first idea can be submitted.
   Profiles may stay private during setup; active products always need a public profile.
*/
(function(){
const URL='https://rjnogcommtnxalzqrsmx.supabase.co';
const KEY='sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc';
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
function init(){
 const form=document.getElementById('maker-submit-form'),container=form?.parentElement;
 if(!form||!container||!window.supabase)return;
 const db=window.supabase.createClient(URL,KEY);
 const intro=make('section','maker-onboarding');
 intro.setAttribute('aria-live','polite');
 container.insertBefore(intro,form);
 const hideForm=()=>{form.hidden=true;form.setAttribute('aria-hidden','true')};
 const revealForm=()=>{form.hidden=false;form.removeAttribute('aria-hidden')};
 hideForm();
 async function begin(){
  intro.replaceChildren(make('div','maker-onboarding-kicker','EERST JE MAKERSPROFIEL'),make('h4','','Maak jouw makersnaam aan.'),make('p','','Hier begint jouw plek bij DRAAGHET. Je maakt één profiel aan voor je ideeën, ontwerpen en toekomstige verdiensten.'));
  const auth=await db.auth.getUser();
  if(auth.error||!auth.data?.user){
   const note=make('p','maker-onboarding-note','Log in of registreer je eerst. Na het inloggen kom je weer terug in de Makers Studio.');
   const a=make('a','community-btn','INLOGGEN OF REGISTREREN');
   a.href='account.html?next=idee.html';intro.append(note,a);
   return;
  }
  const user=auth.data.user;
  if(!user.email_confirmed_at){
   intro.append(make('p','maker-onboarding-note','Bevestig eerst je e-mailadres via de mail die je van ons hebt ontvangen.'));return;
  }
  const r=await db.from('maker_public_profiles').select('user_id,handle,display_name,is_public').eq('user_id',user.id).maybeSingle();
  if(r.error){intro.append(make('p','maker-onboarding-error','Je makersprofiel kon niet worden geladen. Ververs de pagina.'));return;}
  if(r.data){
    intro.classList.add('maker-onboarding-done');
    intro.replaceChildren();
    const top=make('div','maker-onboarding-ready');
    top.append(make('span','maker-ready-icon','✓'));
    const details=make('div','maker-onboarding-ready-text');
    details.append(make('strong','','JOUW MAKERSPROFIEL IS KLAAR'),make('p','','Je gaat verder als '+r.data.display_name+'. '+(r.data.is_public?'Je makersprofiel is openbaar.':'Je makersprofiel is nog privé. Voor verkoop van geselecteerde kleding moet het openbaar zijn.')));
    top.append(details);intro.append(top);
    const links=make('div','maker-onboarding-links');
    const dashboard=make('a','maker-onboarding-link','MIJN MAKERS DASHBOARD');dashboard.href='makers-dashboard.html';
    const edit=make('a','maker-onboarding-link','PROFIEL BEWERKEN');edit.href='mijn-makerprofiel.html';
    links.append(dashboard,edit);intro.append(links);
    revealForm();return;
  }
  const note=make('p','maker-onboarding-note','Kies een herkenbare makersnaam. Je hoeft je echte naam niet te gebruiken. Je adres, e-mailadres en andere accountgegevens blijven privé.');
  intro.append(note);
  const editor=make('form','maker-onboarding-form');editor.noValidate=true;
  const label=(id,text)=>{const e=make('label','',text);e.htmlFor=id;return e};
  const name=make('input','');name.id='new-maker-name';name.maxLength=60;name.required=true;name.placeholder='Bijvoorbeeld: De Woordgrappenmaker';
  const handle=make('input','');handle.id='new-maker-handle';handle.maxLength=30;handle.required=true;handle.placeholder='de_woordgrappenmaker';handle.autocapitalize='off';
  const bio=make('textarea','');bio.id='new-maker-bio';bio.maxLength=360;bio.rows=3;bio.placeholder='Vertel kort iets over jouw humor en ideeën (optioneel)';
  const publicChoice=make('label','maker-onboarding-public');
  const checkbox=make('input','');checkbox.type='checkbox';checkbox.id='new-maker-public';
  const explain=make('span','','Maak mijn makersprofiel openbaar. Andere bezoekers kunnen dan mijn makersnaam en beschrijving zien, mij volgen en een like geven. Ik kan dit later aanpassen zolang ik geen actieve producten heb.');
  publicChoice.append(checkbox,explain);
  const info=make('p','maker-onboarding-help','Je kunt ook privé beginnen. Zodra een ontwerp van jou in de shop komt, moet jouw makersprofiel openbaar zijn zodat klanten de bedenker kunnen zien. Jij gebruikt daarvoor je gekozen makersnaam.');
  const error=make('p','maker-onboarding-error','');error.setAttribute('role','alert');
  const save=make('button','community-btn yellow','MAAK MIJN MAKERSPROFIEL');save.type='submit';
  editor.append(label(name.id,'JOUW OPENBARE MAKERSNAAM'),name,label(handle.id,'UNIEKE GEBRUIKERSNAAM'),handle,label(bio.id,'OVER JOUW HUMOR'),bio,publicChoice,info,error,save);
  intro.append(editor);
  editor.addEventListener('submit',async e=>{
   e.preventDefault();error.textContent='';
   const display_name=name.value.trim(),alias=handle.value.trim().toLowerCase(),description=bio.value.trim();
   if(display_name.length<2||display_name.length>60||!/^[a-z0-9][a-z0-9_-]{2,29}$/.test(alias)){
    error.textContent='Vul een makersnaam in (2 tot 60 tekens) en een geldige unieke gebruikersnaam (3 tot 30 tekens).';return;
   }
   if(description.length>360){error.textContent='Je beschrijving is te lang.';return;}
   save.disabled=true;save.textContent='PROFIEL AANMAKEN...';
   const result=await db.from('maker_public_profiles').insert({user_id:user.id,display_name,handle:alias,bio:description,is_public:checkbox.checked});
   save.disabled=false;save.textContent='MAAK MIJN MAKERSPROFIEL';
   if(result.error){
    error.textContent=result.error.code==='23505'?'Deze gebruikersnaam is al bezet. Kies een andere.':'Het aanmaken is niet gelukt. Probeer opnieuw.';return;
   }
   await begin();
  });
 }
 begin().catch(()=>{hideForm();intro.textContent='Het makersprofiel kon niet worden geladen. Ververs de pagina.';});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();