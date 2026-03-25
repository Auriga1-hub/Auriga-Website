import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll-to-top helper that:
 * 1. disables browser automatic scroll restoration
 * 2. scrolls window + common app scroll containers ('.app-main', '.app-root', '#root', 'body', 'html')
 * 3. supports hash anchors (tries to scroll to the element if hash present)
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Prefer manual so browser doesn't "help" restore previous scroll
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Helper: attempt to scroll an element to top
    const tryScrollTop = (el) => {
      try {
        if (!el) return false;
        // if it's window-like
        if (el === window) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          return true;
        }
        // DOM element
        el.scrollTop = 0;
        // also try smooth API for browsers that support it
        if (typeof el.scrollTo === "function") el.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return true;
      } catch (e) {
        return false;
      }
    };

    // If there's a hash, wait a tick and try to scroll to that element first
    if (hash) {
      // allow the destination page to render
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
        // fallback to top if anchor not found
        tryScrollTop(document.querySelector(".app-main"));
        tryScrollTop(document.querySelector(".app-root"));
        tryScrollTop(document.getElementById("root"));
        tryScrollTop(document.documentElement);
        tryScrollTop(document.body);
        tryScrollTop(window);
      }, 0);
      return;
    }

    // Default: immediately reset scroll on common containers
    const containers = [
      document.querySelector(".app-main"),
      document.querySelector(".app-root"),
      document.getElementById("root"),
      document.documentElement,
      document.body,
      window,
    ];

    for (const c of containers) {
      tryScrollTop(c);
    }

    // cleanup: restore to auto when component unmounts (optional)
    return () => {
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        // keep manual if you prefer; restoring to 'auto' is safe too:
        // window.history.scrollRestoration = "auto";
      }
    };
  }, [pathname, hash]);

  return null;
}