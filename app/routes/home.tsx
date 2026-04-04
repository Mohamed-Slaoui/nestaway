import type { Route } from "./+types/home";
import data from "../data/nestaway.json";
import { CategoryFilters } from "../components/category-filters";
import { CtaSection } from "../components/cta-section";
import { DestinationSpotlight } from "../components/destination-spotlight";
import { EditorialFeature } from "../components/editorial-feature";
import { HeroSection } from "../components/hero-section";
import { ListingsSection } from "../components/listings-section";
import { StatsSection } from "../components/stats-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: data.site.title },
    { name: "description", content: data.site.description },
  ];
}

export default function Home() {
  return (
    <main className="pb-24 md:pb-0">
        <HeroSection hero={data.hero} />
        <CategoryFilters categories={data.categories} />
        <ListingsSection listings={data.listings} />
        <StatsSection stats={data.stats} />
        <EditorialFeature editorial={data.editorial} />
        <DestinationSpotlight destinations={data.destinations} />
        <CtaSection cta={data.cta} />
    </main>
  );
}
