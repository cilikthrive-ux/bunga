/**
 * Precious Nuha – order inbox.
 * Paste this into Extensions → Apps Script of the "Precious Nuha Orders" Google Sheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * The website (catalogue.html) posts each order here; it is added as one row on the FIRST tab.
 */
const HEADERS = [
  "order_id", "created_at", "name", "phone", "delivery", "address", "postcode", "city",
  "items", "subtotal", "total", "wish", "preorder_by", "lines_json"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const o = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!o.id || !o.name) return reply("ignored");

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    // The same order sent twice (double tap, retry) is saved once.
    const last = sheet.getLastRow();
    const ids = last > 1 ? sheet.getRange(2, 1, last - 1, 1).getDisplayValues().map(r => r[0]) : [];
    if (ids.indexOf(String(o.id)) >= 0) return reply("duplicate");

    const list = v => (Array.isArray(v) ? v : []).slice(0, 50).map(x => ({
      name: text(x.name, 120), qty: num(x.qty), price: num(x.price)
    }));
    const items = list(o.items), postage = list(o.postage), addons = list(o.addons);
    const lines = items.concat(postage, addons);

    sheet.appendRow([
      cell(o.id, 40), cell(o.created_at, 40), cell(o.name, 120), cell(o.phone, 40),
      cell(o.delivery, 60), cell(o.address, 500), cell(o.postcode, 10), cell(o.city, 120),
      cell(items.map(i => `${i.name} x ${i.qty}`).join(", "), 1000),
      num(o.subtotal), num(o.total), cell(o.wish, 500), cell(o.preorder_by, 40),
      cell(JSON.stringify(lines), 5000)
    ]);
    return reply("ok");
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return reply("Precious Nuha order inbox is running."); }

function text(v, max) { return String(v == null ? "" : v).slice(0, max); }
// A leading apostrophe keeps phone numbers' leading 0 and stops anything being read as a formula.
function cell(v, max) { const t = text(v, max); return t ? "'" + t : ""; }
function num(v) { const n = Number(v); return isFinite(n) ? Math.round(n * 100) / 100 : 0; }
function reply(t) { return ContentService.createTextOutput(t); }
