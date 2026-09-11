import { Check, Package, MapPin, ArrowRight, Truck } from "lucide-react";
import { orderStatuses, getOrderStatusLabel } from "@/data/order-statuses";
export function TrackingPreview() {
  return (
    <section id="tracking" className="section bg-ink text-white">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-copper/40 bg-copper/10 px-3 py-2 text-xs font-semibold text-[#ffc7a6]">
            <span className="size-1.5 rounded-full bg-copper" />
            Order tracking platform coming soon
          </span>
          <h2 className="section-title">
            One order number.
            <br />
            Every step, in view.
          </h2>
          <p className="mt-6 max-w-[480px] text-white/75">
            From your first request to the final delivery, the planned platform
            will bring your order’s progress into one place.
          </p>
          <p className="mt-4 max-w-[480px] text-sm text-white/75">
            This is a preview of the planned tracking experience. The sample
            below is not a real customer order.
          </p>
          <div className="mt-8 rounded-2xl border border-white/20 p-5">
            <label
              htmlFor="preview-order-number"
              className="block text-sm font-semibold"
            >
              Enter your order number
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                id="preview-order-number"
                disabled
                placeholder="e.g. NB-2026-1048"
                aria-describedby="tracking-note"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/5 p-3 text-sm placeholder:text-white/60"
              />
              <button
                disabled
                type="button"
                className="button bg-copper text-ink"
              >
                Track <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
            <p id="tracking-note" className="mt-3 text-xs text-white/70">
              Preview only. Order lookup is not available yet.
            </p>
          </div>
        </div>
        <div className="min-w-0 rounded-[24px] bg-paper p-5 text-ink sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
            <div>
              <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                Sample order · Preview
              </p>
              <p className="mt-1 font-heading text-xl font-bold">
                NB-2026-1048
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-rust">
              <Truck size={14} aria-hidden="true" />
              {getOrderStatusLabel("in-transit")}
            </span>
          </div>
          <div className="my-5 flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cream text-rust">
              <Package size={23} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold">Family fridge freezer</h3>
              <p className="flex items-center gap-1 text-xs text-muted">
                <MapPin size={12} aria-hidden="true" />
                Accra, Greater Accra · Sample destination
              </p>
            </div>
          </div>
          <ol className="grid gap-x-6 sm:grid-cols-2">
            {orderStatuses.map((status, index) => (
              <li
                key={status.id}
                aria-current={index === 5 ? "step" : undefined}
                className={`flex items-center gap-3 border-t border-line py-3 text-sm ${index === 5 ? "font-bold text-rust" : index < 5 ? "text-ink" : "text-muted"}`}
              >
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${index < 5 ? "bg-ink text-white" : index === 5 ? "bg-copper text-ink" : "border border-line"}`}
                >
                  {index < 5 ? (
                    <Check size={13} aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                {status.label}
                {index === 5 && (
                  <span className="sr-only"> (sample current status)</span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
            Last updated: — · Live timestamps will appear here when tracking
            launches.
          </p>
        </div>
      </div>
    </section>
  );
}
