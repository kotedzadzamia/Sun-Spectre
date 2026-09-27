const FORM_RECIPIENTS = {
  consultation: 'kote.dzadzamia@sunspectre.com',
  contact: 'hello@sunspectre.com'
};

const FROM_ADDRESS = 'Sun Spectre Website <no-reply@sunspectre.com>';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

async function handleSubmit(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const to = FORM_RECIPIENTS[data.form];
  if (!to) return json({ error: 'Unknown form.' }, 400);

  // Honeypot: real visitors never fill this hidden field.
  if (data.website) return json({ ok: true });

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const organization = String(data.organization || '').trim();
  const interest = String(data.interest || '').trim();
  const message = String(data.message || '').trim();

  if (!name || !EMAIL_PATTERN.test(email) || !message) {
    return json({ error: 'Please complete all required fields with a valid email address.' }, 422);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: 'Email delivery is not configured.' }, 500);
  }

  const subject = `Sun Spectre inquiry — ${organization || name}`;
  const text = [
    `Name: ${name}`,
    `Work email: ${email}`,
    `Organization: ${organization}`,
    `Interest: ${interest}`,
    '',
    message
  ].join('\n');
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
    `<p><strong>Work email:</strong> ${escapeHtml(email)}</p>` +
    `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` +
    `<p><strong>Interest:</strong> ${escapeHtml(interest)}</p>` +
    `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to: [to], reply_to: email, subject, text, html })
  });

  if (!resendResponse.ok) {
    console.error('Resend error', resendResponse.status, await resendResponse.text());
    return json({ error: 'We could not send your message. Please email us directly.' }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/submit') {
      if (request.method === 'POST') return handleSubmit(request, env);
      return new Response('Method not allowed', { status: 405 });
    }

    return env.ASSETS.fetch(request);
  }
};
