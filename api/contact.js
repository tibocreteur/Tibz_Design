const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const raw = await readBody(req);
  const params = new URLSearchParams(raw);

  const lastname = params.get('lastname') || '';
  const firstname = params.get('firstname') || '';
  const email = params.get('email') || '';
  const project = params.get('project') || '';
  const message = params.get('message') || '';
  const lang = params.get('_lang') === 'en' ? 'en' : 'fr';

  if (!email || !message) {
    res.status(400).send('Missing required fields');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.CONTACT_TO || 'tibzdesign@gmail.com',
      replyTo: email,
      subject: `Nouvelle demande — ${firstname} ${lastname}`.trim(),
      html: `
        <h2>Nouvelle demande via tibzdesign.fr</h2>
        <p><strong>Nom :</strong> ${escapeHtml(lastname)}</p>
        <p><strong>Prénom :</strong> ${escapeHtml(firstname)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Projet :</strong> ${escapeHtml(project)}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });
  } catch (err) {
    console.error('Resend contact email failed:', err);
    res.status(500).send('Failed to send message');
    return;
  }

  res.writeHead(303, { Location: `/${lang}/contact?sent=true` });
  res.end();
};
