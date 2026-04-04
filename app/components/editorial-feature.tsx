import { ArrowRightIcon } from "./icons";
import { Reveal } from "./reveal";

type EditorialContent = {
  tag: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  bullets: string[];
  buttonLabel: string;
  image: string;
  alt: string;
  floatingBadge: {
    label: string;
    title: string;
    status: string;
  };
};

type EditorialFeatureProps = {
  editorial: EditorialContent;
};

export function EditorialFeature({ editorial }: EditorialFeatureProps) {
  return (
    <section className="bg-fog px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-[#f5f2ef] px-4 py-1.5 text-[0.78rem] font-medium text-bark shadow-sm ring-1 ring-clay/25">
              {editorial.tag}
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink lg:text-5xl">
              {editorial.title.line1}
              <br />
              <em className="not-italic text-clay">{editorial.title.line2}</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/50">{editorial.description}</p>
            <ul className="mt-8 space-y-3">
              {editorial.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-sm text-ink/70">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage/30 text-[0.7rem] font-semibold text-sage">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
            <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-sm font-medium text-fog transition-colors hover:bg-bark">
              {editorial.buttonLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <div className="relative h-96 overflow-hidden rounded-[28px] bg-[#e0d6cc]">
              <img src={editorial.image} alt={editorial.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-[22px] border border-stone bg-white p-4 shadow-[0_20px_40px_rgba(26,23,19,0.12)]">
              <div className="mb-1 text-xs text-ink/40">{editorial.floatingBadge.label}</div>
              <div className="text-sm font-semibold text-ink">{editorial.floatingBadge.title}</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sage" />
                <span className="text-xs text-ink/50">{editorial.floatingBadge.status}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
