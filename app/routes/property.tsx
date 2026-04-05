import { Link, useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import data from "../data/nestaway.json";
import { HeartIcon, StarIcon, ArrowRightIcon } from "../components/icons";
import { useFavorites } from "../context/favorites-context";
import type { Route } from "../+types/root";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.id} | Nestaway` },
    { name: "description", content: "Nestaway - Find your dream home" },
  ];
}

// Extra images to simulate a gallery view since we only have 1 image in the JSON per listing
const galleryPlaceholders = [
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
];

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Property() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!id) return null;
  const isFav = isFavorite(id);

  let listing = data.listings.find(
    (l) => generateSlug(l.title) === id
  );

  // Fallback to hero images if it's not a normal listing
  if (!listing) {
    const heroImage = data.hero.images.find(
      (img) => generateSlug(img.title || img.alt) === id
    );
    if (heroImage) {
      const priceParts = heroImage.price.split(" / ");
      listing = {
        title: heroImage.title || heroImage.alt,
        location: heroImage.subtitle || "Nestaway Location",
        rating: "4.95",
        price: priceParts[0],
        period: priceParts[1] ? `/ ${priceParts[1]}` : "",
        category: heroImage.badge || "🏡 Home",
        emoji: "🤍",
        image: heroImage.src,
        alt: heroImage.alt,
        favorite: false
      };
    }
  }

  if (!listing) {
    return (
      <div className="flex h-screen flex-col bg-fog">
        <main className="flex flex-1 flex-col items-center justify-center pt-24 px-6 text-center">
          <h1 className="font-serif text-6xl text-ink">404</h1>
          <p className="mt-4 text-ink/60">Property not found.</p>
          <Link to="/" className="mt-8 rounded-full bg-clay px-6 py-3 text-sm font-medium text-white transition-all hover:bg-bark">
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  const galleryImages = [listing.image, ...galleryPlaceholders];

  const handleScroll = (e: any) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;

    const index = Math.round(scrollLeft / width);

    setCurrentImageIndex(
      Math.min(index, galleryImages.length - 1)
    );
  };

  // Parse location to fake some extra info
  const numGuests = listing.location.match(/(\d+) guests/)?.[1] || "2";

  return (
    <div className="bg-fog min-h-screen">
      <main className="mx-auto max-w-7xl pt-[120px] pb-24 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Title Block */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-ink md:text-5xl">{listing.title}</h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-ink/70">
              <span className="flex items-center gap-1 font-medium text-ink">
                <StarIcon className="h-4 w-4 text-clay" />
                {listing.rating}
              </span>
              <span className="text-stone-400">•</span>
              <span className="underline decoration-clay/30 underline-offset-4">{listing.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-stone/50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Share
            </button>
            <button
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-stone/50"
              onClick={() => toggleFavorite(id)}
            >
              <HeartIcon filled={isFav} className={`h-4 w-4 ${isFav ? "text-rust" : ""}`} />
              {isFav ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12 md:rounded-3xl md:h-[500px] -mx-4 sm:mx-0 relative">
          {/* Mobile: Horizontal scroll gallery */}
          <div className="md:hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex flex-nowrap h-[50vh] overflow-x-auto snap-x snap-mandatory overscroll-x-contain no-scrollbar touch-pan-x mx-3"
            >
              {galleryImages.map((src, i) => (
                <div key={i} className="min-w-full h-full snap-center shrink-0 overflow-hidden">
                  <img
                    src={src}
                    alt="Property view"
                    className="w-96 h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Scroll Indicator Overlay */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1.5 rounded-full pointer-events-none">
              <span className="flex gap-1">
                {galleryImages.map((_, idx) => (
                  <div key={idx} className={`h-1 w-1 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/40"}`} />
                ))}
              </span>
              <span className="ml-1">{currentImageIndex + 1} / {galleryImages.length}</span>
            </div>
          </div>

          {/* Desktop: Grid gallery */}
          <div className="hidden md:grid md:grid-cols-2 gap-3 h-full">
            <div className="h-full overflow-hidden rounded-2xl">
              <img src={listing.image} alt={listing.alt} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="grid h-full grid-cols-2 gap-3 overflow-hidden rounded-2xl">
              {galleryPlaceholders.map((src, i) => (
                <div key={i} className="h-[244px] overflow-hidden">
                  <img src={src} alt="Property view" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* Left Column - Details */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Quick Info */}
            <div className="flex items-center justify-between border-b border-stone/50 pb-8">
              <div>
                <h2 className="text-xl font-medium text-ink md:text-2xl">
                  {listing.category.replace(/[^\w\s]/g, '')} hosted by Sarah
                </h2>
                <p className="mt-1 text-ink/60">
                  {numGuests} guests • {parseInt(numGuests) > 2 ? 2 : 1} bedrooms • {parseInt(numGuests) > 2 ? 3 : 1} beds • 1 bath
                </p>
              </div>
              <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-clay/20 bg-stone">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" alt="Host avatar" className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-6 border-b border-stone/50 pb-8">
              <div className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center text-clay">
                  <StarIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-ink">Guest favorite</h3>
                  <p className="text-sm text-ink/60">One of the most loved homes on Nestaway based on ratings, reviews, and reliability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center text-clay">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-ink">Superhost</h3>
                  <p className="text-sm text-ink/60">Superhosts are experienced, highly rated hosts who are committed to providing great stays.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-stone/50 pb-8">
              <h2 className="mb-4 text-xl font-medium text-ink font-serif">About this space</h2>
              <div className="space-y-4 text-ink/80 leading-relaxed font-light">
                <p>
                  Experience the perfect getaway at this stunning property thoughtfully designed to make you feel right at home. Surrounded by breathtaking natural scenery and steps away from local gems, this space offers an ideal retreat for those looking to unwind.
                </p>
                <p>
                  Relax in the beautifully appointed living area featuring bespoke artwork and comfortable furnishings. Cook up a feast in the fully equipped modern kitchen, or unwind outside taking in the pristine atmosphere. As evening falls, enjoy spectacular sunsets from your private vantage point.
                </p>
              </div>
              <button className="mt-4 flex items-center gap-2 font-medium text-ink underline decoration-clay/40 underline-offset-4 hover:text-clay transition-colors">
                Show more
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-stone/50 lg:border-none lg:pb-0">
              <h2 className="mb-6 text-xl font-medium text-ink font-serif">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Fast Wi-Fi", icon: <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" /> },
                  { name: "Free parking on premises", icon: <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 15v4c0 .6.4 1 1 1h2" /> },
                  { name: "Dedicated workspace", icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /> },
                  { name: "Fully equipped kitchen", icon: <path d="M12 20a8 8 0 100-16 8 8 0 000 16zM11 12h2M11 8h2m-1 8v4" /> },
                  { name: "Private patio or balcony", icon: <path d="M3 21h18M5 21V8a2 2 0 012-2h10a2 2 0 012 2v13M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" /> },
                  { name: "Security cameras", icon: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /> }
                ].map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 text-ink/80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-clay">
                      {amenity.icon}
                    </svg>
                    <span className="font-light">{amenity.name}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 rounded-full border border-stone/50 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-clay hover:bg-stone/20">
                Show all 24 amenities
              </button>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-4 lg:relative">
            <div className="sticky top-32 rounded-3xl border border-stone/60 bg-white p-6 shadow-[0_20px_50px_rgba(26,23,19,0.06)]">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <span className="text-2xl font-semibold text-ink md:text-3xl">{listing.price}</span>
                  <span className="text-sm font-light text-ink/60 md:text-base"> {listing.period}</span>
                </div>
                <div className="flex gap-1 text-sm font-light text-ink/80">
                  <span className="font-medium">{listing.rating}</span>
                  <span className="text-ink/40">·</span>
                  <span className="underline decoration-clay/30">128 reviews</span>
                </div>
              </div>

              <div className="mb-4 overflow-hidden rounded-xl border border-stone/60">
                <div className="flex border-b border-stone/60">
                  <div className="flex-1 cursor-pointer border-r border-stone/60 p-3 hover:bg-stone/20">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-ink">Check-in</div>
                    <div className="mt-0.5 text-sm font-light text-ink/70">Add date</div>
                  </div>
                  <div className="flex-1 cursor-pointer p-3 hover:bg-stone/20">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-ink">Checkout</div>
                    <div className="mt-0.5 text-sm font-light text-ink/70">Add date</div>
                  </div>
                </div>
                <div className="cursor-pointer p-3 hover:bg-stone/20">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink">Guests</div>
                  <div className="mt-0.5 text-sm font-light text-ink/70">1 guest</div>
                </div>
              </div>

              <button className="w-full rounded-2xl bg-linear-to-r from-clay to-bark py-4 text-center text-[15px] font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_16px_rgba(92,74,53,0.25)] active:scale-[0.98]">
                Check availability
              </button>

              <div className="mt-4 text-center text-sm font-light text-ink/60">
                You won't be charged yet
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-fog p-4 text-sm">
                <span className="text-xl">✨</span>
                <p className="font-light text-ink/80">
                  <span className="font-medium">Lower price.</span> Your dates are $15 less than the average nightly rate over the last 3 months.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
