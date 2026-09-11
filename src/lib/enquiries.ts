import { categories } from "@/data/categories";
export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  category: string;
  product: string;
  brand: string;
  model: string;
  productUrl: string;
  budget: string;
  location: string;
  details: string;
  consent: boolean;
};
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;
export const emptyEnquiry: Enquiry = {
  name: "",
  phone: "",
  email: "",
  category: "",
  product: "",
  brand: "",
  model: "",
  productUrl: "",
  budget: "",
  location: "",
  details: "",
  consent: false,
};
export function isPhoneValid(phone: string): boolean {
  return (
    /^[+\d\s().-]+$/.test(phone) &&
    phone.replace(/\D/g, "").length >= 9 &&
    phone.replace(/\D/g, "").length <= 15
  );
}
export function isCategoryValid(id: string): boolean {
  return id === "other" || categories.some((category) => category.id === id);
}
export function validateEnquiry(values: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const field of ["name", "product", "location"] as const) {
    if (values[field].trim().length < 2)
      errors[field] = "Please enter at least two characters.";
  }
  if (!isPhoneValid(values.phone))
    errors.phone = "Enter a valid phone number with 9–15 digits.";
  if (!isCategoryValid(values.category))
    errors.category = "Please select a product category.";
  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  )
    errors.email = "Enter a valid email address or leave this blank.";
  if (values.productUrl.trim()) {
    try {
      const url = new URL(values.productUrl.trim());
      if (!["https:", "http:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.productUrl = "Enter a complete http:// or https:// product link.";
    }
  }
  for (const field of [
    "name",
    "phone",
    "email",
    "product",
    "brand",
    "model",
    "productUrl",
    "budget",
    "location",
    "details",
  ] as const) {
    if (
      values[field].length >
      (field === "details" || field === "productUrl" ? 2000 : 200)
    )
      errors[field] = "Please shorten this entry.";
  }
  if (!values.consent)
    errors.consent = "Please agree to be contacted about your request.";
  return errors;
}
export type DemoResult = { mode: "demo"; message: string };
// Integration boundary: replace with a server API/Supabase/email/CRM/webhook adapter.
// Revalidate on the server. Only report receipt after a successful durable write.
// Future images should use authenticated storage uploads and validated attachment IDs.
export async function submitEnquiry(values: Enquiry): Promise<DemoResult> {
  if (Object.keys(validateEnquiry(values)).length)
    throw new Error("Please check your request and try again.");
  await new Promise((resolve) => setTimeout(resolve, 650));
  return {
    mode: "demo",
    message:
      "Your request is ready. This demo has not sent or saved it. No order or waiting-list entry has been created. Send it through WhatsApp when available to contact NOBACHAP.",
  };
}
