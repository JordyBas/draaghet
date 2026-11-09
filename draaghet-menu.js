/* DRAAGHET. | Global navigation, account entry and common footer */
(function(){
 const URL='https://rjnogcommtnxalzqrsmx.supabase.co';
 const KEY='sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc';
 function elem(tag,cls,value){const x=document.createElement(tag);if(cls)x.className=cls;if(value!==undefined)x.textContent=value;return x}
 function addStyle(){
  if(document.querySelector('link[data-dh-shell]'))return;
  const link=elem('link');link.rel='stylesheet';link.href='draaghet-site.css?v=1';link.dataset.dhShell='1';document.head.append(link);
 }
 function buildNavigation(){
  const root=document.getElementById('navlinks');if(!root)return;
  root.replaceChildren();root.classList.add('dh-navigation');root.dataset.draaghetMenuReady='true';
  const groups=[
   {label:'SHOP',href:'shirts.html',items:[['Alle kleding','shirts.html'],['Sarcasme','categorie.html?categorie=sarcasme'],['Flauwe humor','categorie.html?categorie=flauwe-humor'],['Woordgrappen','categorie.html?categorie=woordgrappen'],['Kerst','categorie.html?categorie=kerst']]},
   {label:'BESTSELLERS',href:'categorie.html?lijst=bestsellers'},
   {label:'MAKERS',href:'makers.html',items:[['Ontdek de makers','makers.html'],['Hoe werkt het?','maker-worden.html'],['Makers Studio','idee.html'],['Mijn Makers Dashboard','makers-dashboard.html']]},
   {label:'OVER ONS',href:'verhaal.html'},
   {label:'CONTACT',href:'contact.html'}
  ];
  const toggles=[];
  function close(except){for(const t of toggles){if(t===except)continue;t.setAttribute('aria-expanded','false');t.nextElementSibling.hidden=true}}
  for(const g of groups){
   if(!g.items){const a=elem('a','dh-direct',g.label);a.href=g.href;root.append(a);continue;}
   const wrap=elem('div','dh-navgroup');
   const anchor=elem('a','',g.label);anchor.href=g.href;
   const button=elem('button');button.type='button';button.setAttribute('aria-label',g.label+' submenu openen');button.setAttribute('aria-expanded','false');
   const sub=elem('div','dh-submenu');sub.hidden=true;sub.id='dh-sub-'+g.label.toLowerCase().replace(/\W+/g,'-');button.setAttribute('aria-controls',sub.id);
   for(const [name,href] of g.items){const a=elem('a','',name);a.href=href;sub.append(a);}
   wrap.append(anchor,button,sub);root.append(wrap);toggles.push(button);
   button.onclick=()=>{const open=button.getAttribute('aria-expanded')!=='true';close(button);button.setAttribute('aria-expanded',String(open));sub.hidden=!open};
  }
  const mobile=elem('a','dh-mobile-only dh-direct','MIJN ACCOUNT');mobile.href='account.html';root.append(mobile);
  root.addEventListener('click',e=>{if(e.target.closest('a')){root.classList.remove('open');document.getElementById('mobilemenu')?.setAttribute('aria-expanded','false');close()}});
  document.addEventListener('click',e=>{if(!root.contains(e.target))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 }
 function buildFooter(){
  const old=document.querySelector('footer');
  const footer=elem('footer','dh-footer');footer.setAttribute('aria-label','Website-informatie');
  const inner=elem('div','dh-footer-inner'),top=elem('div','dh-footer-top');
  const brand=elem('div'),h=elem('h2');
  h.append(document.createTextNode('DRAAGHET'),elem('span','dh-footer-branddot','.'));brand.append(h);
  brand.append(elem('p','dh-footer-lead','Kleding met humor, speciaal voor jou bedrukt. DRAAGHET is een concept van CustomM8.'));
  top.append(brand);
  function column(heading,links){
   const col=elem('div');col.append(elem('h3','',heading));const list=elem('div','dh-footer-links');
   for(const [label,href] of links){const a=elem('a','',label);a.href=href;list.append(a)}
   col.append(list);top.append(col);
  }
  column('ONTDEKKEN',[['Shop','shirts.html'],['Bestsellers','categorie.html?lijst=bestsellers'],['Makers','makers.html'],['Ons verhaal','verhaal.html']]);
  column('HULP & INFORMATIE',[['Contact','contact.html'],['Veelgestelde vragen','veelgestelde-vragen.html'],['Verzending & verwerking','verzending.html'],['Inzendvoorwaarden','inzendvoorwaarden.html']]);
  column('JOUW DRAAGHET',[['Mijn account','account.html'],['Mijn bestellingen','mijn-bestellingen.html'],['Makers Studio','idee.html'],['Makers Dashboard','makers-dashboard.html']]);
  const bottom=elem('div','dh-footer-bottom');
  bottom.append(elem('span','','© 2026 DRAAGHET · Onderdeel van CustomM8 · Nederland'));
  const small=elem('div','dh-footer-smalllinks');
  const contact=elem('a','','info@custom-m8.com');contact.href='mailto:info@custom-m8.com';small.append(contact);
  const help=elem('a','','Contact');help.href='contact.html';small.append(help);
  bottom.append(small);
  inner.append(top,bottom);footer.append(inner);if(old)old.replaceWith(footer);else document.body.append(footer);
 }
 async function buildAccount(){
  const nav=document.querySelector('.navright');if(!nav)return;
  for(const old of nav.querySelectorAll('.member-menu,.dh-account-menu'))old.remove();
  const original=nav.querySelector('.account-nav-link');
  const sdk=window.supabase;
  if(!original||!sdk)return;
  const db=sdk.createClient(URL,KEY);
  const menu=elem('div','dh-account-menu');menu.hidden=true;
  const trigger=elem('button','dh-account-trigger','MIJN ACCOUNT');trigger.type='button';trigger.setAttribute('aria-expanded','false');
  const dropdown=elem('div','dh-account-dropdown');dropdown.hidden=true;
  const links=[['Overzicht','mijn-overzicht.html'],['Bestellingen','mijn-bestellingen.html'],['Mijn gegevens','mijn-gegevens.html'],['Makers Dashboard','makers-dashboard.html']];
  for(const [label,href] of links){const a=elem('a','',label);a.href=href;dropdown.append(a)}
  const adminLink=elem('a','','Beheer DRAAGHET');adminLink.href='beheer.html';adminLink.hidden=true;dropdown.append(adminLink);
  const logout=elem('button','','UITLOGGEN');logout.type='button';logout.onclick=async()=>{await db.auth.signOut();location.href='account.html'};dropdown.append(logout);
  menu.append(trigger,dropdown);original.insertAdjacentElement('afterend',menu);
  trigger.onclick=()=>{const opened=dropdown.hidden;dropdown.hidden=!opened;trigger.setAttribute('aria-expanded',String(opened))};
  document.addEventListener('click',e=>{if(!menu.contains(e.target)){dropdown.hidden=true;trigger.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){dropdown.hidden=true;trigger.setAttribute('aria-expanded','false')}});
  let req=0;
  async function render(user){
   const version=++req;
   original.hidden=!!user;
   original.style.setProperty('display',user?'none':'inline-flex','important');
   menu.hidden=!user;
   dropdown.hidden=true;trigger.setAttribute('aria-expanded','false');
   if(!user)return;
   const {data,error}=await db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
   if(version!==req)return;
   adminLink.hidden=!!error||!data;
  }
  const {data}=await db.auth.getUser();
  void render(data?.user||null);
  db.auth.onAuthStateChange((_event,session)=>void render(session?.user||null));
 }
 function init(){addStyle();buildNavigation();buildFooter();void buildAccount()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();