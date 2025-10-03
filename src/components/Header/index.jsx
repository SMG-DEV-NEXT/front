"use client";

import dynamic from "next/dynamic";
import { useMobile } from "../../hooks/useMobile";
import Header from "./desktop";
import HeaderMobile from "./mobile";
import { useQuery } from "@tanstack/react-query";
import CatalogService from "@/services/Catalog";

export default function HeaderComponent() {
  const isMobile = useMobile(1000);
  const MobileComponent = dynamic(() => import("./mobile.jsx"), {
    ssr: false, // Disable SSR for this component (optional)
  });
  const { data, isLoading } = useQuery({
    queryFn: () => CatalogService.getCatalogs({ limit: 100, page: 1 }),
    queryKey: ["get-catalogs"],
    refetchOnWindowFocus: false,
    suspense: true,
  });
  if (isMobile) {
    return <MobileComponent />;
  }
  return <Header catalogs={data} isLoading={isLoading} />;
}
