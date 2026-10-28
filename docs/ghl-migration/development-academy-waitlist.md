# GHL Migration — Development Academy Waitlist (Development Group Tryout)

**Migration date:** 2026-10-22
**Branch:** `migration/ghl-trial-mississauga-central` (Preview branch: `migration/ghl-forms-preview`)
**Page:** https://www.aurigafootballclub.com/programs/development-academy/index.html (also linked from `/programs/development`)
**Status:** Migrated to GHL embed — original preserved for rollback (keep until explicitly approved for removal, minimum 1–2 months). **Live end-to-end submission not yet verified.**

---

## 1. What changed

This form lives on a **static HTML page** (`public/programs/development-academy/index.html`), not a React component — the GHL embed code could therefore be pasted almost verbatim (no JSX conversion needed).

| Item | Before | After |
|---|---|---|
| Form | Custom HTML form (`#waitlist-form`) + flatpickr date picker + Turnstile + `window.aurigaSubmitForm('development_tryout', ...)` (defined in `public/form-submit.js` → `functions/api/submit-form.js`) | Native GHL inline iframe embed |
| Submit handling | Inline `<script>` at the bottom of the page | Entirely inside the GHL iframe |
| Notifications / workflows | EmailJS + backend function | GHL workflows (configured in GHL) |
| Success state | Custom `#waitlist-confirmation` panel | GHL form's own confirmation (per GHL form settings) |
| Section header ("Book Your Development Group Tryout", "not a beginner program" warning, intro) | — | **Preserved unchanged** |

**GHL form (source of truth, provided by site owner):**
- Form name: `Development Group Tryout Form`
- Form ID: `LPIOMFrAWQoTVB5bJwad`
- Embed URL: `https://api.leadconnectorhq.com/widget/form/LPIOMFrAWQoTVB5bJwad`
- Loader script: `https://link.msgsndr.com/js/form_embed.js`

## 2. Files

| File | Change |
|---|---|
| `public/programs/development-academy/index.html` | **Modified** — `#waitlist-form` + `#waitlist-confirmation` replaced with the GHL iframe embed (in a white rounded container); the waitlist-specific JavaScript block (flatpickr init + submit handler) removed from the inline `<script>`. Everything else on the page (header, content sections, footer, carousel JS, mobile menu JS, Wati widget, GA/GTM) untouched. |
| `legacy/programs/development-academy/index.html` | **Added** — byte-exact copy of the original page, created via `git show HEAD:public/programs/development-academy/index.html` (verified identical to the working tree at backup time). Stored at repo root `legacy/`, **outside `public/`**, so it is never deployed to the site. |
| `docs/ghl-migration/development-academy-waitlist.md` | **Added** — this document. |

**Deliberately NOT changed on the page:** the `<head>` script tags for Turnstile (`challenges.cloudflare.com/turnstile/v0/api.js`), `/form-submit.js`, and flatpickr remain. They are shared/static-site-wide resources, other static pages may use them, and removing them is not required for the migration (they are small and load harmlessly). `functions/api/submit-form.js`, `public/form-submit.js`, EmailJS config and all other backend code remain in place for the remaining custom forms (Etobicoke, personal training contact) and for rollback.

**Header sync note:** `npm run sync-header` (also runs as `prebuild`) only overwrites the `<header class="site-navbar">...</header>` block of static pages. The form section is outside that block, so this migration is not affected by the sync script.

## 3. Technical adjustments to the supplied embed code

1. The supplied embed is otherwise verbatim, including the `<script src="https://link.msgsndr.com/js/form_embed.js"></script>` tag placed right after the iframe (works as-is in static HTML).
2. Initial iframe `height` set to the supplied `data-height` value (`915px`) instead of `height:100%` — the surrounding `<article>` has no fixed height, so `100%` would collapse to the browser default (150px) before the GHL script resizes it. The GHL script overrides the height dynamically once loaded.
3. The iframe is wrapped in a `<div>` with `background:#ffffff;border-radius:8px;overflow:hidden;margin-top:2rem;` to match the card styling used by the other migrated forms.

## 4. How to restore the original form (rollback)

Option A — restore from the byte-exact backup (recommended):

```
cp legacy/programs/development-academy/index.html public/programs/development-academy/index.html
```

Option B — restore from the pre-migration commit `cce0afb`:

```
git checkout cce0afb -- public/programs/development-academy/index.html
```

`cce0afb` is the tip of `staging/ghl-form-integration` immediately before this migration and contains the exact original page. A commit hash stays valid even after branches move. Do **not** restore from `main` (it holds an older page that predates the custom backend) or from the current tip of `staging/ghl-form-integration` (it may contain the GHL embed). The restored form needs the old backend (`functions/api/submit-form.js` and its Cloudflare bindings), which remain in place.

After either option, verify `/programs/development-academy/index.html` renders the custom waitlist form and a test submission reaches the old backend.

## 5. Known limitations / follow-ups

- **Theme:** the iframe content is cross-origin and cannot be styled from this codebase. The surrounding dark navy layout is preserved; to make the form itself dark, adjust colors in the GHL form builder (Sites → Forms → `Development Group Tryout Form`).
- **Analytics:** GA4/GTM pageview tracking on the static page is unaffected. This static page never had `generate_lead`/`form_error` calls and its old form had no `data-analytics-form` attribute, so no existing GA4 form event is lost here. The static page does not load the GHL `external-tracking.js` script (only the root `index.html` does), so attribution on this page may be weaker. Lead notifications are handled by GHL workflows. Proposed separate fix (not implemented, needs its own review): add the GHL external-tracking script to this static page and set the GHL form's post-submit action to a tracked thank-you URL to count as the GA4 conversion.
- **Local automated-browser testing caveat:** the GHL form includes Cloudflare Turnstile bot protection. After repeated rapid reloads in an automated local browser, the in-form challenge can abort and GHL's `form_embed.js` then never reveals the iframe (stays `visibility:hidden`). Reproduced with the verbatim embed on a plain static HTML page, so it is not caused by this integration. The standalone embed URL renders fine. Verify in the Cloudflare Pages Preview or a normal browser instead of debugging this locally.
- **Test submission / GHL-side verification** (contact created, notifications, workflows) must be confirmed in the GHL sub-account by someone with dashboard access; that cannot be verified from the codebase.
