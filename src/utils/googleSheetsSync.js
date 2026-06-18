import { EMAILJS_CONFIG } from "./emailConfig";

/**
 * Syncs form data to Google Sheets via Google Apps Script Web App
 * @param {Object} data - The form data to send
 * @returns {Promise<{ok: boolean, verified: boolean, error?: string}>}
 */
export const syncToGoogleSheets = async (data) => {
  if (!EMAILJS_CONFIG.GOOGLE_SHEETS_URL || EMAILJS_CONFIG.GOOGLE_SHEETS_URL.includes("PASTE_YOUR_URL_HERE")) {
    console.warn("Google Sheets Sync: URL not configured.");
    return { ok: false, verified: false, error: "url_not_configured" };
  }

  const isFreeTrialSubmission =
    data?.formName === "free_trial" ||
    data?.leadType === "free_trial" ||
    /free trial/i.test(String(data?.subject || ""));

  const routingHints = isFreeTrialSubmission
    ? {
        // Multiple aliases are included because different GAS versions often check different keys.
        sheet_name: "free trial",
        target_sheet: "free trial",
        destination_tab: "free trial",
        inquiry_type: "Free Trial",
        form_name: "free_trial",
        lead_type: "free_trial",
      }
    : {};

  const freeTrialAliases = isFreeTrialSubmission
    ? {
        name: data.parent_name || data.from_name || data.name || "",
        from_name: data.parent_name || data.from_name || data.name || "",
        email: data.email || data.from_email || "",
        from_email: data.email || data.from_email || "",
        player: data.player_name || data.child_name || "",
        player_full_name: data.player_name || data.child_name || "",
        date_of_birth: data.dob || "",
        birth_date: data.dob || "",
        preferred: data.preferred_date || "",
        preferred_day: data.preferred_date || "",
        additional_message: data.message || "",
        message_details: data.message || "",
        how_they_heard: data.heard_about || "",
        referral_source: data.heard_about || "",
        years_played_in_club: data.years_played || "",
      }
    : {};

  // Add routing hints and timestamp for tracking.
  const enrichedData = {
    ...data,
    ...routingHints,
    ...freeTrialAliases,
    timestamp: new Date().toISOString(),
  };

  const buildFormData = () => {
    const formData = new URLSearchParams();
    for (const key in enrichedData) {
      formData.append(key, enrichedData[key]);
    }
    return formData;
  };

  const buildRequestOptions = () => {
    return {
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: buildFormData(),
    };
  };

  try {
    // First attempt uses CORS so we can verify actual server response.
    const response = await fetch(EMAILJS_CONFIG.GOOGLE_SHEETS_URL, {
      method: "POST",
      ...buildRequestOptions(),
    });

    const responseText = (await response.text()).trim();
    const looksSuccessful = /success/i.test(responseText);

    if (!response.ok || !looksSuccessful) {
      throw new Error(`Unexpected Google Sheets response: ${response.status} ${responseText}`);
    }

    console.log("Google Sheets Sync: Data sent and verified.");
    return { ok: true, verified: true };
  } catch (error) {
    console.error("Google Sheets Sync verification failed, trying no-cors fallback:", error);

    try {
      // Fallback keeps lead flow non-blocking even if CORS behavior changes.
      await fetch(EMAILJS_CONFIG.GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        body: buildFormData(),
      });

      console.warn("Google Sheets Sync: Sent via fallback (unverified no-cors mode).");
      return { ok: true, verified: false };
    } catch (fallbackError) {
      console.error("Google Sheets Sync Error:", fallbackError);
      return {
        ok: false,
        verified: false,
        error: fallbackError?.message || "unknown_google_sheets_sync_error",
      };
    }
  }
};

