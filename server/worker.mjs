const canonicalHost = 'garage-asani-glarus.ch';
const release = '20260918-3';
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self' data:; connect-src 'self'; form-action 'self' https://formsubmit.co; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
  'X-Release': release
};
function secure(response) {
  const result = new Response(response.body, response);
  for (const [name,value] of Object.entries(securityHeaders)) result.headers.set(name,value);
  // Revalidate HTML, JS and CSS instead of keeping an older release in browser caches.
  result.headers.set('Cache-Control','public, max-age=0, must-revalidate');
  return result;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol !== 'https:' || url.hostname !== canonicalHost) {
      url.protocol = 'https:'; url.hostname = canonicalHost; url.port = '';
      return secure(Response.redirect(url.href,308));
    }
    if (!['GET','HEAD'].includes(request.method)) {
      return secure(new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}}));
    }
    if (url.pathname === '/index.html' || url.pathname === '/fahrzeuge.html') {
      url.pathname='/'; return secure(Response.redirect(url.href,301));
    }
    let path;
    try {path=decodeURIComponent(url.pathname);} catch {return secure(new Response('Bad request',{status:400}));}
    if (/(^|\/)\./.test(path) || /^\/(server|tests|docs)(\/|$)/.test(path) || /\.(?:md|toml|jsonc|map|pem|key|log|env)$/i.test(path) || /^\/(?:wrangler|package|package-lock)\./.test(path)) {
      return secure(new Response('Not found',{status:404}));
    }
    // With html_handling:none the asset binding requires the actual index file.
    // Keep public directory URLs while resolving their index internally.
    const assetUrl = new URL(url);
    if (assetUrl.pathname.endsWith('/')) assetUrl.pathname += 'index.html';
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    return secure(response);
  }
};
