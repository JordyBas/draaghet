/* DRAAGHET fase 5: read-only maker reward overview. No client-side payment actions. */
(async function(){
 const root=document.getElementById('linked-products');
 const status=document.getElementById('earnings-message');
 const set=(id,value)=>{const node=document.getElementById(id);if(node)node.textContent=value};
 const money=n=>new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'}).format(n/100);
 if(!window.supabase){if(status)status.textContent='Gegevens kunnen momenteel niet worden geladen.';return}
 const db=window.supabase.createClient('https://rjnogcommtnxalzqrsmx.supabase.co','sb_publishable_msSVd8n8VZDSrDzU1y0Skw_gsqEumgc');
 const auth=await db.auth.getUser();
 if(auth.error||!auth.data?.user)return;
 const uid=auth.data.user.id;
 const [summary,payouts,products,sales]=await Promise.all([
  db.from('maker_reward_summary').select('maker_id,earned_cents,reversed_cents,valid_sales,active_design_limit').eq('maker_id',uid).maybeSingle(),
  db.from('maker_payouts').select('amount_cents,status').eq('maker_id',uid),
  db.from('maker_products').select('id,title,product_type').eq('maker_id',uid),
  db.from('maker_reward_units').select('maker_product_id,status').eq('maker_id',uid)
 ]);
 if(summary.error||payouts.error||products.error||sales.error){
  if(status)status.textContent='De beveiligde verdiensteninformatie kon niet worden geladen.';
  if(root)root.textContent='Probeer het later opnieuw.';
  return;
 }
 const data=summary.data||{earned_cents:0,reversed_cents:0,valid_sales:0,active_design_limit:3};
 const paid=(payouts.data||[]).filter(p=>p.status==='paid').reduce((n,p)=>n+p.amount_cents,0);
 const reserved=(payouts.data||[]).filter(p=>p.status==='planned').reduce((n,p)=>n+p.amount_cents,0);
 const earned=Number(data.earned_cents)||0;
 const balance=Math.max(0,earned-paid-reserved);
 set('sold-count',String(data.valid_sales||0));
 set('earned-total',money(earned));
 set('paid-total',money(paid));
 set('due-total',money(balance));
 set('reward-limit',String(data.active_design_limit||3)+' ontwerpen');
 set('reward-progress',Math.min(25,Number(data.valid_sales)||0)+' / 25 geldige verkopen');
 set('reward-threshold',balance>=5000?'Vanaf €50 mogelijk zodra uitbetalingen officieel geopend zijn.':'Nog '+money(5000-balance)+' tot de minimale uitbetalingsgrens van €50.');
 if(status)status.textContent='Dit overzicht bevat alleen veilig geregistreerde beloningen. Uitbetalingen aanvragen is voorlopig niet beschikbaar.';
 if(!root)return;
 root.replaceChildren();
 const list=products.data||[];
 if(!list.length){root.textContent='Je hebt nog geen geselecteerde verkoopproducten.';return}
 for(const product of list){
  const row=document.createElement('div');row.className='earning-product';
  const name=document.createElement('strong');name.textContent=product.title;
  const qty=document.createElement('span');
  qty.textContent=(sales.data||[]).filter(u=>u.maker_product_id===product.id&&u.status==='earned').length+' geldige verkopen';
  row.append(name,qty);root.append(row);
 }
})().catch(()=>{const p=document.getElementById('earnings-message');if(p)p.textContent='Het makerssaldo kan nu niet worden geladen.'});