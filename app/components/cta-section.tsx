import { ArrowRightIcon } from "./icons";
import { Reveal } from "./reveal";

type CtaContent = {
  tag: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  primaryButton: string;
  secondaryButton: string;
};

type CtaSectionProps = {
  cta: CtaContent;
};

export function CtaSection({ cta }: CtaSectionProps) {
  return (
    <section className="bg-fog px-6 pb-24 pt-10 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-center md:px-10">
          <div className="absolute -right-24 -top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(201,168,130,0.18)_0%,transparent_70%)]" />
          <span className="relative inline-flex rounded-full bg-[rgba(201,168,130,0.15)] px-4 py-1.5 text-[0.78rem] font-medium text-clay">
            {cta.tag}
          </span>
          <h2 className="relative mt-6 font-serif text-4xl leading-tight text-fog md:text-5xl">
            {cta.title.line1}
            <br />
            <em className="not-italic text-clay">{cta.title.line2}</em>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-fog/40">
            {cta.description}
          </p>
          <div className="relative mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-full bg-clay px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bark">
              {cta.primaryButton}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-fog/20 px-8 py-3.5 text-sm font-medium text-fog/70 transition-colors hover:border-clay hover:text-clay">
              {cta.secondaryButton}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
