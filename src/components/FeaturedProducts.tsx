import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
export function FeaturedProducts() {
  return (
    <section id="featured" className="section">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="A little inspiration"
          title="What’s on your home wishlist?"
        >
          These demonstration products show the kinds of appliances you can
          request. They are not confirmed stock or offers.
        </SectionHeading>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          Illustrations are for inspiration. Brand, specifications,
          availability, price and delivery are confirmed with your quote.
        </p>
      </div>
    </section>
  );
}
