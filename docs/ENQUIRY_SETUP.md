# Enquiry delivery setup (decision D-08)

**Chosen:** a Google Sheet that receives every enquiry, plus an email notification to `contact@theyellowworks.com`. It is done with a small Google Apps Script "web app" that the website posts to.

**Why this option.** It needs no new vendor or card; you own the data in your own Google account; the sheet exports cleanly into a CRM later (Phase 6 onward, each row has a unique id); the script already handles retries (no duplicate rows), blocks spreadsheet-formula tricks and keeps working if the email fails. Other receivers (a form service, a database) also work, because the website only posts JSON to a URL.

**What is done and what only you can do.** The script is written and its logic was tested against mocks of the Google services (`node scripts/test-apps-script.mjs`, 8 checks pass). The website's side was tested against a receiver that redirects the way Apps Script does. **It has not been run on Google**, because creating the script needs your Google account, which I cannot and should not touch. Steps 1 to 6 are yours.

## Steps
1. Sign in to the Google account that should own the data. Create a new Google Sheet named "The Yellow Works enquiries".
2. In the sheet: Extensions, Apps Script. Delete the sample code and paste the whole of `docs/apps-script/enquiry-receiver.gs`.
3. Apps Script, Project Settings (gear), Script properties, Add property: name `SECRET`, value a long random string (at least 24 characters). Keep it private.
4. Deploy, New deployment, type Web app. "Execute as": **Me**. "Who has access": **Anyone**. Deploy and approve the permission prompts (Sheets and sending email). Copy the web app URL, which ends in `/exec`.
5. Build the delivery URL by adding the secret: `https://script.google.com/macros/s/XXXX/exec?key=THE_SECRET`.
6. In Vercel (Production and Preview), set `ENQUIRY_WEBHOOK_URL` to that URL. Leave `ENQUIRY_WEBHOOK_SECRET` empty (Apps Script cannot read headers; the secret travels in the URL, so keep the URL private and never commit it).
7. Test on the live domain: send one enquiry from the form. Check that the row appears once, the email arrives, and a second identical submit does not add a row. Also send one from `/demos/clinic`: its `Source` column should read `demo-clinic`.

## Notes
- Apps Script "Anyone" access means anyone with the URL **and** the secret can post. The website also rejects requests from other origins before they reach this script.
- Apps Script sends mail from your Google account and has a daily quota; a very large burst could exceed it. The row is still saved.
- If you change the script later, create a new deployment version, not a new deployment, so the URL stays the same.
- The privacy policy draft names Google Sheets and Google email as the service that receives enquiries. If you pick a different receiver, update the policy.
