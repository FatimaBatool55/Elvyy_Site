"use client";

import { useMemo, useState } from "react";

type SourceType = "website" | "book" | "journal" | "video" | "news";
type Style = "apa" | "mla" | "harvard" | "chicago" | "ieee";

const sourceTypes: { value: SourceType; label: string }[] = [
  { value: "website", label: "Website" },
  { value: "book", label: "Book" },
  { value: "journal", label: "Journal Article" },
  { value: "video", label: "Video" },
  { value: "news", label: "News Article" },
];

const styles: { value: Style; label: string }[] = [
  { value: "apa", label: "APA (7th edition)" },
  { value: "mla", label: "MLA (9th edition)" },
  { value: "harvard", label: "Harvard" },
  { value: "chicago", label: "Chicago (Author-Date)" },
  { value: "ieee", label: "IEEE" },
];

type Fields = {
  authors: string;
  title: string;
  year: string;
  fullDate: string;
  url: string;
  accessDate: string;
  siteName: string;
  publisher: string;
  city: string;
  edition: string;
  journalName: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  platform: string;
  publicationName: string;
};

const emptyFields: Fields = {
  authors: "",
  title: "",
  year: "",
  fullDate: "",
  url: "",
  accessDate: "",
  siteName: "",
  publisher: "",
  city: "",
  edition: "",
  journalName: "",
  volume: "",
  issue: "",
  pages: "",
  doi: "",
  platform: "",
  publicationName: "",
};

function clean(parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function generateCitation(style: Style, type: SourceType, f: Fields): string {
  const a = f.authors.trim();
  const t = f.title.trim();
  const y = f.year.trim() || "n.d.";

  if (style === "apa") {
    switch (type) {
      case "website":
        return clean([
          `${a}.`,
          `(${y}).`,
          `${t}.`,
          f.siteName && `${f.siteName}.`,
          f.url,
        ]);
      case "book":
        return clean([
          `${a}.`,
          `(${y}).`,
          `${t}${f.edition ? ` (${f.edition} ed.)` : ""}.`,
          `${f.publisher}.`,
        ]);
      case "journal":
        return clean([
          `${a}.`,
          `(${y}).`,
          `${t}.`,
          `${f.journalName}, ${f.volume}${f.issue ? `(${f.issue})` : ""}, ${f.pages}.`,
          f.doi && `https://doi.org/${f.doi}`,
        ]);
      case "video":
        return clean([
          `${a}.`,
          `(${y}).`,
          `${t} [Video].`,
          `${f.platform}.`,
          f.url,
        ]);
      case "news":
        return clean([
          `${a}.`,
          `(${y}).`,
          `${t}.`,
          `${f.publicationName}.`,
          f.url,
        ]);
    }
  }

  if (style === "mla") {
    switch (type) {
      case "website":
        return clean([
          `${a}.`,
          `"${t}."`,
          `${f.siteName},`,
          f.fullDate && `${f.fullDate},`,
          `${f.url}.`,
          f.accessDate && `Accessed ${f.accessDate}.`,
        ]);
      case "book":
        return clean([`${a}.`, `${t}.`, `${f.publisher}, ${y}.`]);
      case "journal":
        return clean([
          `${a}.`,
          `"${t}."`,
          `${f.journalName}, vol. ${f.volume}, no. ${f.issue}, ${y}, pp. ${f.pages}.`,
        ]);
      case "video":
        return clean([
          `"${t}."`,
          `${f.platform}, uploaded by ${a},`,
          f.fullDate && `${f.fullDate},`,
          `${f.url}.`,
        ]);
      case "news":
        return clean([
          `${a}.`,
          `"${t}."`,
          `${f.publicationName},`,
          f.fullDate && `${f.fullDate},`,
          `${f.url}.`,
        ]);
    }
  }

  if (style === "harvard") {
    switch (type) {
      case "website":
        return clean([
          `${a}`,
          `(${y})`,
          `${t}.`,
          `Available at: ${f.url}`,
          f.accessDate && `(Accessed: ${f.accessDate}).`,
        ]);
      case "book":
        return clean([
          `${a}`,
          `(${y})`,
          `${t}.`,
          f.edition && `${f.edition} edn.`,
          `${f.city ? `${f.city}: ` : ""}${f.publisher}.`,
        ]);
      case "journal":
        return clean([
          `${a}`,
          `(${y})`,
          `'${t}',`,
          `${f.journalName}, ${f.volume}${f.issue ? `(${f.issue})` : ""}, pp. ${f.pages}.`,
        ]);
      case "video":
        return clean([
          `${a}`,
          `(${y})`,
          `${t}.`,
          `Available at: ${f.url}`,
          f.accessDate && `(Accessed: ${f.accessDate}).`,
        ]);
      case "news":
        return clean([
          `${a}`,
          `(${y})`,
          `'${t}',`,
          `${f.publicationName}${f.fullDate ? `, ${f.fullDate}` : ""}.`,
        ]);
    }
  }

  if (style === "chicago") {
    switch (type) {
      case "website":
        return clean([
          `${a}.`,
          `${y}.`,
          `"${t}."`,
          `${f.siteName}.`,
          f.url && `${f.url}.`,
        ]);
      case "book":
        return clean([
          `${a}.`,
          `${y}.`,
          `${t}.`,
          `${f.city ? `${f.city}: ` : ""}${f.publisher}.`,
        ]);
      case "journal":
        return clean([
          `${a}.`,
          `${y}.`,
          `"${t}."`,
          `${f.journalName} ${f.volume}${f.issue ? ` (${f.issue})` : ""}: ${f.pages}.`,
        ]);
      case "video":
        return clean([
          `${a}.`,
          `${y}.`,
          `"${t}."`,
          `Video, ${f.platform}.`,
          f.url && `${f.url}.`,
        ]);
      case "news":
        return clean([
          `${a}.`,
          `${y}.`,
          `"${t}."`,
          `${f.publicationName}${f.fullDate ? `, ${f.fullDate}` : ""}.`,
        ]);
    }
  }

  if (style === "ieee") {
    switch (type) {
      case "website":
        return clean([
          `${a},`,
          `"${t},"`,
          `${f.siteName}.`,
          `[Online]. Available: ${f.url}.`,
          f.accessDate && `[Accessed: ${f.accessDate}].`,
        ]);
      case "book":
        return clean([
          `${a},`,
          `${t}${f.edition ? `, ${f.edition} ed.` : ""}.`,
          `${f.city ? `${f.city}: ` : ""}${f.publisher}, ${y}.`,
        ]);
      case "journal":
        return clean([
          `${a},`,
          `"${t},"`,
          `${f.journalName}, vol. ${f.volume}, no. ${f.issue}, pp. ${f.pages}, ${y}.`,
        ]);
      case "video":
        return clean([
          `${a},`,
          `"${t},"`,
          `${f.platform}, ${y}.`,
          `[Online video]. Available: ${f.url}.`,
        ]);
      case "news":
        return clean([
          `${a},`,
          `"${t},"`,
          `${f.publicationName}, ${y}.`,
          `[Online]. Available: ${f.url}.`,
        ]);
    }
  }

  return "";
}

export default function CitationGenerator() {
  const [sourceType, setSourceType] = useState<SourceType>("website");
  const [style, setStyle] = useState<Style>("apa");
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [copied, setCopied] = useState(false);
  const [extractUrl, setExtractUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [extractedFields, setExtractedFields] = useState<Set<string>>(
    new Set()
  );

  const canAutoExtract =
    sourceType === "website" || sourceType === "news" || sourceType === "video";

  async function handleExtract() {
    if (!extractUrl.trim()) return;
    setExtracting(true);
    setExtractError("");
    setExtractedFields(new Set());

    try {
      const res = await fetch("/api/extract-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: extractUrl.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setExtractError(
          data.error || "Could not extract details from this page."
        );
        setExtracting(false);
        return;
      }

      const found = new Set<string>();
      setFields((prev) => {
        const next = { ...prev };
        if (data.title) {
          next.title = data.title;
          found.add("title");
        }
        if (data.author) {
          next.authors = data.author;
          found.add("authors");
        }
        if (data.siteName) {
          next.siteName = data.siteName;
          next.publicationName = data.siteName;
          found.add("siteName");
        }
        if (data.year) {
          next.year = data.year;
          found.add("year");
        }
        if (data.fullDate) {
          next.fullDate = data.fullDate;
          found.add("fullDate");
        }
        if (data.url) {
          next.url = data.url;
          found.add("url");
        }
        return next;
      });
      setExtractedFields(found);

      if (!data.author) {
        setExtractError(
          "This page didn't have a clear author listed. Title and site details were filled in, add the author manually below."
        );
      }
    } catch {
      setExtractError(
        "Could not reach this page. Check the URL or enter the details manually below."
      );
    } finally {
      setExtracting(false);
    }
  }

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const citation = useMemo(() => {
    if (!fields.authors.trim() || !fields.title.trim()) return "";
    return generateCitation(style, sourceType, fields);
  }, [style, sourceType, fields]);

  async function handleCopy() {
    if (!citation) return;
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const showField = {
    siteName: sourceType === "website",
    publisher: sourceType === "book",
    city: sourceType === "book",
    edition: sourceType === "book",
    journalName: sourceType === "journal",
    volume: sourceType === "journal",
    issue: sourceType === "journal",
    pages: sourceType === "journal",
    doi: sourceType === "journal",
    platform: sourceType === "video",
    publicationName: sourceType === "news",
    url: sourceType !== "book",
    accessDate: sourceType === "website" || sourceType === "video",
    fullDate:
      sourceType === "website" ||
      sourceType === "video" ||
      sourceType === "news",
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Source type
          </label>
          <select
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value as SourceType)}
            className="mt-2 w-full rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          >
            {sourceTypes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Citation style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as Style)}
            className="mt-2 w-full rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          >
            {styles.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {canAutoExtract && (
        <div className="mt-6 rounded-lg border border-line bg-paper-dim p-5">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Auto-fill from a link
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            Paste a page URL and details like title, author, and site name
            will be pulled in where available. Always double check the
            result, not every page provides all of this information.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={extractUrl}
              onChange={(e) => setExtractUrl(e.target.value)}
              placeholder="https://example.com/article"
              className="flex-1 rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <button
              onClick={handleExtract}
              disabled={extracting || !extractUrl.trim()}
              className="rounded-lg bg-sage-deep px-5 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {extracting ? "Extracting..." : "Extract details"}
            </button>
          </div>
          {extractError && (
            <p className="mt-2 text-xs text-ink-soft">{extractError}</p>
          )}
          {extractedFields.size > 0 && !extractError && (
            <p className="mt-2 text-xs text-sage-deep">
              Details filled in below, review and edit anything that needs
              correcting.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Author(s)"
          placeholder="Smith, John; Doe, Jane"
          value={fields.authors}
          onChange={(v) => update("authors", v)}
        />
        <Field
          label="Title"
          placeholder="Title of the source"
          value={fields.title}
          onChange={(v) => update("title", v)}
        />
        <Field
          label="Year"
          placeholder="2024"
          value={fields.year}
          onChange={(v) => update("year", v)}
        />

        {showField.fullDate && (
          <Field
            label="Full published date (optional)"
            placeholder="15 March 2024"
            value={fields.fullDate}
            onChange={(v) => update("fullDate", v)}
          />
        )}
        {showField.siteName && (
          <Field
            label="Site or publisher name"
            placeholder="Investopedia"
            value={fields.siteName}
            onChange={(v) => update("siteName", v)}
          />
        )}
        {showField.publisher && (
          <Field
            label="Publisher"
            placeholder="Penguin Books"
            value={fields.publisher}
            onChange={(v) => update("publisher", v)}
          />
        )}
        {showField.city && (
          <Field
            label="City (optional)"
            placeholder="New York"
            value={fields.city}
            onChange={(v) => update("city", v)}
          />
        )}
        {showField.edition && (
          <Field
            label="Edition (optional)"
            placeholder="2nd"
            value={fields.edition}
            onChange={(v) => update("edition", v)}
          />
        )}
        {showField.journalName && (
          <Field
            label="Journal name"
            placeholder="Journal of Psychology"
            value={fields.journalName}
            onChange={(v) => update("journalName", v)}
          />
        )}
        {showField.volume && (
          <Field
            label="Volume"
            placeholder="12"
            value={fields.volume}
            onChange={(v) => update("volume", v)}
          />
        )}
        {showField.issue && (
          <Field
            label="Issue"
            placeholder="3"
            value={fields.issue}
            onChange={(v) => update("issue", v)}
          />
        )}
        {showField.pages && (
          <Field
            label="Pages"
            placeholder="45-60"
            value={fields.pages}
            onChange={(v) => update("pages", v)}
          />
        )}
        {showField.doi && (
          <Field
            label="DOI (optional)"
            placeholder="10.1000/xyz123"
            value={fields.doi}
            onChange={(v) => update("doi", v)}
          />
        )}
        {showField.platform && (
          <Field
            label="Platform"
            placeholder="YouTube"
            value={fields.platform}
            onChange={(v) => update("platform", v)}
          />
        )}
        {showField.publicationName && (
          <Field
            label="Publication name"
            placeholder="The New York Times"
            value={fields.publicationName}
            onChange={(v) => update("publicationName", v)}
          />
        )}
        {showField.url && (
          <Field
            label="URL"
            placeholder="https://example.com/article"
            value={fields.url}
            onChange={(v) => update("url", v)}
          />
        )}
        {showField.accessDate && (
          <Field
            label="Access date (optional)"
            placeholder="20 March 2024"
            value={fields.accessDate}
            onChange={(v) => update("accessDate", v)}
          />
        )}
      </div>

      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Generated citation
        </p>
        <div className="mt-2 min-h-[80px] rounded-lg border border-line bg-card p-4 text-sm leading-relaxed text-ink">
          {citation || (
            <span className="text-ink-soft">
              Fill in at least the author and title to see your citation
              here.
            </span>
          )}
        </div>
        {citation && (
          <button
            onClick={handleCopy}
            className="mt-3 rounded-lg border border-line px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft transition-colors hover:border-sage hover:text-sage-deep"
          >
            {copied ? "Copied" : "Copy citation"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />
    </label>
  );
}
