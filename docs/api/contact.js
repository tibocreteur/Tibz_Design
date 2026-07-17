const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');
const https = require('https');

const resend = new Resend(process.env.RESEND_API_KEY);

function getLogoUrl() {
  try {
    const jsonPath = path.join(__dirname, '../public/json/fr.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const clean = String(data.logo || '').replace(/^(\.\.\/)*docs\//, '');
    return `https://www.tibzdesign.fr/${clean}`;
  } catch (err) {
    console.error('Failed to read logo from fr.json, using fallback:', err);
    return 'https://www.tibzdesign.fr/public/image/logo/logotestt.png';
  }
}

const LOGO_URL = getLogoUrl();
const PHONE_DISPLAY = '+33 7 83 78 48 72';
const PHONE_HREF = 'tel:+33783784872';
const CONTACT_EMAIL = 'contact@tibzdesign.fr';

const CONSOLE_GIF_URL = 'https://www.tibzdesign.fr/public/video/console_1-email.gif';
const CONSOLE_SLUG = 'console';
const CONSOLE_LABEL = 'Console';

const CHECK_ICON = '<img src="https://www.tibzdesign.fr/public/image/icons/check-circle.png" width="24" height="24" alt="" style="display:inline-block;vertical-align:middle;margin-left:8px;border:0;outline:none;text-decoration:none">';

const NTFY_TOPIC = 'tibzdesign-contact-k7m3qx91';

function sendNtfyNotification({ lastname, firstname, email, message }) {
  const preview = `${firstname} ${lastname}\n${message}`.trim().slice(0, 300);
  const payload = JSON.stringify({
    topic: NTFY_TOPIC,
    title: '📩 Nouvelle demande',
    message: preview,
    icon: LOGO_URL,
    priority: 4,
    click: `mailto:${email}`,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      'https://ntfy.sh/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        res.on('data', () => {});
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
          } else {
            reject(new Error(`ntfy responded with status ${res.statusCode}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => { chunks.push(chunk); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function detectSenderLang(req) {
  const header = req.headers['accept-language'] || '';
  const primary = header.split(',')[0].trim().toLowerCase();
  return primary.startsWith('fr') ? 'fr' : 'en';
}

function detectCountry(req) {
  const code = (req.headers['x-vercel-ip-country'] || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return 'Inconnu';
  const flag = String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
  return `${flag} ${code}`;
}

function detectOS(req) {
  const ua = req.headers['user-agent'] || '';
  if (/windows/i.test(ua)) return 'Windows';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/macintosh|mac os x/i.test(ua)) return 'macOS';
  if (/android/i.test(ua)) return 'Android';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Inconnu';
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function emailDocument(bodyTablesHtml, extraCss, preheader) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Tibz Design</title>
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
<!--[if gte mso 9]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG></o:AllowPNG><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<!--[if !mso]><!-- -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap">
<!--<![endif]-->
<style type="text/css">
:root { color-scheme: light only; supported-color-schemes: light only; }
#outlook a { padding: 0; }
a.es-button, button.es-button { text-decoration: none !important; }
a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
[data-ogsc] body, [data-ogsc] .es-wrapper, [data-ogsb] body, [data-ogsb] .es-wrapper { background-color: #F6F6F6 !important; }
[data-ogsc] .es-header-body, [data-ogsc] .es-content-body, [data-ogsc] .es-footer-body,
[data-ogsb] .es-header-body, [data-ogsb] .es-content-body, [data-ogsb] .es-footer-body { background-color: #FFFFFF !important; }
@media (prefers-color-scheme: dark) {
  body, .es-wrapper { background-color: #F6F6F6 !important; }
  .es-header-body, .es-content-body, .es-footer-body { background-color: #FFFFFF !important; }
}
@media only screen and (max-width:600px) {
  .es-content, .es-header, .es-footer { width: 100% !important; }
  .adapt-img { width: 100% !important; height: auto !important; }
  .logo-img { width: 56px !important; }
}
${extraCss || ''}
</style>
</head>
<body style="width:100%;height:100%;font-family:arial,'helvetica neue',helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
${preheader ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}${'&zwnj;&nbsp;'.repeat(150)}</div>` : ''}
<div dir="ltr" lang="fr" class="es-wrapper" style="background-color:#F6F6F6">
<table width="100%" cellspacing="0" cellpadding="0" role="none" class="es-wrapper" style="border-spacing:0px;padding:0;Margin:0;width:100%">
<tbody>
<tr>
<td valign="top" style="padding:0;Margin:0">

<table cellspacing="0" cellpadding="0" align="center" class="es-header" role="none" style="border-spacing:0px;width:100%;background-color:transparent">
<tbody><tr><td align="center" style="padding:0;Margin:0">
<table bgcolor="#FFFFFF" align="center" cellpadding="0" cellspacing="0" class="es-header-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
<tbody><tr><td align="left" style="padding:25px;Margin:0">
<!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:255px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="left" role="none" style="border-spacing:0px;float:left">
<tbody><tr><td align="left" style="padding:0;Margin:0;width:255px">
<img alt="Tibz Design" width="80" src="${LOGO_URL}" class="logo-img" style="display:block;width:80px;border:0;outline:none;text-decoration:none;margin:0">
</td></tr></tbody>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:255px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="right" role="none" style="border-spacing:0px;float:right">
<tbody><tr><td align="right" style="padding:0;Margin:0;width:255px">
<p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:18px;font-size:15px;color:#000001"><a target="_blank" href="${PHONE_HREF}" style="text-decoration:none;color:#000001;font-size:15px">${PHONE_DISPLAY}</a></p>
<p style="Margin:0;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:18px;font-size:15px;color:#000001"><a target="_blank" href="mailto:${CONTACT_EMAIL}" style="text-decoration:none;color:#000001;font-size:15px">${CONTACT_EMAIL.toUpperCase()}</a></p>
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
<table cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center" class="es-footer-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
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
<table cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center" class="es-content-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
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

function consoleGifHtml(lang, viewSiteLabel) {
  const siteUrl = `https://www.tibzdesign.fr/${lang}/`;
  return `
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-spacing:0px">
<tbody>
<tr align="center"><td style="padding:0;Margin:0">
<a target="_blank" href="${siteUrl}" style="text-decoration:none">
<img src="${CONSOLE_GIF_URL}" alt="${CONSOLE_LABEL}" width="540" class="adapt-img" style="display:block;width:100%;max-width:540px;height:auto;border:0;outline:none;text-decoration:none;margin:0;border-radius:12px 12px 0 0">
</a>
</td></tr>
<tr align="center"><td style="padding:0;Margin:0;background-color:#000001;border-radius:0 0 12px 12px">
<a target="_blank" href="${siteUrl}" style="display:block;padding:10px 0;text-decoration:none;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:13px;color:#FFFFFE">${viewSiteLabel} →</a>
</td></tr>
</tbody>
</table>`;
}

const AUTOREPLY_COPY = {
  fr: {
    subject: 'Votre message a bien été envoyé ✔️',
    heading: (firstname) => `Merci${firstname ? `, ${firstname}` : ''} !${CHECK_ICON}`,
    body: 'Votre message a bien été envoyé, je vous répondrai rapidement.',
    preheader: (firstname) => `Merci${firstname ? ` ${firstname}` : ''}, votre message est bien parti. Je vous réponds rapidement.`,
    recapTitle: 'Récapitulatif de votre demande',
    project: 'Projet',
    message: 'Message',
    viewSite: 'Voir mon site',
  },
  en: {
    subject: 'Your message has been sent ✔️',
    heading: (firstname) => `Thank you${firstname ? `, ${firstname}` : ''}!${CHECK_ICON}`,
    body: "Your message has been sent, I'll get back to you shortly.",
    preheader: (firstname) => `Thanks${firstname ? ` ${firstname}` : ''}, your message is on its way. I'll get back to you shortly.`,
    recapTitle: 'Summary of your request',
    project: 'Project',
    message: 'Message',
    viewSite: 'View my website',
  },
};

function notificationHtml({ lastname, firstname, email, project, message, country, os }) {
  const inner = `
<h2 style="Margin:0 0 20px;font-family:lato,'helvetica neue',helvetica,arial,sans-serif;font-size:26px;line-height:32px;font-weight:normal;color:#333333">📬 Nouvelle demande via tibzdesign.fr</h2>
<table width="100%" cellspacing="0" cellpadding="0" role="none" style="border-spacing:0px">
<tbody>
${fieldRow('Nom', escapeHtml(lastname))}
${fieldRow('Prénom', escapeHtml(firstname))}
${fieldRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#1b3a1d;text-decoration:underline">${escapeHtml(email)}</a>`)}
${fieldRow('Projet', escapeHtml(project))}
${fieldRow('Message', escapeHtml(message).replace(/\n/g, '<br>'))}
${fieldRow('Pays', escapeHtml(country))}
${fieldRow('Système', escapeHtml(os))}
</tbody>
</table>`;
  const preheader = `${firstname} ${lastname}: ${message}`.trim().slice(0, 130);
  return emailDocument(contentTable(inner), null, preheader);
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
`;
  const showcase = `
<table cellspacing="0" cellpadding="0" align="center" class="es-content" role="none" style="border-spacing:0px;width:100%">
<tbody><tr><td align="center" style="padding:0;Margin:0">
<table cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center" class="es-content-body" role="none" style="border-spacing:0px;background-color:#FFFFFF;width:580px">
<tbody><tr><td align="left" style="padding:0 20px 20px;Margin:0">
${consoleGifHtml(lang, copy.viewSite)}
</td></tr></tbody>
</table>
</td></tr></tbody>
</table>`;
  return emailDocument(contentTable(inner) + showcase, null, copy.preheader(escapeHtml(firstname)));
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
  const pageLang = params.get('_lang') === 'en' ? 'en' : 'fr';
  const emailLang = detectSenderLang(req);

  if (!email || !message) {
    res.status(400).send('Missing required fields');
    return;
  }

  const fields = {
    lastname,
    firstname,
    email,
    project,
    message,
    country: detectCountry(req),
    os: detectOS(req),
  };

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.CONTACT_TO || 'tibzdesign@gmail.com',
      replyTo: email,
      subject: `📬 Nouvelle demande de ${firstname} ${lastname}`.trim(),
      html: notificationHtml(fields),
    });
  } catch (err) {
    console.error('Resend contact email failed:', err);
    res.status(500).send('Failed to send message');
    return;
  }

  try {
    await sendNtfyNotification(fields);
  } catch (err) {
    console.error('ntfy notification failed:', err);
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: email,
      replyTo: process.env.RESEND_FROM,
      subject: AUTOREPLY_COPY[emailLang].subject,
      html: autoReplyHtml(fields, emailLang),
    });
  } catch (err) {
    console.error('Resend auto-reply failed:', err);
  }

  res.writeHead(303, { Location: `/${pageLang}/contact?sent=true` });
  res.end();
};
