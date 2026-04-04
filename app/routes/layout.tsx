import { Outlet } from "react-router";
import { CursorDot } from "../components/cursor-dot";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import data from "../data/nestaway.json";

export default function Layout() {
  return (
    <>
      <CursorDot />
      <SiteHeader header={data.header} search={data.search} />
      <Outlet />
      <SiteFooter footer={data.footer} />
    </>
  );
}
