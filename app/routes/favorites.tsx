import type { Route } from "./+types/favorites";
import { Link } from "react-router";
import data from "../data/nestaway.json";
import { useFavorites } from "../context/favorites-context";
import { ListingsSection } from "../components/listings-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favorites | Nestaway" },
    { name: "description", content: "Your favorite saved spaces." },
  ];
}
function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Favorites() {
  const { favorites } = useFavorites();

  // Re-use logic to gather all properties (listings + hero images mapped)
  const allListings = [
    ...data.listings.map(l => ({ ...l, slug: generateSlug(l.title) })),
    ...data.hero.images
      .filter(img => img.title || img.alt)
      .map(img => {
        const priceParts = img.price.split(" / ");
        return {
          title: img.title || img.alt,
          slug: generateSlug(img.title || img.alt),
          location: img.subtitle || "Nestaway Location",
          rating: "4.95",
          price: priceParts[0],
          period: priceParts[1] ? `/ ${priceParts[1]}` : "",
          category: img.badge || "🏡 Home",
          emoji: "🤍",
          image: img.src,
          alt: img.alt,
          favorite: false
        };
      })
  ];

  // Filter those heavily to unique ids, and check if it's a favorite
  const uniqueListingsMap = new Map();
  allListings.forEach(l => {
    if (!uniqueListingsMap.has(l.slug)) {
      uniqueListingsMap.set(l.slug, l);
    }
  });

  const favoriteListings = Array.from(uniqueListingsMap.values()).filter((l) =>
    favorites.includes(l.slug)
  );

  return (
    <main className="min-h-screen bg-fog pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">
          Your <em className="not-italic text-clay">favorites</em>
        </h1>
        <p className="mt-2 text-ink/60">
          {favoriteListings.length} {favoriteListings.length === 1 ? "space" : "spaces"} saved
        </p>

        {favoriteListings.length > 0 ? (
          <div className="-mx-6 md:-mx-12 lg:-mx-16 mt-8">
            <ListingsSection listings={favoriteListings} />
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-stone/50 bg-white py-24 shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone bg-opacity-40 text-clay">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8">
                <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.5z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-ink text-center">No favorites yet</h2>
            <p className="mt-2 max-w-sm text-center text-sm text-ink/60">
              As you explore, click the heart icon on any space to save it here for later.
            </p>
            <Link
              to="/"
              className="mt-8 rounded-full bg-clay px-6 py-3 text-sm font-medium text-white transition-all hover:bg-bark"
            >
              Start exploring
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
