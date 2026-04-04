import { useState } from "react";

import { Link } from "react-router";
import { HeartIcon, StarIcon } from "./icons";
import { Reveal } from "./reveal";

type Listing = {
  title: string;
  location: string;
  rating: string;
  price: string;
  period: string;
  category: string;
  emoji: string;
  image: string;
  alt: string;
  favorite: boolean;
};

type ListingsSectionProps = {
  listings: Listing[];
};

export function ListingsSection({ listings }: ListingsSectionProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    Object.fromEntries(listings.map((listing) => [listing.title, listing.favorite])),
  );

  return (
    <section className="bg-fog px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl text-ink md:text-5xl">
              Featured <em className="not-italic text-clay">spaces</em>
            </h2>
            <p className="mt-2 text-sm text-ink/40">Hand-picked by our team of local curators</p>
          </div>
          <a href="#" className="hidden text-sm font-medium text-ink/50 underline-offset-4 transition-colors hover:text-clay hover:underline md:block">
            View all →
          </a>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing, index) => {
            const isFavorite = favorites[listing.title];

            return (
              <Reveal key={listing.title} delay={50 * ((index % 4) + 1)}>
                <Link to={`/spaces/${listing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 rounded-[20px]">
                  <article className="group cursor-pointer overflow-hidden rounded-[20px] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(26,23,19,0.12)] h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <button
                      type="button"
                      aria-label={`Toggle favorite for ${listing.title}`}
                      onClick={() =>
                        setFavorites((current) => ({
                          ...current,
                          [listing.title]: !current[listing.title],
                        }))
                      }
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm transition-transform duration-200 hover:scale-110 hover:bg-white"
                    >
                      <HeartIcon filled={isFavorite} className={`h-4.5 w-4.5 ${isFavorite ? "text-rust" : "text-ink/70"}`} />
                    </button>
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#f5f2ef]/95 px-3.5 py-1.5 text-[0.78rem] font-medium text-bark backdrop-blur-md">
                      {listing.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium text-ink">{listing.title}</h3>
                      <div className="flex items-center gap-1.5">
                        <StarIcon className="h-3.5 w-3.5 text-clay" />
                        <span className="text-xs text-ink/60">{listing.rating}</span>
                      </div>
                    </div>
                    <p className="mb-3 text-xs text-ink/40">{listing.location}</p>
                    <div className="text-sm text-ink">
                      <span className="font-semibold">{listing.price}</span>{" "}
                      <span className="text-ink/40">{listing.period}</span>
                    </div>
                  </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
