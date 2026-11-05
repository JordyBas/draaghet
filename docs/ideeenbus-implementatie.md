# DRAAGHET. Ideeënbus: implementatie en vrijgavecontrole

Status: IN ONTWIKKELING. **Formulier blijft uitgeschakeld tot alle gates slagen.**

## 1. Account
- Supabase Auth met bevestigde e-mail; bij submit altijd `auth.getUser()` en server-side JWT verificatie.
- Geen anonieme INSERT; user_id komt uitsluitend uit de geauthenticeerde identiteit.
- Bij uitgelogd: link naar account. Na inloggen opnieuw naar Makers Studio.
- 18+-verklaring per inzending, met vastgelegde versie en tijd; een checkbox is geen harde leeftijdsverificatie.

## 2. Formulier en bestanden
- Titel 1–120 tekens, omschrijving 1–5000 tekens.
- Optioneel maximaal 3 bestanden, elk maximaal 10 MiB.
- PNG/JPEG/PDF: controleer magic bytes, MIME, extensie en grootte aan serverzijde; scan op malware.
- SVG: behandel als onbetrouwbare actieve inhoud; alleen veilige download of gesaniteerde rasterpreview, nooit ongefilterd inline renderen.
- AI: geen browserpreview; alleen privé-download na veiligheidscontrole.
- Private Supabase Storage bucket; geen public URL. Objectpad `<auth.uid()>/<idea-id>/<random-id>`, met RLS op eigenaar.
- Opslag en database bij voorkeur via beveiligde server/Edge Function voor quota, eigenaarschap, validatie en cleanup bij mislukking.

## 3. Rechten en toestemming
- Afzonderlijke verplichte vakjes voor 18+ en voorwaarden; niet vooraf aangevinkt.
- Versie, server-timestamp, tekstversie en bewijs van acceptatie bewaren.
- **BLOKKEREND:** conceptvoorwaarden 0.2 geven nog geen definitieve commercieel bruikbare licentie. Leg vast: gebruiksgebied, duur, exclusiviteit, sublicenties, bewerkingen, intrekking/beëindiging, beloning en rapportage. Laat juridisch toetsen.
- Publiceer privacyverklaring en contactgegevens vóór opening.
- Bestaande `supabase/makers-consent-v1.sql` is een conceptmigratie; niet draaien totdat voorwaardenversie en schema zijn afgestemd.

## 4. Opslag
- Ideeën alleen door eigenaar leesbaar via RLS; status niet schrijfbaar door makers.
- Uploadmetadata in aparte `idea_files` tabel, met `idea_id`, `user_id`, `storage_path`, bestandstype, bytes, scanstatus en created_at.
- Storage read/write policies strikt op eigenaarschap; adminrechten nooit via publiek frontend of service-role key.
- Voorkom orphan files, dubbele inzendingen en limietomzeiling; auditlog voor adminacties.

## 5. Dashboard
- SELECT alleen eigen ideeën; newest-first, paginering.
- Statuswaarden: received/reviewing/selected/rejected. Laat verdiensten alleen zien als er echte geautoriseerde financiële data is.
- Bestanddownload alleen met kort geldige signed URL na autorisatie; geen publiek downloadadres.
- Gebruikersinhoud uitsluitend als tekst renderen, niet via innerHTML.

## 6. Test- en releasecheck
- Account A mag account B's ideeën niet lezen, schrijven of bestanden openen.
- Anoniem kan niets insturen of lezen; maker kan geen status aanpassen.
- Test 4 bestanden, >10 MiB, vervalste MIME, kwaadaardige SVG, ongeldige PDF, dubbelklik, netwerkonderbreking.
- Test afwijzen zonder 18+-verklaring of voorwaarden, onbevestigd e-mailadres, verlopen sessie.
- Test mobiele weergave, toetsenbord, foutmeldingen, toegankelijke statusupdates.
- Test 1000 inzendingen met paginering, geen volledige tabel in browser.
- Verifieer SQL policies en Storage policies in live Supabase met minimaal twee testaccounts; publiceer pas na succesvolle controles.

## Werkstatus
- Account Auth: eerder gebouwd; live hercontrole nodig.
- Formulier: vormgeving + ingelogd/uitgelogd indicatie gepubliceerd; submit en upload blijven uitgeschakeld.
- Dashboard: read-only basis aanwezig; live hercontrole nodig.
- Migratie, storage, Edge Function, voorwaarden en testmatrix: nog uit te voeren.
