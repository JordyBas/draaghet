# DRAAGHET. | Persoonlijk testplan en e-mailbacklog
Bijgewerkt: 6 november 2026

## Werkafspraak
**Definitieve afspraak (6 november 2026):** Jordy voert de verzamelde persoonlijke tests pas na afronding van de bouw van alle 10 fases uit. Tijdens het bouwen verzamelt en bewaart de assistent de persoonlijke testgevallen per fase, maar vraagt Jordy niet om deze tussentijds uit te voeren. Na fase 10 levert de assistent één complete, geordende en afvinkbare eindtestlijst voor alle fases, met concrete stappen en ruimte voor de resultaten. Technische en veiligheidscontroles blijven verplicht vóór het activeren van risicovolle functies en worden niet uitgesteld tot de eindtestronde.

Na elke bouwfase verzamelen we de tests die Jordy en het team zelf in de echte website met eigen testaccounts en testbestellingen moeten uitvoeren. Technische controles door de assistent zijn geen vervanging voor deze tests. Een fase krijgt pas de status 'persoonlijk getest' zodra het team de resultaten heeft bevestigd. Noteer elke mislukte test met stappen om het probleem te reproduceren. Los problemen eerst op en test opnieuw.

## Fase 1: technische basis en beveiliging
- [ ] Website openen op desktop en mobiel; navigatie en foutpagina's controleren.
- [ ] Controleren dat alleen publieke informatie zichtbaar is voor uitgelogde bezoekers.
- [ ] Bevestigen dat een gewone gebruiker geen beheerderspagina of gegevens van anderen kan bekijken.
- [ ] Eventuele beveiligingswaarschuwingen nalopen voordat de Makers Studio voor inzendingen opengaat.

## Fase 2: accounts en makersregistratie
- [ ] Nieuw klantaccount aanmaken, alle verplichte velden invullen.
- [ ] Bevestigingsmail ontvangen, link openen en succesvol inloggen.
- [ ] Gegevens in 'Mijn gegevens' controleren, bewerken, opslaan, pagina verversen en opnieuw controleren.
- [ ] Wachtwoord vergeten: herstelmail ontvangen en een nieuw wachtwoord instellen.
- [ ] Uitloggen, opnieuw inloggen en controleren of de sessie en accountgegevens kloppen.
- [ ] Vanuit Makers Studio naar inloggen en na inloggen terug naar Makers Studio.
- [ ] Twee testaccounts gebruiken: account A mag geen gegevens of inzendingen van account B zien.
- [ ] Onjuist wachtwoord, bestaand e-mailadres, ongeldige invoer en onderbroken verbinding testen.
- [ ] Alle bovenstaande acties ook op mobiel testen.

## Fase 3: Makers Studio
**Status:** bouw in ontwikkeling. Persoonlijke tests open. Test met fictieve gegevens en testbestanden; stuur nog geen echte ontwerpen in zolang de inzendfunctie niet officieel is vrijgegeven.

### Handmatig door Jordy: tijdens de eindtestronde na fase 10 (voorvertoningsfuncties)
- [ ] [F3-01] Open Makers Studio op een computer; controleer dat de vormgeving één geheel is en geen losstaande kaarten bevat.
- [ ] [F3-02] Doorloop alle 6 stappen met volgende/vorige; controleer dat de voortgangsbalk en stapnummer telkens kloppen.
- [ ] [F3-03] Test lege naam, lege categorie en lege omschrijving; volgende stap mag dan niet doorgaan en moet een duidelijke foutmelding geven.
- [ ] [F3-04] Selecteer elk van de categorieën (Sarcasme, Flauwe humor, Woordgrappen, Kerst, Overig) en controleer of de gekozen categorie correct in het eindoverzicht staat.
- [ ] [F3-05] Vul naam en omschrijving in, keer terug naar eerdere stappen en controleer of de invoer bewaard blijft.
- [ ] [F3-06] Kies een geldig testbestand en controleer de bestandsnaam in de samenvatting. Test ook 4 bestanden en een bestand boven 10 MB; doorlopen moet worden geweigerd.
- [ ] [F3-07] Controleer dat de 18+-verklaring en voorwaarden niet vooraf zijn aangevinkt en dat je zonder beide niet naar de laatste stap kunt.
- [ ] [F3-08] Controleer de laatste stap: correcte samenvatting en geen werkende verzendknop zolang de studio in preview staat.
- [ ] [F3-09] Herhaal de stappen op een telefoon; controleer leesbaarheid, geen horizontaal scrollen, invoervelden, knoppen en uitklapnavigatie.
- [ ] [F3-10] Test of de Makers Studio bereikbaar is vanuit menu 'Beste Makers' > 'Word maker' en of inloggen vanuit de Studio terugleidt naar de juiste pagina.

### Handmatig door Jordy: tijdens de eindtestronde na fase 10 (na veilige vrijgave van inzendingen)
- [ ] [F3-11] Maak met een bevestigd testaccount een complete testinzending en controleer de ontvangstbevestiging op het scherm.
- [ ] [F3-12] Controleer in Mijn inzendingen / Makers Dashboard of titel, omschrijving, categorie, datum en status correct zijn opgeslagen.
- [ ] [F3-13] Upload een toegelaten PNG/JPG/PDF-testbestand en controleer dat het privé beschikbaar is voor het juiste account; test overige bestandsformaten pas na expliciete ondersteuning.
- [ ] [F3-14] Controleer dat ongeoorloofde bestanden (verkeerd bestandstype, >10 MB, te veel bestanden) worden afgewezen met begrijpelijke foutmeldingen.
- [ ] [F3-15] Probeer direct twee keer te versturen, de pagina opnieuw te laden en de verbinding te verbreken; controleer dat geen ongewenste dubbele of halve inzending ontstaat.
- [ ] [F3-16] Controleer dat maximaal 6 ideeën per kalendermaand kunnen worden ingezonden en dat de zevende wordt geweigerd.
- [ ] [F3-17] Log in met twee testaccounts: elk ziet alleen eigen ideeën en eigen bestanden. Meld elke onverwachte toegang onmiddellijk.
- [ ] [F3-18] Controleer de ontvangstbevestiging en later de automatische e-mail zodra de e-mailflow is ingericht.

- [ ] [F3-19] Controleer dat het dashboard de gekozen humorcategorie én de juiste teller 'x van 6 deze maand' laat zien.
- [ ] [F3-20] Controleer dat geüploade bestanden niet toegankelijk zijn vóór veiligheidsgoedkeuring en pas na markering als veilig privé ingezien kunnen worden.
- [ ] [F3-21] Test het gedrag wanneer de inzendfunctie centraal wordt uitgeschakeld: geen maker mag via knop of directe aanvraag alsnog inzenden.
- [ ] [F3-22] Test een aanpassing in de definitieve voorwaardenversie: een maker moet de actuele versie actief accepteren.

**Registratie van testresultaat:** zet het vakje pas op [x] na daadwerkelijk uitvoeren; noteer bij fouten datum, apparaat, test-ID, stappen en resultaat. Een codecontrole geldt niet als persoonlijke test.

### Technisch door assistent (niet doorschuiven naar Jordy)
- Database- en Storage-RLS controleren, inclusief anonieme toegang, accountisolatie en statusrechten.
- Server-side bestandstype-/magic-bytevalidatie, scanprocedure, foutafhandeling en opruimen bij gedeeltelijk mislukte uploads inrichten en testen.
- 18+- en voorwaardenregistratie, quota, eigenaarschap en dubbele inzendingen afdwingen op server/database.
- Verificatie van beveiligingswaarschuwingen en gecontroleerde vrijgave van echte inzendingen.
- Code-/syntaxiscontroles, integratiecontroles en herstel van aangetroffen fouten.


## Fase 4: makersprofielen zonder sociale functies
**Status:** basis gebouwd; persoonlijke tests pas na fase 10.
- [ ] [F4-01] Log in met testaccount en open 'Mijn makersprofiel' vanuit de Makers Studio of het Makers Dashboard.
- [ ] [F4-02] Maak een makersnaam, gebruikersnaam en korte bio aan; sla het profiel privé op.
- [ ] [F4-03] Controleer dat privéprofielen niet verschijnen bij 'Beste Makers' en niet via een directe link voor bezoekers toegankelijk zijn.
- [ ] [F4-04] Zet het profiel bewust op openbaar en controleer dat de openbare pagina naam, gebruikersnaam en bio laat zien.
- [ ] [F4-05] Controleer dat geen e-mail, echte naam, telefoon, adres, privé-inzendingen of verdiensten openbaar worden.
- [ ] [F4-06] Bewerk makersnaam, gebruikersnaam en bio; controleer dat wijzigingen correct worden opgeslagen.
- [ ] [F4-07] Controleer foutmeldingen bij bezette gebruikersnamen, ongeldige tekens en te lange teksten.
- [ ] [F4-08] Controleer op het makersprofiel en in het makersoverzicht dat nergens volgers, likes of sociale knoppen staan.
- [ ] [F4-09] Maak het profiel opnieuw privé; controleer dat het niet meer publiek wordt getoond en dat dit de verkoop door DRAAGHET. niet blokkeert.
- [ ] [F4-10] Controleer op mobiel en desktop de overzichtspagina, profielpagina en profielbewerking.
- [ ] [F4-11] Controleer na fase 6 dat alleen door DRAAGHET. geselecteerde en gepubliceerde ontwerpen op de juiste openbare makerspagina verschijnen.
- [ ] [F4-12] Controleer dat mensen zonder makerstatus geen inzendingen of andere afgeschermde accountgegevens kunnen bekijken.

## Fase 5: royalty's en uitbetalingen
- [ ] Verdiensten per shirt/sweater/hoodie controleren aan de hand van testverkopen.
- [ ] Retouren/annuleringen en uitbetalingsstatus juist laten verwerken.
- [ ] Een maker kan alleen de eigen financiële gegevens zien.

## Fase 6: webshop en producten
- [ ] Producten, foto's, kleuren, maten en voorraadweergave testen.
- [ ] Winkelwagen op mobiel en desktop; aantallen en totaalbedrag controleren.
- [ ] Productie- en levertijdtekst nalopen.

## Fase 7: betalingen en afrekenen
- [ ] Testaankoop met én zonder account afronden.
- [ ] Betaling geslaagd, mislukt en afgebroken testen.
- [ ] Bedragen, btw, verzendkosten en orderbevestiging controleren.
- [ ] Geen bestelling dubbel verwerken bij herhaald betalen of vernieuwen.

## Fase 8: beheeromgeving
- [ ] Idee beoordelen, goedkeuren, afwijzen en publiceren.
- [ ] Alleen beheerders kunnen statussen en commerciële data wijzigen.
- [ ] Orders, gebruikers en makerbeloningen controleren; geen ongewenste toegang.

## Fase 9: huisstijl en gebruikerservaring
- [ ] Menuteksten, knoppen, spelfouten en responsive ontwerp nalopen.
- [ ] Navigatie met toetsenbord, leesbaarheid en contrast controleren.
- [ ] Feedback van proefgebruikers verwerken.

## Fase 10: eindtesten en lancering
- [ ] Volledige klantreis van registratie tot bestelling.
- [ ] Volledige makersreis van idee tot beoordeling en verdiensten.
- [ ] Veiligheids- en privacycontrole, foutmeldingen, mobiele werking.
- [ ] Alle klantmails ontvangen en inhoud controleren.
- [ ] Definitieve go/no-go voor livegang.

## E-mails na afronding bouwprocessen
Later samen teksten ontwerpen, instellen en persoonlijk testen voor:
- Welkom / accountregistratie en e-mailbevestiging.
- Wachtwoord herstellen.
- Idee ontvangen, in beoordeling, geselecteerd en afgewezen.
- Bestelling ontvangen, betaling bevestigd, productie en verzending.
- Makersverdiensten en uitbetalingsbevestiging, zodra dit echt werkt.
- Klantenservice of aanvraagontvangst, als er een aanvraagflow komt.

Let op: e-mails die wettelijk of functioneel noodzakelijk zijn voor accountaanmaak (zoals e-mailbevestiging en wachtwoordherstel) blijven tijdens fase 2 actief. De definitieve branding en inhoud komen later.

## Menubalk
Gekozen: Shop, Bestsellers, Beste Makers, Over ons, Contact, gevolgd door winkelwagen en Mijn account. Uitklapcategorieën zijn in opbouw. Controleer op de uiteindelijke website of alle links werken en de categorieën correct worden gefilterd.

## Website-overzicht en navigatie (aanvullende eindtests na fase 10)
- [ ] [UX-01] Op desktop en mobiel toont de hoofdmenubalk alleen de logische ingangen: Shop, Bestsellers, Makers, Over ons en Contact, plus account en winkelwagen.
- [ ] [UX-02] Open via Makers de pagina 'Hoe werkt het?'; controleer dat de zes stappen begrijpelijk zijn en DRAAGHET. de verkoper blijft.
- [ ] [UX-03] Klik vanaf homepage op 'Verdien met jouw idee'; controleer dat je op de uitleg voor makers komt.
- [ ] [UX-04] Log in: Mijn account biedt heldere routes voor account/bestellingen en voor het Makers Dashboard, zonder dubbele makersoverzichten.
- [ ] [UX-05] Open Mijn overzicht en controleer dat je persoonsgegevens/bestellingen gemakkelijk vindt en het Makers Dashboard één klik verder ligt.
- [ ] [UX-06] Open Makers Studio, controleer uitleg van zes inzendingen en drie selecties, navigatie naar Makers Dashboard en het serverzijdige vrijgaveslot.
- [ ] [UX-07] Open Makers Dashboard; controleer de eigen profielkaart, teller voor zes inzendingen, teller voor drie geselecteerde ideeën en laatste ideeën.
- [ ] [UX-08] Controleer dat oude volg- en likeknoppen nergens aanwezig zijn en dat openbare profielen geen privégegevens tonen.
- [ ] [UX-09] Doorloop alle routes bij een ingelogde klant zonder makersprofiel en bij een account met makersprofiel; noteer eventueel ontbrekende aanvraag-/goedkeuringsstappen.
- [ ] [UX-10] Controleer op smalle mobielbreedte dat menu, kaarten, knoppen, formulieren en foutmeldingen leesbaar blijven zonder horizontaal scrollen.

## Accountindeling vereenvoudigd (eindtests na fase 10)
- [ ] [ACC-01] Log in en open Mijn account: er zijn duidelijke ingangen naar Overzicht, Bestellingen, Mijn gegevens en Makers Dashboard, zonder dubbele menu-items.
- [ ] [ACC-02] Controleer dezelfde vier menuopties op desktop, mobiel en in de account-dropdown rechtsboven.
- [ ] [ACC-03] Open Bestellingen en Mijn gegevens en controleer de bestaande gegevens en formulieren.
- [ ] [ACC-04] Open het Makers Dashboard vanuit Mijn account; ideeën, profiel en verdiensten blijven daar bereikbaar zonder als aparte accountcategorieën te verschijnen.
- [ ] [ACC-05] Controleer dat de nog niet actieve loyaliteitspunten niet afleiden in Mijn overzicht.
- [ ] [ACC-06] Controleer oude directe links naar Mijn inzendingen en Mijn verdiensten; deze moeten blijven functioneren en geen gegevens verliezen.


## Bijgewerkt op 9 november 2026 | Persoonlijke acties en tests na de bouwfases
**Afspraak:** Verzamel deze punten tijdens elke fase. Vraag ze pas als gezamenlijke eindtest uit wanneer alle bouwfases klaar zijn, behalve strikt noodzakelijke veiligheidscontroles vóór daadwerkelijke vrijgave. Een afgevinkt technisch onderdeel betekent niet dat Jordy het visueel of in productie heeft getest.

### Huisstijl en mobiele pagina's
- [ ] Op iPhone Safari, Android Chrome en desktop controleren dat geen standaardblauwe links, filterknoppen of accountnavigatie zichtbaar zijn. Actuele kleuren: gebroken wit **#F7F5EE**, zwart **#171717**, felgeel **#F3E72B**.
- [ ] Shopfilter **Alles, T-shirts, Hoodies, Sweaters** aanraken: niet geselecteerd zwarte tekst; geselecteerd gele achtergrond met zwarte tekst. Selectie moet productoverzicht daadwerkelijk filteren.
- [ ] Mobiele hoofdmenu, makersmenu, accountmenu, productpagina's, formulieren, knoppen, ankerlinks, links in footers, categorieën en FAQ controleren op standaardblauw, leesbaarheid en correcte focus/actieve status.
- [ ] Op donkere dashboardsecties moeten links wit/licht zijn en knoppen voldoende contrast hebben, niet onleesbaar zwart.
- [ ] Controleer dat de bestaande grafische logopunt blijft staan, maar de merknaam **DRAAGHET** in doorlopende zinnen geen foutieve punt heeft.
- [ ] Werkelijke telefooncontrole van 320, 360, 390 en 430 px breed; geen horizontaal scrollen, afgebroken knoppen of slecht zichtbare kleuren. Controleer cache na het publiceren met harde verversing.

### Makers Studio en aanvraagbeheer (fase 4)
- [ ] Testaccount zonder makersprofiel: aanmelden als maker, optioneel privé/openbaar profiel, status **in beoordeling**.
- [ ] Een gewone maker kan zichzelf niet goedkeuren, andermans persoonsgegevens inzien of ongepubliceerde ontwerpen publiek maken.
- [ ] Via apart adminaccount naar **Maker-aanvragen**: aanvraag bekijken, beoordelen, afwijzen of pauzeren; status terugzien in makeraccount; rollen scheiden.
- [ ] De zes stappen in de Makers Studio doorlopen; teruggaan bewaart invoer, foutmeldingen bij lege titel/categorie/omschrijving en verkeerde bestanden, overzicht klopt.
- [ ] Inzenden blijft daadwerkelijk gesloten totdat licentie-/privacyvoorwaarden en antimalwarescan zijn goedgekeurd, ook als een maker al admin-goedgekeurd is.
- [ ] Een gepubliceerd makersontwerp toont bij openbaar profiel de juiste drie kledingvarianten zonder privégegevens; privéprofielen lekken niets.
- [ ] Test de zwarte en witte vlakken in Makers Dashboard, bijbehorende links, leesbaarheid, open/privé-omschakeling en mobiele weergave.

### Fase 5: royalties en uitbetalingen
- [ ] Bevestig per werkelijk betaald T-shirt, sweater en hoodie dat verkoop 1–25 respectievelijk €1, €1,50 en €2 oplevert.
- [ ] Per **ontwerp**, inclusief gemengde kledingvarianten, verkoop 25 = normale bonus; **verkoop 26** = het dubbele tarief. Verkoop 1–25 mag nooit met terugwerkende kracht worden verdubbeld.
- [ ] Twee gelijktijdige betalingen en dubbele webhook voor hetzelfde orderregelnummer simuleren: geen dubbel verdiende makersbeloning, geen dubbele teller.
- [ ] Alle geldige verkopen van één maker over meerdere ontwerpen optellen: tot en met 24 maximaal 3 actieve ontwerpen; vanaf 25 maximaal 6, mits juridische regels definitief zijn.
- [ ] Annulering of retour, gedeeltelijke retour en refund testen: saldo en geldige verkopen correct herberekend; een al uitbetaald bedrag mag niet stilzwijgend verdwijnen.
- [ ] Maker A ziet geen verkopen, adressen, payoutbedragen of saldo van maker B. Adminrechten afzonderlijk testen.
- [ ] Makerssaldo onderscheidt verdiend, gereserveerd, beschikbaar en uitbetaald; geen uitbetaling vóór **€50 beschikbaar saldo**, definitieve uitbetalingsfrequentie nog vaststellen.
- [ ] Test of DRAAGHET daadwerkelijk de maker kan betalen, inclusief betaalgegevens, bewijs, administratie en fiscale behandeling. Geen automatische uitbetalingen zonder definitieve voorwaarden.
- [ ] Controleer dat de nieuwste website van git naar GitHub Pages is gedeployed en dat alle gekoppelde account- en makerspagina's na nieuwe CSS-/JS-versies goed laden.

### Producten, betalingen en livegang
- [ ] Definitieve echte producten, prijzen incl. btw, maat-/kleurvarianten, eigen merklabels, materiaal, waslabels, drukproeven en productfoto's controleren.
- [ ] Betaalprovider kiezen en zakelijke betaalrekening/credentials activeren; sandbox en echte testbestellingen testen met gast- en accountcheckout.
- [ ] Verzendkosten, retourbeleid, herroepingsrecht, privacy-/licentievoorwaarden en orderbevestigingsmails juridisch en operationeel controleren.
- [ ] GitHub Pages, domein, DNS, SEO en juiste indexeringsinstellingen controleren. Echt verkopen uitsluitend na expliciet groen licht.

**Nog uit te werken met Jordy:** (1) exacte uitbetalingsfrequentie; (2) omgaan met resterend saldo bij stoppen, refunds en faillissement; (3) fiscale behandeling makersroyalties; (4) definitieve productprijzen, klanten- en inkoopmarges; (5) juridisch getoetste 12-maandenlicentie versus bestaande 6-maandenconfiguratie.
