import { Outlet, useLocation } from "react-router";
import { CursorDot } from "../components/cursor-dot";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import data from "../data/nestaway.json";
import { FavoritesProvider } from "../context/favorites-context";

export default function Layout() {
  const location = useLocation();

  const currentRoute = (pages: string[]) => {
    const currentPath = location.pathname.slice(1).toLowerCase();
    return pages.some(page => currentPath.includes(page.toLowerCase()));
  };

  return (
    <FavoritesProvider>
      <CursorDot />
      <SiteHeader header={data.header} search={data.search} />
      <main key={location.pathname} className="animate-page">
        <Outlet />
      </main>
      {!currentRoute(["auth/sign-in", "auth/sign-up", "account", "host/dashboard"]) && <SiteFooter footer={data.footer} />}
    </FavoritesProvider>
  );
}
