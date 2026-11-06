# DRAAGHET. | Fase 3: Makers Studio — technische oplevering

Bijgewerkt op 6 november 2026.

## Status
**De bouw van de zesstappen-Makers Studio, de beveiligde API en de dashboardweergave is voorbereid en gepubliceerd.**
**Nog niet vrijgegeven voor echte makersinzendingen**. De server- én databasepoort staan bewust dicht. De persoonlijke eindtests worden na fase 10 uitgevoerd, conform afspraak.

## Gebouwd en gecontroleerd
- Eén geïntegreerde vormgeving, mobiel responsive, met duidelijke voortgang en terug/vooruit.
- Zes stappen: titel, humorcategorie, omschrijving, bestanden, verklaringen, overzicht.
- Categorieën: sarcasme, flauwe humor, woordgrappen, kerst en overig.
- Invoercontroles, bestandsgrootte/mimetype-controles en duidelijke foutmeldingen.
- Eindsamenvatting, verzendknop en bevestigingsscherm voor wanneer inzenden vrijgegeven wordt.
- Supabase Edge Function `submit-maker-idea` met verplichte JWT, emailverificatie, idempotency-key, validatie van magische bestandssignaturen, server-quota en opruimen na mislukte upload.
- Database-releasepoort `maker_studio_settings.submissions_enabled=false`, plus afzonderlijke verbod op rechtstreeks schrijven vanuit de browser.
- Eigen ideeën en categorieën zichtbaar in accountoverzicht en 'Mijn inzendingen'.
- Privéopslag. Uploadmetadata staat op `pending` en bestanden blijven ontoegankelijk tot een veilige beoordeling.
- Maximaal 6 inzendingen per maand; database controleert kalendermaand in Europe/Amsterdam.
- Publicatie-einddatum voor geselecteerde ontwerpen: 1 jaar na publicatie.
- GitHub-opslag van bijbehorende frontend en servercode; syntaxiscontroles van alle aangepaste inline- en externe browserscripts geslaagd.
- De nieuw ontstane security-definer-waarschuwing verholpen; resterende Supabase waarschuwing betreft bestaande instelling voor bescherming tegen gelekte wachtwoorden.

## Blokkers voor het activeren van echte inzendingen
1. Definitieve, juridisch getoetste auteurs-/licentie- en royaltyvoorwaarden. De huidige inzendvoorwaarden v0.4 zijn een concept.
2. Privacyverklaring en bijbehorende bewaartermijnen/contactgegevens vaststellen en publiceren.
3. Bestandsveiligheid finaliseren: een antimalwarescan-/beoordelingsproces voor uploads, inclusief markering `clean` of `blocked`. Tot die tijd staan bestanden op `pending` en zijn ze niet te openen. SVG en AI zijn bewust nog niet toegelaten; PNG, JPG en PDF zijn voorbereid.
4. Live integratie-, beveiligings- en browsercontroles met testaccounts nog uitvoeren. Deze mogen niet worden overgeslagen bij het daadwerkelijk openzetten.

## Release-instructie (niet nu uitvoeren)
Pas na afhandeling van alle blokkers wordt de juiste definitieve voorwaardenversie doorgevoerd en `submissions_enabled` na expliciete goedkeuring op `true` gezet. Controleer dan de Edge Function, bestanden en dashboard met testaccounts. Open de site niet stilzwijgend voor echt publiek.

## Persoonlijk testplan
Alle handmatige tests staan in `docs/persoonlijk-testplan-en-mails.md`. Jordy voert ze pas na afronding van fase 10 uit.
