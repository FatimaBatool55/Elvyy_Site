export function extractJson<T>(raw: string): T | null {
  let text = raw.trim();
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "");
  text = text.replace(/```\s*$/i, "");

  try {
    return JSON.parse(text) as T;
  } catch {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1)) as T;
      } catch {
        return null;
      }
    }
    const objStart = text.indexOf("{");
    const objEnd = text.lastIndexOf("}");
    if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
      try {
        return JSON.parse(text.slice(objStart, objEnd + 1)) as T;
      } catch {
        return null;
      }
    }
    return null;
  }
}
