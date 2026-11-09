# DRAAGHET | Fase 5: makersbeloningen en saldo
Datum: 9 november 2026
Status: beveiligde basis geïmplementeerd, NIET vrijgegeven voor echte orders of uitbetalingen.

## Uitgevoerd
- Nieuwe database `maker_reward_product_links` voor expliciete koppeling van commercieel winkelproduct aan bestaand makerproduct. Doorlopend interne artikelbron gescheiden houden.
- Nieuwe `maker_reward_units`: één beloningsrecord per werkelijk verkochte eenheid, uniek per orderregel + volgnummer. Privé, maker ziet uitsluitend eigen records via RLS.
- Backendfunctie `credit_verified_maker_order_line(uuid)`: alleen de vertrouwde service role mag deze aanroepen, niet anonieme of gewone accounts. Controleert dat order status betaald/verwerkt/verzonden is, een geldig actief makerproduct gekoppeld is en kledingtype overeenkomt.
- Exclusieve transactielock per idee bij beloningsverwerking en uniciteit per verkochte eenheid. Bedoeld om dubbele webhooks/parallelle verwerkingen niet dubbel te belonen.
- Vanaf verkoop 26 per ontwerp verdubbelt de beloning: shirt €1→€2, sweater €1,50→€3, hoodie €2→€4. Alle kledingvarianten van hetzelfde ontwerp tellen mee. Tarief per eenheid blijft vaststaan en eerder verdiende eenheden wijzigen niet.
- Backendfunctie `reverse_maker_reward_unit(uuid,integer)`: voor een gecontroleerde retourcorrectie, éénmaal per eenheid.
- Private, alleen-lezen makerweergave `maker_reward_summary` (security-invoker, filter op auth.uid()). Teller geldige verkopen van de maker en quota 3→6 vanaf 25 geldige makerbrede verkopen.
- Pagina `mijn-verdiensten.html` vernieuwd: tarieventabel, voortgang, saldo, reeds betaald, €50 minimumbedrag en melding dat uitbetalen nog niet kan. JS `maker-rewards.js` leest de private gegevens zonder betalings- of mutatieknoppen.
- Nieuwe frontend-preflight `scripts/check-rewards.mjs` toegevoegd aan GitHub Pages checks.
- Fase 5 maakt geen echte bestellingen/uitbetalingen. Geen betaalprovider aangesloten en er zijn geen echte rewards uitgereikt.

## Technisch gecontroleerd
- SQL: op het moment van controle 0 beloningseenheden, `checkout_enabled=false` en `submissions_enabled=false`.
- `anon` en `authenticated` missen EXECUTE-rechten voor toekenning en terugdraaiing, terwijl `service_role` de backendfunctie kan aanroepen; anoniem mag beloningsgegevens niet lezen.
- De juridische, financiële en werkelijke bestellingstest is nog niet afgerond.
- De genoemde codechecks controleren bronstructuur en voorbeelden, niet een volledig end-to-end betaalproces.

## Open / blokkeert vrijgave
1. Echte beveiligde checkout, verificatie van betaalprovider/webhooks en productie-ordermapping naar makerproduct realiseren.
2. Een integratietest met echte testorders, gemengde kledingvarianten, parallelle calls, idempotentie, refunds en deels geannuleerde orders uitvoeren. Bij refunds de logica voor quota en uitbetaalde saldi expliciet vaststellen.
3. Definitieve makerslicenties, royaltycontract, fiscale behandeling en uitbetalingsfrequentie juridisch en administratief vastleggen.
4. De minimumgrens van €50 met uitbetaling aanvragen/reserveren/uitbetalen veilig server-side koppelen; nu nog NIET open.
5. Werkelijk publiceerbare producten en goedgekeurde ontwerpen koppelen aan orderlijnen voordat er royalties worden uitgekeerd.
6. Toegankelijkheids- en browsercontrole met afzonderlijke makersaccounts (saldo's mogen nooit uitlekken).
7. Het bestaande `maker_sales`-overzicht is een oudere databasis. Reconcileer deze met het nieuwe per-eenheid ledger voordat de financiële cijfers als definitief worden gemarkeerd.

## Mobiele merkkleurcorrectie
- Het centrale stylesheet `draaghet-site.css` heeft eigen kleuren voor links, menu's, filterknoppen en gekozen categorieën.
- De pagina's verwijzen naar de nieuwere `draaghet-menu.js?v=3`, die de bijgewerkte stylesheet `draaghet-site.css?v=2` laadt. 
- Een bestaande blauwe inline linkkleur in de Makers Studio is expliciet verwijderd.
- Visuele telefooncontrole (Safari/Chrome) blijft een persoonlijke eindtest.

## Algemene status
Fase 5 is een technische, uitgeschakelde beloningsbasis. Nog geen volwaardige live uitbetalingsfunctie of financieel vrijgegeven proces.

## Aanvulling: hard afgedwongen ontwerpquotum
Een database-trigger `maker_showcase_quota_before_publish` controleert vóór publicatie onder een makerbrede transactielock het aantal actieve publieke ontwerpen. Minder dan 25 geldige makerbrede verkopen betekent maximaal **3** actieve ontwerpen; vanaf 25 maximaal **6**. De teller gebruikt het afgeschermde royaltygrootboek, niet de browser. De triggerfunctie is niet rechtstreeks beschikbaar voor normale accounts. SQL-validatie bevestigt aanwezigheid van de trigger, geen frontend-uitvoerrechten en nul echte beloningseenheden.
