import type { Enquiry } from "./enquiries";
import type { WaitingListRequest } from "./waiting-list";
import { getCategoryName } from "@/data/categories";
import { formatRequest } from "./format";
export function createWhatsAppUrl(
  message: string,
  number = process.env.NEXT_PUBLIC_NOBACHAP_WHATSAPP_NUMBER,
): string | null {
  if (!number || !/^[1-9]\d{7,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function getWhatsAppUrl(
  request?: Partial<Enquiry>,
  number = process.env.NEXT_PUBLIC_NOBACHAP_WHATSAPP_NUMBER,
): string | null {
  const message = request
    ? [
        "Hello NOBACHAP, I would like to pre-order an appliance.",
        formatRequest([
          ["Name", request.name],
          ["Phone", request.phone],
          ["Email", request.email],
          [
            "Category",
            request.category ? getCategoryName(request.category) : undefined,
          ],
          ["Appliance", request.product],
          ["Preferred brand", request.brand],
          ["Model / specification", request.model],
          ["Product link", request.productUrl],
          ["Budget", request.budget],
          ["Delivery town or region", request.location],
          ["Additional details", request.details],
        ]),
        "Please confirm available options, price and expected delivery timeline.",
      ]
        .filter(Boolean)
        .join("\n")
    : "Hello NOBACHAP, I would like to pre-order an appliance. Please help me with available options, pricing and delivery across Ghana.";
  return createWhatsAppUrl(message, number);
}
export function getWaitingListWhatsAppUrl(
  request: WaitingListRequest,
): string | null {
  return createWhatsAppUrl(
    `Hello NOBACHAP, please contact me when a suitable sourcing opportunity becomes available.\n${formatRequest(
      [
        ["Name", request.name],
        ["Phone", request.phone],
        ["Category", getCategoryName(request.category)],
        ["Product", request.product],
        ["Preferred contact method", request.contactMethod],
      ],
    )}`,
  );
}
