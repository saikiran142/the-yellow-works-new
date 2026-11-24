/**
 * The Yellow Works: enquiry webhook (Google Apps Script).
 * Receives the JSON POST from /api/enquiry, appends a row to a Google Sheet and sends a branded email.
 *
 * Script Properties (Project Settings > Script Properties), never hard-code these:
 *   SECRET    long random string; the website calls  <exec URL>?key=<SECRET>
 *   TO_EMAIL  where enquiries are emailed (contact@theyellowworks.com)
 *   SHEET_ID  the id of the Google Sheet (the long string in its URL)
 *
 * Deploy: Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
 * Personal data is never written to the execution log.
 */

var TAB = "Enquiries";
var HEADERS = ["Received (IST)", "ID", "Source", "Name", "Business", "Type", "City", "Phone", "Message"];
var TYPE_LABELS = { clinic: "Clinic", gym: "Gym", realty: "Real estate", other: "Other" };

function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty("SECRET");
  if (!secret || !safeEqual(String((e && e.parameter && e.parameter.key) || ""), secret)) {
    return json({ ok: false, error: "unauthorized" });
  }

  var d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "bad_json" });
  }
  var id = clip(d.id, 80);
  if (!id) return json({ ok: false, error: "missing_id" });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet(props.getProperty("SHEET_ID"));
    if (alreadySaved(sheet, id)) return json({ ok: true, duplicate: true });

    var received = d.receivedAt ? new Date(d.receivedAt) : new Date();
    var rec = {
      id: id,
      source: clip(d.source, 80),
      name: clip(d.name, 120),
      business: clip(d.business, 160),
      type: clip(d.type, 20),
      city: clip(d.city, 120),
      phone: clip(d.phone, 40),
      message: clip(d.message, 2000),
      when: Utilities.formatDate(received, "Asia/Kolkata", "dd MMM yyyy, hh:mm a"),
    };

    sheet.appendRow([rec.when, rec.id, rec.source, rec.name, rec.business, rec.type, rec.city, rec.phone, rec.message].map(cell));

    try {
      sendEmail(props.getProperty("TO_EMAIL"), rec, "https://docs.google.com/spreadsheets/d/" + props.getProperty("SHEET_ID"));
    } catch (mailErr) {
      // The row is saved; do not fail the request or log personal data.
      console.error("Email failed: " + (mailErr && mailErr.name));
    }
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- sheet ---------- */

function getSheet(sheetId) {
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#FFD52A").setFontColor("#16142B");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function alreadySaved(sheet, id) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var ids = sheet.getRange(2, 2, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]).replace(/^'/, "") === id) return true;
  return false;
}

/** Stops a visitor's text from running as a spreadsheet formula. */
function cell(v) {
  var s = String(v == null ? "" : v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

/* ---------- email ---------- */

function sendEmail(to, r, sheetUrl) {
  if (!to) return;
  var typeLabel = TYPE_LABELS[r.type] || "Other";
  var digits = r.phone.replace(/\D/g, "");
  var tel = r.phone.charAt(0) === "+" ? "+" + digits : digits;
  var subject = ("New enquiry: " + r.name + " (" + typeLabel + ")").replace(/[\r\n]+/g, " ").slice(0, 150);

  var text =
    "New website enquiry\n\n" +
    "Name: " + r.name + "\nBusiness: " + r.business + "\nType: " + typeLabel + "\nCity: " + r.city +
    "\nPhone: " + r.phone + "\nReceived: " + r.when + "\n\nMessage:\n" + r.message + "\n\nID: " + r.id;

  MailApp.sendEmail({ to: to, subject: subject, body: text, htmlBody: emailHtml(r, typeLabel, tel, digits, sheetUrl), name: "The Yellow Works Website" });
}

function emailHtml(r, typeLabel, tel, digits, sheetUrl) {
  var DUSK = "#16142B", SUN = "#FFD52A", PAPER = "#FFFCF2", BUTTER = "#FFF1B8", MUTED = "#5b5876";
  function row(label, value) {
    return '<tr><td style="padding:10px 0;border-bottom:1px solid #e6e2d2;font:600 12px/1.2 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:' + MUTED + ';width:110px;vertical-align:top">' + label +
      '</td><td style="padding:10px 0;border-bottom:1px solid #e6e2d2;font:600 16px/1.4 Arial,sans-serif;color:' + DUSK + '">' + esc(value) + "</td></tr>";
  }
  function btn(href, label, bg, fg) {
    return '<a href="' + href + '" style="display:inline-block;padding:14px 26px;margin:0 8px 8px 0;border-radius:999px;background:' + bg + ";color:" + fg + ';font:700 15px/1 Arial,sans-serif;text-decoration:none">' + label + "</a>";
  }
  var wa = digits ? "https://wa.me/" + digits : "";

  return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>' +
    '<body style="margin:0;padding:0;background:#ece8d8">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0">' + esc(r.name) + " from " + esc(r.business) + " sent an enquiry.</div>" +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ece8d8"><tr><td align="center" style="padding:24px 12px">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:' + PAPER + ';border-radius:24px;overflow:hidden">' +

    // header
    '<tr><td style="background:' + DUSK + ';padding:28px 32px">' +
    '<table role="presentation" width="100%"><tr>' +
    '<td style="font:800 20px/1 Arial,sans-serif;color:' + SUN + ';letter-spacing:-.02em">The Yellow Works</td>' +
    '<td align="right"><span style="display:inline-block;padding:7px 14px;border-radius:999px;background:' + SUN + ";color:" + DUSK + ';font:700 12px/1 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase">New enquiry</span></td>' +
    "</tr></table></td></tr>" +

    // headline
    '<tr><td style="background:' + DUSK + ';padding:0 32px 36px">' +
    '<div style="font:800 30px/1.1 Arial,sans-serif;color:' + PAPER + ';letter-spacing:-.02em">' + esc(r.name) + '<br><span style="background:' + SUN + ";color:" + DUSK + ';padding:0 6px">wants a website.</span></div>' +
    '<div style="margin-top:16px"><span style="display:inline-block;padding:6px 12px;border-radius:8px;background:' + BUTTER + ";color:" + DUSK + ';font:700 13px/1 Arial,sans-serif">' + esc(typeLabel) + "</span>" +
    '<span style="font:400 14px/1 Arial,sans-serif;color:#cfcbe0;margin-left:10px">' + esc(r.business) + "</span></div></td></tr>" +

    // details
    '<tr><td style="padding:28px 32px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    row("Name", r.name) + row("Business", r.business) + row("City", r.city) + row("Phone", r.phone) + row("Received", r.when) +
    "</table></td></tr>" +

    // message
    '<tr><td style="padding:12px 32px 4px"><div style="font:600 12px/1.2 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:' + MUTED + ';margin-bottom:8px">Message</div>' +
    '<div style="border-left:5px solid ' + SUN + ";background:#fff;border-radius:0 14px 14px 0;padding:16px 18px;font:400 16px/1.55 Arial,sans-serif;color:" + DUSK + ';white-space:pre-wrap">' + esc(r.message || "(no message)") + "</div></td></tr>" +

    // actions
    '<tr><td style="padding:26px 32px 8px">' +
    btn("tel:" + tel, "Call now", SUN, DUSK) + (wa ? btn(wa, "WhatsApp", DUSK, PAPER) : "") + "</td></tr>" +
    '<tr><td style="padding:0 32px 28px"><a href="' + esc(sheetUrl) + '" style="font:600 14px/1 Arial,sans-serif;color:' + DUSK + '">View all enquiries in the sheet &rarr;</a></td></tr>' +

    // footer
    '<tr><td style="background:' + BUTTER + ';padding:16px 32px;font:400 12px/1.5 Arial,sans-serif;color:' + MUTED + '">Sent from the ' + esc(r.source) + " website form &middot; ID " + esc(r.id) + "</td></tr>" +
    "</table></td></tr></table></body></html>";
}

/* ---------- helpers ---------- */

function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function clip(v, n) { return String(v == null ? "" : v).slice(0, n); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  var x = 0;
  for (var i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

/** Run once from the editor to authorise the script and see a sample row and email. Fake data only. */
function testEnquiry() {
  var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
  var res = doPost({
    parameter: { key: secret },
    postData: { contents: JSON.stringify({
      id: "test-" + Date.now(), receivedAt: new Date().toISOString(), source: "theyellowworks.com",
      name: "Test Person", business: "Sample Dental Clinic", type: "clinic", city: "Sample City",
      phone: "+910000000000", message: "This is a test enquiry.\nSecond line to check formatting.",
    }) },
  });
  console.log(res.getContent());
}
