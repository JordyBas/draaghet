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
