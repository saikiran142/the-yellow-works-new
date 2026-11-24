// Runs docs/apps-script/enquiry-receiver.gs against mocks of the Google services, to check its logic before it is deployed.
// This does NOT run on Google. It proves the script's own code paths: auth, validation, dedupe, formula guard, notification.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const code = readFileSync('docs/apps-script/enquiry-receiver.gs', 'utf8');
function fresh({ secret = 's3cret', failMail = false } = {}) {
  const rows = [['Received at','Enquiry id']]; const mails = []; // row 1 is the header, as in the real sheet
  const sheet = { getLastRow: () => rows.length, appendRow: (r) => rows.push(r), setFrozenRows() {}, getRange: (r, c, n) => ({ getValues: () => rows.slice(r - 1, r - 1 + n).map((x) => [x[c - 1]]) }) };
  const ctx = {
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => secret }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet, insertSheet: () => sheet }) },
    MailApp: { sendEmail: (m) => { if (failMail) throw new Error('quota'); mails.push(m); } },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (t) => ({ t, setMimeType() { return this; }, getContent: () => t }) },
  };
  vm.createContext(ctx); vm.runInContext(code, ctx);
  const post = (body, key = secret) => JSON.parse(ctx.doPost({ parameter: { key }, postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } }).t);
  return { post, get rows() { return rows.slice(1); }, mails, ctx };
}
const ok = { id: 'abcdefghijklmnop1234', receivedAt: '2026-01-01T00:00:00Z', source: 'theyellowworks.com', name: 'Asha', business: '', type: 'clinic', city: '', phone: '9811111111', message: 'Hello' };
let pass = 0, fail = 0;
const t = (name, fn) => { try { fn(); pass++; console.log('ok  ', name); } catch (e) { fail++; console.log('FAIL', name, '-', e.message); } };
const eq = (a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${JSON.stringify(a)} !== ${JSON.stringify(b)}`); };

t('rejects a wrong key', () => { const s = fresh(); eq(s.post(ok, 'nope').error, 'unauthorized'); eq(s.rows.length, 0); });
t('rejects when no secret is configured', () => { const s = fresh({ secret: '' }); eq(s.post(ok, '').error, 'unauthorized'); });
t('rejects bad JSON and bad ids', () => { const s = fresh(); eq(s.post('{not json').error, 'bad_json'); eq(s.post({ ...ok, id: 'short' }).error, 'bad_id'); eq(s.rows.length, 0); });
t('adds one row and sends one email', () => { const s = fresh(); eq(s.post(ok).ok, true); eq(s.rows.length, 1); eq(s.mails.length, 1); eq(s.rows[0][3], 'Asha'); });
t('is idempotent: a repeat id adds nothing and sends nothing', () => { const s = fresh(); s.post(ok); const r = s.post(ok); eq(r.duplicate, true); eq(s.rows.length, 1); eq(s.mails.length, 1); });
t('a different id adds a second row', () => { const s = fresh(); s.post(ok); s.post({ ...ok, id: 'zzzzzzzzzzzzzzzz9999' }); eq(s.rows.length, 2); });
t('neutralises spreadsheet formulas', () => { const s = fresh(); s.post({ ...ok, name: '=HYPERLINK("http://x")', message: '-2+3' }); eq(s.rows[0][3].startsWith("'="), true); eq(s.rows[0][8].startsWith("'-"), true); });
t('still succeeds when the email fails', () => { const s = fresh({ failMail: true }); eq(s.post(ok).ok, true); eq(s.rows.length, 1); });
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
