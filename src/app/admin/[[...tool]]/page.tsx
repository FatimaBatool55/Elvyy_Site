"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default function AdminPage() {
  if (!projectId) {
    return (
      <div style={{ padding: 40, fontFamily: "monospace", maxWidth: 640 }}>
        <h1 style={{ fontSize: 20, marginBottom: 12 }}>Sanity project ID not found</h1>
        <p style={{ marginBottom: 8 }}>
          This means the app cannot see your <code>.env.local</code> file, or the variable name inside it is not exactly right.
        </p>
        <p style={{ marginBottom: 8 }}>Checklist:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>File must be named exactly <code>.env.local</code> and sit next to <code>package.json</code>.</li>
          <li>It must contain exactly:<br /><code>NEXT_PUBLIC_SANITY_PROJECT_ID=wr9qd7c1</code><br /><code>NEXT_PUBLIC_SANITY_DATASET=production</code></li>
          <li>No quotes, no spaces around the = sign.</li>
          <li>Fully stop the dev server (Ctrl+C) and run <code>npm run dev -- --webpack</code> again after editing this file.</li>
        </ul>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
