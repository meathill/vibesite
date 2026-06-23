import { CodeIcon, FileTextIcon, PlugIcon, TerminalIcon } from '@phosphor-icons/react/ssr';

type AiAgentDict = {
  title: string;
  subtitle: string;
  mcpTitle: string;
  mcpDesc: string;
  cliTitle: string;
  cliDesc: string;
  llmsTitle: string;
  llmsDesc: string;
  apiTitle: string;
  apiDesc: string;
};

type Props = {
  dict: AiAgentDict;
};

export function AiAgentSection({ dict }: Props) {
  const cards = [
    {
      icon: <PlugIcon className="text-violet-500" size={22} />,
      title: dict.mcpTitle,
      desc: dict.mcpDesc,
    },
    {
      icon: <TerminalIcon className="text-emerald-500" size={22} />,
      title: dict.cliTitle,
      desc: dict.cliDesc,
    },
    {
      icon: <FileTextIcon className="text-amber-500" size={22} />,
      title: dict.llmsTitle,
      desc: dict.llmsDesc,
    },
    {
      icon: <CodeIcon className="text-blue-500" size={22} />,
      title: dict.apiTitle,
      desc: dict.apiDesc,
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 pb-14">
      <h2 className="mb-3 text-center text-3xl font-bold tracking-tight">{dict.title}</h2>
      <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground leading-relaxed">
        {dict.subtitle}
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/30 bg-card/30 p-6 transition-all hover:bg-card/50 hover:shadow-lg"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-background shadow-sm">
              {card.icon}
            </div>
            <h3 className="mb-2 text-base font-bold">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
