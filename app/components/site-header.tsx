import { useEffect, useState } from "react";
import { GlobeIcon, MenuIcon, SearchIcon, HeartIcon, UserIcon, ChevronDownIcon } from "./icons";

type HeaderContent = {
  brand: string;
  hostLabel: string;
};

type SearchContent = {
  where: string;
  when: string;
  who: string;
  wherePlaceholder: string;
  whenPlaceholder: string;
  whoPlaceholder: string;
};

type SiteHeaderProps = {
  header: HeaderContent;
  search: SearchContent;
};

export function SiteHeader({ header, search }: SiteHeaderProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCollapsed(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isCollapsed
            ? "border-b border-clay/25 bg-fog/95 px-4 py-2 shadow-[0_4px_32px_rgba(26,23,19,0.07)] backdrop-blur-2xl sm:px-6 md:px-8 lg:px-12"
            : "border-b border-transparent bg-fog/85 px-4 py-3 backdrop-blur-xl sm:px-6 md:px-8 lg:px-12"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 md:gap-6">
        {/* Logo Section - Redesigned with badge */}
        <a href="#" className="group flex shrink-0 items-center gap-2">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:scale-105">
              <path d="M16 3 L29 14 L29 28 L20 28 L20 20 L12 20 L12 28 L3 28 L3 14 Z" fill="var(--color-clay)" />
              <circle cx="16" cy="13" r="3" fill="var(--color-ink)" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay/60 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-clay"></span>
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-xl font-semibold tracking-tight text-ink">{header.brand}</span>
            <span className="ml-1.5 text-[10px] font-medium uppercase tracking-wider text-clay/60">Beta</span>
          </div>
        </a>

        {/* Search Bar - Minimalist pill design */}
        <div className={`relative mx-2 flex-1 max-w-2xl transition-all duration-300 ${isSearchFocused ? "scale-[1.02]" : "scale-100"}`}>
          <div 
            className={`flex cursor-pointer items-center gap-2 rounded-full border bg-white/90 backdrop-blur-sm transition-all duration-200 ${
              isSearchFocused 
                ? "border-clay shadow-[0_0_0_2px_rgba(84,67,53,0.1)]" 
                : "border-stone/50 hover:border-clay/30 hover:shadow-md"
            }`}
          >
            <div className="flex flex-1 items-center gap-2 pl-5 pr-2">
              <SearchIcon className="h-4 w-4 shrink-0 text-ink/40" />
              <input
                className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-ink/30 sm:py-3.5"
                placeholder={`${search.wherePlaceholder} • ${search.whenPlaceholder} • ${search.whoPlaceholder}`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
            <button
              type="button"
              className="mr-1.5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay text-white transition-all duration-200 hover:bg-bark hover:scale-105 sm:flex"
              aria-label="Search"
            >
              <SearchIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          
          {/* Quick filters - appears when focused */}
          {isSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-stone/50 bg-white/95 p-3 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-wrap gap-2">
                {["Anywhere", "Any week", "Any guests"].map((filter) => (
                  <button key={filter} className="rounded-full border border-stone/50 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-clay hover:bg-clay/5">
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Actions - Redesigned */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Become a host - with hover animation */}
          <button className="group hidden rounded-full px-4 py-2 text-sm font-medium text-ink transition-all hover:bg-stone/50 md:flex md:items-center md:gap-1.5">
            <span>{header.hostLabel}</span>
            <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
          </button>

          {/* Favorites button - new */}
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-stone/50 text-ink/60 transition-all hover:border-clay hover:bg-clay/5 hover:text-clay sm:flex"
            aria-label="Favorites"
          >
            <HeartIcon className="h-4 w-4" />
          </button>

          {/* Language selector - redesigned */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone/50 text-ink/60 transition-all hover:border-clay hover:bg-clay/5 hover:text-clay"
            aria-label="Language"
          >
            <GlobeIcon className="h-4 w-4" />
          </button>

          {/* User menu - redesigned with avatar */}
          <button
            type="button"
            className="group flex h-9 items-center gap-2 rounded-full border border-stone/50 bg-white/50 pl-2 pr-3 transition-all hover:border-clay hover:shadow-md"
            aria-label="Menu"
          >
            <MenuIcon className="h-3.5 w-3.5 text-ink/60" />
            <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-clay/10 text-clay transition-colors group-hover:bg-clay/20 sm:flex">
              <UserIcon className="h-3 w-3" />
            </div>
          </button>
        </div>
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-stone/30 bg-fog/95 px-6 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-xs text-ink/60">
            <SearchIcon className="h-5 w-5" />
            <span>Explore</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-xs text-ink/60">
            <HeartIcon className="h-5 w-5" />
            <span>Saved</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-xs text-ink/60">
            <UserIcon className="h-5 w-5" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </>
  );
}