import {
  ClipboardList,
  PackageCheck,
  Truck,
  MessagesSquare,
} from "lucide-react";
import { benefits } from "@/lib/content";
const icons = [ClipboardList, PackageCheck, Truck, MessagesSquare];
export function TrustStrip() {
  return (
    <section
      aria-label="NOBACHAP service promises"
      className="border-y border-line bg-white"
    >
      <div className="mx-auto grid max-w-[1600px] gap-6 px-[5%] py-7 sm:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = icons[index];
          return (
            <div key={benefit.title} className="flex items-start gap-3">
              <Icon
                size={23}
                className="mt-1 shrink-0 text-rust"
                aria-hidden="true"
              />
              <div>
                <strong className="block text-sm">{benefit.title}</strong>
                <span className="text-xs text-muted">
                  {benefit.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
