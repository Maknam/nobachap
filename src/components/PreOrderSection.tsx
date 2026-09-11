import { Check } from "lucide-react";
import Link from "next/link";
import type { Enquiry } from "@/lib/enquiries";
import { PreOrderForm } from "./PreOrderForm";
import { WhatsAppButton } from "./WhatsAppButton";
export function PreOrderSection({
  initialValues,
}: {
  initialValues?: Partial<Enquiry>;
}) {
  return (
    <section id="enquire" className="section bg-cream">
      <div className="mx-auto grid max-w-[1400px] items-start gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
        <div>
          <span className="eyebrow">Let’s find your next appliance</span>
          <h2 className="section-title">Tell us what you have in mind.</h2>
          <p className="mt-5 text-muted">
            A specific model, a practical upgrade or just an idea. Share your
            needs so NOBACHAP can discuss suitable options, pricing and the
            expected delivery timeline.
          </p>
          <ul className="my-7 space-y-3 text-sm">
            {[
              "Your needs and budget come first",
              "Options and terms discussed before payment",
              "Delivery coordinated to your town or region",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  size={19}
                  className="shrink-0 text-rust"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-bold">Prefer a conversation?</h3>
            <p className="mt-2 mb-4 text-sm text-muted">
              You can also share a product or reference photo directly with the
              team.
            </p>
            <WhatsAppButton />
          </div>
          <p className="mt-6 text-sm text-muted">
            Still exploring?{" "}
            <Link
              href="/#waiting-list"
              className="font-semibold text-rust underline underline-offset-4"
            >
              See the pre-order waiting list
            </Link>
            .
          </p>
        </div>
        <PreOrderForm initialValues={initialValues} />
      </div>
    </section>
  );
}
