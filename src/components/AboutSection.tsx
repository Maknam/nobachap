import { ArrowUpRight } from "lucide-react";
export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2 md:gap-20">
        <div>
          <span className="eyebrow">Meet NOBACHAP</span>
          <h2 className="section-title">
            Your home is personal.
            <br />
            Your appliance search
            <br className="hidden lg:block" /> should be, too.
          </h2>
        </div>
        <div className="max-w-[600px] space-y-4 text-muted">
          <p>
            NOBACHAP provides a simpler way for customers in Ghana to request,
            pre-order and receive home appliances that fit their needs,
            preferences and budgets.
          </p>
          <p>
            We work around customer requests rather than a ready-stock
            catalogue. Tell us what you’re looking for, and we’ll discuss
            suitable options, source your confirmed appliance and coordinate
            nationwide delivery.
          </p>
          <p>
            From the initial enquiry through sourcing, payment and delivery, our
            goal is to make each stage clear, convenient and dependable.
          </p>
          <a
            href="#enquire"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-rust"
          >
            Tell us what you need <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
