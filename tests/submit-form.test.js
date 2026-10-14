import test from "node:test";
import assert from "node:assert/strict";
import { onRequest, __test } from "../functions/api/submit-form.js";

const originalWindow = globalThis.window;
globalThis.window = {};
await import("../public/form-submit.js");
const submitFromBrowser = globalThis.window.aurigaSubmitForm;
if (originalWindow === undefined) delete globalThis.window;
else globalThis.window = originalWindow;

const baseFields = {
  parent_name: "Sam Parent",
  phone: "+1 (416) 555-0142",
  email: "sam@example.ca",
  player_name: "Alex Parent",
  dob: "2017-05-12",
  years_played: "2 years",
  preferred_date: "2026-10-14",
  preferred_time: "Ages 4-8, 6:00-7:00 PM",
  heard_about: "Friend / Family Referral",
  message: "Please contact me.",
};

const makeContext = ({ body, method = "POST", env = {}, origin = "https://aurigafootballclub.com" } = {}) => ({
  request: new Request("https://aurigafootballclub.com/api/submit-form", {
    method,
    headers: {
      ...(origin ? { Origin: origin } : {}),
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    ...(body !== undefined ? { body: typeof body === "string" ? body : JSON.stringify(body) } : {}),
  }),
  env: {
    TURNSTILE_SECRET_KEY: "test-secret",
    TURNSTILE_EXPECTED_HOSTNAME: "aurigafootballclub.com",
    GHL_WEBHOOK_URL: "https://example.test/ghl",
    DEVELOPMENT_GOOGLE_SHEETS_URL: "https://example.test/sheets-development",
    ...env,
  },
});

const installFetch = (handler) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = handler;
  return () => { globalThis.fetch = originalFetch; };
};

const successfulProviderFetch = async (input) => {
  const url = String(input);
  if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
  if (url.includes("script.google.com") || url.includes("sheets")) return new Response("Success", { status: 200 });
  if (url.includes("emailjs")) return new Response("OK", { status: 200 });
  return Response.json({ accepted: true }, { status: 200 });
};

test("normalizes contact submissions and preserves international phone prefixes", () => {
  const result = __test.validateSubmission({
    form_type: "contact",
    fields: { name: "Sam van Doe", phone: "0044 20 7946 0958", email: "SAM@example.com", message: "Hello" },
  });
  assert.equal(result.value.phone, "+442079460958");
  assert.equal(result.value.email, "sam@example.com");
  assert.equal(result.value.first_name, "Sam");
  assert.equal(result.value.last_name, "van Doe");
  assert.equal(result.value.source, "Website");
  assert.ok(result.value.submission_id);
});

test("accepts each assessment location and rejects invalid locations", () => {
  const submissions = [
    ["Brampton", "2026-10-14", "Ages 4-8, 6:00-7:00 PM"],
    ["Brampton North", "2026-10-16", "U4-U8, 6:15-7:05 PM"],
    ["Brampton West", "2026-10-20", "U4-U8, 6:15-7:05 PM"],
    ["Brampton Girls Program", "2026-10-15", "Ages 4-8, 6:15-7:05 PM"],
    ["Etobicoke", "2026-10-19", "Ages 4-8, 6-7PM"],
    ["Mississauga Central", "2026-10-16", "U4-8, 6:00-7:00 PM"],
    ["Mississauga West", "2026-10-20", "Ages 4-8, 6:15-7:05 PM"],
  ];
  for (const [location, preferred_date, preferred_time] of submissions) {
    const result = __test.validateSubmission({ form_type: "assessment", fields: { ...baseFields, location, preferred_date, preferred_time } });
    assert.equal(result.value.location, location);
    assert.equal(typeof result.value.player_age, "string");
  }
  assert.equal(__test.validateSubmission({ form_type: "assessment", fields: { ...baseFields, location: "Unknown" } }).error, "invalid_location");
  assert.equal(__test.validateSubmission({ form_type: "assessment", fields: { ...baseFields, location: "Brampton", preferred_date: "2026-10-15" } }).error, "invalid_preferred_date");
  assert.equal(__test.validateSubmission({ form_type: "assessment", fields: { ...baseFields, location: "Brampton", preferred_time: "Unavailable" } }).error, "invalid_preferred_time");
});

test("rejects missing required values, malformed email, and malformed phone", () => {
  assert.equal(__test.validateSubmission({ form_type: "contact", fields: { name: "Sam", email: "sam@example.com", phone: "+14165550142" } }).error, "missing_required_fields");
  assert.equal(__test.validateSubmission({ form_type: "contact", fields: { name: "Sam", email: "bad", phone: "+14165550142", message: "Hello" } }).error, "invalid_email");
  assert.equal(__test.validateSubmission({ form_type: "contact", fields: { name: "Sam", email: "sam@example.com", phone: "12", message: "Hello" } }).error, "invalid_phone");
});

test("validates personal training and development tryout submissions", () => {
  const personalTraining = __test.validateSubmission({
    form_type: "personal_training",
    fields: { from_name: "Sam Parent", phone: "+14165550142", from_email: "sam@example.com", child_age: "9 years old", message: "Improve first touch" },
  });
  assert.equal(personalTraining.value.program, "Personal Training");
  assert.equal(personalTraining.value.player_age, "9 years old");

  const tryout = __test.validateSubmission({
    form_type: "development_tryout",
    fields: { parentName: "Sam Parent", phone: "+14165550142", email: "sam@example.com", childName: "Alex Parent", childAge: "9", level: "Intermediate", tryoutDate: "2026-10-15", heardAbout: "Google Search", message: "Tryout details" },
  }, new Date("2026-10-13T16:00:00.000Z"));
  assert.equal(tryout.value.form_type, "development_tryout");
  assert.equal(tryout.value.current_level, "Intermediate");
  assert.equal(tryout.value.player_age, "9");
  assert.equal(tryout.value.location, "Mississauga and Brampton");
  assert.equal(__test.validateSubmission({
    form_type: "development_tryout",
    fields: { parentName: "Sam Parent", phone: "+14165550142", email: "sam@example.com", childName: "Alex Parent", childAge: "13", level: "Other", tryoutDate: "2026-10-15" },
  }).error, "missing_required_fields");
});

test("validates Academy date-only values using the Toronto calendar date", () => {
  const now = new Date("2026-10-14T03:30:00.000Z");
  assert.deepEqual(__test.validateDevelopmentTryoutDate("2026-10-20", now), { ok: true });
  assert.deepEqual(__test.validateDevelopmentTryoutDate("2026-10-15", now), { ok: true });
  assert.deepEqual(__test.validateDevelopmentTryoutDate("2026-10-13", now), { ok: true });
  assert.equal(__test.validateDevelopmentTryoutDate("2026-10-06", now).reason, "past");
  assert.equal(__test.validateDevelopmentTryoutDate("2026-10-08", now).reason, "past");
  assert.equal(__test.validateDevelopmentTryoutDate("2026-02-30", now).reason, "invalid");
  assert.equal(__test.validateDevelopmentTryoutDate("2026-10-14", now).reason, "weekday");
});

test("returns 405 for unsupported methods and 413 for oversized requests", async () => {
  const methodResponse = await onRequest(makeContext({ method: "GET" }));
  assert.equal(methodResponse.status, 405);
  const largeContext = makeContext({ body: "x".repeat(16 * 1024 + 1) });
  const largeResponse = await onRequest(largeContext);
  assert.equal(largeResponse.status, 413);
});

test("rejects non-JSON content types", async () => {
  const context = makeContext({ body: "{}" });
  context.request = new Request(context.request.url, {
    method: "POST",
    headers: { Origin: "https://aurigafootballclub.com", "Content-Type": "text/plain" },
    body: "{}",
  });
  const response = await onRequest(context);
  assert.equal(response.status, 415);
});

test("fails safely when either required secret is missing", async () => {
  const restore = installFetch(async () => { throw new Error("unexpected fetch"); });
  try {
    for (const env of [{ GHL_WEBHOOK_URL: "" }, { TURNSTILE_SECRET_KEY: "" }]) {
      const response = await onRequest(makeContext({
        body: { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" } },
        env,
      }));
      assert.equal(response.status, 503);
      assert.equal((await response.json()).error, "service_unavailable");
    }
  } finally {
    restore();
  }
});

test("rejects invalid Turnstile tokens and incorrect hostnames", async () => {
  const restore = installFetch(async (url) => {
    if (String(url).includes("siteverify")) return Response.json({ success: true, hostname: "wrong.example" });
    throw new Error("provider must not run");
  });
  try {
    const response = await onRequest(makeContext({
      body: { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" }, turnstile_token: "valid-shaped-token" },
    }));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).error, "verification_failed");
  } finally {
    restore();
  }
});

test("rejects expired Turnstile tokens", async () => {
  const restore = installFetch(async () => Response.json({ success: false, "error-codes": ["timeout-or-duplicate"] }));
  try {
    const response = await onRequest(makeContext({
      body: { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" }, turnstile_token: "expired-token" },
    }));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).error, "verification_failed");
  } finally {
    restore();
  }
});

test("reports accepted GHL delivery and ancillary failures separately", async () => {
  const restore = installFetch(async (input) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("emailjs")) return new Response("Failed", { status: 400 });
    if (url.includes("script.google.com")) return new Response("Success", { status: 200 });
    return Response.json({ accepted: true }, { status: 200 });
  });
  try {
    const response = await onRequest(makeContext({
      body: { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" }, turnstile_token: "token" },
    }));
    const result = await response.json();
    assert.equal(response.status, 200);
    assert.equal(result.deliveries.ghl, "accepted");
    assert.equal(result.deliveries.emailjs, "failed");
    assert.equal(result.deliveries.google_sheets, "synced");
    assert.equal(result.accepted, true);
    assert.equal(result.partial_failure, true);
    assert.match(result.user_message, /please don't submit it again/);
  } finally {
    restore();
  }
});

test("attempts EmailJS and Sheets once even when GHL rejects", async () => {
  const calls = { ghl: 0, emailjs: 0, googleSheets: 0 };
  const restore = installFetch(async (input) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("ghl")) {
      calls.ghl += 1;
      return new Response("Rejected", { status: 500 });
    }
    if (url.includes("emailjs")) {
      calls.emailjs += 1;
      return new Response("OK", { status: 200 });
    }
    if (url.includes("script.google.com")) {
      calls.googleSheets += 1;
      return new Response("Sheet unavailable", { status: 500 });
    }
    throw new Error("unexpected provider");
  });
  try {
    const response = await onRequest(makeContext({
      body: { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" }, turnstile_token: "token" },
    }));
    const result = await response.json();
    assert.equal(response.status, 502);
    assert.deepEqual(calls, { ghl: 1, emailjs: 1, googleSheets: 1 });
    assert.equal(result.accepted, false);
    assert.deepEqual(result.deliveries, { ghl: "rejected", emailjs: "sent", google_sheets: "failed" });
  } finally {
    restore();
  }
});

test("reports a GHL timeout without retrying the webhook", async () => {
  const calls = { ghl: 0, emailjs: 0, googleSheets: 0 };
  const restore = installFetch(async (input) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("ghl")) {
      calls.ghl += 1;
      throw new DOMException("Aborted", "AbortError");
    }
    if (url.includes("emailjs")) {
      calls.emailjs += 1;
      return new Response("OK", { status: 200 });
    }
    if (url.includes("script.google.com")) {
      calls.googleSheets += 1;
      return new Response("Success", { status: 200 });
    }
    throw new Error("unexpected provider");
  });
  try {
    const response = await onRequest(makeContext({
      body: { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" }, turnstile_token: "token" },
    }));
    assert.equal(response.status, 502);
    const result = await response.json();
    assert.deepEqual(calls, { ghl: 1, emailjs: 1, googleSheets: 1 });
    assert.equal(result.accepted, false);
    assert.deepEqual(result.deliveries, { ghl: "timeout", emailjs: "sent", google_sheets: "synced" });
  } finally {
    restore();
  }
});

test("generates distinct server submission IDs for repeated requests", async () => {
  let ghlCalls = 0;
  const restore = installFetch(async (input, options) => {
    if (String(input).includes("ghl")) ghlCalls += 1;
    return successfulProviderFetch(input, options);
  });
  const requestBody = { form_type: "contact", fields: { name: "Sam", phone: "+14165550142", email: "sam@example.com", message: "Hi" }, turnstile_token: "token" };
  try {
    const first = await (await onRequest(makeContext({ body: requestBody }))).json();
    const second = await (await onRequest(makeContext({ body: requestBody }))).json();
    assert.notEqual(first.submission_id, second.submission_id);
    assert.equal(ghlCalls, 2);
  } finally {
    restore();
  }
});

test("rejects cross-origin requests without enabling CORS", async () => {
  const response = await onRequest(makeContext({ body: {}, origin: "https://other.example" }));
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
});

test("shared browser helper posts JSON and returns accepted submissions", async () => {
  let requestBody;
  const restore = installFetch(async (url, options) => {
    assert.equal(String(url), "/api/submit-form");
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/json");
    requestBody = JSON.parse(options.body);
    return Response.json({
      ok: true,
      accepted: true,
      submission_id: "server-id",
      deliveries: { ghl: "accepted", emailjs: "sent", google_sheets: "synced" },
    });
  });
  try {
    const result = await submitFromBrowser("contact", { name: "Sam" }, "turnstile-token");
    assert.equal(requestBody.form_type, "contact");
    assert.equal(requestBody.turnstile_token, "turnstile-token");
    assert.equal(result.status, 200);
    assert.equal(result.accepted, true);
  } finally {
    restore();
  }
});

test("shared browser helper converts delivery failures to safe user-facing errors", async () => {
  const restore = installFetch(async () => Response.json({
    ok: false,
    accepted: false,
    error: "lead_delivery_failed",
    submission_id: "server-id",
    deliveries: { ghl: "timeout", emailjs: "failed", google_sheets: "failed" },
    provider_detail: "must not be shown",
  }, { status: 502 }));
  try {
    await assert.rejects(
      submitFromBrowser("contact", {}, "token"),
      (error) => error.message.includes("contact Auriga before submitting again") && !error.message.includes("provider_detail") && error.submissionId === "server-id",
    );
  } finally {
    restore();
  }
});

test("shared browser helper warns against resubmitting when ancillary delivery succeeded but GHL did not", async () => {
  const restore = installFetch(async () => Response.json({
    ok: false,
    accepted: false,
    error: "lead_delivery_failed",
    submission_id: "server-id",
    deliveries: { ghl: "rejected", emailjs: "sent", google_sheets: "synced" },
  }, { status: 502 }));
  try {
    await assert.rejects(
      submitFromBrowser("contact", {}, "token"),
      (error) => error.message.includes("received through another service") && error.message.includes("avoid duplicates") && error.deliveries.emailjs === "sent",
    );
  } finally {
    restore();
  }
});

test("shared browser helper returns an accepted partial-delivery notice", async () => {
  const restore = installFetch(async () => Response.json({
    ok: true,
    accepted: true,
    partial_failure: true,
    user_message: "Your request was received, but a confirmation step failed. The team has your submission; please don't submit it again.",
    submission_id: "server-id",
    deliveries: { ghl: "accepted", emailjs: "failed", google_sheets: "synced" },
  }));
  try {
    const result = await submitFromBrowser("contact", {}, "token");
    assert.equal(result.accepted, true);
    assert.equal(result.partial_failure, true);
    assert.match(result.user_message, /please don't submit it again/);
    assert.deepEqual(result.deliveries, { ghl: "accepted", emailjs: "failed", google_sheets: "synced" });
  } finally {
    restore();
  }
});

test("sends the normalized lead schema to the GHL webhook", async () => {
  let ghlPayload;
  const restore = installFetch(async (input, options) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("ghl")) {
      ghlPayload = JSON.parse(options.body);
      return Response.json({ accepted: true });
    }
    if (url.includes("emailjs")) return new Response("OK", { status: 200 });
    return new Response("Success", { status: 200 });
  });
  try {
    const response = await onRequest(makeContext({
      body: {
        form_type: "contact",
        fields: { name: "Sam van Doe", phone: "0044 20 7946 0958", email: "sam@example.com", message: "Hello" },
        turnstile_token: "token",
      },
    }));
    assert.equal(response.status, 200);
    assert.equal(ghlPayload.first_name, "Sam");
    assert.equal(ghlPayload.last_name, "van Doe");
    assert.equal(ghlPayload.phone, "+442079460958");
    assert.equal(ghlPayload.source, "Website");
    assert.equal(ghlPayload.form_type, "contact");
    assert.ok(ghlPayload.submission_id);
    assert.ok(ghlPayload.submitted_at);
    assert.equal(JSON.stringify(ghlPayload).includes("turnstile-token"), false);
  } finally {
    restore();
  }
});

test("preserves the Development Academy's combined location in GHL and EmailJS", async () => {
  let ghlPayload;
  let emailParams;
  const restore = installFetch(async (input, options) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("ghl")) {
      ghlPayload = JSON.parse(options.body);
      return Response.json({ accepted: true });
    }
    if (url.includes("emailjs")) {
      emailParams = JSON.parse(options.body).template_params;
      return new Response("OK", { status: 200 });
    }
    if (url.includes("script.google.com")) return new Response("Success", { status: 200 });
    throw new Error("unexpected provider");
  });
  try {
    const preferredDate = __test.validateDevelopmentTryoutDate("2099-01-01").ok
      ? "2099-01-01"
      : "2099-01-08";
    const response = await onRequest(makeContext({
      body: {
        form_type: "development_tryout",
        fields: { parent_name: "Test Parent", phone: "+14165550142", email: "test@example.com", player_name: "Test Player", player_age: "9", current_level: "Intermediate", preferred_date: preferredDate },
        turnstile_token: "token",
      },
    }));
    assert.equal(response.status, 200);
    assert.equal(ghlPayload.location, "Mississauga and Brampton");
    assert.equal(emailParams.location, "Mississauga and Brampton");
  } finally {
    restore();
  }
});

test("preserves existing EmailJS and Sheets fields for contact and personal-training forms", async () => {
  const notifications = [];
  const sheetRows = [];
  const restore = installFetch(async (input, options) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("ghl")) return Response.json({ accepted: true });
    if (url.includes("emailjs")) {
      notifications.push(JSON.parse(options.body).template_params);
      return new Response("OK", { status: 200 });
    }
    if (url.includes("script.google.com")) {
      sheetRows.push(options.body);
      return new Response("Success", { status: 200 });
    }
    throw new Error("unexpected provider");
  });
  try {
    const submissions = [
      {
        form_type: "contact",
        fields: { from_name: "Contact Parent", from_email: "contact@example.com", phone: "+14165550142", heard_about: "Google Search", message: "Contact question" },
      },
      {
        form_type: "personal_training",
        fields: { from_name: "Training Parent", from_email: "training@example.com", phone: "+14165550143", child_age: "9 years old", message: "Training goals" },
      },
    ];
    for (const submission of submissions) {
      const response = await onRequest(makeContext({ body: { ...submission, turnstile_token: "token" } }));
      assert.equal(response.status, 200);
    }
    assert.equal(notifications[0].from_name, "Contact Parent");
    assert.equal(notifications[0].from_email, "contact@example.com");
    assert.equal(notifications[1].from_name, "Training Parent");
    assert.equal(notifications[1].child_age, "9 years old");
    assert.equal(sheetRows[0].get("from_name"), "Contact Parent");
    assert.equal(sheetRows[1].get("from_name"), "Training Parent");
    assert.equal(sheetRows[1].get("child_age"), "9 years old");
  } finally {
    restore();
  }
});

test("preserves every legacy assessment Sheets alias without forwarding the Turnstile token", async () => {
  let sheetPayload;
  const restore = installFetch(async (input, options) => {
    const url = String(input);
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "aurigafootballclub.com" });
    if (url.includes("ghl")) return Response.json({ accepted: true });
    if (url.includes("emailjs")) return new Response("OK", { status: 200 });
    if (url.includes("script.google.com")) {
      sheetPayload = options.body;
      return new Response("Success", { status: 200 });
    }
    throw new Error("unexpected provider");
  });
  const fields = {
    location: "Brampton",
    parent_name: "Test Parent",
    phone: "+14165550142",
    email: "parent@example.com",
    player_name: "Test Player",
    dob: "2017-05-12",
    years_played: "2 years",
    preferred_date: "2026-10-14",
    preferred_time: "Ages 4-8, 6:00-7:00 PM",
    heard_about: "Google Search",
    message: "Test note",
  };
  try {
    const response = await onRequest(makeContext({
      body: { form_type: "assessment", fields, turnstile_token: "single-use-turnstile-token" },
    }));
    assert.equal(response.status, 200);
    assert.ok(sheetPayload instanceof URLSearchParams);
    const expected = {
      location: "Brampton",
      parent_name: "Test Parent",
      from_name: "Test Parent",
      name: "Test Parent",
      phone: "+14165550142",
      email: "parent@example.com",
      from_email: "parent@example.com",
      player_name: "Test Player",
      player: "Test Player",
      player_full_name: "Test Player",
      dob: "2017-05-12",
      date_of_birth: "2017-05-12",
      birth_date: "2017-05-12",
      years_played: "2 years",
      years_played_in_club: "2 years",
      preferred_date: "2026-10-14",
      preferred: "2026-10-14",
      preferred_day: "2026-10-14",
      preferred_time: "Ages 4-8, 6:00-7:00 PM",
      heard_about: "Google Search",
      how_they_heard: "Google Search",
      referral_source: "Google Search",
      message: "Test note",
      additional_message: "Test note",
      message_details: "Test note",
      sheet_name: "free assessment",
      target_sheet: "free assessment",
      destination_tab: "free assessment",
      inquiry_type: "Free Assessment",
      form_name: "free_trial",
      lead_type: "free_trial",
      subject: "Free Assessment Registration - Brampton",
      "g-recaptcha-response": "",
    };
    for (const [key, value] of Object.entries(expected)) {
      assert.equal(sheetPayload.get(key), value, `legacy Sheets field ${key}`);
    }
    assert.ok(sheetPayload.get("timestamp"));
    assert.equal([...sheetPayload.keys()].includes("turnstile_token"), false);
    assert.equal([...sheetPayload.values()].includes("single-use-turnstile-token"), false);
  } finally {
    restore();
  }
});