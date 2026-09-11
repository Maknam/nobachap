import { Truck } from "lucide-react";
export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center gap-2 bg-ink px-4 py-2 text-center text-xs leading-relaxed text-white">
      <Truck
        size={15}
        className="hidden shrink-0 sm:block"
        aria-hidden="true"
      />
      <span>
        Pre-order quality appliances <span className="px-1 text-copper">•</span>{" "}
        Nationwide delivery across Ghana
      </span>
    </div>
  );
}
