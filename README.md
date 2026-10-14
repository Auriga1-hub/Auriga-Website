# Auriga Site

## Analytics

The site uses Google Analytics 4 with measurement ID `G-3SC8P695HJ`.

- Shared GA4 loader: `public/analytics.js`
- React SPA page views: `src/App.jsx`
- Static landing pages load the same shared script from `/analytics.js`
- React event helpers: `src/utils/analytics.js`

To change the GA4 property later, update the measurement ID in `public/analytics.js`.

Tracked events now include:

- `page_view`
- `scroll_depth`
- `cta_click`
- `contact_click`
- `social_click`
- `directions_click`
- `outbound_click`
- `form_start`
- `form_submit_attempt`
- `form_error`
- `generate_lead`
- `location_select`
- `faq_open`

Recommended GA4 setup:

- Mark `generate_lead` as a key event in Google Analytics.
- Create custom dimensions for `form_name`, `lead_type`, `location_name`, `program_name`, `preferred_time`, `heard_about`, `program_type`, and `faq_question` if you want to report on them directly in the GA4 UI.

You can view traffic data in Google Analytics:

- Reports > Acquisition > Traffic acquisition for users, sessions, and traffic source
- Reports > Tech > Tech details for device, browser, OS, and platform
- Reports snapshot or Realtime for daily activity and live visitors

## Cloudflare Pages Form Delivery

### Endpoint and build

Cloudflare Pages discovers Functions from the repository-root `functions/` directory. The endpoint in `functions/api/submit-form.js` is available at `POST /api/submit-form`; it takes precedence over the SPA catch-all in `public/_redirects`. Keep the Pages project root at the repository root, use `npm run build` as the build command, and use `dist` as the build output directory. Vite copies `public/` assets, including the shared `form-submit.js`, into that output. No production deployment configuration or `_routes.json` change is required.

### Cloudflare configuration

Configure these values under the Pages project's **Settings > Variables and Secrets** for both Preview and Production:

- `TURNSTILE_SECRET_KEY` — encrypted secret from the Turnstile widget.
- `GHL_WEBHOOK_URL` — encrypted GoHighLevel Inbound Webhook URL. Never put it in frontend source, build variables prefixed with `VITE_`, or browser logs.
- `TURNSTILE_EXPECTED_HOSTNAME` — non-secret exact hostname for that environment. Production defaults to `aurigafootballclub.com`; configure the exact preview hostname for the staging deployment.

Allow the production and staging hostnames in the Turnstile widget configuration. The endpoint rejects submissions if its request hostname is not the configured hostname or if Siteverify reports a different hostname. It does not return secret values in responses or logs. Missing required secrets fail closed and produce a structured configuration event.

### Submission contract

The browser sends `{ form_type, fields, turnstile_token }` as JSON to the same-origin endpoint. The Function validates fields and availability, verifies the token with Cloudflare Siteverify, and makes one attempt each to GHL, EmailJS, and Apps Script in parallel. Only a 2xx GHL response counts as an accepted CRM submission. The response reports all three provider outcomes independently; a failed GHL request is never reported as accepted.

The normalized GHL object uses this schema. Optional fields are omitted when not collected:

```json
{
	"submission_id": "server-generated UUID",
	"form_type": "contact | assessment | personal_training | development_tryout",
	"first_name": "derived from the submitted parent/contact name",
	"last_name": "derived from the submitted parent/contact name",
	"email": "validated email",
	"phone": "normalized international phone",
	"player_name": "when collected",
	"player_dob": "YYYY-MM-DD when collected",
	"player_age": "string; derived from DOB or submitted as a string",
	"years_played": "when collected",
	"current_level": "when collected",
	"program": "when applicable",
	"location": "when collected or selected for assessment",
	"preferred_date": "when collected",
	"preferred_time": "when collected",
	"referral_source": "when collected",
	"message": "when collected",
	"source": "Website",
	"submitted_at": "server-generated ISO 8601 timestamp"
}
```

`submission_id` is generated for each validated attempt, sent to GHL, and included in structured Cloudflare logs and responses for troubleshooting. It is not an idempotency key: a user resubmission creates a new ID.

Development Academy tryout dates are validated as ISO date-only values against the `America/Toronto` calendar date and Tuesday/Thursday schedule. Today is allowed when it is a Tuesday or Thursday, matching the existing date picker. The form describes the academy as serving both Mississauga and Brampton; that combined location is retained in the normalized GHL payload and existing EmailJS notification rather than inventing a single venue.

### Preserved integrations and limits

The Function retains the existing EmailJS service/template IDs and parameter names, and retains the Apps Script field aliases and spreadsheet columns. Assessment Sheets rows preserve `from_name` as the submitted parent name and `from_email` as the submitted email. The legacy `g-recaptcha-response` column remains present with an empty value: the old browser helper passed the Turnstile token under that misleading name, but the server must not forward a verified, single-use Turnstile token to Sheets. Confirm with the Apps Script owner that this column does not require a non-empty token; the Apps Script source is not in this repository. EmailJS is sent from the server after Turnstile verification. The existing development waitlist's separate Sheets destination is also used server-side. The browser no longer treats a `no-cors` request as proof of sheet delivery.

There is no durable queue or idempotency store in this project. The Function makes one attempt per provider and never automatically retries GHL, EmailJS, or Apps Script. If GHL fails or times out, the client reports that CRM receipt could not be confirmed and tells the user to contact Auriga before resubmitting; EmailJS/Sheets may still have succeeded. A GHL timeout can be ambiguous: GHL may have accepted the lead even if its response did not reach the Function. Check the Cloudflare log and the GHL record by `submission_id` before asking for a retry. If GHL accepted the lead but EmailJS or Sheets failed, recover from the GHL lead by manually sending the notification or appending the existing spreadsheet row. The legacy spreadsheet schema has no submission ID, so duplicate sheet rows cannot be reliably prevented across manual/browser retries without a schema change or a durable idempotency layer.

If automated durable recovery and deduplication become a requirement, add a Cloudflare D1 idempotency/outbox table and a Cloudflare Queue consumer. Persist the normalized submission and delivery states before acknowledging it, key repeat attempts with a stable client idempotency token, and update the spreadsheet integration to carry a deduplication key before claiming sheet-level deduplication. No in-memory retry is used here.

Structured JSON log events include `form.invalid`, `form.configuration_error`, `form.turnstile_failed`, `form.ghl_failed`, `form.ghl_rejected`, `form.ghl_accepted`, `form.emailjs_failed`, and `form.google_sheets_failed`. They include the submission ID where one has been generated, but not secrets, submitted form data, or provider response bodies.

### Tests and deployment

Run the mocked endpoint/helper tests with `npm test`, then run `npm run lint` and `npm run build`. Tests use synthetic data and mock Siteverify, GHL, EmailJS, and Apps Script; they do not prove that a real GHL workflow accepts or processes the configured payload.

For staging, deploy a branch/Preview deployment from the Cloudflare Pages dashboard with the repository root, `npm run build`, and `dist` output. Configure Preview secrets and its exact `TURNSTILE_EXPECTED_HOSTNAME`; ensure the Turnstile widget allows that hostname. Submit test data through every form, confirm `ghl: accepted` in the returned response/logs, inspect the received JSON in GHL, and confirm the intended workflow, EmailJS notification, and spreadsheet tab/columns.

For production, first configure the Production values above and confirm the Turnstile widget allows `aurigafootballclub.com`. After staging verification and explicit approval, merge or promote the tested revision through the Cloudflare Pages dashboard. Confirm the production build output is `dist`, then smoke-test one test-data submission per form type and verify the Function logs and GHL workflow. This repository change does not deploy automatically.
