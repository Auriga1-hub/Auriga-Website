# GHL Migration — General Inquiry Form (Contact Page)

**Migration date:** 2026-10-22
**Branch:** `migration/ghl-trial-mississauga-central` (Preview branch: `migration/ghl-forms-preview`)
**Page:** https://www.aurigafootballclub.com/contact
**Status:** Migrated to GHL embed — original preserved for rollback (keep until explicitly approved for removal, minimum 1–2 months). **Live end-to-end submission not yet verified.**

---

## 1. What changed

| Item | Before | After |
|---|---|---|
| Form | Custom React form (Turnstile + custom backend `submitWebsiteForm("contact", ...)`) | Native GHL inline iframe embed |
| Submit handling | `handleSubmit` in the page component | Entirely inside the GHL iframe |
| Notifications / workflows | EmailJS + backend function | GHL workflows (configured in GHL) |
| Success state | Custom `contact-success` panel | GHL form's own confirmation (per GHL form settings) |
| Left info panel (phone/email/location/socials), hero, SEO, structured data | — | **Preserved unchanged** |

**GHL form (source of truth, provided by site owner):**
- Form name: `General Inquiry Form`
- Form ID: `tzLHeZU1w3WChB1IAw2L`
- Embed URL: `https://api.leadconnectorhq.com/widget/form/tzLHeZU1w3WChB1IAw2L`
- Loader script: `https://link.msgsndr.com/js/form_embed.js`

## 2. Files

| File | Change |
|---|---|
| `src/pages/contact.jsx` | **Modified** — custom form replaced with the GHL iframe embed inside the existing sticky `contact-form-wrapper` card. SEOHead, `StructuredData` (LocalBusiness + breadcrumb), hero and the full left info panel preserved. |
| `src/pages/legacy/contact.legacy.jsx` | **Added** — exact, recoverable copy of the original page component (renamed `ContactLegacy`, import paths adjusted for the `legacy/` subfolder). Not imported by any route. |
| `src/css/contact.css` | **Modified** — added a `.ghl-embed-wrapper` rule (white background, rounded corners) next to the existing `.contact-form` styles. All original styles untouched. |
| `docs/ghl-migration/general-inquiry-contact.md` | **Added** — this document. |

**Deliberately NOT changed:** `src/App.jsx`, all `free_trial_*` pages (already migrated separately), `personal_training_contact.jsx` (still uses the custom backend), `src/utils/submitForm.js`, `src/utils/emailConfig.js`, `src/utils/googleSheetsSync.js`, `src/utils/trialAutoReply.js`, `functions/api/submit-form.js`, `public/form-submit.js`, Turnstile/EmailJS configuration and `package.json` dependencies — the custom backend must stay while `personal_training_contact.jsx` (and any legacy restores) still depend on it.

## 3. Technical adjustments to the supplied embed code

1. HTML attributes converted to JSX (`style` object, template literals for IDs). All `data-*` attributes copied verbatim.
2. The `<script src="https://link.msgsndr.com/js/form_embed.js">` tag is injected once via `useEffect` (a literal JSX `<script>` would not execute reliably in a React SPA). The script auto-resizes the iframe via postMessage.
3. Initial iframe `height` set to the supplied `data-height` value (`885px`) instead of `height:100%` — the surrounding card has no fixed height, so `100%` would collapse to the browser default (150px) before the GHL script resizes it. The GHL script overrides the height dynamically once loaded.

## 4. How to restore the original form (rollback)

Option A — restore from the legacy copy (recommended):

1. Open `src/pages/legacy/contact.legacy.jsx`.
2. Copy its entire contents into `src/pages/contact.jsx`.
3. Fix the import paths (the legacy copy lives one folder deeper):
   - `../../css/contact.css` → `../css/contact.css`
   - `../../utils/submitForm` → `../utils/submitForm`
   - `../../utils/analytics` → `../utils/analytics`
   - `../../components/SEOHead` → `../components/SEOHead`
   - `../../components/StructuredData` → `../components/StructuredData`
4. Optionally rename the component back from `ContactLegacy` to `Contact` (default export — the name does not affect the route).
5. In `src/css/contact.css`, remove the `.ghl-embed-wrapper` rule (optional; harmless if left).
6. No route changes needed — `src/App.jsx` was never modified.

Option B — restore from the pre-migration commit `cce0afb`:

```
git checkout cce0afb -- src/pages/contact.jsx src/css/contact.css
```

`cce0afb` is the tip of `staging/ghl-form-integration` immediately before this migration and contains the exact original form. A commit hash stays valid even after branches move. Do **not** restore from `main` (it holds an older form that predates the custom backend) or from the current tip of `staging/ghl-form-integration` (it may contain the GHL embeds). Restored forms need the old backend (`functions/api/submit-form.js` and its Cloudflare bindings), which remain in place.

After either option, verify `/contact` renders the custom form and a test submission reaches the old backend.

## 5. Known limitations / follow-ups

- **Theme:** the iframe content is cross-origin and cannot be styled from this codebase. The surrounding dark navy layout is preserved; to make the form itself dark, adjust colors in the GHL form builder (Sites → Forms → `General Inquiry Form`).
- **Analytics gap:** SPA pageview tracking (App.jsx) is unaffected, but the `generate_lead` and `form_error` GA4 events (fired by the old submit handler via `src/utils/analytics.js`) and the `form_start` and `form_submit_attempt` events (fired by `public/analytics.js` for `form[data-analytics-form]`) no longer fire for this form, because the page no longer has such a form and submission now happens inside the cross-origin GHL iframe. Lead notifications are handled by GHL workflows. Do not re-add a duplicate submit handler. Proposed separate fix (not implemented, needs its own review): (1) set the GHL form's post-submit action to a tracked thank-you URL and count that page view as the GA4 conversion, or (2) if GHL's embed script posts a submission message to the parent page, listen for it and call `trackLeadGenerated`. Option 2 depends on a message payload that has not been verified.
- **Local automated-browser testing caveat:** the GHL form includes Cloudflare Turnstile bot protection. After repeated rapid reloads in an automated local browser, the in-form challenge can abort and GHL's `form_embed.js` then never reveals the iframe (stays `visibility:hidden`). Reproduced with the verbatim embed on a plain static HTML page, so it is not caused by this React integration. The standalone embed URL renders fine. Verify in the Cloudflare Pages Preview or a normal browser instead of debugging this locally.
- **Test submission / GHL-side verification** (contact created, notifications, workflows) must be confirmed in the GHL sub-account by someone with dashboard access; that cannot be verified from the codebase.
