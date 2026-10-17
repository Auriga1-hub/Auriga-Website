import { EMAILJS_CONFIG } from "../../src/utils/emailConfig.js";

const MAX_BODY_BYTES = 16 * 1024;
const PRODUCTION_HOSTNAME = "aurigafootballclub.com";
const ACADEMY_TIME_ZONE = "America/Toronto";
const REQUEST_TIMEOUT_MS = 8000;
const DEVELOPMENT_GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycby2EbHYyYH05wvLAoIeh0xBe4-N2rC88K3Vd_f9kP4ay3a9Zx5GUdRLQFDm6pvRESCcAw/exec";
const DEVELOPMENT_ACADEMY_LOCATION = "Mississauga and Brampton";
const ASSESSMENT_LOCATIONS = new Set([
  "Brampton",
  "Brampton North",
  "Brampton West",
  "Brampton Girls Program",
  "Etobicoke",
  "Mississauga Central",
  "Mississauga West",
]);
const ASSESSMENT_SCHEDULES = {
  Brampton: {
    weekdays: [1, 3],
    times: ["Ages 4-8, 6:00-7:00 PM", "Ages 9-13, 7:00-8:00 PM"],
  },
  "Brampton North": {
    weekdays: [5],
    times: ["U4-U8, 6:15-7:05 PM", "U9-U13, 7:05-8:00 PM"],
  },
  "Brampton West": {
    weekdays: [2, 3],
    timesByWeekday: {
      2: ["U4-U8, 6:15-7:05 PM", "U9-U13, 7:05-8:00 PM"],
      3: ["U4-U8, 6:00-7:00 PM", "U9-U13, 7:00-8:00 PM"],
    },
  },
  "Brampton Girls Program": {
    weekdays: [4],
    times: ["Ages 4-8, 6:15-7:05 PM", "Ages 9-13, 7:05-8:00 PM"],
  },
  Etobicoke: {
    weekdays: [1, 3],
    times: ["Ages 4-8, 6-7PM", "Ages 9-13, 7-8PM"],
  },
  "Mississauga Central": {
    weekdays: [2, 5],
    times: ["U4-8, 6:00-7:00 PM", "U9-13, 7:00-8:00 PM"],
  },
  "Mississauga West": {
    weekdays: [2, 5],
    times: ["Ages 4-8, 6:15-7:05 PM", "Ages 9-13, 7:05-8:00 PM"],
  },
};
const DEVELOPMENT_LEVELS = new Set(["Beginner", "Recreational", "Intermediate", "Advanced / Club"]);

const jsonResponse = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
});

const logEvent = (event, details = {}) => {
  console.log(JSON.stringify({ event, ...details }));
};

const readBody = async (request) => {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return { tooLarge: true };

  const reader = request.body?.getReader();
  if (!reader) return { text: "" };

  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return { tooLarge: true };
    }
    chunks.push(value);
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { text: new TextDecoder().decode(body) };
};

const text = (value, maxLength = 1000) => (typeof value === "string" ? value.trim().slice(0, maxLength) : "");

const normalizePhone = (value) => {
  const raw = text(value, 40);
  let phone = raw.replace(/[\s().-]/g, "");
  if (phone.startsWith("00")) phone = `+${phone.slice(2)}`;
  if (!/^\+?\d{7,15}$/.test(phone)) return null;
  return phone;
};

const validEmail = (value) => {
  const email = text(value, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
};

const splitName = (value) => {
  const parts = text(value, 160).split(/\s+/).filter(Boolean);
  return { first_name: parts.shift() || "", last_name: parts.join(" ") };
};

const calculateAge = (dateValue, now = new Date()) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue || "")) return undefined;
  const date = new Date(`${dateValue}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateValue) return undefined;
  let age = now.getUTCFullYear() - date.getUTCFullYear();
  const birthdayHasNotPassed = now.getUTCMonth() < date.getUTCMonth() ||
    (now.getUTCMonth() === date.getUTCMonth() && now.getUTCDate() < date.getUTCDate());
  if (birthdayHasNotPassed) age -= 1;
  if (age < 0 || age > 120) return undefined;
  return age;
};

const validDateAndWeekday = (dateValue, allowedWeekdays) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue || "")) return null;
  const date = new Date(`${dateValue}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateValue) return null;
  return allowedWeekdays.includes(date.getUTCDay()) ? date : null;
};

const dateInTimeZone = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const validateDevelopmentTryoutDate = (dateValue, now = new Date()) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue || "")) return { ok: false, reason: "invalid" };
  const date = new Date(`${dateValue}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateValue) {
    return { ok: false, reason: "invalid" };
  }
  if (dateValue < dateInTimeZone(now, ACADEMY_TIME_ZONE)) return { ok: false, reason: "past" };
  if (![2, 4].includes(date.getUTCDay())) return { ok: false, reason: "weekday" };
  return { ok: true };
};

const validateSubmission = (body, now = new Date()) => {
  if (!body || typeof body !== "object" || Array.isArray(body) || !body.fields || typeof body.fields !== "object") {
    return { error: "invalid_payload" };
  }

  const { form_type: formType } = body;
  const fields = body.fields;
  const formTypes = new Set(["contact", "assessment", "personal_training", "development_tryout"]);
  if (!formTypes.has(formType)) return { error: "invalid_form_type" };

  const normalized = {
    form_type: formType,
    source: "Website",
    submitted_at: new Date().toISOString(),
  };
  let personName;
  let rawPhone;
  let rawEmail;

  if (formType === "contact") {
    personName = fields.name || fields.from_name;
    rawPhone = fields.phone;
    rawEmail = fields.email || fields.from_email;
    normalized.program = undefined;
    normalized.referral_source = text(fields.heard_about, 160);
    normalized.message = text(fields.message, 4000);
    if (!text(personName, 160) || !normalized.message) return { error: "missing_required_fields" };
  } else if (formType === "assessment") {
    personName = fields.parent_name;
    rawPhone = fields.phone;
    rawEmail = fields.email;
    const location = text(fields.location, 100);
    if (!ASSESSMENT_LOCATIONS.has(location)) return { error: "invalid_location" };
    normalized.location = location;
    normalized.program = "Free Assessment";
    normalized.player_name = text(fields.player_name, 160);
    normalized.player_dob = text(fields.dob, 10);
    const playerAge = calculateAge(normalized.player_dob);
    normalized.player_age = playerAge === undefined ? undefined : String(playerAge);
    normalized.years_played = text(fields.years_played, 120);
    normalized.preferred_date = text(fields.preferred_date, 10);
    normalized.preferred_time = text(fields.preferred_time, 120);
    normalized.referral_source = text(fields.heard_about, 160);
    normalized.message = text(fields.message, 4000);
    const schedule = ASSESSMENT_SCHEDULES[location];
    const date = validDateAndWeekday(normalized.preferred_date, schedule.weekdays);
    const allowedTimes = date && (schedule.timesByWeekday?.[date.getUTCDay()] || schedule.times);
    if (!text(personName, 160) || !normalized.player_name || normalized.player_age === undefined ||
        !normalized.preferred_date || !normalized.preferred_time) {
      return { error: "missing_required_fields" };
    }
    if (!date) return { error: "invalid_preferred_date" };
    if (!allowedTimes?.includes(normalized.preferred_time)) return { error: "invalid_preferred_time" };
  } else if (formType === "personal_training") {
    personName = fields.ptName || fields.from_name;
    rawPhone = fields.ptPhone || fields.phone;
    rawEmail = fields.ptEmail || fields.from_email;
    normalized.player_age = text(fields.ptAge || fields.child_age, 40);
    normalized.program = "Personal Training";
    normalized.message = text(fields.ptMessage || fields.message, 4000);
    if (!text(personName, 160) || !normalized.player_age || !normalized.message) {
      return { error: "missing_required_fields" };
    }
  } else {
    personName = fields.parent_name || fields.parentName;
    rawPhone = fields.phone;
    rawEmail = fields.email;
    normalized.player_name = text(fields.player_name || fields.childName, 160);
    normalized.player_age = text(fields.player_age || fields.childAge, 3);
    normalized.current_level = text(fields.current_level || fields.level, 100);
    normalized.preferred_date = text(fields.preferred_date || fields.tryoutDate, 10);
    normalized.referral_source = text(fields.heard_about || fields.heardAbout, 160);
    normalized.message = text(fields.message, 4000);
    normalized.location = DEVELOPMENT_ACADEMY_LOCATION;
    normalized.program = "Development Academy Tryout";
    if (!text(personName, 160) || !normalized.player_name || !/^(?:[7-9]|1[0-2])$/.test(normalized.player_age) ||
        !normalized.current_level || !normalized.preferred_date) {
      return { error: "missing_required_fields" };
    }
    if (!DEVELOPMENT_LEVELS.has(normalized.current_level)) return { error: "invalid_current_level" };
    const tryoutDate = validateDevelopmentTryoutDate(normalized.preferred_date, now);
    if (!tryoutDate) return { error: "invalid_preferred_date" };
  }

  normalized.email = validEmail(rawEmail);
  normalized.phone = normalizePhone(rawPhone);
  if (!normalized.email) return { error: "invalid_email" };
  if (!normalized.phone) return { error: "invalid_phone" };
  Object.assign(normalized, splitName(personName));

  const optionalTextFields = ["player_name", "player_dob", "player_age", "years_played", "current_level", "program", "location", "preferred_date", "preferred_time", "referral_source", "message"];
  for (const key of optionalTextFields) {
    if (normalized[key] === "") delete normalized[key];
    if (normalized[key] === undefined) delete normalized[key];
  }
  normalized.submission_id = crypto.randomUUID();
  return { value: normalized };
};

const withTimeout = async (url, options, timeoutMs = REQUEST_TIMEOUT_MS, consumeResponse) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return consumeResponse ? await consumeResponse(response) : response;
  } finally {
    clearTimeout(timeout);
  }
};

const verifyTurnstile = async ({ token, secret, expectedHostname, remoteIp }) => {
  if (!token || typeof token !== "string" || token.length > 2048) return { ok: false, reason: "invalid" };
  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) form.set("remoteip", remoteIp);
  try {
    const siteverify = await withTimeout("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    }, 5000, async (response) => ({ ok: response.ok, result: response.ok ? await response.json() : null }));
    if (!siteverify.ok) return { ok: false, reason: "unavailable" };
    const result = siteverify.result;
    return {
      ok: result.success === true && String(result.hostname || "").toLowerCase() === expectedHostname.toLowerCase(),
      reason: result.success === true ? "hostname_mismatch" : "invalid",
    };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
};

const emailTemplateParams = (submission, fields, token) => {
  const captcha = { "g-recaptcha-response": token };
  if (submission.form_type === "contact") {
    return {
      from_name: text(fields.name || fields.from_name, 160), from_email: submission.email, phone: submission.phone,
      heard_about: text(fields.heard_about, 160), message: text(fields.message, 4000),
      subject: "General Website Inquiry", ...captcha,
    };
  }
  if (submission.form_type === "personal_training") {
    return {
      from_name: text(fields.ptName || fields.from_name, 160), from_email: submission.email, phone: submission.phone,
      child_age: text(fields.ptAge || fields.child_age, 40), message: text(fields.ptMessage || fields.message, 4000),
      subject: "Personal Training Inquiry", ...captcha,
    };
  }
  if (submission.form_type === "development_tryout") {
    return {
      location: submission.location,
      parent_name: text(fields.parent_name, 160), phone: submission.phone, email: submission.email,
      player_name: submission.player_name, dob: `Age ${submission.player_age}`,
      years_played: submission.current_level || "N/A", preferred_date: submission.preferred_date,
      preferred_time: "N/A", heard_about: submission.referral_source || "Not provided",
      message: submission.message || "", subject: "Development Academy Waitlist - Mississauga & Brampton",
    };
  }
  return {
    location: submission.location, parent_name: text(fields.parent_name, 160), phone: submission.phone,
    email: submission.email, player_name: submission.player_name, dob: submission.player_dob,
    years_played: submission.years_played || "", preferred_date: submission.preferred_date,
    preferred_time: submission.preferred_time, heard_about: submission.referral_source || "",
    message: submission.message || "", subject: `Free Assessment Registration - ${submission.location}`,
    ...captcha,
  };
};

const googleSheetsParams = (submission, fields) => {
  if (submission.form_type === "development_tryout") {
    return {
      sheet_name: "development academy", target_sheet: "development academy",
      parent_name: text(fields.parent_name, 160), from_name: text(fields.parent_name, 160),
      name: text(fields.parent_name, 160), phone: submission.phone, email: submission.email,
      from_email: submission.email, player_name: submission.player_name, child_name: submission.player_name,
      child_age: submission.player_age, dob: `Age ${submission.player_age}`,
      years_played: submission.current_level, current_level: submission.current_level,
      preferred_date: submission.preferred_date, preferred_time: "N/A",
      heard_about: submission.referral_source || "Not provided",
      subject: "Development Academy Waitlist - Mississauga & Brampton",
      inquiry_type: "Development Academy Waitlist", message: submission.message || "",
      timestamp: submission.submitted_at,
    };
  }

  const data = submission.form_type === "contact"
    ? { from_name: text(fields.name || fields.from_name, 160), from_email: submission.email, phone: submission.phone, heard_about: text(fields.heard_about, 160), message: text(fields.message, 4000), subject: "General Website Inquiry" }
    : submission.form_type === "personal_training"
      ? { from_name: text(fields.ptName || fields.from_name, 160), from_email: submission.email, phone: submission.phone, child_age: text(fields.ptAge || fields.child_age, 40), message: text(fields.ptMessage || fields.message, 4000), subject: "Personal Training Inquiry" }
      : { location: submission.location, parent_name: text(fields.parent_name, 160), phone: submission.phone, email: submission.email, player_name: submission.player_name, dob: submission.player_dob, years_played: submission.years_played || "", preferred_date: submission.preferred_date, preferred_time: submission.preferred_time, heard_about: submission.referral_source || "", message: submission.message || "", subject: `Free Assessment Registration - ${submission.location}` };

  const isAssessment = submission.form_type === "assessment";
  return {
    ...data,
    ...(isAssessment ? {
      sheet_name: "free assessment", target_sheet: "free assessment", destination_tab: "free assessment",
      inquiry_type: "Free Assessment", form_name: "free_trial", lead_type: "free_trial",
      name: data.parent_name, from_name: data.parent_name,
      email: data.email, from_email: data.email, player: data.player_name,
      player_full_name: data.player_name, date_of_birth: data.dob, birth_date: data.dob,
      preferred: data.preferred_date, preferred_day: data.preferred_date,
      additional_message: data.message, message_details: data.message,
      how_they_heard: data.heard_about, referral_source: data.heard_about,
      years_played_in_club: data.years_played,
      "g-recaptcha-response": "",
    } : {}),
    timestamp: submission.submitted_at,
  };
};

const sendEmail = async (submission, fields, token) => {
  const isContact = ["contact", "personal_training"].includes(submission.form_type);
  const templateId = isContact ? EMAILJS_CONFIG.TEMPLATE_ID_CONTACT : EMAILJS_CONFIG.TEMPLATE_ID_TRIAL;
  const response = await withTimeout("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_CONFIG.PUBLIC_KEY,
      template_params: emailTemplateParams(submission, fields, token),
    }),
  });
  return response.ok;
};

const sendSheets = async (submission, fields) => {
  const url = submission.form_type === "development_tryout"
    ? DEVELOPMENT_GOOGLE_SHEETS_URL
    : EMAILJS_CONFIG.GOOGLE_SHEETS_URL;
  if (!url) return false;
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(googleSheetsParams(submission, fields))) {
    if (value !== undefined && value !== null) body.append(key, String(value));
  }
  const result = await withTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body,
  }, REQUEST_TIMEOUT_MS, async (response) => ({ ok: response.ok, text: (await response.text()).trim() }));
  return result.ok && /success/i.test(result.text);
};

const sendToGhl = async (url, submission) => {
  const endpoint = new URL(url);
  if (endpoint.protocol !== "https:") throw new Error("invalid_webhook_url");
  const response = await withTimeout(endpoint.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
  return response.ok;
};

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") {
    return jsonResponse(405, { ok: false, error: "method_not_allowed" });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse(403, { ok: false, error: "origin_not_allowed" });
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return jsonResponse(415, { ok: false, error: "unsupported_media_type" });
  }

  const bodyResult = await readBody(request);
  if (bodyResult.tooLarge) return jsonResponse(413, { ok: false, error: "request_too_large" });
  let body;
  try {
    body = JSON.parse(bodyResult.text);
  } catch {
    return jsonResponse(400, { ok: false, error: "invalid_json" });
  }

  const validation = validateSubmission(body);
  if (validation.error) {
    logEvent("form.invalid", { form_type: body?.form_type || "unknown", error: validation.error });
    return jsonResponse(400, { ok: false, error: validation.error });
  }
  const submission = validation.value;

  if (!env.TURNSTILE_SECRET_KEY || !env.GHL_WEBHOOK_URL) {
    logEvent("form.configuration_error", {
      submission_id: submission.submission_id,
      form_type: submission.form_type,
      turnstile_configured: Boolean(env.TURNSTILE_SECRET_KEY),
      ghl_configured: Boolean(env.GHL_WEBHOOK_URL),
    });
    return jsonResponse(503, { ok: false, error: "service_unavailable", submission_id: submission.submission_id });
  }

  const requestHostname = new URL(request.url).hostname.trim().toLowerCase();
  const expectedHostnameBinding = String(env.TURNSTILE_EXPECTED_HOSTNAME || "").trim();
  const expectedHostnameConfigured = expectedHostnameBinding.length > 0;
  const expectedHostname = (expectedHostnameBinding || PRODUCTION_HOSTNAME).trim().toLowerCase();
  if (requestHostname !== expectedHostname) {
    logEvent("form.hostname_configuration_error", {
      submission_id: submission.submission_id,
      request_hostname: requestHostname,
      expected_hostname: expectedHostname,
      expected_hostname_configured: expectedHostnameConfigured,
      hostname_match: false,
    });
    return jsonResponse(503, { ok: false, error: "service_unavailable", submission_id: submission.submission_id });
  }

  const turnstile = await verifyTurnstile({
    token: body.turnstile_token,
    secret: env.TURNSTILE_SECRET_KEY,
    expectedHostname,
    remoteIp: request.headers.get("cf-connecting-ip"),
  });
  if (!turnstile.ok) {
    logEvent("form.turnstile_failed", { submission_id: submission.submission_id, reason: turnstile.reason });
    return jsonResponse(turnstile.reason === "unavailable" ? 502 : 403, {
      ok: false,
      error: turnstile.reason === "unavailable" ? "verification_unavailable" : "verification_failed",
      submission_id: submission.submission_id,
    });
  }

  const [ghlResult, emailResult, sheetsResult] = await Promise.allSettled([
    sendToGhl(env.GHL_WEBHOOK_URL, submission),
    sendEmail(submission, body.fields, body.turnstile_token),
    sendSheets(submission, body.fields),
  ]);
  const ghlAccepted = ghlResult.status === "fulfilled" && ghlResult.value;
  const ghlStatus = ghlAccepted
    ? "accepted"
    : ghlResult.status === "rejected" && ghlResult.reason?.name === "AbortError"
      ? "timeout"
      : ghlResult.status === "fulfilled"
        ? "rejected"
        : "request_failed";
  const emailjs = emailResult.status === "fulfilled" && emailResult.value ? "sent" : "failed";
  const googleSheets = sheetsResult.status === "fulfilled" && sheetsResult.value ? "synced" : "failed";
  if (ghlAccepted) {
    logEvent("form.ghl_accepted", { submission_id: submission.submission_id, form_type: submission.form_type });
  } else {
    logEvent(ghlStatus === "rejected" ? "form.ghl_rejected" : "form.ghl_failed", {
      submission_id: submission.submission_id,
      form_type: submission.form_type,
      reason: ghlStatus,
    });
  }
  if (emailjs !== "sent") {
    logEvent("form.emailjs_failed", {
      submission_id: submission.submission_id,
      reason: emailResult.status === "fulfilled" ? "rejected" : emailResult.reason?.name === "AbortError" ? "timeout" : "request_failed",
    });
  }
  if (googleSheets !== "synced") {
    logEvent("form.google_sheets_failed", {
      submission_id: submission.submission_id,
      reason: sheetsResult.status === "fulfilled" ? "rejected" : sheetsResult.reason?.name === "AbortError" ? "timeout" : "request_failed",
    });
  }

  const accepted = ghlAccepted;
  const partialFailure = accepted && (emailjs !== "sent" || googleSheets !== "synced");
  return jsonResponse(accepted ? 200 : 502, {
    ok: accepted,
    accepted,
    ...(accepted ? {} : { error: "lead_delivery_failed" }),
    ...(partialFailure ? {
      partial_failure: true,
      user_message: "Your request was received, but a confirmation step failed. The team has your submission; please don't submit it again.",
    } : {}),
    submission_id: submission.submission_id,
    deliveries: { ghl: ghlStatus, emailjs, google_sheets: googleSheets },
  });
}

export const __test = {
  validateSubmission,
  validateDevelopmentTryoutDate,
  normalizePhone,
  validEmail,
  calculateAge,
  verifyTurnstile,
};