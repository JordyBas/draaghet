# DRAAGHET | Fase 4 technische oplevering
Datum: 9 november 2026
Actueel masterplan: DRAAGHET-MASTERPLAN.md

## Scope
Fase 4: Makers Studio, makersprofielen, accountaanvragen en publieke presentatie. Extra verzoek: geen losse punt achter de merknaam DRAAGHET midden in lopende zinnen, en een overzichtelijkere Makers Studio.

## Gedaan
- Makers Studio volledig heringericht als rustig, responsive proces met een compacte zesdelige voortgangsnavigatie: Idee, Humor, Uitleg, Bestand, Akkoord, Overzicht.
- Dubbele slogans, lang uitgesponnen introducties, afleidende illustraties en oude losse informatievakken uit de eigenlijke Makers Studio verwijderd. Duidelijke links naar dashboard, bestaande inzendingen en uitleg toegevoegd.
- Alle oorspronkelijke vereiste formuliervelden, controles op bestandsformaat/-grootte, 18+-verklaring en voorwaarden behouden.
- Formulier bewaart invoer bij teruggaan; toont actuele stap, foutmeldingen, status en overzicht. Er wordt niets daadwerkelijk ingezonden zolang de beveiligde openstellingspoort uitstaat.
- Maker-onboarding verduidelijkt: eigen makersnaam en optionele openbare zichtbaarheid; status pending/approved/rejected/suspended zichtbaar zonder eigenaarschap van een klantaccount aan "verkoper" te verwarren.
- Nieuwe database `maker_applications` met afgeschermde status en uitsluitend admin-bevoegdheid om aanvragen goed te keuren, af te wijzen of te pauzeren. Na profielregistratie wordt een aanvraag met status pending aangemaakt.
- Directe database-inserts van makerideeën worden door een nieuwe trigger voor niet-goedgekeurde makers geblokkeerd, ook als de algemene inzendpoort later open zou worden gezet.
- De bestaande Supabase Edge Function `submit-maker-idea` naar versie 3 gebracht: controle op goedgekeurde makerstatus vóór verwerking. JWT-verificatie blijft aan.
- Adminpagina `makers-aanvragen.html` met beveiligde route, overzicht, goedkeuren/afwijzen/pauzeren; admin-only link toegevoegd aan ingelogd beheermenu.
- Makers Dashboard geeft beoordeling van de makerstatus weer en meldt wanneer inzenden nog niet is opengesteld. De oude vaste 01-04-promoblokken vervangen door nuttige vervolglinks.
- Nieuwe gecureerde `maker_showcase`-tabel: alleen zichtbaar voor echt gepubliceerde, geselecteerde makerideeën én wanneer maker expliciet openbaar is. Publicatie wordt server-side via database-trigger gecontroleerd.
- Openbaar makersprofiel haalt toekomstige goedgekeurde makerontwerpen uit `maker_showcase`; per ontwerp T-shirt, sweater en hoodie naast elkaar (keuze B). Zonder echte gepubliceerde ontwerpen wordt uitsluitend een zeer duidelijk gelabelde demonstratie getoond. Geen privé-inzendingen of originele uploads openbaar.
- Losse DRAAGHET-punt vóór werkwoorden, in samenstellingen en in veel openbare lopende teksten gecorrigeerd, met behoud van het grafische logopuntje. Centrale navigatie- en makersbestanden een nieuwe versienummering gegeven om browsercache te verversen.
- `scripts/check-makers.mjs` toegevoegd aan GitHub Pages-publicatiepreflight met broncontroles op wizard, inlog- en toestemmingspoorten, adminroute, en foutieve DRAAGHET-punctuatie.
- Bestaande fase-2-preflight aangepast aan nieuwe versies, zodat die de volgende publicatie niet onterecht tegenhoudt.

## Feitelijk getest
- JavaScript-syntaxcontrole geslaagd voor makers-studio.js, maker-onboarding.js, makers-dashboard.js, makers-community.js en maker-approval-admin.js.
- Twaalf broncontroles in de huidige implementatie gecontroleerd: zes stappen, voortgang, releasepoort, makerstatus, adminroute, publieke showcase en versienummers.
- Supabase-transactietests uitgevoerd en **teruggedraaid**:
  - Een niet-admin kon een makerprofiel aanmaken en kreeg automatisch aanvraagstatus pending.
  - Een niet-admin kon zijn eigen status niet naar approved wijzigen (nul gewijzigde rijen).
  - Een admin kon een aanvraag goedkeuren (één gewijzigde rij).
  - Na rollback bleven nul testaanvragen, nul makerprofielen en nul gepubliceerde ontwerpen achter.
- Supabase SQL-onderzoek bevestigt triggers voor aanvraagregistratie, goedkeuringspoort vóór inzending en publicatiecontrole.
- Productbetalingen en makersinzendingen gecontroleerd: `checkout_enabled=false`, `submissions_enabled=false`.

## Nog open, vóór echte publieksvrijgave
1. Inzend- en licentievoorwaarden juridisch vaststellen, inclusief 12-maandenwens versus oude actieve 6-maandenregeling en royaltyafspraken.
2. Privacyverklaring, bestandstypen en veilige antivirusscan/moderatie van uploads finaliseren; SVG/AI niet zonder volledige veilige verwerking vrijgeven.
3. Praktijktest met drie echte, gescheiden testaccounts (gast, niet-goedgekeurde maker, goedgekeurde maker/admin) en mobiele/desktop-browsertests. Dit is niet in de huidige tools onafhankelijk uitgevoerd.
4. Betrouwbare automatische koppeling van geselecteerde ontwerpinzendingen naar verkoopklare productvarianten, echte afbeeldingen en definitieve prijsinformatie. De publieke showcase is voorbereid, maar bevat momenteel nul echte makerontwerpen.
5. Controleren dat een per ongeluk openbaar gemaakte makernaam of ongepaste inhoud kan worden gemeld, gemodereerd en teruggetrokken.
6. Alle pagina's en GitHub Pages-deployment met een echte browser controleren. De live website kon met de beschikbare webweergave niet worden bevestigd.
7. De bestaande Supabase-waarschuwing omtrent gelekte wachtwoorden blijft staan en moet vóór lancering worden herbeoordeeld.

## Status
**Fase 4: technische uitvoering en geautomatiseerde beveiligingspoorten zover mogelijk afgerond. Niet volledig live-/juridisch getest en niet vrijgegeven voor echte inzendingen.**

Verander releasevlaggen pas na expliciete goedkeuring en onafhankelijke verificatie. Geen ongeverifieerde claim van volledig afgeronde productie.

## Extra publicatieveiligheid
Een latere aanvulling `phase4_unpublish_maker_designs_when_idea_revoked` sluit live makerdesigns automatisch wanneer het bronidee de status selected verliest of geen publicatiedatum meer heeft. Dit voorkomt dat eerder gepubliceerd werk zichtbaar blijft na afkeuring of intrekking. De RLS-check op het opt-in publieke makersprofiel blijft daarnaast actief.

## Afsluitende voortgang
Bronbestanden zijn naar GitHub gepusht en nieuwe URL-versies voor de Makers Studio, onboarding, dashboard en algemene navigatie zijn bijgewerkt. De automatische GitHub Pages-controles zijn uitgebreid, maar een aantoonbare succesvolle productie-deployment en echte visuele browsertest zijn nog open.
