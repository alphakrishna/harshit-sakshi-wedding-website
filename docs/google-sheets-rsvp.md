# Connect the RSVP form to Google Sheets

The form sends each response to a small Google Apps Script, which adds a row to your sheet. It's free and needs no server.

## 1. Create the sheet
1. Create a new Google Sheet, for example **"Harshit & Sakshi RSVP"**.
2. Rename the first tab to **`RSVP`**.
3. In row 1, add these headers:
   `Timestamp | Name | Email | Attending | Guests | Message`

## 2. Add the script
1. In the sheet, open **Extensions → Apps Script**.
2. Delete everything in `Code.gs` and paste this:

```js
const SHEET_NAME = "RSVP";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      clean(p.name, 120),
      clean(p.email, 160),
      p.attending === "yes" ? "Yes" : "No",
      Math.max(0, Math.min(20, Number(p.guests) || 0)),
      clean(p.message, 1000),
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Strip leading = + - @ so a guest can't inject a spreadsheet formula
function clean(value, max) {
  return String(value || "").slice(0, max).replace(/^[=+\-@]+/, "");
}
```

3. Click **Deploy → New deployment**, choose type **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, approve the permissions, and copy the **Web app URL**. It ends in `/exec`.

## 3. Put the URL in the site
Pick one:
- **Easiest:** paste it into `rsvp.endpoint` in `src/config/wedding.ts`, replacing `process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? ""`.
- **Or** set an environment variable `NEXT_PUBLIC_RSVP_ENDPOINT=<url>` in your host's settings (Vercel, Netlify or Cloudflare), then redeploy.

## 4. Test it
Submit the form once on the live site and check that a new row appears in the sheet.

> If you edit the script later, use **Deploy → Manage deployments → Edit → New version**. That keeps the same URL.
