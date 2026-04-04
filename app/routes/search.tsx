import type { Route } from "./+types/search";
import { useSearchParams } from "react-router";
import data from "../data/nestaway.json";
import { ListingsSection } from "../components/listings-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search Results | Nestaway" },
    { name: "description", content: "Search for your perfect space on Nestaway." },
  ];
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const listings = data.listings.filter((l) => {
    return l.title.toLowerCase().includes(query) || 
           l.location.toLowerCase().includes(query) || 
           l.category.toLowerCase().includes(query);
  });

  return (
    <main className="min-h-screen bg-fog pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h1 className="font-serif text-3xl text-ink md:text-5xl mb-8">
          Search results for <span className="italic text-clay">"{query}"</span>
        </h1>
        
        {/* Comprehensive Filters UI */}
        <div className="mb-10 flex flex-wrap gap-6 border-b border-stone/50 pb-8">
           {/* Price Range */}
           <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-ink">Price Range</label>
              <div className="flex items-center gap-2">
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60 text-sm">$</span>
                   <input type="number" placeholder="Min" className="w-28 rounded-lg border border-stone/50 pl-7 pr-3 py-2 text-sm outline-none focus:border-clay" />
                 </div>
                 <span className="text-stone">-</span>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60 text-sm">$</span>
                   <input type="number" placeholder="Max" className="w-28 rounded-lg border border-stone/50 pl-7 pr-3 py-2 text-sm outline-none focus:border-clay" />
                 </div>
              </div>
           </div>
           
           {/* Space Type */}
           <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-ink">Type of place</label>
              <div className="flex gap-2">
                 {["Any type", "Room", "Entire home"].map((type, i) => (
                    <button key={type} className={`rounded-full border px-4 py-2 text-sm transition-colors ${i === 0 ? "bg-ink text-white border-ink" : "border-stone/50 text-ink/70 hover:border-clay"}`}>
                       {type}
                    </button>
                 ))}
              </div>
           </div>
           
           {/* Amenities */}
           <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-ink">Amenities</label>
              <div className="flex gap-2">
                 {["Wifi", "Pool", "Kitchen"].map((amenity) => (
                    <button key={amenity} className="rounded-full border border-stone/50 px-4 py-2 text-sm text-ink/70 hover:border-clay transition-colors flex items-center gap-2">
                       <span className="w-3 h-3 rounded-sm border border-stone/50 block"></span>
                       {amenity}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {listings.length > 0 ? (
          <div className="-mx-6 md:-mx-12 lg:-mx-16">
            <ListingsSection listings={listings} />
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-stone/50 bg-white py-24 shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone bg-opacity-40 text-clay text-2xl">
              🔍
            </div>
            <h2 className="font-serif text-2xl text-ink">No spaces found</h2>
            <p className="mt-2 text-ink/60 max-w-sm text-center text-sm">We couldn't find any spaces matching your search or filters. Try adjusting them or explore other destinations.</p>
          </div>
        )}
      </div>
    </main>
  );
}
