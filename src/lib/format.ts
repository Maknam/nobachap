export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(amount);
}
export function formatRequest(fields: [string, string | undefined][]): string {
  return fields
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`)
    .join("\n");
}
export function getRequestHref(category: string, product?: string): string {
  const params = new URLSearchParams({ category });
  if (product) params.set("product", product);
  return `/pre-order?${params.toString()}`;
}
