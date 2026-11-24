/**
 * The Yellow Works enquiry receiver (Google Apps Script web app).
 * Receives the JSON the website posts, appends one row per enquiry to a Google Sheet, and emails a notification.
 * Safe to retry: the same enquiry id is never added twice.
 *
 * Setup: see docs/ENQUIRY_SETUP.md.
 */
const SHEET_NAME = 'Enquiries';
const NOTIFY_EMAIL = 'contact@theyellowworks.com';
const HEADERS = ['Received at', 'Enquiry id', 'Source', 'Name', 'Business or service', 'Type', 'City or time', 'Phone', 'Message'];

function doPost(e) {
  // The shared secret travels as ?key=... on the web app URL. Apps Script cannot read request headers.
  const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
  if (!secret || !e || !e.parameter || e.parameter.key !== secret) return out_({ ok: false, error: 'unauthorized' });

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return out_({ ok: false, error: 'bad_json' });
  }

  const id = String(data.id || '');
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(id)) return out_({ ok: false, error: 'bad_id' });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let added = false;
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    const last = sheet.getLastRow();
    const ids = last > 1 ? sheet.getRange(2, 2, last - 1, 1).getValues().map(function (r) { return r[0]; }) : [];
    if (ids.indexOf(id) === -1) {
      sheet.appendRow([
        safe_(data.receivedAt), id, safe_(data.source), safe_(data.name), safe_(data.business),
        safe_(data.type), safe_(data.city), safe_(data.phone), safe_(data.message),
      ]);
      added = true;
    }
  } finally {
    lock.releaseLock();
  }

  if (added) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New enquiry: ' + String(data.name || 'unnamed') + ' (' + String(data.source || 'website') + ')',
        body: ['Name: ' + data.name, 'Phone: ' + data.phone, 'Type: ' + data.type, 'Business or service: ' + data.business,
          'City or time: ' + data.city, 'Source: ' + data.source, '', String(data.message || '')].join('\n'),
      });
    } catch (err) {
      // The row is saved. A failed email must not make the website think the enquiry was lost.
    }
  }
  return out_({ ok: true, duplicate: !added });
}

function doGet() {
  return ContentService.createTextOutput('Enquiry receiver is running.');
}

/** Stops spreadsheet formula injection: a cell that starts with = + - @ is stored as plain text. */
function safe_(v) {
  const s = String(v === undefined || v === null ? '' : v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
