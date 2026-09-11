import { testimonials } from "@/data/testimonials";
export function Testimonials() {
  const approved = testimonials.filter(
    (item) => item.verified && item.publicationConsent,
  );
  if (!approved.length) return null;
  return (
    <section className="section bg-cream" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1400px]">
        <span className="eyebrow">Customer experiences</span>
        <h2 id="testimonials-title" className="section-title">
          In our customers’ words.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {approved.map((item) => (
            <figure key={item.id} className="rounded-2xl bg-white p-6">
              <blockquote>{item.quote}</blockquote>
              <figcaption className="mt-4 font-semibold">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
