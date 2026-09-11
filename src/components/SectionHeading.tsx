export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[2.8rem] flex flex-col items-start justify-between gap-3 min-[581px]:flex-row min-[581px]:items-end min-[581px]:gap-12">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <p className="max-w-[450px] text-muted">{children}</p>
    </div>
  );
}
