# Enquiries to Google Sheet + email (Apps Script)

The website posts each enquiry to `ENQUIRY_WEBHOOK_URL`. The script in `enquiry-apps-script.gs` saves a row in a Google Sheet and emails the enquiry to `contact@theyellowworks.com`. Do this while signed in as the Google account that owns the data (currently `the.yellowworks@gmail.com`; `contact@theyellowworks.com` is not a Google account). Emails go to `TO_EMAIL`.

1. Create a Google Sheet. Copy its id (the long string in the URL between `/d/` and `/edit`).
2. In the Sheet: Extensions > Apps Script. Replace the code with `enquiry-apps-script.gs`.
3. Project Settings > Script Properties, add:
   - `SECRET`: a long random string (for example `openssl rand -hex 32`)
   - `TO_EMAIL`: `contact@theyellowworks.com`
   - `SHEET_ID`: the id from step 1
4. Select `testEnquiry` and Run. Accept the permissions. A row and an email should appear.
5. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Copy the `/exec` URL. After later edits to the script, use Deploy > Manage deployments > Edit > New version.
6. In Vercel > Settings > Environment Variables (Production and Preview):
   - `ENQUIRY_WEBHOOK_URL` = `<exec URL>?key=<SECRET>`
   - `ENQUIRY_WEBHOOK_SECRET`: leave unset. Google rejects a non-Google `Authorization` header, so for Apps Script the secret travels only in the URL (the site also skips the header for `script.google.com`).

   Then redeploy (env changes only apply to new deployments).
7. Submit the live form with fake data and confirm the row and the email arrive. If the secret is wrong, the script answers `{ok:false}` and the form shows "didn't send" (it no longer reports success).

Notes: enquiries are personal data, so restrict who the Sheet is shared with and complete the privacy policy placeholders before launch. Apps Script cannot read request headers, which is why the secret is in the URL query (server-side env var only). Gmail limits: about 100 emails/day on a free account, 1,500 on Workspace.
