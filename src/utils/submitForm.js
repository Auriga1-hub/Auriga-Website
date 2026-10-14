export async function submitWebsiteForm(formType, fields, turnstileToken) {
  if (typeof window.aurigaSubmitForm !== "function") {
    throw new Error("Form submission is temporarily unavailable. Please refresh the page and try again.");
  }
  return window.aurigaSubmitForm(formType, fields, turnstileToken);
}