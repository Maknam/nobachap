import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { SectionHeading } from "./SectionHeading";
import { CategoryCard } from "./CategoryCard";
export function ProductCategories() {
  return (
    <section id="products" className="section bg-cream">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Explore by category"
          title="Made for the way you live."
        >
          From the kitchen to the living room, start with a category. We’ll help
          you narrow down the right options.
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          <article className="flex flex-col items-start rounded-2xl bg-ink p-6 text-white">
            <span className="eyebrow text-[#ffc7a6]">
              Something else in mind?
            </span>
            <h3 className="font-heading text-2xl leading-tight font-bold">
              Your wishlist is a good place to start.
            </h3>
            <p className="mt-3 mb-5 text-sm text-white/75">
              Share a product link, model or description. Let’s explore what’s
              possible.
            </p>
            <a
              href="#enquire"
              className="mt-auto inline-flex min-h-11 items-center gap-3 font-bold text-[#ffc7a6]"
            >
              Tell us what you need <ArrowRight size={18} aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
