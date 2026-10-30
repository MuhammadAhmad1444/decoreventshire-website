// Posts forms to the PHP endpoint that ships with the static site (public/api/enquiry.php).
export type SubmitResult = { ok: boolean; error?: string };

export async function submitEnquiry(data: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiry.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json().catch(() => ({}))) as SubmitResult;
    return res.ok && json.ok ? { ok: true } : { ok: false, error: json.error || `Request failed (${res.status})` };
  } catch {
    return { ok: false, error: "Network error" };
  }
}
