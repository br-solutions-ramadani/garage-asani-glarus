'use strict';
// Build drafts locally. No request, analytics, or storage of entered data.
(() => {
  const recipient = 'garage.asani@gmx.ch';
  const fields = ['Leistung', 'Vorname', 'Nachname', 'email', 'Telefon', 'Fahrzeugmarke', 'Modell', 'Jahrgang', 'Beschreibung'];
  const labels = {email: 'E-Mail für Rückfragen'};
  const encode = value => encodeURIComponent(value).replace(/[!'()*]/g, char => '%' + char.charCodeAt(0).toString(16).toUpperCase());

  document.querySelectorAll('[data-email-composer]').forEach(form => {
    const preview = form.querySelector('[data-email-preview]');
    const body = form.querySelector('[data-email-body]');
    const open = form.querySelector('[data-email-open]');
    const status = form.querySelector('[data-email-status]');
    const heading = form.querySelector('[data-email-heading]');
    const prepare = form.querySelector('[data-email-prepare]');
    const copy = form.querySelector('[data-email-copy]');
    if (!preview || !body || !open || !status || !heading || !prepare || !copy) return;

    const clearDraft = () => {
      preview.hidden = true;
      body.value = '';
      open.removeAttribute('href');
      status.textContent = '';
    };
    form.addEventListener('submit', event => {
      // Always stop native submission, including validation failures.
      event.preventDefault();
      if (!form.reportValidity()) { clearDraft(); return; }
      const data = new FormData(form);
      const subject = (form.dataset.emailSubject || 'Fahrzeuganfrage').replace(/[\r\n]+/g, ' ').trim();
      const lines = ['Guten Tag Garage Asani', '', 'Ich möchte folgende Anfrage stellen:', ''];
      fields.forEach(name => {
        const value = String(data.get(name) || '').trim().replace(/\r?\n/g, '\r\n');
        if (value) lines.push((labels[name] || name) + ': ' + value);
      });
      lines.push('', 'Bitte melden Sie sich zur weiteren Abklärung bei mir.', 'Freundliche Grüsse');
      const message = lines.join('\r\n');
      body.value = 'An: ' + recipient + '\r\nBetreff: ' + subject + '\r\n\r\n' + message;
      const mailto = 'mailto:' + recipient + '?subject=' + encode(subject) + '&body=' + encode(message);
      // Some mail handlers truncate long URLs; always retain the full copyable text.
      const longDraft = mailto.length > 1800;
      open.hidden = longDraft;
      if (longDraft) open.removeAttribute('href');
      else open.setAttribute('href', mailto);
      status.textContent = longDraft
        ? 'Noch nicht gesendet. Dieser Entwurf ist länger: Kopieren Sie den vollständigen Text und fügen Sie ihn in eine neue E-Mail an garage.asani@gmx.ch ein.'
        : 'Noch nicht gesendet. Prüfen Sie den Text und senden Sie ihn anschliessend in Ihrem Mailprogramm.';
      preview.hidden = false;
      heading.focus();
    });
    form.addEventListener('input', clearDraft);
    form.addEventListener('reset', clearDraft);
    copy.addEventListener('click', async () => {
      if (preview.hidden || !body.value) return;
      const draft = body.value;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(draft);
        if (body.value === draft && !preview.hidden) {
          status.textContent = 'Text kopiert. Fügen Sie ihn in eine neue E-Mail an garage.asani@gmx.ch ein und senden Sie diese dort selbst.';
        }
      } catch {
        if (body.value !== draft || preview.hidden) return;
        body.focus();
        body.select();
        status.textContent = 'Automatisches Kopieren ist hier nicht verfügbar. Kopieren Sie den markierten Text über die Kopierfunktion Ihres Geräts und fügen Sie ihn in Ihre E-Mail ein.';
      }
    });
    prepare.disabled = false;
  });
})();

