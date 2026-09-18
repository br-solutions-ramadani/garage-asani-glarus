# Auskunft und Löschung – Betriebsablauf

Stand: 18. September 2026. Zuständig ist die Garage Asani GmbH über `garage.asani@gmx.ch`. Dieser Ablauf ist vorbereitet. Die tatsächliche Durchführung im Postfach und bei Dienstleistern ist noch nicht erprobt oder bestätigt.

Diese Datei enthält nur allgemeine Anweisungen. Das GitHub-Repository ist öffentlich: keine Kundennamen, Anfragen, Nachrichtenkopien, Zugangsdaten oder Bearbeitungsprotokolle hier ablegen. Fallbezogene Nachweise gehören in eine zugriffsbeschränkte betriebliche Ablage.

## 1. Eingang und Zuordnung

- Eingang, Art des Begehrens und verantwortliche Person intern festhalten. Das GMX-Postfach regelmässig prüfen.
- Identität angemessen prüfen, beispielsweise über die bereits verwendete Kontaktadresse. Zusätzliche Nachweise nur bei Bedarf; nicht standardmässig vollständige Ausweiskopien sammeln.
- Auskunft in der Regel innerhalb von 30 Tagen beantworten. Wenn dies nicht möglich ist, innerhalb dieser Frist den weiteren Zeitrahmen mitteilen. Einschränkungen begründen. Grundlage: [EDÖB – Auskunftsrecht](https://www.edoeb.admin.ch/de/faq-datenschutz).

## 2. Daten auffinden und Auskunft vorbereiten

- Nach E-Mail-Adresse, Name und Anfragezeitraum suchen: Posteingang, Gesendet, Entwürfe, eigene Ordner, Archiv, Spam und Papierkorb; gegebenenfalls auch lokale Mailprogramme, Downloads und betriebliche Auftragsunterlagen einbeziehen.
- Nur Daten der anfragenden Person herausgeben. Angaben anderer Kunden ausnehmen. Antwort an einen überprüften Empfänger und mit einem dem Inhalt angemessenen sicheren Übermittlungsweg senden.
- Auch Zweck, Herkunft, Empfänger und Aufbewahrung berücksichtigen. Ein fehlender Treffer im Posteingang beweist nicht, dass bei allen Anbietern keine Daten vorhanden sind.

## 3. GMX: gezielte Löschung

- Vor jeder Löschung prüfen, ob einzelne Unterlagen noch für einen laufenden Auftrag, gesetzliche Aufbewahrung oder berechtigte Ansprüche erforderlich sind. Grund und verbleibende Dauer dokumentieren; keine pauschale Löschung aller Geschäftskorrespondenz.
- Die freigegebenen Nachrichten gezielt löschen und anschliessend dieselben Nachrichten im Papierkorb endgültig entfernen. Nicht ungeprüft den gesamten Papierkorb leeren. [GMX erläutert den Papierkorb](https://hilfe.gmx.net/email/ordner/systemordner.html).
- Zugehörige Antwortkopien, Entwürfe, Kontakte, lokale Exporte und synchronisierte Geräte prüfen. Bei Sicherungskopien deren Löschzyklus und Schutz vor erneuter Nutzung feststellen.
- GMX nennt grundsätzlich sieben Tage für Verkehrsdaten; das ist keine automatische Löschfrist für Nachrichteninhalte. Für anbieterinterne Daten und offene Backup-Fragen nennt GMX `datenschutz@gmxnet.de` als Datenschutzkontakt. [GMX-Datenschutzerklärung](https://agb-server.gmx.net/datenschutz).
- Das gesamte GMX-Konto bleibt bestehen. Eine einzelne Kundenanfrage ist kein Anlass, das Postfach zu kündigen.

## 4. FormSubmit: Archiv berücksichtigen

Die [FormSubmit-Dokumentation](https://formsubmit.co/documentation) nennt 30 Tage für archivierte Formulareingaben. Die [API-Dokumentation](https://formsubmit.co/api-documentation) beschreibt einen geschützten Abruf; ein Lösch-Endpunkt ist dort nicht dokumentiert. Nicht einfach abwarten, wenn eine frühere Löschung erforderlich ist.

- Bei Bedarf den in der [Datenschutz-PDF](https://formsubmit.co/privacy.pdf) genannten Kontakt `support@formsubmit.co` um Auskunft beziehungsweise gezielte Löschung und Bestätigung bitten. Zunächst nur notwendige Zuordnungsmerkmale verwenden: Formular-URL, Empfängeradresse, Zeitraum; zusätzliche Kundendaten nur soweit erforderlich.
- Schriftlich klären: vorzeitige Löschung, Sicherungskopien, technische Logs, konkrete Verarbeitungsstaaten, verantwortliche juristische Person und Vertrag zur Auftragsbearbeitung einschliesslich allfälliger Auslandgarantien.
- Ohne Anbieterbestätigung keine umfassende Löschung zusichern. Eine Mail-Löschung bei GMX löscht das FormSubmit-Archiv nicht mit.
- Für diesen Ablauf wurde kein API-Schlüssel angefordert. Falls später einer benötigt wird, nur in einer geschützten administrativen Umgebung verwenden; niemals in HTML, Browser-JavaScript, GitHub oder Screenshots hinterlegen.

## 5. Abschluss und regelmässige Prüfung

Durchgeführte Schritte und Anbieterantworten intern knapp festhalten. Dem Betroffenen mitteilen, welche Daten gelöscht wurden und welche begründet verbleiben. Offene Providerbestätigungen ausdrücklich offen lassen. Erledigte Anfragen ohne weiteren Speicherzweck regelmässig zur Löschung prüfen; nur erforderliche Nachweise aufbewahren.

## Cloudflare: getrennte Prüfung

Die Projektkonfiguration setzt `observability.enabled` auf `false`. Im aktuellen Dashboard unter **Workers & Pages → garage-asani-glarus → Observability** den Zustand der Worker-Protokollierung prüfen. Keine Protokollierung eigens für diese Kontrolle einschalten. [Cloudflare-Anleitung](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).

Das ersetzt nicht die Prüfung anderer Cloudflare-Sicherheitsprotokolle, Log-Exporte, Aufbewahrung und vertraglicher Verarbeitung. SSL/TLS „Full (Strict)“ beschreibt Verschlüsselung zum Origin und ist kein Nachweis über IP-Speicherung. Eine Zusage „Cloudflare speichert keinerlei IP-Adressen“ ist nicht belegt.

## Noch offen

- Praktischer Ablauf im tatsächlichen GMX-Postfach und Identifikation vorhandener lokaler Kopien/Backups.
- FormSubmit-Anbieterantwort, Vertragsgrundlage und Verarbeitungsstaaten.
- Aktuelle Cloudflare-Einstellungen und deren verbleibende Datenverarbeitung.

Es wurden im Rahmen dieser Vorbereitung keine Kundendaten gelöscht und keine Nachrichten an Anbieter oder Kunden versendet.
