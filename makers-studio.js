/* DRAAGHET. | Makers Studio fase 3
 * Eén veilige wizard, gekoppeld aan de serverfunctie submit-maker-idea.
 * Productie-inzendingen worden pas vrijgegeven met de serverinstelling.
 */
(function () {
  const SUPABASE_URL='https://rjnogcommtnxalzqrsmx.supabase.co';
  const PUBLISHABLE_KEY='sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc';
  const CATEGORIES=[
    {id:'sarcasme',title:'Sarcasme',desc:'Droge opmerkingen met een knipoog.'},
    {id:'flauwe-humor',title:'Flauwe humor',desc:'Zo slecht dat het juist goed is.'},
    {id:'woordgrappen',title:'Woordgrappen',desc:'Taal met een dubbele bodem.'},
    {id:'kerst',title:'Kerst',desc:'Voor de mooiste en ongemakkelijkste feestdagen.'},
    {id:'overig',title:'Iets anders',desc:'Past jouw grap nergens tussen?'}
  ];
  function elem(tag,cls,text){
    const n=document.createElement(tag);
    if(cls)n.className=cls;
    if(text!==undefined)n.textContent=text;
    return n;
  }
  function init(){
    const form=document.getElementById('maker-submit-form');
    if(!form||form.dataset.phase3Ready)return;
    form.dataset.phase3Ready='true';
    const gate=document.getElementById('maker-auth-gate');
    const originalSubmit=document.getElementById('send-idea');
    const originalNote=form.querySelector('.studio-note');
    const title=document.getElementById('idea-title');
    const description=document.getElementById('idea-description');
    const fileInput=document.getElementById('idea-file');
    const age=form.querySelector('input[aria-label="Ik ben 18 jaar of ouder"]');
    const consent=form.querySelector('input[aria-label="Akkoord met inzendvoorwaarden"]');
    if(!title||!description||!fileInput||!age||!consent)return;
    originalSubmit.hidden=true;originalSubmit.disabled=true;originalSubmit.type='button';
    originalNote.hidden=true;
    form.addEventListener('submit',e=>e.preventDefault(),true);
    const titleLabel=title.previousElementSibling;
    const descriptionLabel=description.previousElementSibling;
    const fileWrapper=fileInput.closest('.studio-upload');
    const fileLabel=fileWrapper.previousElementSibling;
    const consentLabels=Array.from(form.querySelectorAll('.studio-consent'));
    const categoryChoice=elem('div','dh-categories');
    categoryChoice.setAttribute('role','group');
    categoryChoice.setAttribute('aria-label','Soort humor');
    let selectedCategory='';
    const categoryButtons=[];
    for(const category of CATEGORIES){
      const button=elem('button','dh-category');
      button.type='button';button.setAttribute('aria-pressed','false');
      button.append(elem('strong','',category.title),elem('span','',category.desc));
      button.onclick=()=>{
        selectedCategory=category.id;
        categoryButtons.forEach((b,i)=>{
          const active=CATEGORIES[i].id===selectedCategory;
          b.classList.toggle('selected',active);
          b.setAttribute('aria-pressed',String(active));
        });
        error.textContent='';
      };
      categoryButtons.push(button);categoryChoice.append(button);
    }
    const fileInfo=elem('div','dh-file-list','Nog geen bestand gekozen. Een ontwerp toevoegen is optioneel.');
    fileInput.addEventListener('change',()=>{
      const names=Array.from(fileInput.files||[]).map(f=>f.name);
      fileInfo.textContent=names.length?names.join(' · '):'Nog geen bestand gekozen. Een ontwerp toevoegen is optioneel.';
      error.textContent='';
    });
    const legal=elem('p','dh-legal-note',
      'Je behoudt eventuele rechten op je eigen werk. De definitieve gebruiksrechten en uitbetalingsafspraken worden vóór opening van inzendingen vrijgegeven.');
    const review=elem('div','dh-review');
    const stages=[
      {name:'Idee',heading:'Hoe heet jouw idee?',help:'Geef je idee een korte, duidelijke titel.',fields:[titleLabel,title]},
      {name:'Humor',heading:'Welke humor past erbij?',help:'Kies de categorie die het beste bij je idee past.',fields:[categoryChoice]},
      {name:'Uitleg',heading:'Wat moet erop komen?',help:'Beschrijf de tekst of het ontwerp. Houd het lekker duidelijk.',fields:[descriptionLabel,description]},
      {name:'Bestand',heading:'Wil je een bestand toevoegen?',help:'Niet verplicht. Je kunt later ook zonder bestand een idee insturen.',fields:[fileLabel,fileWrapper,fileInfo]},
      {name:'Akkoord',heading:'Controleer de voorwaarden.',help:'Je moet minimaal 18 zijn en de voorwaarden accepteren.',fields:[...consentLabels,legal]},
      {name:'Overzicht',heading:'Klopt alles?',help:'Controleer je idee voordat je het instuurt.',fields:[review]}
    ];
    const intro=elem('p','dh-wizard-intro','Vul alleen in wat nodig is. Je kunt met Vorige stap teruggaan zonder je invoer kwijt te raken.');
    const stepNavigator=elem('ol','dh-stage-nav');
    stepNavigator.setAttribute('aria-label','Onderdelen van je idee');
    const stageItems=stages.map((stage,i)=>{
      const item=elem('li','dh-stage-nav-item',stage.name);
      item.dataset.step=String(i);
      stepNavigator.append(item);
      return item;
    });
    const header=elem('div','dh-wizard-progress');
    header.setAttribute('aria-live','polite');
    const progress=elem('div','dh-wizard-track');
    progress.setAttribute('role','progressbar');
    progress.setAttribute('aria-valuemin','1');progress.setAttribute('aria-valuemax','6');
    progress.setAttribute('aria-label','Voortgang van jouw inzending');
    const fill=elem('div','dh-wizard-track-fill');
    progress.append(fill);
    const steps=elem('div','dh-steps');
    for(let i=0;i<stages.length;i++){
      const stage=stages[i],section=elem('section','dh-step');
      section.hidden=true;section.setAttribute('aria-label','Stap '+(i+1)+': '+stage.name);
      section.append(elem('h4','',stage.heading),elem('p','dh-help',stage.help));
      for(const field of stage.fields)section.append(field);
      stage.section=section;
      steps.append(section);
    }
    const error=elem('p','dh-form-error');
    error.setAttribute('role','alert');
    const actions=elem('div','dh-wizard-actions');
    const back=elem('button','dh-back','VORIGE STAP');
    const next=elem('button','dh-next','VOLGENDE');
    back.type=next.type='button';actions.append(back,next);
    const under=elem('div','dh-under');
    const status=elem('p','dh-wizard-status','We controleren of inzenden al geopend is.');
    status.setAttribute('role','status');status.setAttribute('aria-live','polite');
    under.append(status);
    form.replaceChildren(header,progress,stepNavigator,intro,steps,error,actions,under);
    let step=0,submitting=false,release={submissions_enabled:false,terms_version:'0.4'},user=null,used=0;
    const client=window.supabase?.createClient(SUPABASE_URL,PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    let submissionKey=crypto.randomUUID();
    function describeFiles(){
      return Array.from(fileInput.files||[]).map(f=>f.name).join(' · ')||'Geen bestand toegevoegd';
    }
    function reviewData(){
      review.replaceChildren();
      const list=elem('dl','dh-review-list');
      const category=CATEGORIES.find(c=>c.id===selectedCategory);
      for(const [label,value] of [
        ['Jouw idee',title.value.trim()||'Nog niet ingevuld'],
        ['Categorie',category?.title||'Nog niet gekozen'],
        ['Omschrijving',description.value.trim()||'Nog niet ingevuld'],
        ['Bestanden',describeFiles()],
        ['Leeftijd',age.checked?'18+ bevestigd':'Niet bevestigd'],
        ['Voorwaarden',consent.checked?'Akkoord aangevinkt':'Niet bevestigd']
      ]){
        const item=elem('div','dh-review-row');
        item.append(elem('dt','',label),elem('dd','',value));list.append(item);
      }
      review.append(list);
      const notice=elem('p','dh-final-notice',
        release.submissions_enabled?'Door te verzenden verklaar je dat de gegevens correct zijn. Je ontvangt direct een bevestiging in je account.':'Voorvertoning: insturen is nog gesloten. Je kunt het volledige formulier alvast bekijken.');
      review.append(notice);
    }
    function render(){
      header.replaceChildren(elem('strong','dh-progress-label',stages[step].name),elem('span','dh-progress-count','STAP '+(step+1)+' VAN 6'));
      progress.setAttribute('aria-valuenow',String(step+1));
      fill.style.width=((step+1)*100/6)+'%';
      stages.forEach((s,i)=>{s.section.hidden=i!==step;});
      stageItems.forEach((item,i)=>{
        item.classList.toggle('active',i===step);
        item.classList.toggle('finished',i<step);
        if(i===step)item.setAttribute('aria-current','step');
        else item.removeAttribute('aria-current');
      });
      intro.textContent=step===5?'Bekijk of alles klopt. Je kunt altijd terug om iets aan te passen.':'Je vult dit stap voor stap in. Je invoer blijft staan als je teruggaat.';
      back.hidden=step===0||submitting;
      error.textContent='';
      if(step===5)reviewData();
      next.textContent=step===5?'IDEE INSTUREN':'VERDER';
      next.disabled=submitting||(step===5&&(!release.submissions_enabled||!user||used>=6));
      status.textContent=!release.submissions_enabled
        ?'We ronden de laatste veiligheids- en voorwaardencontroles af. Je kunt het formulier alvast bekijken.'
        :!user?'Log in met een bevestigd e-mailadres om je idee te versturen.'
        :used>=6?'Je hebt deze maand de limiet van 6 inzendingen bereikt.'
        :'Je hebt deze maand '+Math.max(0,6-used)+' van je 6 inzendingen over.';
    }
    function invalid(){
      error.textContent='';
      if(step===0){
        if(!title.value.trim()||title.value.trim().length>120){error.textContent='Vul een naam in van maximaal 120 tekens.';title.focus();return true;}
      }
      if(step===1&&!selectedCategory){error.textContent='Selecteer eerst een categorie.';categoryButtons[0].focus();return true;}
      if(step===2){
        if(!description.value.trim()||description.value.trim().length>5000){error.textContent='Omschrijf je idee in maximaal 5000 tekens.';description.focus();return true;}
      }
      if(step===3){
        const files=Array.from(fileInput.files||[]);
        if(files.length>3||files.some(f=>f.size<1||f.size>10485760||!['image/png','image/jpeg','application/pdf'].includes(f.type))){
          error.textContent='Kies maximaal 3 PNG-, JPG- of PDF-bestanden tot 10 MB per stuk.';fileInput.focus();return true;
        }
      }
      if(step===4&&(!age.checked||!consent.checked)){
        error.textContent='Vink de 18+-verklaring en de voorwaarden aan om verder te gaan.';
        (age.checked?consent:age).focus();return true;
      }
      return false;
    }
    async function submitIdea(){
      if(submitting||!release.submissions_enabled||!user||used>=6)return;
      if(!age.checked||!consent.checked||!selectedCategory||!title.value.trim()||!description.value.trim()){
        error.textContent='Controleer alle verplichte velden en verklaringen.';return;
      }
      submitting=true;render();
      status.textContent='Je idee wordt beveiligd verwerkt. Sluit deze pagina niet.';
      const data=new FormData();
      data.set('submission_key',submissionKey);
      data.set('title',title.value.trim());
      data.set('description',description.value.trim());
      data.set('category',selectedCategory);
      data.set('terms_version',release.terms_version);
      data.set('adult_confirmed',String(age.checked));
      data.set('terms_confirmed',String(consent.checked));
      for(const file of Array.from(fileInput.files||[]))data.append('files',file,file.name);
      try{
        const result=await client.functions.invoke('submit-maker-idea',{body:data});
        if(result.error){
          let message='De inzending is niet gelukt. Probeer het opnieuw.';
          if(result.error.context && typeof result.error.context.json==='function'){
            try{const body=await result.error.context.json();if(body?.message)message=body.message;}catch{}
          }
          throw new Error(message);
        }
        const body=result.data;
        if(!body?.ok)throw new Error(body?.message||'De verwerking is niet bevestigd.');
        used+=1;submissionKey=crypto.randomUUID();
        form.replaceChildren();
        const complete=elem('div','dh-complete');
        const check=elem('div','dh-complete-symbol','✓');
        const h=elem('h3','', 'JOUW IDEE IS BINNEN.');
        const p=elem('p','','Ontvangen! Je vindt het idee en de status nu terug in je account.');
        const link=elem('a','dh-finish-link','BEKIJK MIJN INZENDINGEN');
        link.href='mijn-inzendingen.html';
        complete.append(check,h,p,link);
        form.append(complete);
        gate.hidden=true;
      }catch(e){error.textContent=e.message||'Er is iets misgegaan.';submitting=false;render();error.textContent=e.message||'Er is iets misgegaan.';}
    }
    back.onclick=()=>{
      if(step<=0||submitting)return;
      step--;render();
      document.getElementById('maker-submit-form')?.scrollIntoView({behavior:'auto',block:'start'});
    };
    next.onclick=()=>{
      if(submitting)return;
      if(step===5){void submitIdea();return;}
      if(invalid())return;
      step++;render();
      document.getElementById('maker-submit-form')?.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    };
    async function refreshAccess(){
      if(!client){
        gate.querySelector('strong').textContent='VERBINDING NIET BESCHIKBAAR';
        gate.querySelector('p').textContent='De beveiligde verbinding kon niet worden geladen.';
        render();return;
      }
      try{
        const [{data:settings,error:settingsError},{data:auth,error:authError}]=await Promise.all([
          client.from('maker_studio_settings').select('submissions_enabled,terms_version').eq('singleton',true).single(),
          client.auth.getUser()
        ]);
        if(settingsError)throw settingsError;
        release=settings;
        user=authError?null:auth.user;
        if(user){
          const quota=await client.rpc('maker_monthly_usage');
          if(quota.error)throw quota.error;
          used=Number(quota.data)||0;
        }else used=0;
        gate.querySelector('strong').textContent=release.submissions_enabled?'JOUW MAKERS ACCOUNT':'MAKERS STUDIO IN ONTWIKKELING';
        gate.querySelector('p').textContent=release.submissions_enabled
          ?user?'Je bent ingelogd. Vul hieronder je idee in.':'Log in met een bevestigd e-mailadres om in te sturen.'
          :'Het volledige formulier staat klaar. Inzenden openen we pas na onze laatste veiligheids- en voorwaardencontroles.';
        const login=gate.querySelector('a');
        if(login)login.hidden=!!user;
        render();
      }catch(e){
        release.submissions_enabled=false;
        gate.querySelector('strong').textContent='CONTROLE NOG NIET BESCHIKBAAR';
        gate.querySelector('p').textContent='De inzendstatus kan niet worden gecontroleerd. Verzenden is daarom tijdelijk uitgeschakeld.';
        render();
      }
    }
    render();void refreshAccess();
    if(client)client.auth.onAuthStateChange(()=>{void refreshAccess();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();