import { Reveal } from "./reveal";

type Stat = {
  value: string;
  label: string;
};

type StatsSectionProps = {
  stats: Stat[];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-fog px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[18px] border border-clay/20 bg-white px-8 py-7 text-center">
                <div className="font-serif text-5xl text-clay">{stat.value}</div>
                <div className="mt-2 text-sm text-ink/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
