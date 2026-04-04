import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("spaces/:id", "routes/property.tsx")
  ])
] satisfies RouteConfig;
