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


## Fase 4: auteursprofielen en community
**Status:** basis gebouwd, persoonlijke tests pas na fase 10 uitvoeren.
- [ ] [F4-01] Log in met testaccount en open 'Mijn makersprofiel' via het accountoverzicht en menu Beste Makers.
- [ ] [F4-02] Maak een openbaar alias, gebruikersnaam en beschrijving aan; sla eerst privé op.
- [ ] [F4-03] Controleer dat een privé makersprofiel NIET zichtbaar is in 'Beste Makers' of via een directe link voor bezoekers.
- [ ] [F4-04] Vink zelf openbaar maken aan en sla op; controleer dat het profiel direct in makersoverzicht verschijnt.
- [ ] [F4-05] Controleer of het openbare profiel uitsluitend de gekozen makersnaam, gebruikersnaam, bio en openbare statistieken toont, nooit e-mail, echte naam, telefoon, adres of privé-inzendingen.
- [ ] [F4-06] Bewerk makersnaam, gebruikersnaam en beschrijving en verifieer dat de gewijzigde gegevens correct zichtbaar zijn.
- [ ] [F4-07] Probeer een al gebruikte gebruikersnaam, een te korte gebruikersnaam en een te lange bio; controleer begrijpelijke foutmeldingen.
- [ ] [F4-08] Log in met testaccount B en volg maker A; controleer dat volgstatus en volgeraantal kloppen.
- [ ] [F4-09] Ontvolg maker A; controleer dat de volgstatus en teller weer teruggaan.
- [ ] [F4-10] Like maker A, verwijder de like en controleer de teller en het opnieuw geladen profiel.
- [ ] [F4-11] Controleer dat je je eigen profiel niet kunt volgen of liken.
- [ ] [F4-12] Controleer dat niet-ingelogde bezoekers wel openbare makers kunnen zien, maar niet kunnen volgen of liken.
- [ ] [F4-13] Maak profiel A weer privé; controleer dat profiel A niet meer openbaar zichtbaar of nieuw te volgen/liken is.
- [ ] [F4-14] Controleer dat gebruikers de privégegevens en volg-/likehistorie van andere accounts niet kunnen opvragen.
- [ ] [F4-15] Controleer op mobiel en desktop: makerskaarten, afzonderlijk profiel, knoppen, formulieren en menu.
- [ ] [F4-16] Controleer wanneer gepubliceerde makerproducten bestaan, dat uitsluitend geselecteerde en daadwerkelijk gepubliceerde ontwerpen op publieke makersprofielen verschijnen; deze productkoppeling wordt in fase 6 gebouwd.


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
