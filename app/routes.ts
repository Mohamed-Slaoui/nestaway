import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("spaces/:id", "routes/property.tsx"),
    route("favorites", "routes/favorites.tsx"),
    route("search", "routes/search.tsx"),
    route("account", "routes/account.tsx")
  ]),
  layout("routes/auth-layout.tsx", [
    route("auth/sign-in", "routes/sign-in.tsx"),
    route("auth/sign-up", "routes/sign-up.tsx"),
  ])
] satisfies RouteConfig;

