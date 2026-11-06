/* DRAAGHET. shared public navigation v1 */
(function () {
  function init() {
    const root = document.getElementById('navlinks');
    if (!root || root.dataset.draaghetMenuReady) return;
    root.dataset.draaghetMenuReady = 'true';
    const style = document.createElement('style');
    style.textContent = `
      .navlinks.dh-navigation {gap:clamp(10px,1.6vw,24px);align-items:center}
      .dh-navgroup {position:relative;display:flex;align-items:center;gap:3px}
      .dh-navgroup>a,.dh-navgroup>button,.dh-navigation>.dh-direct {font:inherit;font-size:13px;font-weight:900;white-space:nowrap;line-height:1.3}
      .dh-navgroup>button {border:0;background:none;color:inherit;padding:6px;cursor:pointer;line-height:1}
      .dh-navgroup>button:focus-visible,.dh-navigation a:focus-visible {outline:3px solid #8c8300;outline-offset:3px}
      .dh-submenu {position:absolute;top:100%;left:0;min-width:205px;padding:8px;background:#fff;color:#171717;border:1px solid #d8d5cb;box-shadow:0 12px 30px #0002;z-index:70;display:grid;gap:2px}
      .dh-submenu[hidden] {display:none!important}
      .dh-submenu a {display:block;padding:12px 13px;font:700 13px Inter,Arial,sans-serif;white-space:nowrap}
      .dh-submenu a:hover,.dh-submenu a:focus-visible {background:#f3e72b;text-decoration:none}
      .dh-navigation .dh-mobile-only {display:none}
      @media(max-width:1000px) {
        .navlinks.dh-navigation {display:none;position:absolute;top:100%;left:0;right:0;background:#f7f5ee;padding:18px 22px;flex-direction:column;align-items:stretch;gap:10px;max-height:calc(100vh - 66px);overflow-y:auto}
        .navlinks.dh-navigation.open {display:flex}
        .dh-navgroup {display:grid;grid-template-columns:1fr auto;border-bottom:1px solid #dedbd2;padding-bottom:7px}
        .dh-navgroup>a,.dh-navigation>.dh-direct {padding:10px 3px}
        .dh-navgroup>button {font-size:20px;min-width:44px;min-height:40px}
        .dh-submenu {position:static;grid-column:1/-1;box-shadow:none;min-width:0;width:100%;border:0;background:#efede5;padding:5px}
        .dh-navigation .dh-mobile-only {display:block}
        .mobilemenu {display:block}
      }
    `;
    document.head.append(style);
    const groups = [
      {label:'SHOP',href:'shirts.html',items:[['Alle kleding','shirts.html'],['Sarcasme','categorie.html?categorie=sarcasme'],['Flauwe humor','categorie.html?categorie=flauwe-humor'],['Woordgrappen','categorie.html?categorie=woordgrappen'],['Kerst','categorie.html?categorie=kerst']]},
      {label:'BESTSELLERS',href:'categorie.html?lijst=bestsellers',items:[['Alle bestsellers','categorie.html?lijst=bestsellers'],['Kerst','categorie.html?lijst=bestsellers&categorie=kerst'],['Sarcasme','categorie.html?lijst=bestsellers&categorie=sarcasme'],['Flauwe humor','categorie.html?lijst=bestsellers&categorie=flauwe-humor'],['Woordgrappen','categorie.html?lijst=bestsellers&categorie=woordgrappen']]},
      {label:'BESTE MAKERS',href:'makers.html',items:[['Ontdek makers','makers.html'],['Word maker','idee.html'],['Mijn inzendingen','mijn-inzendingen.html']]},
      {label:'OVER ONS',href:'verhaal.html'},
      {label:'CONTACT',href:'mailto:info@custom-m8.com?subject=DRAAGHET.%20vraag'}
    ];
    root.replaceChildren();
    root.classList.add('dh-navigation');
    const openers=[];
    const closeAll=except=>{for(const b of openers){if(b===except)continue;b.setAttribute('aria-expanded','false');b.nextElementSibling.hidden=true;}};
    for(const g of groups){
      if(!g.items){const a=document.createElement('a');a.className='dh-direct';a.href=g.href;a.textContent=g.label;root.append(a);continue;}
      const wrap=document.createElement('div');wrap.className='dh-navgroup';
      const anchor=document.createElement('a');anchor.href=g.href;anchor.textContent=g.label;
      const toggle=document.createElement('button');toggle.type='button';toggle.setAttribute('aria-label',g.label+' categorieën openen');toggle.setAttribute('aria-expanded','false');toggle.textContent='⌄';
      const submenu=document.createElement('div');submenu.className='dh-submenu';submenu.hidden=true;
      const id='dh-menu-'+g.label.toLowerCase().replace(/\s+/g,'-');submenu.id=id;toggle.setAttribute('aria-controls',id);
      for(const [label,href] of g.items){const link=document.createElement('a');link.href=href;link.textContent=label;submenu.append(link);}
      wrap.append(anchor,toggle,submenu);root.append(wrap);openers.push(toggle);
      toggle.addEventListener('click',()=>{const show=toggle.getAttribute('aria-expanded')!=='true';closeAll(toggle);toggle.setAttribute('aria-expanded',String(show));submenu.hidden=!show;});
      wrap.addEventListener('keydown',e=>{if(e.key==='Escape'){submenu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});
    }
    const account=document.createElement('a');account.href='account.html';account.className='dh-mobile-only';account.textContent='MIJN ACCOUNT';root.append(account);
    document.addEventListener('click',event=>{if(!root.contains(event.target))closeAll();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();