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
    // Add a timestamp for tracking
    const enrichedData = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Use URLSearchParams for application/x-www-form-urlencoded format
    // This is the most reliable way to send data to GAS in no-cors mode
    const formData = new URLSearchParams();
    for (const key in enrichedData) {
      formData.append(key, enrichedData[key]);
    }

    await fetch(EMAILJS_CONFIG.GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    
    console.log("Google Sheets Sync: Data sent successfully.");
  } catch (error) {
    console.error("Google Sheets Sync Error:", error);
  }
};

