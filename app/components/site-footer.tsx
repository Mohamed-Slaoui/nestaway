type FooterContent = {
  description: string;
  columns: Array<{
    title: string;
    links: string[];
  }>;
};

type SiteFooterProps = {
  footer: FooterContent;
};

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3 L29 14 L29 28 L20 28 L20 20 L12 20 L12 28 L3 28 L3 14 Z" fill="var(--color-clay)" />
      <circle cx="16" cy="13" r="3" fill="var(--color-fog)" />
    </svg>
  );
}

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="bg-ink px-6 py-16 text-fog md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <BrandMark />
              <span className="font-serif text-lg text-fog">nestaway</span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-fog/30">{footer.description}</p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <div className="mb-4 text-xs uppercase tracking-[0.18em] text-fog/30">{column.title}</div>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <span className="cursor-pointer text-[0.85rem] text-[#8a7e73] transition-colors hover:text-fog">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-fog/10 pt-8 text-xs text-fog/30 md:flex-row">
          <div>© 2025 Nestaway. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-fog">Privacy</span>
            <span className="cursor-pointer transition-colors hover:text-fog">Terms</span>
            <span className="cursor-pointer transition-colors hover:text-fog">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
