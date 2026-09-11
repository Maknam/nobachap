export const orderStatuses = [
  { id: "request-received", label: "Request received" },
  { id: "quotation-sent", label: "Quotation sent" },
  { id: "payment-confirmed", label: "Payment confirmed" },
  { id: "sourcing", label: "Product being sourced" },
  { id: "purchased", label: "Product purchased" },
  { id: "in-transit", label: "In transit" },
  { id: "arrived", label: "Arrived in Ghana" },
  { id: "out-for-delivery", label: "Out for delivery" },
  { id: "delivered", label: "Delivered" },
] as const;
export type OrderStatus = (typeof orderStatuses)[number]["id"];
export function getOrderStatusLabel(status: OrderStatus): string {
  return orderStatuses.find((item) => item.id === status)!.label;
}
