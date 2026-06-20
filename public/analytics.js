(function initAurigaAnalytics(window, document) {
  var measurementId = "G-3SC8P695HJ";
  var scrollMilestones = [25, 50, 75, 90];
  var trackedScrollMilestones = {};

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = window.gtag || gtag;

  function sanitizeParameters(parameters) {
    var cleanParameters = {};

    Object.keys(parameters || {}).forEach(function (key) {
      var value = parameters[key];

      if (value === undefined || value === null || value === "") {
        return;
      }

      cleanParameters[key] = value;
    });

    return cleanParameters;
  }

  function getCurrentPath() {
    return window.location.pathname + window.location.search + window.location.hash;
  }

  function normalizeText(text) {
    return (text || "").replace(/\s+/g, " ").trim().slice(0, 120);
  }

  function trackEvent(eventName, parameters) {
    if (!eventName) {
      return;
    }

    window.gtag("event", eventName, sanitizeParameters(parameters));
  }

  function resetScrollTracking(path) {
    trackedScrollMilestones[path] = {};
  }

  function trackScrollDepth() {
    var path = getCurrentPath();
    var documentElement = document.documentElement;
    var maxScroll = documentElement.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) {
      return;
    }

    var percentScrolled = Math.round((window.scrollY / maxScroll) * 100);

    trackedScrollMilestones[path] = trackedScrollMilestones[path] || {};

    scrollMilestones.forEach(function (milestone) {
      if (percentScrolled < milestone || trackedScrollMilestones[path][milestone]) {
        return;
      }

      trackedScrollMilestones[path][milestone] = true;
      trackEvent("scroll_depth", {
        percent_scrolled: milestone,
        page_path: path,
        page_title: document.title,
      });
    });
  }

  function parseAnalyticsAttributes(element) {
    return element.getAttributeNames().reduce(function (parameters, attributeName) {
      if (attributeName.indexOf("data-analytics-") !== 0 || attributeName === "data-analytics-event") {
        return parameters;
      }

      var parameterName = attributeName.replace("data-analytics-", "").replace(/-/g, "_");
      parameters[parameterName] = element.getAttribute(attributeName);
      return parameters;
    }, {});
  }

  function isExternalLink(url) {
    return url.origin !== window.location.origin;
  }

  function handleLinkTracking(link) {
    var href = link.getAttribute("href") || "";
    var linkText = normalizeText(link.textContent);
    var placement = link.getAttribute("data-analytics-placement") || "link";

    if (!href || href.charAt(0) === "#") {
      return;
    }

    if (href.indexOf("tel:") === 0) {
      trackEvent("contact_click", {
        method: "phone",
        placement: placement,
        link_text: linkText,
        page_path: getCurrentPath(),
      });
      return;
    }

    if (href.indexOf("mailto:") === 0) {
      trackEvent("contact_click", {
        method: "email",
        placement: placement,
        link_text: linkText,
        page_path: getCurrentPath(),
      });
      return;
    }

    try {
      var url = new URL(href, window.location.origin);
      var isDirectionsLink = /maps\.app|google\.[^/]+\/maps|google\.com\/maps|maps\.google/i.test(url.href) || /directions/i.test(linkText);
      var isSocialLink = /facebook|instagram/i.test(url.hostname);
      var isLikelyCta = /(btn|cta|button)/i.test(link.className) || /(register|book|learn more|free assessment|contact|explore|tryout|view programs)/i.test(linkText);

      if (isSocialLink) {
        trackEvent("social_click", {
          social_network: /instagram/i.test(url.hostname) ? "instagram" : "facebook",
          placement: placement,
          page_path: getCurrentPath(),
        });
        return;
      }

      if (isDirectionsLink) {
        trackEvent("directions_click", {
          placement: placement,
          destination_url: url.href,
          link_text: linkText,
          page_path: getCurrentPath(),
        });
        return;
      }

      if (isExternalLink(url)) {
        trackEvent("outbound_click", {
          placement: placement,
          destination_url: url.href,
          destination_domain: url.hostname,
          link_text: linkText,
          page_path: getCurrentPath(),
        });
        return;
      }

      if (isLikelyCta) {
        trackEvent("cta_click", {
          placement: placement,
          destination_path: url.pathname + url.search + url.hash,
          link_text: linkText,
          page_path: getCurrentPath(),
        });
      }
    } catch {
      // Ignore malformed URLs so analytics never breaks navigation.
    }
  }

  function handleDocumentClick(event) {
    var trackedElement = event.target.closest("[data-analytics-event]");

    if (trackedElement) {
      trackEvent(
        trackedElement.getAttribute("data-analytics-event"),
        Object.assign(parseAnalyticsAttributes(trackedElement), {
          link_text: normalizeText(trackedElement.textContent),
          page_path: getCurrentPath(),
        })
      );
      return;
    }

    var link = event.target.closest("a[href]");

    if (link) {
      handleLinkTracking(link);
    }
  }

  function handleFormStart(event) {
    var form = event.target.closest("form[data-analytics-form]");

    if (!form || form.dataset.analyticsStarted === "true") {
      return;
    }

    form.dataset.analyticsStarted = "true";
    trackEvent("form_start", {
      form_name: form.getAttribute("data-analytics-form"),
      form_location: form.getAttribute("data-analytics-location"),
      form_program: form.getAttribute("data-analytics-program"),
      page_path: getCurrentPath(),
    });
  }

  function handleFormSubmit(event) {
    var form = event.target.closest("form[data-analytics-form]");

    if (!form) {
      return;
    }

    trackEvent("form_submit_attempt", {
      form_name: form.getAttribute("data-analytics-form"),
      form_location: form.getAttribute("data-analytics-location"),
      form_program: form.getAttribute("data-analytics-program"),
      page_path: getCurrentPath(),
    });
  }

  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + measurementId + '"]')) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
  });

  window.AURIGA_GA4_ID = measurementId;
  window.aurigaAnalyticsTrackEvent = trackEvent;
  window.aurigaAnalyticsTrackPageView = function trackPageView(path, title) {
    var resolvedPath = path || getCurrentPath();

    resetScrollTracking(resolvedPath);
    trackEvent("page_view", {
      page_path: resolvedPath,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  };

  document.addEventListener("click", handleDocumentClick, true);
  document.addEventListener("focusin", handleFormStart, true);
  document.addEventListener("submit", handleFormSubmit, true);
  window.addEventListener("scroll", trackScrollDepth, { passive: true });
  window.addEventListener("load", trackScrollDepth);
})(window, document);