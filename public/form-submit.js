(() => {
  const ERROR_MESSAGES = {
    invalid_form_type: "This form could not be submitted. Please refresh the page and try again.",
    missing_required_fields: "Please complete all required fields and try again.",
    invalid_email: "Please enter a valid email address.",
    invalid_phone: "Please enter a valid phone number.",
    invalid_location: "Please refresh the page and select a valid location.",
    invalid_preferred_date: "Please choose an available tryout date.",
    invalid_preferred_time: "Please choose an available assessment time.",
    invalid_current_level: "Please select a valid current level.",
    verification_failed: "Please complete the captcha verification again.",
    verification_unavailable: "Captcha verification is temporarily unavailable. Please try again.",
    lead_delivery_failed: "We couldn't submit your request right now. Please try again shortly.",
    service_unavailable: "Form submission is temporarily unavailable. Please try again shortly.",
  };

  window.aurigaSubmitForm = async (formType, fields, turnstileToken) => {
    let response;
    try {
      response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_type: formType, fields, turnstile_token: turnstileToken }),
      });
    } catch {
      throw new Error("We couldn't confirm whether your request was received. Please contact Auriga before submitting again to avoid duplicates.");
    }

    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("The server returned an invalid response. Please try again shortly.");
    }

    if (!response.ok || result.accepted !== true || result.deliveries?.ghl !== "accepted") {
      const delivery = result.deliveries || {};
      const fallbackDelivered = delivery.emailjs === "sent" || delivery.google_sheets === "synced";
      const message = result.error === "lead_delivery_failed"
        ? fallbackDelivered
          ? "We couldn't confirm your request in the registration system. It may have been received through another service. Please contact Auriga before submitting again to avoid duplicates."
          : "We couldn't confirm that your request was received. Please contact Auriga before submitting again to avoid duplicates."
        : ERROR_MESSAGES[result.error] || "We couldn't submit your request right now. Please try again shortly.";
      const error = new Error(message);
      error.code = result.error || "submission_failed";
      error.status = response.status;
      error.submissionId = result.submission_id;
      error.deliveries = delivery;
      if (error.submissionId) console.warn("Form submission was not accepted.", { submissionId: error.submissionId, code: error.code });
      throw error;
    }

    const partialFailure = result.deliveries.emailjs !== "sent" || result.deliveries.google_sheets !== "synced";
    if (partialFailure) {
      console.error("Accepted submission had an ancillary integration failure.", {
        submissionId: result.submission_id,
        deliveries: result.deliveries,
      });
    }

    return {
      ...result,
      status: response.status,
      partial_failure: partialFailure,
      user_message: partialFailure
        ? result.user_message || "Your request was received, but a confirmation step failed. The team has your submission; please don't submit it again."
        : "",
    };
  };
})();