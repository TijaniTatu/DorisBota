import { Resend } from 'resend';
import { escapeHtml } from './http.js';

const from = () => process.env.MAIL_FROM || 'Doris Bota <onboarding@resend.dev>';
const to = () => process.env.MAIL_TO || 'dbota@integratedhealthsystemstransformation.com';

let client;
function resend() {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

/**
 * Send an email, returning a status rather than throwing.
 *
 * A failed notification must never fail the submission the visitor made —
 * their data is already stored, and the admin view shows the send status.
 */
export async function send({ to: recipient, subject, html, replyTo }) {
  const api = resend();
  if (!api) {
    console.warn('RESEND_API_KEY is not set — skipping email:', subject);
    return 'skipped';
  }
  try {
    const { error } = await api.emails.send({
      from: from(),
      to: recipient ?? to(),
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error('Resend rejected the message:', error);
      return 'failed';
    }
    return 'sent';
  } catch (err) {
    console.error('Email send threw:', err);
    return 'failed';
  }
}

/** Shared shell so both emails look like they come from the same place. */
function shell(title, inner) {
  return `<!doctype html><html><body style="margin:0;background:#e8eded;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#0a1f2c">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff">
    <tr><td style="background:#072c42;padding:28px 32px">
      <div style="font-size:22px;color:#ffffff">Doris Bota</div>
      <div style="font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#c9a961;margin-top:6px">${escapeHtml(title)}</div>
      <div style="height:2px;background:#c9a961;margin-top:20px"></div>
    </td></tr>
    <tr><td style="padding:32px">${inner}</td></tr>
    <tr><td style="padding:0 32px 28px;font-family:system-ui,sans-serif;font-size:11px;color:#4a5f6b">
      From policy to practice. From projects to institutions.
    </td></tr>
  </table></body></html>`;
}

const row = (label, value) =>
  `<tr>
     <td style="padding:8px 0;border-top:1px solid #e2e6e6;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4a5f6b;vertical-align:top;width:38%">${escapeHtml(label)}</td>
     <td style="padding:8px 0;border-top:1px solid #e2e6e6;font-family:system-ui,sans-serif;font-size:14px;color:#0a1f2c">${escapeHtml(value || '—')}</td>
   </tr>`;

export function inquiryEmail(form) {
  return shell(
    'New scoping enquiry',
    `<p style="margin:0 0 20px;font-size:19px">${escapeHtml(form.name)} would like to talk.</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
       ${row('Email', form.email)}
       ${row('Organisation', form.organisation)}
       ${row('Role', form.role)}
     </table>
     <p style="margin:24px 0 8px;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4a5f6b">Message</p>
     <p style="margin:0;font-family:system-ui,sans-serif;font-size:15px;line-height:1.65;white-space:pre-line">${escapeHtml(form.message)}</p>
     <p style="margin:28px 0 0;font-family:system-ui,sans-serif;font-size:13px">
       <a href="mailto:${escapeHtml(form.email)}" style="color:#2e7d8f">Reply to ${escapeHtml(form.name)}</a>
     </p>`,
  );
}

export function reportEmail({ details, score, url, priorities }) {
  const list = priorities
    .map(
      (p, i) =>
        `<tr>
           <td style="padding:10px 0;border-top:1px solid #e2e6e6;width:34px;vertical-align:top">
             <span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;background:#c9a961;color:#072c42;font-family:ui-monospace,Menlo,monospace;font-size:12px">${i + 1}</span>
           </td>
           <td style="padding:10px 0;border-top:1px solid #e2e6e6;font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">
             <strong style="color:#0a1f2c">${escapeHtml(p.name)}</strong>
             <span style="color:#4a5f6b"> — scored ${p.score} of 4</span><br>
             <span style="color:#4a5f6b">${escapeHtml(p.action)}</span>
           </td>
         </tr>`,
    )
    .join('');

  return shell(
    'Your diagnostic report',
    `<p style="margin:0 0 8px;font-size:21px">${escapeHtml(details.firstName)}, your report is ready.</p>
     <p style="margin:0 0 26px;font-family:system-ui,sans-serif;font-size:14px;line-height:1.65;color:#4a5f6b">
       ${escapeHtml(details.organisation)} scored a mean of <strong style="color:#0a1f2c">${score.overallAverage.toFixed(1)} of 4.0</strong>
       across ten domains — an integration score of ${score.integrationPercent}%, placing it in the band
       <strong style="color:#0a1f2c">${escapeHtml(score.riskBand.toLowerCase())}</strong>.
     </p>
     <p style="margin:0 0 12px;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4a5f6b">Your three priority domains</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${list}</table>
     <p style="margin:30px 0 0">
       <a href="${escapeHtml(url)}" style="display:inline-block;background:#072c42;color:#ffffff;font-family:system-ui,sans-serif;font-size:14px;text-decoration:none;padding:14px 26px">Read your full report</a>
     </p>
     <p style="margin:18px 0 0;font-family:system-ui,sans-serif;font-size:12px;line-height:1.6;color:#4a5f6b">
       The link is unique to you and does not expire. The report includes all ten domain scores and a 90-day plan.
       This diagnostic is directional — it is not an accreditation, audit, certification or clinical assessment.
     </p>`,
  );
}

/** Doris's own copy — a completed diagnostic is a lead, so it reads like one. */
export function diagnosticNotifyEmail({ details, score, url, priorities }) {
  const list = priorities
    .map(
      (p) =>
        `<tr>
           <td style="padding:8px 0;border-top:1px solid #e2e6e6;font-family:system-ui,sans-serif;font-size:14px;color:#0a1f2c">${escapeHtml(p.name)}</td>
           <td style="padding:8px 0;border-top:1px solid #e2e6e6;font-family:ui-monospace,Menlo,monospace;font-size:13px;color:#4a5f6b;text-align:right">${p.score} / 4</td>
         </tr>`,
    )
    .join('');

  return shell(
    'Diagnostic completed',
    `<p style="margin:0 0 8px;font-size:21px">${escapeHtml(details.firstName)} ${escapeHtml(details.lastName)} completed the diagnostic.</p>
     <p style="margin:0 0 26px;font-family:system-ui,sans-serif;font-size:14px;line-height:1.65;color:#4a5f6b">
       ${escapeHtml(score.riskBand)} — mean ${score.overallAverage.toFixed(1)} of 4.0, integration ${score.integrationPercent}%.
     </p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
       ${row('Organisation', details.organisation)}
       ${row('Role', details.roleTitle)}
       ${row('Country or region', details.countryRegion)}
       ${row('Email', details.email)}
       ${row('Phone', details.phone)}
       ${row('Context notes', details.contextNotes)}
     </table>
     <p style="margin:26px 0 12px;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4a5f6b">Weakest domains</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${list}</table>
     <p style="margin:30px 0 0">
       <a href="${escapeHtml(url)}" style="display:inline-block;background:#072c42;color:#ffffff;font-family:system-ui,sans-serif;font-size:14px;text-decoration:none;padding:14px 26px">Open their report</a>
     </p>`,
  );
}
