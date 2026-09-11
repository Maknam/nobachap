import { orderingSteps } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
export function HowItWorks() {
  return (
    <section id="process" className="section border-y border-line bg-cream">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="How pre-ordering works"
          title="A clear path to your doorstep."
        >
          Know what comes next, from your first enquiry to nationwide delivery.
        </SectionHeading>
        <ol className="grid gap-7 sm:grid-cols-2 xl:grid-cols-5">
          {orderingSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative border-t border-copper/50 pt-5"
            >
              <span className="inline-grid size-11 place-items-center rounded-full bg-ink text-sm font-bold text-[#ffc7a6]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 mb-2 font-heading text-lg font-bold">
                {step.title}
              </h3>
              <p className="text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
