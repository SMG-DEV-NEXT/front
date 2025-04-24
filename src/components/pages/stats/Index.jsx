"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StatsHeader from "../../Stats/Header";
import LeftStats from "../../Stats/Left";
import RightStats from "../../Stats/Right";
import { useMobile } from "@/hooks/useMobile";
import PopularStats from "@/components/Stats/Popular";
import { useMutation, useQuery } from "@tanstack/react-query";
import StatsService from "@/services/Stats";
import Loading from "@/app/loading";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const StatsView = () => {
  const isMobile = useMobile();
  const t = useTranslations("stats");
  const PageLimit = 5;
  const [selectedGame, setSelectedGame] = useState({});
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    value: "new",
    label: t("new"),
  });

  const query = useQuery({
    queryFn: StatsService.getAllGames,
    queryKey: ["GetGames"],
    refetchOnWindowFocus: false,
  });
  const mutate = useMutation({
    mutationFn: StatsService.getStatsGames,
    mutationKey: ["getStats"],
    onSuccess: (data) => {
      setSelectedGame(data.data);
    },
  });

  const handleSelectGame = (e) => {
    mutate.mutate({
      gameId: e,
      limit: PageLimit,
      page: 1,
      search: search,
    });
  };

  useEffect(() => {
    if (query.data && query.data.data.games) {
      const name = window.location.hash.replace("#", "");
      const game = name
        ? data.games.find((e) => e.id === name)
        : data.games[0].id;
      if (game?.id || data.games.length > 0) {
        mutate.mutate({
          gameId: game?.id || data.games[0].id,
          limit: PageLimit,
          page: 1,
          search: search,
          type: selectedFilter.value,
        });
      }
    }
  }, [query.data]);

  const handleChangeSearch = (v) => {
    if (!selectedGame.game) {
      return;
    }
    mutate.mutate({
      gameId: selectedGame?.game?.id,
      limit: PageLimit,
      page: 1,
      search: v,
      type: "new",
    });
    setSearch(v);
  };

  const handleChangePage = (e) => {
    mutate.mutate({
      gameId: selectedGame.id,
      limit: PageLimit,
      page: e,
      search: search,
      type: selectedFilter.value,
    });
  };
  if (query.isPending) {
    return <Loading />;
  }
  const data = query.data.data;

  if (isMobile) {
    return (
      <div className="view relative h-full w-full flex items-center justify-center pt-[60px] pb-[60px]">
        {/* <Image
          src="/images/loginBg.png"
          style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
          quality={100}
          priority
          fill
          alt="Image"
          className="z-[0]"
        /> */}
        <div className="container z-[1] flex flex-col gap-6">
          <StatsHeader
            search={search}
            setSearch={handleChangeSearch}
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
          <div className="w-full flex gap-6 flex-col">
            <LeftStats
              mobile={true}
              games={data.games}
              selectedGame={selectedGame}
              setSelectedGame={handleSelectGame}
            />
            {selectedGame.game && (
              <RightStats
                mobile={true}
                selectedFilterDate={selectedFilter}
                handleChangePage={handleChangePage}
                game={selectedGame}
              />
            )}
            <PopularStats popular={data.stats} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[112px]">
      {/* <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      /> */}
      <div className="container z-[1] flex flex-col gap-6">
        <StatsHeader
          search={search}
          setSearch={handleChangeSearch}
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
        <div className="w-full flex gap-6">
          <LeftStats
            popular={data.stats}
            games={data.games}
            selectedGame={selectedGame}
            setSelectedGame={handleSelectGame}
          />
          {selectedGame.game && (
            <RightStats
              handleChangePage={handleChangePage}
              game={selectedGame}
              selectedFilterDate={selectedFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsView;
