# DRAAGHET | Fase 3: webshop, winkelwagen en betaalvoorbereiding
Datum: 9 november 2026
Status: voorbereide webwinkel, niet commercieel vrijgegeven.
Masterplan: DRAAGHET-MASTERPLAN.md V2.0 plus latere aanvullingen.
LET OP: het bestaande docs/fase-3-oplevering.md is een historisch verslag van een eerdere fasestructuur over de Makers Studio. Dit verslag betreft **fase 3 van het actuele masterplan**.

## Gedaan
- Productdetails bieden nu "IN PROEFWINKELWAGEN", geen live koopknop.
- Een blijvende lokale proefwinkelwagen op basis van het slugsysteem van de zes bestaande DRAAGHET-concepten.
- Aantallen verhogen/verlagen (maximum 25), verwijderen, alles legen, prijsvoorbeeld en voorbeeldgrens voor gratis verzending vanaf €75.
- Uitschuivend winkelwagenpaneel met toetsenbord-sluiten, focus en klikbare link naar aparte winkelwagen.
- Winkelwagenoverzicht als eigen pagina.
- Afrekenvoorbeeld als eigen pagina: orderoverzicht, gastoptie en accountlink. Geen persoonsgegevensinvoer, betaalvelden of werkende betaalactie.
- Indicatieve bedragen: T-shirt €24,95, sweater €39,95, hoodie €44,95; **niet definitief**.
- Nieuwe Supabase-migratie `phase3_shop_checkout_gated` toegepast: `shop_settings`, `shop_products`, `shop_variants`, `shop_orders`, `shop_order_lines`, `shop_payment_events`.
- RLS en beperkte selectrechten ingesteld. Anonieme en normale gebruikers kunnen via het publieke API-oppervlak geen bestellingen of betalingen wijzigen.
- Serverpoort: `checkout_enabled=false`, `payment_provider=null`, `shipping_cents=null`, geen gepubliceerde verkoopproducten.
- GitHub Pages-preflight uitgebreid met `scripts/check-checkout.mjs` voor prijzen, winkelwagen, toegangsbeperkingen en conceptstatus.
- Codepreflight hersteld: malformed YAML-newlines verholpen en de cart-IIFE geïnitialiseerd met de juiste window-parameter.

## Feitelijke controles
- Echt uitgevoerde JavaScript-unitchecks in een geïsoleerde omgeving: zes concepten geladen, ongeldige slug geweigerd, T-shirt €24,95, drie shirts €74,85, nog €0,15 tot €75, maximaal 25 stuks, verwijderen, gemanipuleerde onbekende slug genegeerd, hoodie €44,95.
- JavaScriptbroncode van catalogus, winkelwagen, productrenderer en afrekenoverzicht geparsed.
- Supabase SQL bevestigd: nieuwe migratie aanwezig, checkout staat uit, RLS actief, geen INSERT/UPDATE-rechten voor anon/authenticated op de shopbasistabellen.
- Supabase security advisors geraadpleegd: de server-only `shop_payment_events` heeft bewust geen publieke RLS-policy (deny-all); de bestaande melding over gelekte-wachtwoordbeveiliging blijft als afzonderlijk aandachtspunt.

## Eigen DRAAGHET merk
- Externe kledingmerknamen, modelcodes en leveranciersartikelnummers zijn verwijderd uit de publiek afgeleverde conceptcatalogus en uit zichtbare productteksten, alt-teksten en productspecificaties.
- Beschrijf verkochte kleding als DRAAGHET T-shirt/sweater/hoodie, zonder blanco leveranciersnamen.
- Productiefase: bedruk echt een DRAAGHET-neklabel, test duurzaamheid, controleer basislabels en verplichte textielinformatie. Gebruik geen ongeverifieerde claim dat het blanco kledingstuk door DRAAGHET is gefabriceerd.
- De bestaande externe beeld-URLs blijven technische productfotoreferenties; voor volledig eigen branding en onafhankelijkheid moeten definitieve goedgekeurde beeldbestanden later onder eigen beheer komen.

## Blokkers voor een echte betaalbare webshop
1. Definitieve collectie en per product de echte maten, kleuren, foto's, prijs incl. btw en marge bevestigen.
2. Betaalprovider kiezen (voorlopig te vergelijken: Stripe en Mollie); eigen zakelijk account/contract en API-credentials veilig configureren.
3. Server-side prijs-, voorraad- en verzendberekening; guest/account checkout; echte bestelgegevens alleen via veilige serverflow verwerken.
4. Gesigneerde/gevalideerde betaalwebhooks en idempotente orders, terugbetalingen en orderbevestigingsmails.
5. Verzendkosten, retouren, juridisch correcte informatie en privacyvoorwaarden afronden.
6. Alle kritieke browser-, mobiele-, betaal- en beveiligingstests uitvoeren en GitHub Pages productie-deployment daadwerkelijk controleren.
7. Pas na expliciete vrijgave `checkout_enabled=true` zetten en echte order-/betaalacties aanbieden.

## Status
**Fase 3 voorbereid en technisch geïmplementeerd tot een veilige, niet-betalende proefwinkel. Niet volledig afgerond.**
Het daadwerkelijk kunnen betalen en uitbrengen van bestellingen kan niet betrouwbaar worden opgeleverd zonder de hierboven genoemde besluiten en gegevens.

## Aanvullende verificatie: eigen merk en interne inkoop
- 16 centrale publieke HTML-/JavaScriptbestanden steekproefsgewijs gecontroleerd op namen van blanco-kledingmerken: geen treffers op de gecontroleerde leveranciersnamen.
- De zes technische leveranciers-/inkoopreferenties zijn veilig ondergebracht in Supabase schema `internal.shop_blank_sources`, niet in de publiek te downloaden productcatalogus.
- Verificatie SQL: zes bronartikelen aanwezig; zowel `anon` als `authenticated` hebben géén USAGE op `internal` en géén SELECT op die tabel. De historische artikelcodes en inkoopbron blijven dus beschikbaar voor intern beheer.
- Dit maakt de zichtbare DRAAGHET-branding los van de technische inkoopadministratie. Let op: de huidige externe foto-URLs verraden technisch de beeldhost als iemand een netwerkverzoek inspecteert; definitieve eigen studio-assets nog te regelen.

## Voorlopige betaalprovidervergelijking (9 november 2026)
- Stripe: iDEAL | Wero €0,29 per transactie bij EUR zonder conversie, volgens https://stripe.com/nl/pricing/local-payment-methods
- Mollie: iDEAL | Wero €0,32 per transactie, volgens https://www.mollie.com/nl/pricing
- Bedragen zijn momentopnames; definitieve kosten en providerkeuze vóór lancering bevestigen. Geen provider gekoppeld, gecontracteerd of geconfigureerd.
