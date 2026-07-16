const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = 'https://www.tibzdesign.fr/public/image/logo/logotestt.png';
const PHONE_DISPLAY = '+33 7 83 78 48 72';
const PHONE_HREF = 'tel:+33783784872';
const CONTACT_EMAIL = 'contact@tibzdesign.fr';

const CONSOLE_GIF_URL = 'https://www.tibzdesign.fr/public/video/console.gif';
const CONSOLE_SLUG = 'console';
const CONSOLE_LABEL = 'Console';

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

function emailDocument(bodyTablesHtml, extraCss) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>Tibz Design</title>
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
<!--[if gte mso 9]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG></o:AllowPNG><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<!--[if !mso]><!-- -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap">
<!--<![endif]-->
<style type="text/css">
#outlook a { padding: 0; }
a.es-button, button.es-button { text-decoration: none !important; }
a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
@media only screen and (max-width:600px) {
  .es-content, .es-header, .es-footer { width: 100% !important; }
  .adapt-img { width: 100% !important; height: auto !important; }
}
${extraCss || ''}
</style>
</head>
<body style="width:100%;height:100%;font-family:arial,'helvetica neue',helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div dir="ltr" lang="fr" style="background-color:#F6F6F6">
<table width="100%" cellspacing="0" cellpadding="0" role="none" style="border-spacing:0px;padding:0;Margin:0;width:100%">
<tbody>
<tr>
<td valign="top" style="padding:0;Margin:0">

<table cellspacing="0" cellpadding="0" align="center" class="es-header" role="none" style="border-spacing:0px;width:100%;background-color:transparent">
<tbody><tr><td align="center" style="padding:0;Margin:0">
<table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="es-header-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
<tbody><tr><td align="left" style="padding:25px;Margin:0">
<!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="left" role="none" style="border-spacing:0px;float:left">
<tbody><tr><td align="left" style="padding:0;Margin:0;width:255px">
<img alt="Tibz Design" width="80" src="${LOGO_URL}" class="adapt-img" style="display:block;border:0;outline:none;text-decoration:none;margin:0">
</td></tr></tbody>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="right" role="none" style="border-spacing:0px;float:right">
<tbody><tr><td align="right" style="padding:0;Margin:0;width:255px">
<p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:18px;font-size:15px;color:#000000"><a target="_blank" href="${PHONE_HREF}" style="text-decoration:none;color:#000000;font-size:15px">${PHONE_DISPLAY}</a></p>
<p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:18px;font-size:15px;color:#000000"><a target="_blank" href="mailto:${CONTACT_EMAIL}" style="text-decoration:none;color:#000000;font-size:15px">${CONTACT_EMAIL.toUpperCase()}</a></p>
</td></tr></tbody>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>

${bodyTablesHtml}

<table cellspacing="0" cellpadding="0" align="center" class="es-footer" role="none" style="border-spacing:0px;width:100%;background-color:transparent">
<tbody><tr><td align="center" style="padding:0;Margin:0">
<table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-footer-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
<tbody><tr><td align="left" style="Margin:0;padding:20px 20px 25px">
<table width="100%" cellpadding="0" cellspacing="0" role="none" style="border-spacing:0px">
<tbody><tr><td align="center" style="padding:10px 0;Margin:0">
<table cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0px">
<tbody><tr>
<td valign="top" align="center" style="padding:0 10px 0 0;Margin:0"><a target="_blank" href="https://instagram.com/tibzdesign/" style="text-decoration:none"><img title="Instagram" src="https://fzdpdls.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Instagram" width="32" style="display:block;border:0;outline:none;text-decoration:none;margin:0"></a></td>
<td valign="top" align="center" style="padding:0 10px 0 0;Margin:0"><a target="_blank" href="https://linkedin.com/company/tibz-design/" style="text-decoration:none"><img title="LinkedIn" src="https://fzdpdls.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="LinkedIn" width="32" style="display:block;border:0;outline:none;text-decoration:none;margin:0"></a></td>
<td valign="top" align="center" style="padding:0;Margin:0"><a target="_blank" href="https://behance.net/tibofromtibzdesign" style="text-decoration:none"><img title="Behance" src="https://fzdpdls.stripocdn.email/content/assets/img/social-icons/logo-black/behance-logo-black.png" alt="Behance" width="32" style="display:block;border:0;outline:none;text-decoration:none;margin:0"></a></td>
</tr></tbody>
</table>
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>

</td></tr></tbody>
</table>
</div>
</body>
</html>`;
}

function contentTable(innerHtml) {
  return `
<table cellspacing="0" cellpadding="0" align="center" class="es-content" role="none" style="border-spacing:0px;width:100%">
<tbody><tr><td align="center" style="padding:0;Margin:0">
<table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
<tbody><tr><td align="left" style="padding:20px 20px 0;Margin:0">
<table width="100%" cellspacing="0" cellpadding="0" role="none" style="border-spacing:0px">
<tbody><tr><td align="left" style="padding:0;Margin:0;width:540px">
${innerHtml}
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>
`;
}

function fieldRow(label, value) {
  if (!value) return '';
  return `
<tr><td style="padding:0 0 16px;Margin:0">
<p style="Margin:0 0 4px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#999999">${label}</p>
<p style="Margin:0;font-family:lato,'helvetica neue',helvetica,arial,sans-serif;font-size:15px;line-height:21px;color:#333333">${value}</p>
</td></tr>`;
}

function consoleGifHtml(lang) {
  const projectUrl = `https://www.tibzdesign.fr/${lang}/${CONSOLE_SLUG}`;
  return `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-spacing:0px">
<tbody><tr align="center"><td style="padding:0;Margin:0">
<a target="_blank" href="${projectUrl}" style="text-decoration:none">
<img src="${CONSOLE_GIF_URL}" alt="${CONSOLE_LABEL}" width="540" class="adapt-img" style="display:block;width:100%;max-width:540px;height:auto;border:0;outline:none;text-decoration:none;margin:0;border-radius:12px">
</a>
</td></tr></tbody>
</table>`;
}

const AUTOREPLY_COPY = {
  fr: {
    subject: 'Votre message a bien été envoyé — Tibz Design',
    heading: (firstname) => `Merci${firstname ? `, ${firstname}` : ''} !`,
    body: 'Votre message a bien été envoyé, je vous répondrai rapidement.',
    recapTitle: 'Récapitulatif de votre demande',
    project: 'Projet',
    message: 'Message',
    showcase: "En attendant, un aperçu de mon dernier projet :",
  },
  en: {
    subject: 'Your message has been sent — Tibz Design',
    heading: (firstname) => `Thank you${firstname ? `, ${firstname}` : ''}!`,
    body: "Your message has been sent, I'll get back to you shortly.",
    recapTitle: 'Summary of your request',
    project: 'Project',
    message: 'Message',
    showcase: 'In the meantime, a look at my latest project:',
  },
};

function notificationHtml({ lastname, firstname, email, project, message }) {
  const inner = `
<h2 style="Margin:0 0 20px;font-family:lato,'helvetica neue',helvetica,arial,sans-serif;font-size:26px;line-height:32px;font-weight:normal;color:#333333">Nouvelle demande via tibzdesign.fr</h2>
<table width="100%" cellspacing="0" cellpadding="0" role="none" style="border-spacing:0px">
<tbody>
${fieldRow('Nom', escapeHtml(lastname))}
${fieldRow('Prénom', escapeHtml(firstname))}
${fieldRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#1b3a1d;text-decoration:underline">${escapeHtml(email)}</a>`)}
${fieldRow('Projet', escapeHtml(project))}
${fieldRow('Message', escapeHtml(message).replace(/\n/g, '<br>'))}
</tbody>
</table>`;
  return emailDocument(contentTable(inner));
}

function autoReplyHtml({ firstname, project, message }, lang) {
  const copy = AUTOREPLY_COPY[lang];
  const inner = `
<h2 style="Margin:0;font-family:lato,'helvetica neue',helvetica,arial,sans-serif;font-size:32px;line-height:38px;font-weight:normal;color:#333333">${copy.heading(escapeHtml(firstname))}</h2>
<p style="Margin:12px 0 24px;font-family:lato,'helvetica neue',helvetica,arial,sans-serif;font-size:14px;line-height:21px;color:#333333">${copy.body}</p>
<table width="100%" cellspacing="0" cellpadding="0" role="none" style="border-spacing:0px;border-top:1px solid #eeeeee;padding-top:16px">
<tbody>
<tr><td style="padding:16px 0 12px;Margin:0"><p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#999999">${copy.recapTitle}</p></td></tr>
${fieldRow(copy.project, escapeHtml(project))}
${fieldRow(copy.message, escapeHtml(message).replace(/\n/g, '<br>'))}
</tbody>
</table>
<p style="Margin:8px 0 0;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:13px;color:#999999">${copy.showcase}</p>
`;
  const showcase = `
<table cellspacing="0" cellpadding="0" align="center" class="es-content" role="none" style="border-spacing:0px;width:100%">
<tbody><tr><td align="center" style="padding:0;Margin:0">
<table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
<tbody><tr><td align="left" style="padding:0 20px 20px;Margin:0">
${consoleGifHtml(lang)}
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>`;
  return emailDocument(contentTable(inner) + showcase);
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
