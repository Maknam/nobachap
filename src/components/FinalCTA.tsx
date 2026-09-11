import { ArrowUpRight } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
export function FinalCTA() {
  return (
    <section id="contact" className="section">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 rounded-[24px] bg-copper p-7 sm:p-12 lg:flex-row lg:items-center">
        <div className="max-w-[500px]">
          <span className="eyebrow text-ink">Let’s bring it home</span>
          <h2 className="section-title">Looking for a particular appliance?</h2>
          <p className="mt-4">
            Tell us what you need. We’ll take it from there.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap items-start gap-3">
            <a href="#enquire" className="button bg-ink text-white">
              Submit a Request <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
          </div>
          <a
            href="#waiting-list"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"
          >
            Join the Waiting List <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
