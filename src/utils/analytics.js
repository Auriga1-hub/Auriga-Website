function trackEvent(eventName, parameters = {}) {
  if (typeof window === "undefined" || typeof window.aurigaAnalyticsTrackEvent !== "function") {
    return;
  }

  window.aurigaAnalyticsTrackEvent(eventName, parameters);
}

export function trackLeadGenerated({ formName, leadType, location, program, preferredTime, heardAbout }) {
  trackEvent("generate_lead", {
    form_name: formName,
    lead_type: leadType,
    location_name: location,
    program_name: program,
    preferred_time: preferredTime,
    heard_about: heardAbout,
  });
}

export function trackFormError({ formName, formLocation, errorType, errorMessage }) {
  trackEvent("form_error", {
    form_name: formName,
    form_location: formLocation,
    error_type: errorType,
    error_message: errorMessage,
  });
}

export function trackLocationSelection({ programType, location, destination }) {
  trackEvent("location_select", {
    program_type: programType,
    location_name: location,
    destination_path: destination,
  });
}

export function trackFAQOpen(question) {
  trackEvent("faq_open", {
    faq_question: question,
  });
}