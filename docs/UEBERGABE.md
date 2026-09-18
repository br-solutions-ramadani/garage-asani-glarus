# Übergabe und Betrieb – Garage Asani

Stand: 19. September 2026 · Release 20260919-3

## Website und Zuständigkeiten

Produktive Adresse: https://garage-asani-glarus.ch/. Änderungen im Repository werden über Cloudflare Workers veröffentlicht. www und der Worker-Zugang führen auf die Hauptdomain. Die frühere ChatGPT-Site ist eine getrennte Veröffentlichung.

Mensud Asani ist Geschäftsführer und rechtlich Verantwortlicher; Mensur Asani ist Mechaniker und persönlicher Ansprechpartner in der Werkstatt. Diese Zuordnung sowie Öffnungszeiten, Leistungen und Bildnutzung wurden am 19. September 2026 vom Auftraggeber bestätigt. Die erzeugten Leistungsbilder dienen der Illustration.

Die Website bietet Informationen und unverbindliche Kontaktaufnahme. Es gibt keinen Onlinekauf, keine Onlinezahlung und keine verbindliche Onlinebuchung. Die Nutzungsbedingungen unter /agb.html enthalten keine Reparatur-, Verkaufs- oder Zahlungsbedingungen für Werkstattaufträge; diese werden separat vereinbart.

## Kontaktablauf

Alle acht Formulare bereiten eine E-Mail lokal vor. Besucher prüfen den Entwurf, öffnen ausdrücklich ihr Mailprogramm und senden dort selbst an garage.asani@gmx.ch. Die Website übermittelt keine Formulareingaben an einen Webserver, FormSubmit oder eine Datenbank.

Lange Nachrichten bleiben vollständig kopierbar. Ohne JavaScript stehen direkte E-Mail- und Telefonlinks bereit. Eine Entwurfsanzeige ist keine Versand- oder Eingangsbestätigung. Das Postfach muss regelmässig geprüft werden.

Frühere FormSubmit-Daten werden durch die Umstellung nicht gelöscht; siehe DATENSCHUTZ-ABLAUF.md.

## Veröffentlichung und Wartung

- .assetsignore beschränkt die Auslieferung auf öffentliche Website-Dateien. Interne Dokumentation, Tests und Konfiguration werden auf der Domain nicht ausgeliefert. Das Repository selbst ist öffentlich lesbar: keine Zugangsdaten oder Kundendaten dort ablegen.
- Der Worker erlaubt GET und HEAD, erzwingt die Hauptdomain mit HTTPS und setzt Sicherheitsheader. Schreibmethoden werden abgewiesen.
- Zwei Cloudflare-Rate-Limit-Bindings begrenzen sämtliche beim Worker ankommenden Anfragen pro Cloudflare-vermittelter IP-Adresse: 60 in 10 Sekunden und 300 in 60 Sekunden. Alle Pfade, Query-Parameter, Methoden und Hostnamen teilen dieselben Zähler. Eine Ablehnung liefert 429, Retry-After und no-store. Bei fehlenden Bindings oder einem Ausfall der Begrenzung folgt 503 statt einer ungeschützten Auslieferung.
- Diese Zähler gelten pro Cloudflare-Standort und werden asynchron aktualisiert. Sie sind keine exakt globale Obergrenze und kein vollständiger DDoS-Schutz. Gemeinsam genutzte IP-Adressen teilen die Grenze. Keine zusätzlichen Cookies, keine Formularinhalte und keine eigenen IP-Protokolle werden dafür angelegt. Die Begrenzung ersetzt weder Postfachschutz noch Kontosicherheit.
- Zusätzlich wird die Hauptdomain in Cloudflare durch eine vorgeschaltete Rate-Limit-Regel geschützt: 60 Anfragen je IP in 10 Sekunden, danach 10 Sekunden Sperre. Von Cloudflare verifizierte Bots sind ausgenommen. Diese Zonenregel wird im Dashboard verwaltet und nicht durch einen Repository-Deploy eingerichtet.
- Vor /kontakt.html und /leistungen/ ist eine Cloudflare Managed Challenge vorgesehen. Sie prüft Browser-Zugriffe vor der Formularanzeige; Cloudflare kann cf_clearance als Nachweis einer bestandenen Prüfung setzen. Die Challenge-Freigabe ist auf 30 Minuten konfiguriert. Normale Startseiten- und Rechtstextaufrufe werden von dieser Challenge-Regel nicht erfasst; bei Problemen bleiben dort Telefon und E-Mail erreichbar. Die Prüfung ersetzt keinen Postfach-Spamfilter und keine serverseitige Prüfung eines künftig eingeführten Mailversands.
- Es gibt keine öffentliche Anmeldung, Uploadfunktion, Kundendatenbank oder externe JavaScript-Bibliothek.
- Zusätzliche Worker-Anwendungsprotokollierung ist deaktiviert. Cloudflare verarbeitet trotzdem Verbindungsdaten und Sicherheitsereignisse.
- Der Cookie-Hinweis speichert seine Bestätigung lokal für höchstens 180 Tage. Der Website-Code enthält keine optionalen Analyse- oder Marketingdienste.
- Vor Veröffentlichung: node --test tests/worker.test.mjs tests/contact.test.mjs.
- Den erfolgreichen Cloudflare-Status des genauen Commits abwarten; danach Hauptdomain, Unterseiten und X-Release prüfen. Ein grüner GitHub-Pages-Status allein bestätigt die Cloudflare-Veröffentlichung nicht.
- Bei Bedarf einen früheren Stand mit einem neuen Commit wiederherstellen. Keine Git-Historie löschen. Domainverlängerung, Betreuung, Konten und Wiederherstellung einer verantwortlichen Person zuordnen.

## Abnahme

Kontaktentwurf, Fehlerfälle, Formularsperren, Weiterleitungen und Sicherheitsheader sind automatisiert geprüft. Darstellung und zentrale Bedienung wurden zusätzlich im Browser geprüft.

Vor endgültiger Abnahme eine eigene E-Mail bis zum tatsächlichen Postfacheingang sowie typische iPhone-/Android-Geräte praktisch prüfen. Providerverträge, Kontoschutz und betriebliche Löschabläufe sind getrennt von der Codeprüfung nachzuweisen. Eine vollständige Rechts-, Sicherheits- oder Verfügbarkeitsgarantie wird nicht abgegeben.

Detaillierte Kontozugangs- und Sicherheitsbefunde gehören in den privaten Übergabebericht, nicht in dieses öffentliche Repository.
