/* DRAAGHET Makers Studio | veilige preview zes stappen.
 * Inzenden blijft gesloten totdat voorwaarden, uploadvalidatie en praktijktests zijn afgerond.
 */
(function(){
  function init(){
    const form=document.getElementById('maker-submit-form');
    if(!form||form.dataset.wizardReady)return;
    form.dataset.wizardReady='true';
    const title=form.querySelector('#idea-title');
    const description=form.querySelector('#idea-description');
    const files=form.querySelector('#idea-file');
    const age=form.querySelector('input[aria-label="Ik ben 18 jaar of ouder"]');
    const terms=form.querySelector('input[aria-label="Akkoord met inzendvoorwaarden"]');
    const submit=form.querySelector('#send-idea');
    const note=form.querySelector('.studio-note');
    // Niet via een Enter-toets of programmatische submit toch een concept-inzending opslaan.
    form.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();},true);
    submit.type='button';submit.disabled=true;submit.hidden=true;
    if(note)note.textContent='Voorvertoning: insturen gaat open zodra alle veiligheids- en voorwaardencontroles klaar zijn.';
    const category=document.createElement('select');
    category.id='idea-category';category.name='category';category.required=true;
    for(const [value,label] of [['','Selecteer een categorie'],['sarcasme','Sarcasme'],['flauwe-humor','Flauwe humor'],['woordgrappen','Woordgrappen'],['kerst','Kerst'],['overig','Overig']]){
      const option=document.createElement('option');option.value=value;option.textContent=label;category.add(option);
    }
    const categoryLabel=document.createElement('label');categoryLabel.htmlFor='idea-category';categoryLabel.textContent='KIES JE CATEGORIE';
    const fileGroup=files.closest('.studio-upload');
    const fileLabel=fileGroup.previousElementSibling;
    const titleLabel=title.previousElementSibling, descriptionLabel=description.previousElementSibling;
    const consents=Array.from(form.querySelectorAll('.studio-consent'));
    const stages=[
      {name:'Naam',heading:'Geef je idee een naam',help:'Kort, opvallend en herkenbaar.',fields:[titleLabel,title]},
      {name:'Categorie',heading:'Welke soort humor is het?',help:'Jij kiest de categorie. DRAAGHET. controleert de indeling bij publicatie.',fields:[categoryLabel,category]},
      {name:'Omschrijving',heading:'Vertel ons je idee',help:'Beschrijf wat er op het kledingstuk komt en wat het idee bijzonder maakt.',fields:[descriptionLabel,description]},
      {name:'Ontwerp',heading:'Voeg eventueel je ontwerp toe',help:'Maximaal drie PNG-, JPG- of PDF-bestanden van 10 MB. Bestandstypen worden later technisch gevalideerd.',fields:[fileLabel,fileGroup]},
      {name:'Akkoord',heading:'Verklaringen en voorwaarden',help:'Deze verklaringen zijn verplicht wanneer insturen wordt geopend.',fields:consents},
      {name:'Controle',heading:'Alles nog even nalopen',help:'Bekijk je ingevulde gegevens voordat je straks kunt inzenden.',fields:[]}
    ];
    const progress=document.createElement('div');progress.className='dh-wizard-progress';progress.setAttribute('aria-live','polite');
    const track=document.createElement('div');track.className='dh-wizard-track';const fill=document.createElement('div');track.append(fill);
    const stageBox=document.createElement('div');stageBox.className='dh-wizard-steps';
    const review=document.createElement('div');review.className='dh-review';
    for(const stage of stages){
      const section=document.createElement('section');section.className='dh-step';section.hidden=true;
      const h=document.createElement('h4');h.textContent=stage.heading;
      const help=document.createElement('p');help.textContent=stage.help;
      section.append(h,help);
      if(stage.fields.length)for(const field of stage.fields){if(field)section.append(field);}
      else section.append(review);
      stage.section=section;stageBox.append(section);
    }
    const error=document.createElement('p');error.className='dh-form-error';error.setAttribute('role','alert');
    const actions=document.createElement('div');actions.className='dh-wizard-actions';
    const back=document.createElement('button');back.type='button';back.className='dh-back';back.textContent='VORIGE';
    const next=document.createElement('button');next.type='button';next.className='dh-next';next.textContent='VOLGENDE';
    actions.append(back,next);
    form.prepend(progress,track,stageBox,error,actions);
    let position=0;
    function reviewContent(){
      const data=[
        ['Naam',title.value.trim()||'Nog niet ingevuld'],
        ['Categorie',category.selectedOptions[0]?.textContent||'Nog niet gekozen'],
        ['Omschrijving',description.value.trim()||'Nog niet ingevuld'],
        ['Bestanden',files.files?.length?[...files.files].map(f=>f.name).join(', '):'Geen bestand'],
        ['18+-verklaring',age.checked?'Aangevinkt':'Niet aangevinkt'],
        ['Inzendvoorwaarden',terms.checked?'Aangevinkt':'Niet aangevinkt']
      ];
      review.replaceChildren();
      const dl=document.createElement('dl');
      for(const [term,value] of data){const pair=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=term;dd.textContent=value;pair.append(dt,dd);dl.append(pair);}
      review.append(dl);
      const warning=document.createElement('p');warning.className='dh-warning';warning.textContent='Dit is een voorvertoning. Je inzending is nog niet verzonden of opgeslagen. We openen inzendingen pas zodra de voorwaarden en technische controles zijn afgerond.';review.append(warning);
    }
    function render(){
      progress.replaceChildren();
      const name=document.createElement('strong');name.textContent=stages[position].name;
      const fraction=document.createElement('span');fraction.textContent='STAP '+(position+1)+' VAN '+stages.length;
      progress.append(name,fraction);
      fill.style.width=((position+1)/stages.length*100)+'%';
      stages.forEach((stage,i)=>stage.section.hidden=i!==position);
      back.hidden=position===0;
      next.textContent=position===stages.length-1?'INZENDEN NOG GESLOTEN':'VOLGENDE';
      next.disabled=position===stages.length-1;
      error.textContent='';
      if(position===stages.length-1)reviewContent();
    }
    function valid(){
      if(position===0&&!title.value.trim()){error.textContent='Vul eerst een naam in.';title.focus();return false;}
      if(position===1&&!category.value){error.textContent='Kies eerst een categorie.';category.focus();return false;}
      if(position===2&&!description.value.trim()){error.textContent='Omschrijf eerst je idee.';description.focus();return false;}
      if(position===3){
        const selected=[...files.files];
        if(selected.length>3||selected.some(f=>f.size>10485760||f.size<1||!['image/png','image/jpeg','application/pdf'].includes(f.type))){
          error.textContent='Maximaal 3 PNG-, JPG- of PDF-bestanden, ieder maximaal 10 MB.';files.focus();return false;
        }
      }
      if(position===4&&(!age.checked||!terms.checked)){error.textContent='Bevestig je leeftijd en de inzendvoorwaarden.';return false;}
      return true;
    }
    back.addEventListener('click',()=>{if(position>0){position--;render();}});
    next.addEventListener('click',()=>{if(position<stages.length-1&&valid()){position++;render();}});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();