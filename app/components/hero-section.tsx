import { Link } from "react-router";
import { Reveal } from "./reveal";

type HeroImage = {
  className: string;
  src: string;
  alt: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  showInfo: boolean;
};

type HeroContent = {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  images: HeroImage[];
};

type HeroSectionProps = {
  hero: HeroContent;
};

function HeroTile({ image }: { image: HeroImage }) {
  return (
    <Link to={`/spaces/${(image.title || image.alt).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={`group relative overflow-hidden rounded-[20px] bg-[#e0d6cc] ${image.className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {image.badge ? (
        <span className="absolute left-3 top-3 rounded-full bg-fog/92 px-3.5 py-1.5 text-[0.78rem] font-medium text-ink shadow-sm backdrop-blur-md">
          {image.badge}
        </span>
      ) : null}
      {image.showInfo ? (
        <div className="absolute bottom-4 left-4 right-4 translate-y-3 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="text-sm font-semibold">{image.title}</div>
          {image.subtitle ? <div className="text-xs text-white/70">{image.subtitle}</div> : null}
        </div>
      ) : null}
      <div className="absolute bottom-3 right-3 rounded-full bg-clay px-3.5 py-1.5 text-[0.82rem] font-semibold text-white shadow-sm">
        {image.price}
      </div>
    </Link>
  );
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="bg-fog bg-[radial-gradient(ellipse_80%_60%_at_60%_30%,#e8d8c4_0%,#f5f2ef_70%)] px-6 pb-20 pt-32 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12">
          <span className="inline-flex rounded-full bg-[#f5f2ef] px-4 py-1.5 text-[0.78rem] font-medium text-bark shadow-sm ring-1 ring-clay/25">
            {hero.eyebrow}
          </span>
          <h1 className="mt-4 font-serif text-[clamp(3.2rem,7vw,7rem)] leading-[1.04] tracking-[-0.02em] text-ink">
            {hero.headline.line1}
            <br />
            <em className="not-italic text-clay">{hero.headline.line2}</em>
            <br />
            {hero.headline.line3}
          </h1>
          <p className="mt-6 max-w-sm text-lg font-light leading-relaxed text-ink/50">
            {hero.description}
          </p>
        </Reveal>

        <Reveal delay={150} className="grid h-[520px] grid-cols-12 grid-rows-2 gap-4">
          {hero.images.map((image) => (
            <HeroTile key={`${image.alt}-${image.price}`} image={image} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
