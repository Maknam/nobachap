import { isPhoneValid, isCategoryValid, type DemoResult } from "./enquiries";
export type WaitingListRequest = {
  name: string;
  phone: string;
  category: string;
  product: string;
  contactMethod: string;
};
export const emptyWaitingList: WaitingListRequest = {
  name: "",
  phone: "",
  category: "",
  product: "",
  contactMethod: "",
};
export function validateWaitingList(
  values: WaitingListRequest,
): Partial<Record<keyof WaitingListRequest, string>> {
  const errors: Partial<Record<keyof WaitingListRequest, string>> = {};
  for (const field of ["name", "product"] as const)
    if (values[field].trim().length < 2 || values[field].length > 200)
      errors[field] = "Please enter between 2 and 200 characters.";
  if (!isPhoneValid(values.phone) || values.phone.length > 200)
    errors.phone = "Enter a valid phone number with 9–15 digits.";
  if (!isCategoryValid(values.category))
    errors.category = "Please select a product category.";
  if (!["WhatsApp", "Phone call", "SMS"].includes(values.contactMethod))
    errors.contactMethod = "Choose how you would like us to contact you.";
  return errors;
}
// Separate adapter so waiting-list leads can have their own CRM workflow and retention.
export async function submitWaitingList(
  values: WaitingListRequest,
): Promise<DemoResult> {
  if (Object.keys(validateWaitingList(values)).length)
    throw new Error("Please check your details.");
  await new Promise((resolve) => setTimeout(resolve, 650));
  return {
    mode: "demo",
    message:
      "Your interest is ready to share. This demo has not sent or saved your details, and you have not joined a waiting list. Use WhatsApp when available to contact NOBACHAP.",
  };
}
