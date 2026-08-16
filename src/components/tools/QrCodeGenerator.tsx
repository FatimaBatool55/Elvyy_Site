"use client";

import { useState } from "react";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("https://elvyy.com");

  const src = value.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
        value
      )}`
    : "";

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div>
        <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Link or text
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://example.com"
          className="mt-2 w-full rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
        />
        <p className="mt-3 text-sm text-ink-soft">
          Type a URL, email, or any text, the QR code on the right updates
          instantly and can be downloaded or scanned right from the screen.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-line bg-card p-6">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Generated QR code"
            width={220}
            height={220}
            className="rounded"
          />
        ) : (
          <div className="flex h-[220px] w-[220px] items-center justify-center rounded bg-paper-dim text-xs text-ink-soft">
            Enter text to generate
          </div>
        )}
        {src && (
          <a
            href={src}
            download="elvyy-qr-code.png"
            className="font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
          >
            Download PNG →
          </a>
        )}
      </div>
    </div>
  );
}
