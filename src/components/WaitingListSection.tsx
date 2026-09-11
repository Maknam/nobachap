import { BellRing } from "lucide-react";
import { WaitingListForm } from "./WaitingListForm";
export function WaitingListSection() {
  return (
    <section id="waiting-list" className="section border-y border-line">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
        <div>
          <BellRing
            size={32}
            strokeWidth={1.5}
            className="mb-6 text-rust"
            aria-hidden="true"
          />
          <span className="eyebrow">Not quite ready to order?</span>
          <h2 className="section-title">Keep your wishlist on our radar.</h2>
          <p className="mt-5 text-muted">
            The pre-order waiting list will let NOBACHAP contact you when a
            suitable sourcing opportunity becomes available. Share the
            essentials and your preferred way to hear from us.
          </p>
          <p className="mt-4 text-sm font-semibold text-rust">
            Expressing interest is not a purchase or a confirmed order.
          </p>
        </div>
        <WaitingListForm />
      </div>
    </section>
  );
}
