import Icon from "@/components/Icons";
import Text from "@/components/Text";
import Image from "next/image";
import React from "react";
import * as icons from "./icons";
import { usePathname } from "next/navigation";
import CustomLink from "@/components/CustomLink";

const AdminList = ({ text }) => {
  return (
    <div className="flex pt-4 pl-3 pb-2">
      <Text
        T="admin"
        weight="bold"
        size="t11"
        className="text-linkColor uppercase"
      >
        {text}
      </Text>
    </div>
  );
};

const AdminRoute = ({ title, route, IconComponent, active }) => {
  if (active) {
    return (
      <CustomLink url={`/admin${route}`}>
        <div className="flex py-[10px] px-3 items-center cursor-pointer gap-3 bg-[#8B6DCA14] rounded-[6px]">
          <IconComponent active={true} />
          <Text T="admin" weight="semi" size="sm" className="text-primary80">
            {title}
          </Text>
        </div>
      </CustomLink>
    );
  }
  return (
    <CustomLink url={`/admin${route}`}>
      <div className="flex py-[10px] px-3 items-center cursor-pointer gap-3">
        <IconComponent />
        <Text
          T="admin"
          weight="semi"
          size="sm"
          className="text-[#637381] whitespace-nowrap"
        >
          {title}
        </Text>
      </div>
    </CustomLink>
  );
};

const magazineRoutes = [
  { route: "/catalog", iconComponent: icons.CatalogIcon, title: "catalog" },
  { route: "/cheats", iconComponent: icons.CheatIcon, title: "cheats" },
  { route: "/plans", iconComponent: icons.PlanIcon, title: "plan" },
  {
    route: "/transactions",
    iconComponent: icons.TransactionIcon,
    title: "transactions",
  },
  { route: "/comment", iconComponent: icons.ReviewIcon, title: "reviews" },
];

const pagesRoutes = [
  { route: "/guarante", iconComponent: icons.GuaranteIcon, title: "guarante" },
  { route: "/rules", iconComponent: icons.PravilIcon, title: "rules" },
  {
    route: "/resellers",
    iconComponent: icons.ResellerIcon,
    title: "resellers",
  },
  {
    route: "/contacts",
    iconComponent: icons.ContactsIcon,
    title: "contacts",
  },
  { route: "/promo", iconComponent: icons.PromoIcon, title: "promo" },
  { route: "/faq", iconComponent: icons.FAQIcon, title: "faq" },
];

const settingsRoutes = [
  { route: "/settings", iconComponent: icons.SettingsIcon, title: "all" },
  { route: "/smtp", iconComponent: icons.SMTPIcon, title: "SMTP" },
];

const AdminTab = () => {
  const pathname = usePathname();

  const isActiveRoute = (route) => pathname.includes(route);
  return (
    <div className="flex fixed h-[100vh] flex-col border-r border-[#919EAB14] max-h-full overflow-auto tab-scroll pb-10 min-w-[280px]">
      <div className="flex p-6 items-center gap-[14px]">
        <Image alt="Logo" src="/images/logo.png" width={46} height={46} />
        <Text T="none" weight="extrabold" size="2xl" className="text-primary10">
          DASHBOARD
        </Text>
      </div>
      <div className="flex flex-col px-4 gap-1">
        <AdminRoute
          IconComponent={icons.HomeIcon}
          active={isActiveRoute("/dashboard")}
          title="home"
          route="/dashboard"
        />
        <AdminList text={"magazine"} />
        {magazineRoutes.map((link) => {
          return (
            <AdminRoute
              IconComponent={link.iconComponent}
              active={isActiveRoute(link.route)}
              title={link.title}
              route={link.route}
              key={link.route}
            />
          );
        })}
        <AdminList text={"blog"} />
        <AdminRoute
          IconComponent={icons.StatsIcon}
          active={isActiveRoute("/stats")}
          title="stats"
          route="/stats"
        />
        <AdminList text={"pages"} />
        {pagesRoutes.map((link) => {
          return (
            <AdminRoute
              IconComponent={link.iconComponent}
              active={isActiveRoute(link.route)}
              title={link.title}
              route={link.route}
              key={link.route}
            />
          );
        })}
        <AdminList text={"settings"} />
        {settingsRoutes.map((link) => {
          return (
            <AdminRoute
              IconComponent={link.iconComponent}
              active={isActiveRoute(link.route)}
              title={link.title}
              route={link.route}
              key={link.route}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminTab;
