import { useState } from "react";

import { Reveal } from "./reveal";

type Category = {
  label: string;
  icon: string;
  active: boolean;
};

type CategoryFiltersProps = {
  categories: Category[];
};

export function CategoryFilters({ categories }: CategoryFiltersProps) {
  const [activeCategory, setActiveCategory] = useState(
    categories.find((category) => category.active)?.label ?? categories[0]?.label ?? "",
  );

  return (
    <section className="bg-fog px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const isActive = category.label === activeCategory;

              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => setActiveCategory(category.label)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[0.88rem] font-medium transition-colors ${
                    isActive
                      ? "border-ink bg-ink text-white"
                      : "border-stone bg-white text-ink hover:border-clay hover:bg-ink hover:text-white"
                  }`}
                >
                  {category.icon === "dot" ? (
                    <span className="h-2 w-2 rounded-full bg-clay" />
                  ) : (
                    <span>{category.icon}</span>
                  )}
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
