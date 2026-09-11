import { SiWhatsapp } from "react-icons/si";
import { getWhatsAppUrl } from "@/lib/whatsapp";
export function WhatsAppButton({
  product,
  children = "Order through WhatsApp",
  className = "",
}: {
  product?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const url = getWhatsAppUrl(product ? { product } : undefined);
  if (!url)
    return (
      <span className={`inline-flex flex-col items-start gap-1 ${className}`}>
        <span
          className="button cursor-not-allowed border border-current/25 opacity-75"
          aria-disabled="true"
        >
          <SiWhatsapp size={17} aria-hidden="true" />
          {children}
        </span>
        <span className="text-xs">WhatsApp contact coming soon</span>
      </span>
    );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`button border border-current/25 ${className}`}
    >
      <SiWhatsapp size={17} aria-hidden="true" />
      {children}
      <span className="sr-only"> (opens a new tab)</span>
    </a>
  );
}
