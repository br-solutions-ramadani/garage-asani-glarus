# Auskunft und Löschung – Betriebsablauf

Stand: 18. September 2026. Zuständig ist die Garage Asani GmbH über `garage.asani@gmx.ch`. Dieser Ablauf ist vorbereitet. Die tatsächliche Durchführung im Postfach und bei Dienstleistern ist noch nicht erprobt oder bestätigt.

Diese Datei enthält nur allgemeine Anweisungen. Das GitHub-Repository ist öffentlich: keine Kundennamen, Anfragen, Nachrichtenkopien, Zugangsdaten oder Bearbeitungsprotokolle hier ablegen. Fallbezogene Nachweise gehören in eine zugriffsbeschränkte betriebliche Ablage.

## Aktueller Stand ab Release 20260918-8
Alle acht Eingabeformulare bereiten eine E-Mail lokal vor. Die Website sendet neue Eingaben nicht mehr an FormSubmit. Das eigene Mailprogramm des Besuchers erhält den Entwurf erst nach seinem Klick, und der Besucher sendet dort selbst. Für neue Anfragen sind daher das GMX-Postfach und betriebliche Kopien zu berücksichtigen; die FormSubmit-Schritte unten betreffen ausschliesslich frühere Übermittlungen.

Die Umstellung entfernt keine Altdaten beim früheren Dienst. 30 Tage Archivaufbewahrung sind nur die dokumentierte Anbieterangabe, kein Nachweis der vollständigen Löschung von Backups/Logs. Anbieteranfragen oder Löschungen wurden durch diesen Umbau nicht ausgeführt. Auskunfts- und Löschanliegen zu älteren Eingängen weiterhin anhand des folgenden Ablaufs bearbeiten.

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

## 4. Frühere FormSubmit-Anfragen: Archiv berücksichtigen

Die [FormSubmit-Dokumentation](https://formsubmit.co/documentation) nennt 30 Tage für archivierte Formulareingaben. Die [API-Dokumentation](https://formsubmit.co/api-documentation) beschreibt einen geschützten Abruf; ein Lösch-Endpunkt ist dort nicht dokumentiert. Nicht einfach abwarten, wenn eine frühere Löschung erforderlich ist.

- Bei Bedarf den in der [Datenschutz-PDF](https://formsubmit.co/privacy.pdf) genannten Kontakt `support@formsubmit.co` um Auskunft beziehungsweise gezielte Löschung und Bestätigung bitten. Zunächst nur notwendige Zuordnungsmerkmale verwenden: Formular-URL, Empfängeradresse, Zeitraum; zusätzliche Kundendaten nur soweit erforderlich.
- Schriftlich klären: vorzeitige Löschung, Sicherungskopien, technische Logs, konkrete Verarbeitungsstaaten, verantwortliche juristische Person und Vertrag zur Auftragsbearbeitung einschliesslich allfälliger Auslandgarantien.
- Ohne Anbieterbestätigung keine umfassende Löschung zusichern. Eine Mail-Löschung bei GMX löscht das FormSubmit-Archiv nicht mit.
- Für diesen Ablauf wurde kein API-Schlüssel angefordert. Falls später einer benötigt wird, nur in einer geschützten administrativen Umgebung verwenden; niemals in HTML, Browser-JavaScript, GitHub oder Screenshots hinterlegen.

## 5. Abschluss und regelmässige Prüfung

Durchgeführte Schritte und Anbieterantworten intern knapp festhalten. Dem Betroffenen mitteilen, welche Daten gelöscht wurden und welche begründet verbleiben. Offene Providerbestätigungen ausdrücklich offen lassen. Erledigte Anfragen ohne weiteren Speicherzweck regelmässig zur Löschung prüfen; nur erforderliche Nachweise aufbewahren.

## Cloudflare: getrennte Prüfung

Die Projektkonfiguration setzt `observability.enabled` auf `false`. Nutzer-Screenshot `IMG_3842.png` vom 18. September 2026 (sichtbare Uhrzeit 18:48) bestätigt für `garage-asani-glarus` unter **Observability** die Meldung „Workers Observability is Disabled“. Keine Aktivierung erforderlich. Der Hinweis auf 200.000 Ereignisse pro Tag beschreibt das Tarifkontingent, nicht eine gemessene Anzahl gespeicherter Ereignisse. [Cloudflare-Anleitung](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).

Das ersetzt nicht die Prüfung anderer Cloudflare-Sicherheitsprotokolle, Log-Exporte, Aufbewahrung und vertraglicher Verarbeitung. SSL/TLS „Full (Strict)“ beschreibt Verschlüsselung zum Origin und ist kein Nachweis über IP-Speicherung. Eine Zusage „Cloudflare speichert keinerlei IP-Adressen“ ist nicht belegt.

Cloudflares [Datenschutzerklärung](https://www.cloudflare.com/privacypolicy/) nennt bei Endnutzern unter anderem IP-Adressen und Verkehrsdaten. Für die allgemeine Aufbewahrung nennt sie Zweck und weitere Kriterien statt einer einheitlichen Frist. Die [Security-Events-Dokumentation](https://developers.cloudflare.com/waf/analytics/security-events/) beschreibt Sicherheitsereignisse mit möglichen IP-Angaben und getrennte Datenbestände: im Free-Tarif 24 Stunden für Security Events und sieben Tage für Security Analytics. Das sind Angaben zu diesen Beständen, keine Zusage über sämtliche Datenkopien oder Cloudflare-internen Systeme. Der Free-Hinweis im Worker-Screenshot belegt zudem nicht den Tarif der Domain.

Nutzer-Screenshot `IMG_3845.png` vom 18. September 2026 (sichtbare Uhrzeit 19:01) zeigt in „Sampled logs“ zwei Ereignisse mit IP-Adresse, Zeitpunkt, zugeordnetem Land, Aktion „Block“ und Dienst „Browser integrity check“. Die IP-Adresse wird hier nicht wiedergegeben. Damit sind gespeicherte Sicherheitsereignisse mit IP-Angaben nachgewiesen. Der ausgewählte Zeitraum „Last 24 hours“ ist ein Anzeige-Filter und für sich kein Nachweis der Löschfrist. Pfad, User-Agent und tatsächlicher Anlass sind nicht sichtbar; daraus weder einen erfolgreichen Angriff noch einen Fehlalarm ableiten.

Nächste Kontrollen: Domain-Tarif zur Einordnung der dokumentierten Fristen bestätigen, zusätzliche Exporte und frühere Logs prüfen. Bei Hinweisen auf blockierte legitime Besucher einzelne Ereignisdetails ansehen; Sicherheitsfunktionen nicht pauschal abschalten. Laut [Cloudflare-Dokumentation zu Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) wertet diese Funktion HTTP-Header und User-Agent aus. Die zwei sichtbaren Sperren allein begründen keine zusätzliche Aktivierung von Bot Fight Mode. Früher gespeicherte Worker-Logs werden durch die aktuelle Disabled-Anzeige nicht rückwirkend als gelöscht nachgewiesen.

## Noch offen

### Ergänzende Anbieterprüfung vom 18. September 2026

**Cloudflare-Vertrag:** Ziffer 6.1 der [Self-Serve-Bedingungen](https://www.cloudflare.com/terms/) bezieht den Datenschutz-Anhang ein und erfasst ausdrücklich auch das Schweizer DSG. Die [DPA, Version 6.4](https://www.cloudflare.com/cloudflare-customer-dpa/), behandelt in Ziffer 6.2(c) Schweizer Transfers und angepasste Standardvertragsklauseln. Das belegt verfügbare Vertragsregelungen, nicht die vollständige Prüfung des konkreten Kontos oder der Vertragsbeziehung Garage–Agentur. Kontoinhaber und Verantwortungskette müssen eindeutig zugeordnet sein. Es wurde keine neue Vereinbarung im Namen des Betriebs angenommen.

**Dokumentierte Fristen je Domain-Tarif:** Die [Cloudflare-Tabelle](https://developers.cloudflare.com/waf/analytics/security-events/#limits) unterscheidet zwei Bestände:

| Bestand | Free / Pro | Business | Enterprise |
|---|---|---|---|
| Security Events | 24 Stunden | 3 Tage | 30 Tage |
| Security Analytics | 7 Tage | 31 Tage | 90 Tage |

Das ist keine gemeinsame Löschfrist für sämtliche Cloudflare-Daten. Zusätzliche Exporte und Daten bei anderen Diensten werden dadurch nicht gelöscht. Der tatsächlich verwendete Domain-Tarif ist noch nicht nachgewiesen.

**FormSubmit:** Die weiterhin angebotene Datenschutz-PDF trägt den Stand 17. Januar 2019. Sie nennt nicht die für diese Prüfung benötigten Verarbeitungsstaaten, die vollständige Anbieteridentität oder eine ausreichende Vertragsgrundlage. Diese Informationen lassen sich nicht seriös ergänzen oder durch eine Formular-Checkbox ersetzen. Vor endgültiger Datenschutzfreigabe sind sie beim Anbieter zu bestätigen oder der Formulardienst ist durch einen nachweisbar geeigneten Übermittlungsweg zu ersetzen. Eine solche Anbieterbestätigung wurde nicht angefordert oder erhalten.

**Direkter Kontakt:** Release `20260918-6` ergänzt neben allen acht Formularen E-Mail- und Telefonlinks. Der E-Mail-Link öffnet das Mailprogramm ohne FormSubmit; es wird dadurch keine Nachricht automatisch versendet. Die bestehende Formularübermittlung bleibt aktiv und ihre offene Anbieterprüfung bleibt bestehen.

### Verbleibende Nachweise

- Praktischer Ablauf im tatsächlichen GMX-Postfach und Identifikation vorhandener lokaler Kopien/Backups.
- FormSubmit-Anbieterantwort, Vertragsgrundlage und Verarbeitungsstaaten.
- Cloudflare-Domain-Tarif und anwendbare Aufbewahrung, Exporte, frühere Worker-Logs und weitere Anbieter-Verarbeitung. Deaktivierte Worker-Observability und vorhandene Sicherheitsereignisse mit IP-Angaben sind anhand der Nutzer-Screenshots bestätigt.

Im Rahmen der Vorbereitung wurden keine Kundendaten gelöscht und keine Datenschutzanfragen an Anbieter oder Kunden versendet. Beim anschliessend freigegebenen Funktionstest wurde genau eine technische Formularanfrage ohne Kundendaten übermittelt. FormSubmit antwortete mit „Check Your Email“ und einer Aufforderung zur Aktivierung; laut Antwort wurde eine Aktivierungsmail versandt. Der Eingang im GMX-Postfach ist nicht geprüft. Details und nächster Schritt stehen in `docs/UEBERGABE.md`.


### Veröffentlichung der Datenwege

Release `20260918-7` ergänzt AGB und Nutzungsbedingungen sowie eine verständliche Übersicht in Impressum und Datenschutzerklärung. Die Dokumente unterscheiden technische IP-Verarbeitung, Sicherheitsprotokolle, FormSubmit-Archiv, GMX-Mailinhalte und lokalen Browser-Speicher. Die Kenntnisnahme dieser Texte ersetzt weder notwendige Anbietervereinbarungen noch die tatsächliche Umsetzung von Aufbewahrung und Betroffenenrechten. Die fehlenden Nachweise zu FormSubmit bleiben ausdrücklich offen.

Der Nutzer meldete nach dem Techniktest, die Formularaktivierung sei bereits erfolgt. Dies ist eine Nutzerangabe; Postfacheingang und erneute vollständige Zustellung sind weiterhin nicht unabhängig geprüft.
