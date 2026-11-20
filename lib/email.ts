import { after } from "next/server";
import { createHash } from "node:crypto";

type Message = { subject: string; text: string };

export function testEmailEnabled() {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.RESEND_TEST_RECIPIENT?.trim() && process.env.APP_ORIGIN);
}

export function scheduleTestEmail(event: string, loadMessage: (origin: string) => Message | Promise<Message>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const inbox = process.env.RESEND_TEST_RECIPIENT?.trim();
  const origin = process.env.APP_ORIGIN;
  if (!apiKey || !inbox || !origin) return;

  after(async () => {
    try {
      const message = await loadMessage(origin);
      const body = JSON.stringify({
        from: "DR Car Rental & Sales <onboarding@resend.dev>",
        to: [inbox],
        subject: "[Test] " + message.subject,
        text: "Test notification. Delivered only to the configured test inbox.\n\n" + message.text
      });
      const key = createHash("sha256").update(event).digest("hex");
      for (let attempt = 0; attempt < 2; attempt++) {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json", "Idempotency-Key": key },
          signal: AbortSignal.timeout(5000),
          body
        }).catch(() => null);
        if (response?.ok) return;
        if (!response || response.status === 429 || response.status >= 500) {
          if (attempt === 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
        }
        console.error("Test notification delivery failed", { status: response?.status ?? "network" });
        return;
      }
    } catch {
      console.error("Test notification could not be prepared");
    }
  });
}
