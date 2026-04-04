import type { Route } from "./+types/home";
import { useSearchParams } from "react-router";
import data from "../data/nestaway.json";
import { CategoryFilters } from "../components/category-filters";
import { CtaSection } from "../components/cta-section";
import { DestinationSpotlight } from "../components/destination-spotlight";
import { EditorialFeature } from "../components/editorial-feature";
import { HeroSection } from "../components/hero-section";
import { ListingsSection } from "../components/listings-section";
import { StatsSection } from "../components/stats-section";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: data.site.title },
    { name: "description", content: data.site.description },
  ];
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredListings = !categoryFilter || categoryFilter === "All Spaces"
    ? data.listings
    : data.listings.filter((l) => {
        if (categoryFilter === "Top Rated") return parseFloat(l.rating) >= 4.9;
        if (categoryFilter === "Homes") return ["Villa", "Cottage", "Home"].some(c => l.category.includes(c));
        if (categoryFilter === "Apartments") return l.category.includes("Apartment") || l.category.includes("Loft");
        return l.category.includes(categoryFilter.replace(/s$/, "")); // Shop fits Shops
      });

  return (
    <main className="pb-24 md:pb-0">
      <HeroSection hero={data.hero} />
      <CategoryFilters categories={data.categories} />
      <ListingsSection listings={filteredListings} />
      <StatsSection stats={data.stats} />
      <EditorialFeature editorial={data.editorial} />
      <DestinationSpotlight destinations={data.destinations} />
      <CtaSection cta={data.cta} />
    </main>
  );
}
