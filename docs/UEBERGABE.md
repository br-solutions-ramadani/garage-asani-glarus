# Garage Asani – Prüf- und Übergabeprotokoll

Stand: 18. September 2026. Technische Veröffentlichung umgesetzt; endgültige Übergabe noch von den unten aufgeführten offenen Nachweisen abhängig.

## Betrieb und Veröffentlichung

- Hauptadresse: https://garage-asani-glarus.ch/
- Quellcode: https://github.com/br-solutions-ramadani/garage-asani-glarus, Branch `main`.
- Hosting: Cloudflare Worker `garage-asani-glarus`, GitHub-Verbindung durch erfolgreichen Cloudflare-Build nachgewiesen.
- DNS: `joaquin.ns.cloudflare.com`, `ruth.ns.cloudflare.com`. Domainregistrierung bleibt bei GoDaddy.
- Ausgangspunkt der Datenschutzergänzung: Commit `56654a2cc0f7c342e77ef365a7758e6a331d9296`, Release `20260918-3`; Cloudflare-Build erfolgreich. Die damals abschliessend geänderten 15 Seiten-/CSS-Dateien wurden bytegleich mit der Live-Version geprüft.
- Datenschutzergänzung, Release `20260918-4`: Anbieterinformationen, direkte Auskunfts-/Löschkontakte und Betriebsablauf ergänzt. Vier Worker-Tests sowie HTML-Anker und Mailto-Ziele vor Veröffentlichung erfolgreich geprüft. Den zugehörigen Cloudflare-Build und den Live-Inhalt nach Veröffentlichung separat kontrollieren.
- Öffentliche Kontaktadresse bleibt `garage.asani@gmx.ch`. Keine neue Domain-Mail eingerichtet.
- Website-Code enthält keine Datenbank, Anmeldung, Zahlung oder administrative Schreibfunktion. Formulare gehen per HTTPS an FormSubmit und von dort an GMX.

## Durchgeführte Korrekturen

- HTTPS, www und workers.dev werden serverseitig auf die Hauptdomain weitergeleitet. Pfad und Suchparameter bleiben erhalten.
- Sicherheitsheader: HSTS, Content Security Policy, X-Frame-Options, nosniff, Referrer-Policy und Permissions-Policy.
- Nur öffentliche Website-Dateien werden als Assets hochgeladen. Servercode, Tests, Dokumentation, Konfiguration und versteckte Dateien sind gesperrt.
- Statische Dateien werden neu validiert; CSS/JS tragen eine Versionskennung. Der alte Service Worker und Cache-Namen dieser Website werden beim nächsten Besuch entfernt. Bereits geöffnete Tabs müssen neu geladen werden. Fremde Browsercaches lassen sich nicht zentral löschen.
- Formular-Rücksprung, Canonical-URLs, OpenGraph und Sitemap verwenden die eigene Domain. Die Bestätigungsseite behauptet keinen nachgewiesenen Mail-Eingang.
- Fahrzeugdaten und Telefon sind freiwillig; Feldlängen begrenzt. Datenschutzhinweis und unverbindlicher Charakter einer Anfrage sind sichtbar.
- Cookie-Hinweis beschreibt nur tatsächlich verwendete Funktionen; fiktive Analyse-/Marketingauswahl entfernt. Bestätigung lokal maximal 180 Tage.
- Sprunglink, Fokusdarstellung, Escape-Bedienung des Menüs, grössere Bedienflächen, 16px-Formularschrift und Bewegungspause ergänzt. Reduzierte Bewegung wird berücksichtigt.
- Unbelegtes zugeschriebenes Zitat und nicht belegte Berufserfahrungszahl entfernt. Rechtstexte an tatsächliches Hosting angepasst.

## Nachgewiesene Prüfungen

- 30 öffentliche URLs mit HTTP 200 und erfolgreicher TLS-Zertifikatsprüfung. Darunter alle regulären HTML-Seiten, CSS, JavaScript, Bilder, Sitemap und robots.txt.
- 29 Dateien beim Download bytegleich mit dem geprüften Projektstand. robots.txt enthält zusätzlich Cloudflares verwaltete Bot-Regeln; eigener Sitemap-Eintrag bleibt vorhanden.
- Live geprüft: HTTP → HTTPS (308), www → Hauptdomain (308), workers.dev → Hauptdomain (308), index.html und alte Fahrzeugseite → Startseite (301).
- Interner Worker-Code, `.env` und unbekannte Seite liefern 404. Normale Anfragen können keine Daten auf dem Worker speichern.
- Vier automatisierte Worker-Tests bestanden: Verzeichnisauflösung, Weiterleitungen, Sicherheits-/Cacheheader, gesperrte Dateien/Methoden.
- Statische interne Links geprüft; keine fehlenden verlinkten Dateien. Suche im Quellcode und der verfügbaren Git-Historie ohne Treffer für typische private Schlüssel/API-Geheimnisse. Dies ist kein Nachweis über Geheimnisse in den Anbieter-Konten.
- Desktop-Browser: Startseite, Leistungsübersicht, Leistungsdetail und Kontaktformular geöffnet; keine horizontale Überbreite bei 1348 CSS-Pixeln. Hintergrundbilder nach vollständigem Laden sichtbar.
- Browser: Navigation über echte Links; leere Pflichtfelder blockieren das Absenden; falsche E-Mail wird als ungültig erkannt; Cookie-Hinweis öffnet/schliesst und gibt Fokus zurück; Markenlauf pausiert; Sprunglink fokussiert den Hauptinhalt.
- Keine echte Formularnachricht versendet, kein Empfang im GMX-Postfach behauptet.
- Mobile CSS-Regeln geprüft und verbessert. Ein vollständiger visueller Test bei Smartphone-Breite und auf iOS/Android konnte mit dem verfügbaren Browserzugang nicht durchgeführt werden. Kein vollständiger Barrierefreiheitsnachweis.

## Die 20 Punkte aus der Vorlage

| Nr. | Punkt | Ergebnis |
|---|---|---|
| 1 | Datenschutzerklärung | An Hosting, FormSubmit, GMX, Zwecke und Rechte angepasst. FormSubmit-Verarbeitungsorte und Vertragsgrundlage bleiben offen. |
| 2 | Nutzungsbedingungen | Impressum erklärt unverbindliche Anfragen; Werkstattauftrag erst nach individueller Vereinbarung. Kein Online-Vertragsabschluss implementiert. |
| 3 | Rückerstattung | Kein Onlineverkauf oder Checkout. Rücktritt/Stornierung/Rückerstattung eines Werkstattauftrags sind individuell zu vereinbaren; keine erfundene Pauschalregel. |
| 4 | Cookie-Richtlinie | Abschnitt in der Datenschutzerklärung mit Speichername, Zweck und 180 Tagen. |
| 5 | Cookie-Banner | Nur notwendiger Hinweis, keine optionalen Trackingdienste im Website-Code. |
| 6 | Formularhinweise | Sichtbarer Datenschutzhinweis; keine Werbeeinwilligung. FormSubmit als Empfänger bei Übermittlung genannt. |
| 7 | Datenminimierung | Name, E-Mail und Anliegen erforderlich; Telefon und Fahrzeugangaben optional, keine Uploads. |
| 8 | Drittanbieter-SDKs | Keine Analyse-/Werbe-SDKs, eingebettete Karte oder extern geladene Schriftdateien. Cloudflare liefert aus; FormSubmit wird erst beim Absenden angesprochen. |
| 9 | Irreführende Bedienung | Fiktive Cookie-Auswahl entfernt; Anfrage ausdrücklich unverbindlich. |
| 10 | Versteckte Gebühren | Kein Bezahlvorgang, Abo oder kostenpflichtiger Onlineabschluss. Werkstattkosten werden separat vereinbart. |
| 11 | Gefälschte Bewertungen | Keine Kundenbewertungen oder Sterne als angebliche Rezensionen eingebaut. |
| 12 | Unbelegte Aussagen | Zitat und Erfahrungszahl entfernt. Leistungsangebot, Öffnungszeiten und Personenangaben müssen dem tatsächlichen Betrieb entsprechen. |
| 13 | Alternativtexte | Fotos werden dekorativ als CSS-Hintergrund eingesetzt; Leistung und Handlung stehen als lesbarer Text daneben. Keine informative Grafik ohne Textalternative gefunden. |
| 14 | Farbkontrast | Textflächen der Bildkarten abgedunkelt, Hinweis- und Formularfarben verbessert. Keine vollständige WCAG-Konformität bescheinigt. |
| 15 | Tastatur | Sprunglink, Fokus, Escape und Bewegungspause ergänzt; zentrale Desktop-Abläufe geprüft. Mobiles Menü noch bei schmaler Ansicht praktisch abzunehmen. |
| 16 | Firmendaten | Firma, Adresse, Kontakt, UID und Handelsregisternummer im Impressum. SHAB nennt Geschäftsführer Mensud Asani; Marketingtext nennt Mensur. Vor Übergabe bestätigen. |
| 17 | Kinderdaten | Keine Kinderkonten, Altersprofile oder auf Kinder gerichtete Datenerfassung; keine unnötige Altersabfrage ergänzt. |
| 18 | Newsletter-Abmeldung | Kein Newsletter/Marketingversand implementiert. Persönliche Antworten auf Werkstattanfragen bleiben normale Korrespondenz. |
| 19 | Schrift-/Bildrechte | Systemschrift-Fallbacks ohne externe Fontdateien. Für bereitgestellte und generierte Bilder fehlen vollständig dokumentierte Nutzungsnachweise. |
| 20 | Datenlöschung | Direkte Auskunfts-/Löschkontaktlinks und Antwortfrist für Auskunft ergänzt. Ablauf in `docs/DATENSCHUTZ-ABLAUF.md` vorbereitet. FormSubmit nennt 30 Tage Archiv; GMX-Mailinhalte sind davon unabhängig. Praktische Ausführung und Anbieterbestätigungen bleiben offen. |

## Offene Voraussetzungen für die endgültige Übergabe

1. **Kontozugriffe:** Nach erfolgreicher GitHub-Kontobestätigung geprüft: 0 zusätzliche Mitarbeiter, 0 Deploy-Schlüssel; installierte Apps sind ChatGPT Codex Connector und Cloudflare Workers and Pages. Cloudflare-Dashboard wird weiterhin durch eine Sicherheitsprüfung blockiert. Cloudflare-Mitglieder sowie kontoübergreifende Tokens, Zwei-Faktor-Schutz und Wiederherstellung sind nicht vollständig geprüft. Das Repository ist öffentlich lesbar, aber nicht öffentlich beschreibbar. Die automatische Freigabeprüfung hat sowohl die Privatschaltung als auch die Deaktivierung der zusätzlichen GitHub-Pages-Seite abgelehnt und verlangt ausdrückliche Zustimmung zu diesen konkreten Änderungen. Beide Einstellungen wurden deshalb nicht geändert. GitHub nennt für die Privatschaltung das Abschalten von Advanced Security und die Abtrennung vorhandener öffentlicher Forks. Beim Abschalten von Pages wäre nur die zusätzliche github.io-Adresse nicht mehr erreichbar; die nachgewiesene Cloudflare-Hauptdomain bleibt separat gehostet.
2. **Formularzustellung:** FormSubmit-Aktivierung und ein bewilligter Test bis zum tatsächlichen Eingang im GMX-Postfach. Frontend-Validierung allein beweist keine Zustellung.
3. **Formulardatenschutz:** FormSubmit-PDF und Dokumentation am 18. September 2026 erfolgreich gelesen. 30 Tage Formulararchiv sind dokumentiert und in der Datenschutzerklärung ergänzt; die öffentliche API-Dokumentation beschreibt keinen Lösch-Endpunkt. Juristische Person, Verarbeitungsstaaten, Vertragsgrundlage und Löschung von Backups/Logs weiterhin beim Anbieter bestätigen. GMX- und FormSubmit-Ablauf unter `docs/DATENSCHUTZ-ABLAUF.md`. Keine Freigabe als vollständig datenschutzrechtlich geprüft.
4. **Inhalte und Rechte:** Mensur/Mensud klären, Öffnungszeiten/Leistungen bestätigen, Rechte an Bildern dokumentieren. Das Impressum verwendet den im SHAB belegten Namen Mensud.
5. **Mobile Abnahme:** Startseite, alle Leistungstypen, Formular und Menü bei 320/390/768 Pixeln auf Überläufe und Bedienbarkeit prüfen; zusätzlich iPhone Safari und Android Chrome.

Eine Zusicherung „niemand ausser dem Inhaber kann Änderungen vornehmen“ ist ohne vollständige Konto- und App-Prüfung nicht möglich. Auch berechtigte Integrationen veröffentlichen Änderungen. Keine Website kann garantieren, dass Daten unter allen Umständen niemals offengelegt werden. Im geprüften Code gibt es keinen öffentlichen Kundendatenspeicher und keine API-Schlüssel im Browser; die Sicherheit der externen Konten und Anbieter bleibt ein eigener Prüfbereich.

## Wartung

Änderungen in `main` veröffentlichen. Anschliessend den Cloudflare-Check des genauen Commits abwarten und Hauptdomain, Unterseiten sowie `X-Release` kontrollieren. Nicht nur den grünen GitHub-Pages-Check als Cloudflare-Nachweis verwenden. Vor einem Release `node --test tests/worker.test.mjs` ausführen. Für einen Rückweg den gewünschten früheren Stand mit einem neuen Commit wiederherstellen; keine Git-Historie löschen.

## Quellen

- Cloudflare Static Assets: https://developers.cloudflare.com/workers/static-assets/binding/
- Cloudflare Header-Verhalten: https://developers.cloudflare.com/workers/static-assets/headers/
- EDÖB, Datenschutzerklärungen im Internet: https://www.edoeb.admin.ch/de/datenschutzerklaerungen-im-internet
- SHAB, Meldung HR02-1005016854 vom 6. November 2020: https://www.shab.ch/shabforms/servlet/Search?DOCID=HR02-1005016854&EID=7

Dieses Protokoll dokumentiert konkrete technische Prüfungen und verbleibende Nachweise; es ist keine Rechts-, Sicherheits- oder Verfügbarkeitsgarantie.
