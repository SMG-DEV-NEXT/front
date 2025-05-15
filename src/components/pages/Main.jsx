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
import { Axyus, HugeGlow, LeftIcon, RightIcon } from "../Main/i";

function Main() {
  const isMobile = useMobile(1030);
  const [catalogs, stats] = useQueries({
    queries: [
      {
        queryKey: "cheast",
        queryFn: CatalogService.getTop,
        refetchOnWindowFocus: false,
        suspense: true,
      },
      {
        queryKey: "stats",
        queryFn: StatsService.getTopStats,
        refetchOnWindowFocus: false,
        suspense: true,
      },
    ],
  });
  const isLoading = [catalogs, stats].some((result) => result.isLoading);
  if (isMobile) {
    return (
      <div className=" view flex flex-col w-full">
        <div className="relative overflow-hidden bg-mainBlack">
          <div className="absolute top-[2] z-[3] left-[0] h-full">
            <LeftIcon />
          </div>
          <div className="absolute top-[-5%] z-[2] right-[0] h-full opacity-[1]">
            <Axyus wid={900} />
          </div>
          <div className="absolute top-[-18%] z-[3] left-[-30%] ">
            <HugeGlow />
          </div>
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
      <div className="relative overflow-hidden bg-mainBlack">
        <div className="absolute flex justify-end items-top top-[-10%] z-[2] right-[0%] h-full opacity-[1] w-full">
          <Axyus />
        </div>
        <div className="absolute top-[2] z-[0] left-[0] h-full">
          <LeftIcon />
        </div>
        <div className="absolute top-[0%] z-[2] right-[0%] h-full">
          <RightIcon />
        </div>
        <MainTop data={catalogs.data} />
        <Blocks />
      </div>
      <About />
      <Articles data={stats.data} />
    </div>
  );
}

export default Main;
