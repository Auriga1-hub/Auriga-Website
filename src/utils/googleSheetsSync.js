import { EMAILJS_CONFIG } from "./emailConfig";

/**
 * Syncs form data to Google Sheets via Google Apps Script Web App
 * @param {Object} data - The form data to send
 * @returns {Promise<void>}
 */
export const syncToGoogleSheets = async (data) => {
  if (!EMAILJS_CONFIG.GOOGLE_SHEETS_URL || EMAILJS_CONFIG.GOOGLE_SHEETS_URL.includes("PASTE_YOUR_URL_HERE")) {
    console.warn("Google Sheets Sync: URL not configured.");
    return;
  }

  try {
    // We use a fetch POST with no-cors or standard mode depending on Apps Script deployment
    await fetch(EMAILJS_CONFIG.GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script Web Apps when triggered from direct browser fetch
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Google Sheets Sync: Data sent successfully (no-cors mode).");
  } catch (error) {
    console.error("Google Sheets Sync Error:", error);
  }
};
