import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { PreOrderSection } from "@/components/PreOrderSection";
import { getSiteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "Request an appliance | NOBACHAP",
  description:
    "Tell NOBACHAP the appliance, brand and delivery location you have in mind. Prepare a pre-order request for delivery across Ghana.",
  alternates: { canonical: getSiteUrl() ? "/pre-order" : undefined },
  openGraph: {
    title: "Request an appliance | NOBACHAP",
    description:
      "Prepare a request for appliance sourcing and nationwide delivery across Ghana.",
  },
};
export default async function PreOrderPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const category =
    typeof query.category === "string" &&
    (query.category === "other" ||
      categories.some((item) => item.id === query.category))
      ? query.category
      : "";
  const product =
    typeof query.product === "string" ? query.product.slice(0, 200) : "";
  return (
    <main id="main-content">
      <div className="bg-cream px-[5%] pt-8">
        <div className="mx-auto max-w-[1400px]">
          <Link href="/#products" className="text-sm font-semibold text-rust">
            ← Back to appliance categories
          </Link>
          <h1 className="mt-4 font-heading text-2xl font-bold">
            Start your appliance request
          </h1>
        </div>
      </div>
      <PreOrderSection
        key={`${category}:${product}`}
        initialValues={{ category, product }}
      />
    </main>
  );
}
