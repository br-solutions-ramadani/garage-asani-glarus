'use strict';
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.header nav');
const closeMenu = () => {
  navigation?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Menü öffnen');
};
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

// Retire legacy offline copies belonging to this website.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    const jobs = registrations.filter(registration => {
      const worker = registration.active || registration.waiting || registration.installing;
      return worker && new URL(worker.scriptURL).pathname.endsWith('/sw.js');
    }).map(registration => registration.unregister());
    return Promise.all(jobs);
  }).catch(() => {});
}
if ('caches' in window) {
  caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('garage-asani')).map(key => caches.delete(key)))).catch(() => {});
}

const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.section-title,.intro-copy,.trust-head,.trust article,.service-card,.statement>*,.cta>*,.page-hero>div,.content-copy,.value-card,.contact-info,.contact-form-wrap,.service-scope,.service-process,.service-faq>*,.service-contact>*,.footer>div');
if (motionOK && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), {threshold: 0.02});
  revealItems.forEach(item => { item.classList.add('reveal'); observer.observe(item); });
  // Focused content must never remain hidden while navigating by keyboard.
  document.addEventListener('focusin', event => event.target.closest('.reveal')?.classList.add('is-visible'));
}
const tickerButton = document.querySelector('.ticker-toggle');
const ticker = document.querySelector('.ticker');
tickerButton?.addEventListener('click', () => {
  const paused = ticker.classList.toggle('paused');
  tickerButton.setAttribute('aria-pressed', String(paused));
  tickerButton.textContent = paused ? 'Markenlauf fortsetzen' : 'Markenlauf pausieren';
});
if (!motionOK && tickerButton) tickerButton.hidden = true;

// There are no optional analytics/marketing services. Do not request fictitious consent.
const consentKey = 'garage-asani-consent-v2';
const maxAge = 180 * 24 * 60 * 60 * 1000;
const readConsent = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(consentKey));
    return saved?.necessary === true && Date.now() - saved.savedAt < maxAge;
  } catch { return false; }
};
try { localStorage.removeItem('garage-asani-consent-v1'); } catch {}
document.body.insertAdjacentHTML('beforeend', `<section class="cookie-consent" role="region" aria-labelledby="cookie-title" hidden><div class="cookie-card"><div class="cookie-copy"><p class="cookie-kicker">Datenschutz</p><h2 id="cookie-title">Nur notwendige Funktionen</h2><p>Diese Website nutzt keine Analyse- oder Marketingdienste. Wir speichern lediglich Ihre Bestätigung dieses Hinweises auf Ihrem Gerät. <a href="/datenschutz.html#cookies">Mehr erfahren</a></p></div><div class="cookie-actions"><button class="cookie-button primary" type="button" data-consent-close>Verstanden</button></div></div></section>`);
const consentPanel = document.querySelector('.cookie-consent');
let consentReturnFocus = null;
const openConsent = source => {
  consentReturnFocus = source;
  consentPanel.hidden = false;
  document.body.classList.add('consent-open');
  if (source) consentPanel.querySelector('button').focus();
};
const closeConsent = () => {
  try { localStorage.setItem(consentKey, JSON.stringify({necessary:true, savedAt:Date.now()})); } catch {}
  consentPanel.hidden = true;
  document.body.classList.remove('consent-open');
  consentReturnFocus?.focus();
  consentReturnFocus = null;
};
consentPanel.querySelector('[data-consent-close]').addEventListener('click', closeConsent);
consentPanel.addEventListener('keydown', event => { if (event.key === 'Escape') closeConsent(); });
document.querySelectorAll('.cookie-settings-link').forEach(button => button.addEventListener('click', () => openConsent(button)));
if (!readConsent()) openConsent(null);

// Browser validation runs before the submit event; preserve entered data on errors.
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', event => {
    const submit = form.querySelector('[type="submit"]');
    if (form.dataset.submitting === 'true') { event.preventDefault(); return; }
    form.dataset.submitting = 'true';
    submit.textContent = 'Wird übermittelt …';
    submit.setAttribute('aria-disabled', 'true');
    setTimeout(() => {
      form.dataset.submitting = 'false';
      submit.textContent = 'Anfrage senden';
      submit.removeAttribute('aria-disabled');
    }, 15000);
  });
});
window.addEventListener('pageshow', () => document.querySelectorAll('.contact-form').forEach(form => {
  form.dataset.submitting = 'false';
  const button = form.querySelector('[type="submit"]');
  button.textContent = 'Anfrage senden';
  button.removeAttribute('aria-disabled');
}));
