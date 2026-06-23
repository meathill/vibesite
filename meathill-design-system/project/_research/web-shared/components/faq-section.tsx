import { CaretDownIcon } from '@phosphor-icons/react/ssr';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title: string;
  items: FaqItem[];
};

export function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">{title}</h2>
      <div className="mx-auto max-w-3xl divide-y divide-border/30">
        {items.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
              <span className="text-base font-medium">{item.question}</span>
              <CaretDownIcon
                size={18}
                className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
