import type { Route } from "./+types/auth-layout";
import { Outlet, Link, useLocation } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Authentication | Nestaway" },
    { name: "description", content: "Sign in or create an account to book amazing spaces." },
  ];
}

export default function AuthLayout() {
  const location = useLocation();
  
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left Content Area */}
      <div className="flex-1 flex flex-col w-full lg:w-1/2 h-full relative overflow-y-auto">
        <header className="p-6 md:px-12 w-full flex items-center justify-between absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:scale-105">
              <path d="M16 3 L29 14 L29 28 L20 28 L20 20 L12 20 L12 28 L3 28 L3 14 Z" fill="var(--color-clay)" />
            </svg>
            <span className="font-serif text-2xl font-semibold tracking-tight text-ink">Nestaway</span>
          </Link>
        </header>

        <main key={location.pathname} className="flex-1 flex flex-col items-center justify-center p-6 w-full pt-28 pb-10 animate-page">
          <Outlet />
        </main>

      </div>

      {/* Right Image Area */}
      <div className="hidden lg:block lg:w-1/2 relative h-full shrink-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Beautiful modern home interior with pool"
          className="absolute inset-0 w-full h-full object-cover bg-stone"
        />
        <div className="absolute inset-0 bg-ink/20 mix-blend-multiply"></div>
        <div className="absolute bottom-16 left-16 right-16 text-white text-shadow-sm">
          <h2 className="font-serif text-5xl mb-4 leading-tight">Discover your<br />next perfect stay.</h2>
          <p className="text-white/90 text-lg max-w-md font-medium">Join thousands of travelers who have found their home away from home with Nestaway.</p>
        </div>
      </div>
    </div>
  );
}
