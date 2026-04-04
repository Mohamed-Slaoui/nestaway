import { Reveal } from "./reveal";

type Destination = {
  name: string;
  count: string;
  image: string;
  alt: string;
};

type DestinationSpotlightProps = {
  destinations: Destination[];
};

export function DestinationSpotlight({ destinations }: DestinationSpotlightProps) {
  return (
    <section className="bg-fog px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-serif text-4xl text-ink md:text-5xl">
            Trending <em className="not-italic text-clay">destinations</em>
          </h2>
          <p className="mt-2 text-sm text-ink/40">Where everyone's going right now</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.name} className="group relative h-64 overflow-hidden rounded-[24px] bg-[#e0d6cc]">
              <img
                src={destination.image}
                alt={destination.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-semibold">{destination.name}</div>
                <div className="text-xs text-white/60">{destination.count}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
