"use client";
import React from "react";
import MainTop from "../Main/Top";
import About from "../Main/About";
import Articles from "../Main/Articles";
import Blocks from "../Main/Blocks";
import BlocksMobile from "../Main/mobile/BlocksM";
import { useMobile } from "../../hooks/useMobile";
import MainTopMobile from "../Main/mobile/TopM";
import AboutMobile from "../Main/mobile/AboutM";
import ArticlesMobile from "../Main/mobile/ArticlesMobile";
import { useQueries } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import StatsService from "@/services/Stats";
import CatalogService from "@/services/Catalog";
import Loading from "@/app/loading";

function Main() {
  const isMobile = useMobile();
  const [catalogs, stats] = useQueries({
    queries: [
      {
        queryKey: "cheast",
        queryFn: CatalogService.getTop,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: "stats",
        queryFn: StatsService.getTopStats,
        refetchOnWindowFocus: false,
      },
    ],
  });
  const isLoading = [catalogs, stats].some((result) => result.isLoading);

  if (isLoading) return <Loading />;

  if (isMobile) {
    return (
      <div className=" view flex flex-col w-full">
        <div className="relative">
          <MainTopMobile />
          <BlocksMobile />
        </div>
        <AboutMobile />
        <ArticlesMobile data={stats.data} />
      </div>
    );
  }
  return (
    <div className=" view flex flex-col w-full">
      <div className="relative">
        <MainTop data={catalogs.data} />
        <Blocks />
      </div>
      <About />
      <Articles data={stats.data} />
    </div>
  );
}

export default Main;
