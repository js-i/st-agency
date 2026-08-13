"use server";

import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  programme: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
  locale: z.enum(["en", "ru"]),
  // Honeypot: real users never fill this hidden field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    programme: formData.get("programme"),
    message: formData.get("message"),
    locale: formData.get("locale"),
    website: formData.get("website"),
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  // Honeypot triggered — silently report success to the bot without notifying anyone.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const { firstName, lastName, email, phone, country, programme, message, locale } =
    parsed.data;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error(
      "Contact form submitted, but TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured.",
      { firstName, lastName, email },
    );
    return { status: "error", message: "not_configured" };
  }

  const lines = [
    "New consultation request — Island Horizons",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    country ? `Country: ${country}` : null,
    programme ? `Programme: ${programme}` : null,
    `Locale: ${locale}`,
    "",
    message,
  ].filter(Boolean);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`Telegram API responded with ${res.status}`);
    }

    return { status: "success" };
  } catch (error) {
    console.error("Failed to deliver contact form to Telegram:", error);
    return { status: "error", message: "delivery_failed" };
  }
}
