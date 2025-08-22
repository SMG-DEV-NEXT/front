import {
  CatalogIcon,
  CheatIcon,
  ContactsIcon,
  FAQIcon,
  GuaranteIcon,
  PlanIcon,
  PromoIcon,
  ResellerIcon,
  ReviewIcon,
  SettingsIcon,
  SMTPIcon,
  StatsIcon,
  TransactionIcon,
} from "@/components/admin/Tab/icons";
import Icon from "@/components/Icons";
import Text from "@/components/Text";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

const routes = {
  catalog: { title: "catalog", icon: CatalogIcon },
  "catalog/create": { title: "catalog", icon: CatalogIcon },
  "cheats/create": { title: "cheats", icon: CatalogIcon },
  cheat: { title: "cheats", icon: CheatIcon },
  plans: { title: "plan", icon: PlanIcon },
  comment: { title: "reviews", icon: ReviewIcon },
  stats: { title: "stats", icon: StatsIcon },
  guarante: { title: "guarante", icon: GuaranteIcon },
  rules: { title: "rules", icon: GuaranteIcon },
  resellers: { title: "resellers", icon: ResellerIcon },
  requests: { title: "requests", icon: ResellerIcon },
  "resellers/edit": { title: "resellers", icon: ResellerIcon },
  "stats/edit": { title: "stats", icon: StatsIcon },
  "comment/edit": { title: "reviews", icon: ReviewIcon },
  contacts: { title: "contacts", icon: ContactsIcon },
  "contacts/edit": { title: "contacts", icon: ContactsIcon },
  help: { title: "help", icon: null },
  promo: { title: "promo", icon: PromoIcon },
  "referral/edit": { title: "referral", icon: PromoIcon },
  referral: { title: "referral", icon: PromoIcon },
  "promo/edit": { title: "promo", icon: PromoIcon },
  settings: { title: "settings", icon: SettingsIcon },
  smtp: { title: "SMTP", icon: SMTPIcon },
  transaction: { title: "transactions", icon: TransactionIcon },
  faq: { title: "faq", icon: FAQIcon },
};

const AdminTitle = ({ settingsRoute, route, faqStatRoute }) => {
  const r = routes[route];
  const t = useTranslations("admin");
  const ComponentIcon = r.icon;
  const router = useRouter();
  const locale = useLocale();

  const handleClickTitle = () => {
    if (settingsRoute !== undefined) {
      const defaultRoute = route.split("/")[0];
      router.push(`/${locale}/admin/${defaultRoute}`);
    }
  };

  const handleClickSettingsRoute = () => {
    if (!faqStatRoute) return;
    router.back();
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center gap-3">
        {r.icon && <ComponentIcon active={settingsRoute === undefined} />}
        <Text
          T="admin"
          weight="bold"
          size="2xl"
          onClick={handleClickTitle}
          className={`text-${
            settingsRoute !== undefined ? "[#637381]" : "primary10"
          } dark:text-${
            settingsRoute !== undefined ? "linkColor" : "linkColor"
          } cursor-${settingsRoute !== undefined ? "pointer" : "default"}`}
        >
          {r.title}
        </Text>
        {settingsRoute !== undefined && (
          <>
            <Icon
              name="arrowR"
              folder="admin"
              size={16}
              className="w-4 h-4 dark:text-white"
            />
            <Text
              onClick={handleClickSettingsRoute}
              T="none"
              weight="semi"
              size="2xl"
              className={`text-${
                faqStatRoute !== undefined ? "[#637381]" : "primary10"
              }  dark:text-${
                settingsRoute !== undefined ? "linkColor" : "linkColor"
              } cursor-${faqStatRoute !== undefined ? "pointer" : "default"}`}
            >
              {t("settings")} {settingsRoute}
            </Text>
          </>
        )}
        {faqStatRoute !== undefined && (
          <>
            <Icon name="arrowR" folder="admin" size={16} className="w-4 h-4" />
            <Text
              T="none"
              weight="semi"
              size="2xl"
              className="text-primary10 dark:text-linkColor"
            >
              {t("settings")} {faqStatRoute}
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTitle;
