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

import { useState } from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [spaceType, setSpaceType] = useState("Any type");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const listings = data.listings.filter((l) => {
    // Query filter
    const matchQuery = l.title.toLowerCase().includes(query) || 
           l.location.toLowerCase().includes(query) || 
           l.category.toLowerCase().includes(query);

    // Price filter
    const priceVal = parseInt(l.price.replace(/[^0-9]/g, ""));
    const matchMin = minPrice ? priceVal >= parseInt(minPrice) : true;
    const matchMax = maxPrice ? priceVal <= parseInt(maxPrice) : true;

    // Type filter
    let matchType = true;
    if (spaceType !== "Any type") {
      const cat = l.category.toLowerCase();
      const title = l.title.toLowerCase();
      if (spaceType === "Apartments") matchType = cat.includes("apartment") || title.includes("loft");
      if (spaceType === "Houses/Villas") matchType = cat.includes("villa") || title.includes("house") || title.includes("cottage") || title.includes("cabin");
      if (spaceType === "Commercial") matchType = cat.includes("shop");
    }

    // Amenities filter (mocked based on title/category context since we lack explicit amenity data)
    let matchAmenities = true;
    if (selectedAmenities.includes("Pool")) {
      matchAmenities = l.title.toLowerCase().includes("pool") || l.category.toLowerCase().includes("villa");
    }
    if (selectedAmenities.includes("Kitchen") && matchAmenities) {
      matchAmenities = !l.category.toLowerCase().includes("shop"); // Assume homes have kitchens, shops don't
    }

    return matchQuery && matchMin && matchMax && matchType && matchAmenities;
  });

  return (
    <main className="min-h-screen bg-fog pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h1 className="font-serif text-3xl text-ink md:text-5xl mb-8">
          Search results for <span className="italic text-clay">"{query || "all"}"</span>
        </h1>
        
        {/* Comprehensive Filters UI */}
        <div className="mb-10 flex flex-wrap gap-6 border-b border-stone/50 pb-8">
           {/* Price Range */}
           <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-ink">Price Range</label>
              <div className="flex items-center gap-2">
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60 text-sm">$</span>
                   <input 
                     type="number" 
                     placeholder="Min" 
                     value={minPrice}
                     onChange={(e) => setMinPrice(e.target.value)}
                     className="w-28 rounded-lg border border-stone/50 pl-7 pr-3 py-2 text-sm outline-none focus:border-clay" 
                   />
                 </div>
                 <span className="text-stone">-</span>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/60 text-sm">$</span>
                   <input 
                     type="number" 
                     placeholder="Max" 
                     value={maxPrice}
                     onChange={(e) => setMaxPrice(e.target.value)}
                     className="w-28 rounded-lg border border-stone/50 pl-7 pr-3 py-2 text-sm outline-none focus:border-clay" 
                   />
                 </div>
              </div>
           </div>
           
           {/* Space Type */}
           <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-ink">Type of place</label>
              <div className="flex gap-2 flex-wrap">
                 {["Any type", "Apartments", "Houses/Villas", "Commercial"].map((type) => {
                    const isActive = spaceType === type;
                    return (
                      <button 
                         key={type} 
                         onClick={() => setSpaceType(type)}
                         className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                           isActive 
                             ? "bg-ink text-white border-ink" 
                             : "border-stone/50 text-ink/70 hover:border-clay bg-white"
                         }`}
                      >
                         {type}
                      </button>
                    )
                 })}
              </div>
           </div>
           
           {/* Amenities */}
           <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-ink">Amenities</label>
              <div className="flex gap-2 flex-wrap">
                 {["Wifi", "Pool", "Kitchen"].map((amenity) => {
                    const isActive = selectedAmenities.includes(amenity);
                    return (
                      <button 
                         key={amenity} 
                         onClick={() => toggleAmenity(amenity)}
                         className={`rounded-full border px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                           isActive 
                             ? "border-clay text-clay bg-clay/5" 
                             : "border-stone/50 text-ink/70 hover:border-clay bg-white"
                         }`}
                      >
                         <span className={`w-3 h-3 rounded-sm border block flex-shrink-0 ${isActive ? "border-clay bg-clay" : "border-stone/50"}`}></span>
                         {amenity}
                      </button>
                    )
                 })}
              </div>
           </div>
        </div>

        {listings.length > 0 ? (
          <div className="-mx-6 md:-mx-12 lg:-mx-16">
            <ListingsSection listings={listings} />
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-stone/50 bg-white py-24 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone bg-opacity-40 text-clay text-2xl">
              🔍
            </div>
            <h2 className="font-serif text-2xl text-ink">No spaces found</h2>
            <p className="mt-2 text-ink/60 max-w-sm text-center text-sm">We couldn't find any spaces matching your search or filters. Try adjusting them or explore other destinations.</p>
            <button 
               onClick={() => {
                 setMinPrice("");
                 setMaxPrice("");
                 setSpaceType("Any type");
                 setSelectedAmenities([]);
               }}
               className="mt-6 font-medium text-clay hover:underline underline-offset-4"
            >
               Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
