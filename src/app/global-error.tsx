"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 40 }}>
        <h1 style={{ fontSize: 22, marginBottom: 12 }}>
          Something went wrong
        </h1>
        <p style={{ marginBottom: 16, color: "#5A564E" }}>
          Please try again, or reload the page.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: "8px 16px",
            border: "1px solid #E2DED2",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
