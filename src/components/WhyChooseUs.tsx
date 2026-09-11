import {
  ListChecks,
  MessagesSquare,
  SearchCheck,
  Truck,
  HandHelping,
} from "lucide-react";
const reasons = [
  {
    icon: SearchCheck,
    title: "More room for your preferences",
    text: "Request the appliance options that suit your home, rather than choosing only from a shelf.",
  },
  {
    icon: HandHelping,
    title: "Help choosing well",
    text: "Talk through features, specifications and budget before settling on an option.",
  },
  {
    icon: ListChecks,
    title: "Clear pre-order stages",
    text: "Understand the quote, payment, sourcing and delivery steps before you commit.",
  },
  {
    icon: Truck,
    title: "Delivery beyond one city",
    text: "Coordinate delivery to your town or region, with arrangements discussed in advance.",
  },
  {
    icon: MessagesSquare,
    title: "A conversation that continues",
    text: "Stay in touch with NOBACHAP as your request moves towards delivery.",
  },
];
export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="eyebrow">Why choose NOBACHAP</span>
          <h2 className="section-title">
            Thoughtful sourcing.
            <br />
            Human support.
          </h2>
          <p className="mt-5 text-muted">
            Bringing an appliance home should start with understanding what you
            actually need.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-t border-line pt-5">
              <Icon
                size={25}
                strokeWidth={1.5}
                className="mb-4 text-rust"
                aria-hidden="true"
              />
              <h3 className="font-heading font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
