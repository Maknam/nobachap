"use client";
import { ImagePlus } from "lucide-react";
import { categories } from "@/data/categories";
import {
  emptyEnquiry,
  submitEnquiry,
  validateEnquiry,
  type Enquiry,
} from "@/lib/enquiries";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { FormField } from "./forms/FormField";
import { useDemoForm } from "./forms/useDemoForm";
const fields: {
  name: Exclude<keyof Enquiry, "consent">;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  wide?: boolean;
}[] = [
  {
    name: "name",
    label: "Full name",
    placeholder: "Your full name",
    required: true,
    autoComplete: "name",
  },
  {
    name: "phone",
    label: "Phone or WhatsApp number",
    placeholder: "e.g. 024 000 0000",
    required: true,
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "email",
    label: "Email address (optional)",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
  },
  { name: "category", label: "Product category", required: true },
  {
    name: "product",
    label: "Appliance needed",
    placeholder: "e.g. A fridge freezer for a family of four",
    required: true,
    wide: true,
  },
  {
    name: "brand",
    label: "Preferred brand (optional)",
    placeholder: "Any brand you have in mind",
  },
  {
    name: "model",
    label: "Model or specification (optional)",
    placeholder: "Size, capacity or model number",
  },
  {
    name: "budget",
    label: "Budget range (optional)",
    placeholder: "Your budget in GH₵",
  },
  {
    name: "location",
    label: "Delivery town or region",
    placeholder: "e.g. Kumasi, Ashanti Region",
    required: true,
    autoComplete: "address-level2",
  },
  {
    name: "productUrl",
    label: "Product URL (optional)",
    placeholder: "https://…",
    type: "url",
    wide: true,
  },
  {
    name: "details",
    label: "Additional details (optional)",
    placeholder:
      "Tell us about the features or preferences that matter to you.",
    wide: true,
  },
];
export function PreOrderForm({
  initialValues = {},
}: {
  initialValues?: Partial<Enquiry>;
}) {
  const form = useDemoForm(
    { ...emptyEnquiry, ...initialValues },
    validateEnquiry,
    submitEnquiry,
    "enquiry",
  );
  const whatsappUrl =
    form.state === "success" ? getWhatsAppUrl(form.values) : null;
  return (
    <form
      aria-label="Appliance request"
      noValidate
      onSubmit={form.onSubmit}
      aria-describedby="enquiry-disclosure"
      aria-busy={form.state === "loading"}
      className="min-w-0 rounded-2xl border border-line bg-white p-5 text-ink sm:p-8"
    >
      <div className="mb-6 border-b border-line pb-5">
        <h3 className="font-heading text-xl font-bold">
          A few details. A more useful response.
        </h3>
        <p className="mt-2 text-sm text-muted">Fields marked * are required.</p>
        <p
          id="enquiry-disclosure"
          className="mt-4 rounded-xl bg-cream p-3 text-sm"
        >
          Demo form: prepare your request here, then send it through WhatsApp
          when available. This form does not send or save your details.
        </p>
      </div>
      <fieldset
        disabled={form.state === "loading"}
        className="grid min-w-0 gap-5 sm:grid-cols-2"
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.wide ? "min-w-0 sm:col-span-2" : "min-w-0"}
          >
            <FormField
              {...field}
              id={`enquiry-${field.name}`}
              value={form.values[field.name]}
              onChange={(value) => form.update(field.name, value)}
              error={form.errors[field.name]}
              multiline={field.name === "details"}
              maxLength={
                field.name === "details" || field.name === "productUrl"
                  ? 2000
                  : 200
              }
              options={
                field.name === "category"
                  ? [
                      ...categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                      })),
                      { value: "other", label: "Other / help me choose" },
                    ]
                  : undefined
              }
            />
          </div>
        ))}
        <div className="rounded-xl border border-dashed border-line bg-paper p-4 sm:col-span-2">
          <label
            htmlFor="enquiry-photo"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <ImagePlus size={18} aria-hidden="true" />
            Reference photo — coming soon
          </label>
          <input
            id="enquiry-photo"
            type="file"
            accept="image/*"
            disabled
            aria-describedby="photo-help"
            className="mt-2 block w-full min-w-0 text-xs text-muted"
          />
          <p id="photo-help" className="mt-2 text-xs text-muted">
            For now, add a product link above or share a photo directly in
            WhatsApp.
          </p>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-consent"
            className="flex items-start gap-3 text-sm text-muted"
          >
            <input
              id="enquiry-consent"
              type="checkbox"
              name="consent"
              required
              checked={form.values.consent}
              onChange={(event) => form.update("consent", event.target.checked)}
              aria-invalid={!!form.errors.consent}
              aria-describedby={
                form.errors.consent ? "consent-error" : undefined
              }
              className="mt-1 size-4 shrink-0 accent-rust"
            />
            I agree to be contacted about this appliance request. *
          </label>
          {form.errors.consent && (
            <p id="consent-error" className="mt-1 text-sm text-red-800">
              {form.errors.consent}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="button w-full bg-copper text-ink sm:col-span-2"
        >
          {form.state === "loading"
            ? "Preparing request…"
            : "Prepare my request (demo)"}
        </button>
      </fieldset>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`mt-4 min-h-6 text-sm font-semibold ${form.state === "error" ? "text-red-800" : "text-green"}`}
      >
        {form.message}
      </p>
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button mt-4 w-full bg-ink text-white"
        >
          Send this request through WhatsApp
          <span className="sr-only"> (opens a new tab)</span>
        </a>
      )}
    </form>
  );
}
