# DRAAGHET. | Kritieke opleverpunten

Deze punten verzamelen we tijdens alle tien bouwfases. Na fase 10 krijgt Jordy de volledige lijst met nog openstaande zaken, naast de aparte persoonlijke testlijst. Technische veiligheidsvoorwaarden zijn verplicht voordat echte inzendingen opengaan.

## Fase 3: vereist voor vrijgave
- [ ] Definitieve inzendvoorwaarden juridisch afronden, inclusief licentie, royalties en looptijd van zes maanden.
- [ ] Privacyverklaring en bewaartermijnen vastleggen en publiceren.
- [ ] Malwarecontrole en veilige vrijgave van ontwerpbestanden afronden.
- [ ] Volledige technische integratie- en beveiligingstests uitvoeren.
- [ ] Inzendfunctie pas na goedkeuring van bovenstaande punten gecontroleerd openen.

## Verder te bewaken
- [ ] Definitieve klant- en makersmails inrichten en controleren wanneer alle processen zijn gebouwd.
- [ ] Na fase 10 een complete persoonlijke eindtestlijst presenteren uit docs/persoonlijk-testplan-en-mails.md.
- [ ] Eerder bekende waarschuwing rondom gelekte-wachtwoordbescherming opnieuw beoordelen voor lancering.

Bij nieuwe belangrijke restpunten deze lijst uitbreiden. Afvinken alleen na controle.

## Fase 4: makersprofielen en community
- [ ] Bewaak dat aanmelden als maker niet gelijkstaat aan optreden als verkoper. Maak de commerciële toestemming, rol van DRAAGHET. als verkoper en vrijwillige openbare naamsvermelding duidelijk in de definitieve voorwaarden. Leg vast hoe bij privéprofielen een anonieme bedenkervermelding werkt.
- [ ] Koppel bij fase 6 alleen daadwerkelijk goedgekeurde en gepubliceerde makerproducten aan de webshop. Koppel een makersprofiel uitsluitend openbaar als de maker hiervoor expliciet kiest; toon nooit privé-inzendingen of persoonsgegevens. Zonder openbaar profiel toont de winkel een neutrale bedenkervermelding. DRAAGHET. blijft de verkoper.
- [ ] Controleer vóór lancering hoe openbare makerprofielen omgaan met ongewenste/aanstootgevende namen, meldingen, uitschakeling en moderatie.
- [ ] Technische integratie- en autorisatietests voor het makersprofiel, openbare zichtbaarheid en privé-omschakeling afronden vóór publieke vrijgave; de persoonlijke tests blijven bewaard tot na fase 10.

## Website-overzicht en maker-aanmelding (november 2026)
- [ ] Bevestig na de laatste gebruikersbeslissing de precieze aanvraagflow: klantaccount → aanvraag maker worden → makersprofiel → interne beoordeling → toegang tot inzenden. De bestaande profielaanmaak is nog geen echte aanvraag met goedkeuring.
- [ ] Bouw maker-aanvraagstatussen en beheerdersgoedkeuring in Supabase met toegangsregels. Open geen inzendfunctie voor onbeoordeelde accounts.
- [ ] Controleer in een echte browser alle belangrijke routes: homepage, Maker worden, Makers Studio, Makers Dashboard, account, gegevens, bestellingen en openbare makerspagina, inclusief mobiele menu's en accountwissels.
- [ ] Bevestig dat de openbare makerspagina uitsluitend gepubliceerde ontwerpen toont (bij privéprofiel geen persoonsgegevens); productkoppeling volgt fase 6.
- [ ] Controleer alle bestaande accountsubpagina's op hetzelfde vereenvoudigde menu en doorverwijzing naar het centrale Makers Dashboard; verwijder oude dubbele navigatie pas nadat de nieuwe route is gecontroleerd.

## Fase 3: webshop en betaling, huidige masterplanfase
- [x] Werkende maar niet-betaalbare proefwinkelwagen met aantal, verwijderen, voorbeeldtotaal en 75-euro-grens.
- [x] Uitschuifbaar winkelwagenpaneel en aparte overzichtspagina.
- [x] Alleen leesbare checkoutdemo zonder persoonsgegevens of betaalgegevens.
- [x] Supabase-shopbasistabellen en beveiligde RLS; checkout-gate staat bewust uit.
- [ ] Definitieve producten/maatvarianten en echte prijzen incl. btw goedkeuren.
- [ ] Betaalprovider kiezen, contract/credentials regelen en veilige server-side integratie uitvoeren.
- [ ] Definitieve verzendtarieven, herroepingsregels en juridische voorwaarden afronden.
- [ ] Betalingswebhooks, geverifieerde statusupdates, gastcheckout, orders en e-mailbevestigingen volledig testen.
- [ ] Productielivegang expliciet vrijgeven; noindex van checkout/winkelwagen herzien waar relevant.
- [ ] Test geprinte DRAAGHET-neklabels met correcte materiaalsamenstelling en zonder zichtbare leverancierstekst.

## Actuele openstaande taken | vastgelegd op 9 november 2026

**Dit overzicht is de actuele voortgangslijst bij Masterplan V2.0.** De oudere secties hierboven zijn historische fasebenamingen en mogen niet zelfstandig als actuele opleverstatus worden gelezen. Vink pas af na echte verificatie. Prioriteit: P0 = blokkeert verkoop/livegang, P1 = nodig voor volledige fase-oplevering, P2 = later uitbreiden.

### Fase 1: homepage en publicatie
- [ ] **P1** Definitieve eigen hero-afbeelding plaatsen met controle van de uitsnede op desktop en mobiel.
- [ ] **P1** Echte browsercontrole op telefoon, tablet en desktop, inclusief menu's, CTA's, links, toegankelijkheid en afbeeldingen.
- [ ] **P1** GitHub Pages-build en live-deployment na de laatste wijzigingen aantoonbaar succesvol controleren.

### Fase 2: collectie, mockups en makers
- [ ] **P0** Definitieve eerste collectie selecteren en voor ieder artikel kleur, maatbereik, materiaal, pasvorm, verzorging en beschikbaarheid verifiëren.
- [ ] **P0** Werkelijke inkoop-, bedruk-, verpakking-, betaal- en verzendkosten berekenen; definitieve consumentenprijzen inclusief btw met gezonde marge vaststellen. Huidige €24,95 / €39,95 / €44,95 blijven uitsluitend indicatieve visuele prijzen.
- [ ] **P1** Eigen, goedgekeurde studioafbeeldingen voor T-shirt, sweater en hoodie maken of vastleggen; voor-, achter- en detailbeelden in uniforme stijl, zonder afhankelijkheid van externe leveranciersfoto's.
- [ ] **P1** Spartan-printontwerpen en vaste printzones visueel op echte kleding controleren; geen print over koordjes, naden of kraag, verhouding en tekstbreedte consistent.
- [ ] **P1** Productpagina's afwerken met werkende kleur- en maatvarianten, maattabellen, detailgalerij, materiaal, pasvorm en wasvoorschriften. Geen fictieve voorraad.
- [ ] **P1** Keuze B volledig realiseren: algemene webshop blijft gemengd raster van drie productkaarten; uitsluitend op openbare makersprofielen per écht goedgekeurd en gepubliceerd ontwerp T-shirt/sweater/hoodie op één rij. Huidige trio is expliciet een demo, zonder toeschrijving aan een maker.
- [ ] **P1** Productweergave, mockups en correcte prijzen in een echte browser testen, inclusief mobiele lay-out.
- [ ] **P0** Eigen DRAAGHET-neklabels werkelijk aanbrengen, productiemonsters op wasbaarheid/duurzaamheid controleren en vereiste materiaal- en herkomstinformatie intact laten. Geen blanco-kledingmerken of leveranciersnamen in zichtbare productteksten, SEO, e-mails of winkelwagen.

### Fase 3: winkelwagen, bestellen en betalingen
- [ ] **P0** Betaalprovider kiezen (Mollie/Stripe), zakelijk account activeren en actuele transactiekosten bevestigen. Geen betaalgeheimen in GitHub Pages of frontend.
- [ ] **P0** Beveiligde server-side checkout maken voor gast en account, met geldige producten, maat/kleur, voorraad, echte prijs- en verzendkostenberekening en verwerking van klantgegevens.
- [ ] **P0** Definitieve verzendtarieven, grens gratis verzending, levertijden en juridisch correcte retour-/herroepingsinformatie publiceren. De €75-grens is het afgesproken uitgangspunt.
- [ ] **P0** Gesigneerde betaalwebhooks, idempotente payment-events, betaalstatus, retouren, (gedeeltelijke) refunds, orderstatussen en transactionele e-mailbevestigingen implementeren en testen.
- [ ] **P0** Veiligheids- en integratietesten: dubbele webhooks, manipulatie van winkelwagenbedragen, sessies, mislukte betalingen, annuleringen, voorraad en mobiele betaalflow.
- [ ] **P0** Orderbevestigingsmail, klantgegevens/privacy, administratie en factuur-/btw-afhandeling afronden; echte proeftransactie uitvoeren voordat checkout wordt vrijgegeven.
- [ ] **P0** Supabase-releasepoort `shop_settings.checkout_enabled=false` behouden totdat alle bovenliggende blokkades zijn opgelost en expliciet akkoord is gegeven; echte orders en betalingen blijven dan uit.
- [ ] **P1** Live GitHub Pages- en winkelwagen-/checkoutweergave onafhankelijk testen. De bestaande proefwinkelwagen en afrekenvoorbeeld zijn geen werkende betaalcheckout.

### Fase 4 en 5: Makers Studio, rechten en beloningen
- [ ] **P0** Maker-aanmelding, interne goedkeuring, toestemming voor commerciële kledinglicentie, originele rechten en moderatie juridisch/technisch goed regelen.
- [ ] **P0** Inzendvoorwaarden en privacyverklaring juridisch controleren; voorgestelde **12 maanden** publicatie uit masterplan laten prevaleren boven oudere documenten die nog **6 maanden** vermelden, inclusief afstemming van actieve database-instellingen en bestaande rechten.
- [ ] **P0** Veilige inzending en bestandinspectie (PNG/SVG/PDF/AI conform definitieve beslissing), beveiligde opslag, uploadcontrole, account/RLS en documentatie afmaken vóór maker-inzendingen open gaan.
- [ ] **P1** Werkende koppeling tussen geselecteerde makerideeën, gepubliceerde ontwerpen, drie echte kledingvarianten op openbare makersprofielen en de webshop; privémateriaal nooit tonen.
- [ ] **P1** Makerssaldo, bonustarieven en uitbetalingen: vanaf 26e geldige verkoop **per ontwerp** dubbele bonus, minimaal €50 uitbetaling, retourcorrecties en makersquotum 3 naar 6 bij 25 geldige makersverkopen; concurrency/administratie testen.
- [ ] **P1** Onboarding, dashboards, openbare profielen en toegangsrechten met minstens drie aparte accounts end-to-end testen.

### Fase 6 t/m 9: beheer, SEO, QA en lancering
- [ ] **P1** Afgeschermd beheer afronden voor makerselectie, producten, orders, betaling, refunds, royalties en audittrail.
- [ ] **P1** SEO, metadata, sitemap, betrouwbare productdata, analytics en privacyinstellingen afwerken.
- [ ] **P0** Volledige securityaudit, RLS- en privacytests, browser-/mobiele tests, siteperformance en juridische voorwaarden afronden. De Supabase-melding voor gelekte-wachtwoordbescherming blijft een bekend aandachtspunt.
- [ ] **P0** DNS/domein, livebetalingen, eigen productfotografie, e-mails en orderafhandeling gecontroleerd lanceren. Geen gefingeerde reviews of verkopen.
- [ ] **P1** Na afronding van iedere fase een eerlijk rapport publiceren: gedaan, daadwerkelijk getest, openstaand en status.

**Werkwijze vanaf nu:** werk altijd eerst deze actuele openstaande lijst bij wanneer een taak aantoonbaar gereed is. Bewaar alle nieuwe keuzes ook in `DRAAGHET-MASTERPLAN.md`; laat oudere tegenstrijdige fase-/looptijdnotities niet leidend worden.
