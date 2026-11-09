# DRAAGHET. | Fase 1: audit en handmatige testregistratie

Status: IN UITVOERING (9 november 2026). Dit document is de blijvende bron voor nog uit te voeren controles. Vink alleen af na bewijs. Geen domeinkoppeling voor definitieve goedkeuring.

## Bevestigd via directe inspectie
- [x] GitHub repository JordyBas/draaghet bereikbaar, hoofdbranch main.
- [x] Supabase-project DRAAGHET. actief.
- [x] Public tabellen met RLS ingeschakeld, waaronder profiles, ideas, idea_files, customer_profiles, admin_users, maker_products, maker_sales, maker_payouts, maker_public_profiles.
- [x] RLS-policies bekeken: eigen accountgegevens, eigen makersverkopen en eigen uitbetalingen worden via auth.uid() afgeschermd; beheerders hebben aanvullende leesrechten.
- [ ] RLS daadwerkelijk getest met verschillende gebruikersrollen. Policy-inspectie alleen is niet voldoende.
- [ ] Websitecode en hostingstructuur in kaart gebracht. GitHub code search gaf geen resultaten en veelvoorkomende bestandslocaties waren niet aanwezig.

## Door onszelf handmatig te testen (bewijs bewaren)
| ID | Test | Verwachte uitkomst | Status | Bewijs / datum |
|---|---|---|---|---|
| F1-01 | Nieuwe klant registreren | Account aangemaakt, verificatie vereist | OPEN | |
| F1-02 | E-mail bevestigen en inloggen | Alleen juiste gebruiker krijgt toegang | OPEN | |
| F1-03 | Uitloggen en sessie vernieuwen | Privégegevens niet toegankelijk na uitloggen | OPEN | |
| F1-04 | Wachtwoord resetten | Geldige reset, geen accountlek | OPEN | |
| F1-05 | Maker A probeert data van maker B te lezen | Toegang geweigerd | OPEN | |
| F1-06 | Maker A probeert verkopen/uitbetalingen aan te passen | Schrijfactie geweigerd | OPEN | |
| F1-07 | Niet-beheerder opent beheeromgeving | Geen toegang | OPEN | |
| F1-08 | Beheerder beoordeelt idee | Alleen bevoegde beheerder kan status wijzigen | OPEN | |
| F1-09 | Upload zonder rechten en verboden bestand | Veilig geweigerd | OPEN | |
| F1-10 | Website op mobiel en desktop | Geen kritieke fouten | OPEN | |
| F1-11 | Productieomgeving: secrets, logs en foutmeldingen | Geen gevoelige gegevens blootgesteld | OPEN | |

## Nog te onderzoeken / blokkades
- Supabase Security Advisor: 'Leaked Password Protection Disabled'. Bekende beperking; niet als opgelost markeren. Referentie: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
- Database bevat voorbereide tabellen voor royalty's en makersverkopen; volledige betalings- en referral-integratie is nog NIET aangetoond.
- Testaccounts en live registratie niet getest.
- GitHub bestandsstructuur nog niet vastgesteld.
- Domein pas koppelen na alle fases, eindtests en expliciete toestemming.

## Regels
1. Bewaar elke handmatige test met datum, tester, verwacht resultaat, werkelijk resultaat en eventueel screenshot (zonder persoonsgegevens).
2. OPEN -> GESLAAGD alleen na uitvoering; anders GEBLOKKEERD of MISLUKT.
3. Nooit live persoonsgegevens of wachtwoorden in dit document opnemen.
4. Geen Lovable-credits gebruiken.

## Hero-afbeelding: verplicht responsief acceptatiecriterium
- Gekozen beeld: lachende vriendengroep op terras, zonder prints op kleding.
- Desktop asset: draaghet-hero-desktop.webp (1774 x 887). Mobiel asset: draaghet-hero-mobiel.webp (709 x 887). Assets zijn nog NIET in GitHub gepubliceerd.
- [ ] Gebruik responsive picture/srcset en object-position per breakpoint; behoud beeldverhouding en voorkom vervorming.
- [ ] Controleer op 320, 375, 390, 430, 768, 1024, 1280, 1440 en 1920 px; zowel staand als liggend waar relevant.
- [ ] Geen afgesneden gezichten, geen tekst of knoppen over gezichten; CTA volledig zichtbaar.
- [ ] Controleer laadsnelheid, bestandsgrootte, CLS en alt-tekst.
- [ ] Bewaar screenshots per schermklasse, resultaat, datum en eventuele correcties.
- [ ] Publiceer pas na akkoord op testomgeving; domein blijft ongekoppeld.

## Homepage publicatiepoort (9 november 2026)
- [x] Homepage teksten: nadruk op shop; makersmogelijkheden subtiel achter account.
- [x] Homepage responsive CSS toegevoegd voor 390px, 700px, 1024px en ultrabreed (codecontrole, geen visuele test).
- [x] Bestaan van interne doelpagina's bevestigd via GitHub: shirts, favorieten, verhaal, idee, account, winkelwagen, product, categorie.
- [ ] Geselecteerde hero desktop- en mobiel-WebP bestanden naar repository uploaden. Beschikbaar als gesprekbestanden, maar connector ondersteunt geen lokale binaire bestandsupload.
- [ ] Geselecteerde hero in HTML koppelen met picture/source of gelijkwaardige responsive techniek; huidige Unsplash-placeholder moet verdwijnen.
- [ ] Visuele tests op 320/375/390/430/768/1024/1280/1440/1920px en liggend; screenshots en fixes vastleggen.
- [ ] Productpresentatie: conceptmockups vervangen door definitieve productfoto's en productinformatie vóór livegang.
- [ ] End-to-end kliktests: accountaanmaak, aanmelden, winkelwagen, productdetail en checkout.
- [ ] Controle dat verkoopsuggesties, leveringsclaims en verzenddrempel kloppen met operationele inrichting.
- [ ] Expliciete goedkeuring gebruiker vóór samenvoegen naar main, publicatie of domeinkoppeling.
**Status:** NIET LIVEGEREED. Main en domein niet wijzigen.
