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
