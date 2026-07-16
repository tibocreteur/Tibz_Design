const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = 'https://www.tibzdesign.fr/public/image/logo/logotestt.png';
const BRAND_GREEN = '#9bee68';
const BRAND_DARK = '#1b3a1d';
const BG = '#f9f9f4';

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

function emailShell(bodyHtml) {
  return `
    <div style="background:${BG};padding:32px 16px;font-family:'IBM Plex Mono',Consolas,monospace;color:#111;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e0;">
        <div style="background:${BRAND_DARK};padding:24px 32px;">
          <img src="${LOGO_URL}" alt="Tibz Design" height="28" style="display:block;">
        </div>
        <div style="padding:32px;">
          ${bodyHtml}
        </div>
        <div style="padding:16px 32px;background:${BG};border-top:1px solid #e5e5e0;font-size:12px;color:#777;">
          Tibz Design — tibzdesign.fr
        </div>
      </div>
    </div>
  `;
}

function fieldRow(label, value) {
  if (!value) return '';
  return `
    <p style="margin:0 0 16px;">
      <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#888;margin-bottom:4px;">${label}</span>
      <span style="font-size:15px;">${value}</span>
    </p>
  `;
}

function notificationHtml({ lastname, firstname, email, project, message }) {
  return emailShell(`
    <h2 style="margin:0 0 24px;font-size:18px;">Nouvelle demande via tibzdesign.fr</h2>
    ${fieldRow('Nom', escapeHtml(lastname))}
    ${fieldRow('Prénom', escapeHtml(firstname))}
    ${fieldRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND_DARK};">${escapeHtml(email)}</a>`)}
    ${fieldRow('Projet', escapeHtml(project))}
    ${fieldRow('Message', escapeHtml(message).replace(/\n/g, '<br>'))}
  `);
}

const AUTOREPLY_COPY = {
  fr: {
    subject: 'Votre message a bien été envoyé — Tibz Design',
    heading: (firstname) => `Merci${firstname ? `, ${firstname}` : ''} !`,
    body: 'Votre message a bien été envoyé, je vous répondrai rapidement.',
    recapTitle: 'Récapitulatif de votre demande',
    project: 'Projet',
    message: 'Message',
  },
  en: {
    subject: 'Your message has been sent — Tibz Design',
    heading: (firstname) => `Thank you${firstname ? `, ${firstname}` : ''}!`,
    body: "Your message has been sent, I'll get back to you shortly.",
    recapTitle: 'Summary of your request',
    project: 'Project',
    message: 'Message',
  },
};

function autoReplyHtml({ firstname, project, message }, lang) {
  const copy = AUTOREPLY_COPY[lang];
  return emailShell(`
    <h2 style="margin:0 0 12px;font-size:18px;">${copy.heading(escapeHtml(firstname))}</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#333;">${copy.body}</p>
    <div style="border-top:1px solid #e5e5e0;padding-top:20px;">
      <p style="margin:0 0 16px;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#888;">${copy.recapTitle}</p>
      ${fieldRow(copy.project, escapeHtml(project))}
      ${fieldRow(copy.message, escapeHtml(message).replace(/\n/g, '<br>'))}
    </div>
  `);
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

  const fields = { lastname, firstname, email, project, message };

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.CONTACT_TO || 'tibzdesign@gmail.com',
      replyTo: email,
      subject: `Nouvelle demande — ${firstname} ${lastname}`.trim(),
      html: notificationHtml(fields),
    });
  } catch (err) {
    console.error('Resend contact email failed:', err);
    res.status(500).send('Failed to send message');
    return;
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: email,
      replyTo: process.env.RESEND_FROM,
      subject: AUTOREPLY_COPY[lang].subject,
      html: autoReplyHtml(fields, lang),
    });
  } catch (err) {
    console.error('Resend auto-reply failed:', err);
  }

  res.writeHead(303, { Location: `/${lang}/contact?sent=true` });
  res.end();
};
