# DRAAGHET | Fase 2 oplevering
Datum: 9 november 2026
Bronplan: DRAAGHET-MASTERPLAN.md (V2.0)

## Uitgevoerd
- Bestaande eerste collectie van zes concepten geïnventariseerd; artikelnummer, model, kleur en leverancier-image per concept behouden.
- Drie verschillende vroegere grafische tekststijlen en Impact-font in digitale printweergave vervangen door één centrale, schaalbare, meerregelige League Spartan/Spartan-typografische print-renderer.
- Printlocatie als vaste procentuele *digitale mockupzones* per T-shirt, sweater en hoodie, geen claims over fysieke centimeters.
- Printtekst wordt naar breedte/hoogte ingepast zonder lettervormen uit te rekken. Na laden van webfont opnieuw berekend.
- Studio productkaarten gelijk 4:5; gecentreerde kleding, rustige achtergronden en vaste conceptbadge; responsive drie/twee kolommen.
- Op homepage, shop-overzicht en productdetail dezelfde renderer/stylesheets met gewijzigde versienummers gekoppeld.
- Oud shop-filter met harde indexkoppeling verwijderd; filter wordt nu door de productrenderer op basis van het werkelijk weergegeven kledingtype afgehandeld.
- Niet-gecontroleerde maatknoppen verwijderd op conceptdetail, zodat bezoekers geen schijnbeschikbaarheid zien.
- Aanvullende productinformatie als uitklapdetails toegevoegd, en correcte concept-/leveranciersfoto-waarschuwingen.
- Automatische broncode- en productspecificatiecontrole toegevoegd aan GitHub Pages workflow.

## Geverifieerd via broncode
- Zes concepten met unieke slug en supplier-image-URL in catalogus.
- League Spartan in fontaanvraag, print-SVG en tekstfitting.
- Vaste proportionele digitale zones voor T-shirt, sweater, hoodie.
- Alle drie pagina's koppelen de v2 mockup-scripts en stylesheets.
- Shopfilter gebruikt kledingtype in plaats van oude product-index.
- Geen schijnverkoop of verzonnen prijzen; concepten blijven niet bestelbaar.
- Productcontrole is opgenomen als preflight vóór de GitHub Pages publicatiestap.

## Niet volledig bewezen / nog nodig voor commerciële afronding
- Externe kledingfoto-URL's konden niet live gecontroleerd worden (broncode bevat de bestaande leverancierslinks).
- Echte visuele browser-/screenshotcontrole op verschillende schermen en overlay-plaatsing is niet onafhankelijk uitgevoerd.
- Geen fysieke printproeven of goedgekeurde exacte printzones in centimeters.
- Geen definitieve productselectie, rechtencontrole, gevalideerde actuele inkoopprijs, verkoopprijs, beschikbaarheid of maattabel.
- Geen aanvullende officiële achter- en detailaanzichten beschikbaar; deze zijn bewust niet verzonnen.
- Succesvolle GitHub Pages build/deploy na de laatste push niet onafhankelijk bevestigd.

## Status
**Fase 2: het generieke digitale mockupsysteem en de bestaande voorbeeldcollectie zijn zo ver mogelijk geïmplementeerd. Commercieel gereed: nee; productfinalisatie en visuele/technische livevalidatie staan open.**

## Volgende
Fase 3: winkelwagen, veilige checkout, betaalprovider, verzendtarieven en betaal-/orderbevestiging. Start niet met live betalingen voordat prijzen, varianten en productspecificaties definitief gecontroleerd zijn.
