import type { IconType } from "react-icons";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

const socialLinks: { name: string; href: string; icon: IconType }[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nobachapenterprise/",
    icon: SiInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: SiFacebook,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@nobachapenterprise",
    icon: SiTiktok,
  },
];

export function SocialLinks() {
  return (
    <nav aria-label="Social media" className="col-span-full">
      <ul className="flex flex-wrap gap-3">
        {socialLinks.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 font-semibold text-ink transition-colors hover:border-rust hover:bg-cream hover:text-rust motion-reduce:transition-none"
            >
              <Icon size={18} aria-hidden="true" />
              {name}
              <span className="sr-only"> (opens a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
