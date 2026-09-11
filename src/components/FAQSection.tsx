import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
export function FAQSection() {
  return (
    <section id="faqs" className="section bg-cream">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div>
          <span className="eyebrow">A little clarity</span>
          <h2 className="section-title">
            Good questions.
            <br />
            Straightforward answers.
          </h2>
          <p className="mt-5 text-muted">
            Here’s what to know before starting a request. Specific terms are
            confirmed with your quote before payment.
          </p>
          <a
            href="#enquire"
            className="mt-5 inline-block py-2 text-sm font-bold text-rust underline underline-offset-4"
          >
            Ask about your appliance
          </a>
        </div>
        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  size={19}
                  className="shrink-0 text-rust transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[680px] pb-6 pr-5 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
