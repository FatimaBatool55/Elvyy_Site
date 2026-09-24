"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("elvyy-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("elvyy-cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("elvyy-cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-card p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-ink-soft">
          This site uses cookies for basic functionality and, where enabled,
          advertising. See our{" "}
          <a href="/privacy-policy" className="text-sage-deep hover:underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded-lg border border-line px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft hover:border-sage"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-sage-deep px-4 py-2 font-mono text-xs uppercase tracking-wide text-paper hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
