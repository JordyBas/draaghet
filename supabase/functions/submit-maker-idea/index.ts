import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

/**
 * DRAAGHET. maker submission API.
 * Intentionally gated server-side until legal terms and file safety are approved.
 * All write operations use the server-held service key only after verifying a real
 * logged-in, email-confirmed user and the server-only release flag.
 */
const originList = new Set(['https://jordybas.github.io','https://draaghet.nl','https://www.draaghet.nl']);
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 3;
const categories = new Set(['sarcasme','flauwe-humor','woordgrappen','kerst','overig']);
const LIMIT_BYTES = 34 * 1024 * 1024;
const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin && originList.has(origin) ? origin : 'https://jordybas.github.io',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
});
const answer = (origin: string | null, status: number, code: string, message: string, extra = {}) =>
  new Response(JSON.stringify({ ok: status >= 200 && status < 300, code, message, ...extra }),{
    status, headers: { ...cors(origin), 'Content-Type': 'application/json; charset=utf-8','Cache-Control':'no-store' }
  });
function uuid(value: string){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);}
function detectType(bytes: Uint8Array, name: string){
  const lower = name.toLowerCase();
  const png = [137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v);
  if(png && lower.endsWith('.png') && bytes.length>=24) return {mime:'image/png',ext:'png'};
  const jpg = bytes.length>=4 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255 && bytes[bytes.length-2]===255 && bytes[bytes.length-1]===217;
  if(jpg && /\.jpe?g$/.test(lower)) return {mime:'image/jpeg',ext:'jpg'};
  const pdf = bytes.length>=8 && [37,80,68,70,45].every((v,i)=>bytes[i]===v);
  if(pdf && lower.endsWith('.pdf')){
    // Reject known active PDF constructs; this is not a malware scanner.
    const raw = new TextDecoder('latin1').decode(bytes);
    if(/\/(JavaScript|JS|Launch|EmbeddedFile|OpenAction|AA)\b/i.test(raw)) return null;
    return {mime:'application/pdf',ext:'pdf'};
  }
  return null;
}
Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});
  if(req.method!=='POST')return answer(origin,405,'METHOD','Alleen POST is toegestaan.');
  if(origin && !originList.has(origin))return answer(origin,403,'ORIGIN','Ongeldige websiteherkomst.');
  const bearer = req.headers.get('authorization') || '';
  if(!bearer.startsWith('Bearer '))return answer(origin,401,'AUTH','Log in voordat je een idee instuurt.');
  const url=Deno.env.get('SUPABASE_URL');
  const serviceKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!url||!serviceKey)return answer(origin,503,'CONFIG','De verwerking is tijdelijk niet beschikbaar.');
  const admin=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:{user},error:userError}=await admin.auth.getUser(bearer.slice(7));
  if(userError||!user||!user.email_confirmed_at)return answer(origin,401,'AUTH','Log eerst in en bevestig je e-mailadres.');
  const {data:configuration,error:configError}=await admin.from('maker_studio_settings').select('submissions_enabled,terms_version').eq('singleton',true).single();
  if(configError||!configuration)return answer(origin,503,'CONFIG','De Makers Studio is tijdelijk niet beschikbaar.');
  if(!configuration.submissions_enabled)return answer(origin,423,'NOT_OPEN','Inzenden gaat open zodra alle voorwaarden en veiligheidstests zijn afgerond.');
  const declaredSize=Number(req.headers.get('content-length')||'0');
  if(declaredSize>LIMIT_BYTES)return answer(origin,413,'TOO_LARGE','De bestanden zijn samen te groot.');
  let form: FormData;
  try {form=await req.formData();} catch{return answer(origin,400,'BODY','Het formulier kon niet worden gelezen.');}
  const title=String(form.get('title')||'').trim();
  const description=String(form.get('description')||'').trim();
  const category=String(form.get('category')||'');
  const terms=String(form.get('terms_version')||'');
  const age=String(form.get('adult_confirmed')||'')==='true';
  const termsConfirmed=String(form.get('terms_confirmed')||'')==='true';
  const requestKey=String(form.get('submission_key')||'');
  if(!uuid(requestKey))return answer(origin,400,'KEY','Vernieuw de pagina en probeer opnieuw.');
  if(title.length<1||title.length>120||description.length<1||description.length>5000)return answer(origin,400,'FIELDS','Vul een geldige naam en omschrijving in.');
  if(!categories.has(category))return answer(origin,400,'CATEGORY','Kies een geldige categorie.');
  if(!age||!termsConfirmed||terms!==configuration.terms_version)return answer(origin,400,'CONSENT','Bevestig je leeftijd en de actuele inzendvoorwaarden.');
  const uploads=form.getAll('files');
  if(uploads.length>MAX_FILES||uploads.some(f=>!(f instanceof File)))return answer(origin,400,'FILES','Voeg maximaal 3 geldige bestanden toe.');
  const checked: Array<{name:string,bytes:Uint8Array,mime:string,ext:string,sha256:string}>=[];
  let bytesTotal=0;
  for(const item of uploads){
    const file=item as File;
    if(file.size<1||file.size>MAX_FILE_SIZE)return answer(origin,413,'FILE_SIZE','Een bestand is leeg of groter dan 10 MB.');
    bytesTotal+=file.size;
    if(bytesTotal>MAX_FILES*MAX_FILE_SIZE)return answer(origin,413,'FILE_TOTAL','De bestanden zijn samen te groot.');
    const bytes=new Uint8Array(await file.arrayBuffer());
    const type=detectType(bytes,file.name);
    if(!type||file.type!==type.mime)return answer(origin,415,'FILE_TYPE','Alleen veilige PNG-, JPG- en PDF-testbestanden worden voorlopig ondersteund.');
    const digest=await crypto.subtle.digest('SHA-256',bytes);
    const sha256=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
    checked.push({name:file.name.slice(0,180),bytes,mime:type.mime,ext:type.ext,sha256});
  }
  const {data:prior,error:priorError}=await admin.from('ideas').select('id,user_id').eq('submission_key',requestKey).maybeSingle();
  if(priorError)return answer(origin,503,'LOOKUP','De inzending kan niet worden gecontroleerd.');
  if(prior)return prior.user_id===user.id?answer(origin,200,'ALREADY_RECEIVED','Je idee is al ontvangen.',{id:prior.id}):answer(origin,409,'KEY_USED','Deze inzendcode is al gebruikt.');
  const ideaId=crypto.randomUUID();
  const {error:insertError}=await admin.from('ideas').insert({
    id:ideaId,user_id:user.id,title,description,category,terms_version:terms,
    status:'received',submission_key:requestKey
  });
  if(insertError){
    if(String(insertError.message).includes('6 ideeën'))return answer(origin,429,'LIMIT','Je hebt deze maand al zes ideeën ingestuurd.');
    if(insertError.code==='23505')return answer(origin,409,'DUPLICATE','Deze inzending wordt al verwerkt. Controleer je dashboard.');
    return answer(origin,422,'INSERT','Opslaan is niet gelukt. Probeer het opnieuw.');
  }
  const written:string[]=[];
  try {
    for(const upload of checked){
      const path=user.id+'/'+ideaId+'/'+crypto.randomUUID()+'.'+upload.ext;
      const {error:uploadError}=await admin.storage.from('maker-ideas').upload(path,upload.bytes,{
        contentType:upload.mime,upsert:false,cacheControl:'0'
      });
      if(uploadError)throw new Error('upload');
      written.push(path);
      const {error:metadataError}=await admin.from('idea_files').insert({
        idea_id:ideaId,user_id:user.id,storage_path:path,filename:upload.name,
        byte_size:upload.bytes.byteLength,mime_type:upload.mime,scan_status:'pending',file_sha256:upload.sha256
      });
      if(metadataError)throw new Error('metadata');
    }
  } catch(error){
    if(written.length)await admin.storage.from('maker-ideas').remove(written);
    await admin.from('idea_files').delete().eq('idea_id',ideaId);
    await admin.from('ideas').delete().eq('id',ideaId).eq('user_id',user.id);
    console.error('Maker submission cleanup after failed upload:',error);
    return answer(origin,503,'UPLOAD','Je idee is niet volledig verwerkt. Probeer het opnieuw of neem contact op.');
  }
  return answer(origin,201,'RECEIVED','Je idee is ontvangen en staat in jouw dashboard.',{id:ideaId});
});