"use client";

import { useMemo, useState } from "react";

type Category = "length" | "weight" | "temperature";

const lengthUnits = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  miles: 1609.34,
  feet: 0.3048,
  inches: 0.0254,
};

const weightUnits = {
  kilograms: 1,
  grams: 0.001,
  pounds: 0.453592,
  ounces: 0.0283495,
};

function convertTemp(value: number, from: string, to: string) {
  let celsius: number;
  if (from === "celsius") celsius = value;
  else if (from === "fahrenheit") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15;

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("meters");
  const [to, setTo] = useState("feet");

  const units = useMemo(() => {
    if (category === "length") return Object.keys(lengthUnits);
    if (category === "weight") return Object.keys(weightUnits);
    return ["celsius", "fahrenheit", "kelvin"];
  }, [category]);

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;

    if (category === "temperature") {
      return convertTemp(num, from, to);
    }
    const table = category === "length" ? lengthUnits : weightUnits;
    const fromFactor = table[from as keyof typeof table];
    const toFactor = table[to as keyof typeof table];
    if (!fromFactor || !toFactor) return null;
    return (num * fromFactor) / toFactor;
  }, [value, from, to, category]);

  function handleCategoryChange(next: Category) {
    setCategory(next);
    if (next === "length") {
      setFrom("meters");
      setTo("feet");
    } else if (next === "weight") {
      setFrom("kilograms");
      setTo("pounds");
    } else {
      setFrom("celsius");
      setTo("fahrenheit");
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        {(["length", "weight", "temperature"] as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryChange(c)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              category === c
                ? "border-sage-deep bg-sage-deep text-paper"
                : "border-line text-ink-soft hover:border-sage"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-lg border border-line bg-card p-4">
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            From
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded border border-line bg-paper p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 w-full rounded border border-line bg-paper p-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-sage"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center text-ink-soft">
          →
        </div>

        <div className="rounded-lg border border-line bg-card p-4">
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            To
          </label>
          <p className="mt-2 rounded border border-line bg-paper-dim p-2 text-sm font-display text-lg">
            {result !== null ? result.toFixed(4).replace(/\.?0+$/, "") : "0"}
          </p>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 w-full rounded border border-line bg-paper p-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-sage"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
