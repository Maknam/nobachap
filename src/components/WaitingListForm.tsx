"use client";
import { categories } from "@/data/categories";
import {
  emptyWaitingList,
  submitWaitingList,
  validateWaitingList,
} from "@/lib/waiting-list";
import { getWaitingListWhatsAppUrl } from "@/lib/whatsapp";
import { FormField } from "./forms/FormField";
import { useDemoForm } from "./forms/useDemoForm";
export function WaitingListForm() {
  const form = useDemoForm(
    emptyWaitingList,
    validateWaitingList,
    submitWaitingList,
    "waiting",
  );
  const url =
    form.state === "success" ? getWaitingListWhatsAppUrl(form.values) : null;
  return (
    <form
      aria-label="Pre-order waiting list"
      noValidate
      onSubmit={form.onSubmit}
      aria-busy={form.state === "loading"}
      aria-describedby="waiting-disclosure"
      className="min-w-0 rounded-2xl border border-line bg-white p-5 text-ink sm:p-8"
    >
      <p
        id="waiting-disclosure"
        className="mb-5 rounded-xl bg-cream p-3 text-sm"
      >
        Demo only: this form does not register you or save your details. You can
        prepare your interest and share it through WhatsApp when available.
      </p>
      <fieldset
        disabled={form.state === "loading"}
        className="grid min-w-0 gap-5 sm:grid-cols-2"
      >
        <FormField
          id="waiting-name"
          name="name"
          label="Full name"
          autoComplete="name"
          required
          value={form.values.name}
          error={form.errors.name}
          onChange={(value) => form.update("name", value)}
        />
        <FormField
          id="waiting-phone"
          name="phone"
          label="Phone or WhatsApp number"
          type="tel"
          autoComplete="tel"
          required
          value={form.values.phone}
          error={form.errors.phone}
          onChange={(value) => form.update("phone", value)}
        />
        <FormField
          id="waiting-category"
          name="category"
          label="Product category"
          required
          value={form.values.category}
          error={form.errors.category}
          onChange={(value) => form.update("category", value)}
          options={[
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
            { value: "other", label: "Other / help me choose" },
          ]}
        />
        <FormField
          id="waiting-contactMethod"
          name="contactMethod"
          label="Preferred contact method"
          required
          value={form.values.contactMethod}
          error={form.errors.contactMethod}
          onChange={(value) => form.update("contactMethod", value)}
          options={["WhatsApp", "Phone call", "SMS"].map((method) => ({
            value: method,
            label: method,
          }))}
        />
        <div className="sm:col-span-2">
          <FormField
            id="waiting-product"
            name="product"
            label="Product needed"
            placeholder="What would you like us to look out for?"
            required
            value={form.values.product}
            error={form.errors.product}
            onChange={(value) => form.update("product", value)}
          />
        </div>
        <p className="text-xs text-muted sm:col-span-2">
          When you send your interest to NOBACHAP, you are asking to be
          contacted about suitable sourcing opportunities through your selected
          contact method.
        </p>
        <button
          type="submit"
          className="button bg-ink text-white sm:col-span-2"
        >
          {form.state === "loading"
            ? "Preparing interest…"
            : "Prepare waiting-list interest (demo)"}
        </button>
      </fieldset>
      <p
        role="status"
        aria-live="polite"
        className={`mt-4 text-sm font-semibold ${form.state === "error" ? "text-red-800" : "text-green"}`}
      >
        {form.message}
      </p>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="button mt-4 w-full bg-cream"
        >
          Share interest through WhatsApp
          <span className="sr-only"> (opens a new tab)</span>
        </a>
      )}
    </form>
  );
}
