"use client";
import Image from "next/image";
import React from "react";
import RouteStat from "../../Stats/route";
import { useLocale, useTranslations } from "next-intl";
import Icon from "../../Icons";
import Text from "../../Text";
import { useMobile } from "@/hooks/useMobile";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import StatsService from "@/services/Stats";
import Loading from "@/app/loading";
import moment from "moment";

// const stat = {
//   id: 1,
//   title: `Как пользоваться приватным читом Rust SMG в 2024-ом году #3`,
//   text: "Шутеры остаются одним из самых популярных жанров в игровой индустрии, предлагая игрокам возможность погрузиться в динамичные сражения и захватывающие истории. В 2024 году разработчики продолжают радовать геймеров новыми релизами и улучшениями уже полюбившихся проектов. В этом обзоре мы рассмотрим лучшие шутеры на ПК, которые покорили сердца миллионов игроков по всему миру.",
//   date: "04.11.2024",
//   view: "120",
//   catalog: "Rust",
// };

const popularStats = [
  {
    id: 1,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
  {
    id: 2,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
  {
    id: 3,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
  {
    id: 4,
    title: "Как пользоваться приватным читом Rust SMG в 2024-ом году",
    date: "04.11.2024",
    view: "120",
  },
];

function StatView() {
  const t = useTranslations("stats");
  const { id } = useParams();
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryFn: () => StatsService.getStatUser(id),
    queryKey: ["getStat"],
    refetchOnWindowFocus: false,
  });
  const isMobile = useMobile();
  if (isPending) {
    return <Loading />;
  }
  if (!data?.data && !isPending) return notFound();
  const stat = data?.data;
  return (
    <div
      className="view relative h-full w-full flex items-center justify-center "
      style={{
        paddingBottom: isMobile ? "60px" : "64px",
        paddingTop: isMobile ? "60px" : "112px",
      }}
    >
      {/* <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      /> */}
      <div className="container flex flex-col gap-8 z-[1] ">
        {!isMobile && (
          <RouteStat
            catalogId={stat.catalog.id}
            statName={stat[`title${locale}`]}
            catalogName={stat.catalog.title}
          />
        )}

        <div
          className={
            isMobile
              ? "flex gap-6 items-start flex-col"
              : "flex gap-6 items-start"
          }
        >
          <div
            className=" flex flex-col rounded-[16px] w-[75%] overflow-hidden bg-input"
            style={{ width: isMobile ? "100%" : "75%" }}
          >
            <Image
              src={stat.Image2}
              width={840}
              className=""
              alt="Background"
              style={{ height: "302px", objectFit: "cover" }}
              height={302}
            />
            <div
              className={`content pt-8 gap-8  flex flex-col`}
              style={{
                paddingBottom: isMobile ? "24px" : "64px",
                paddingLeft: isMobile ? "24px" : "96px",
                paddingRight: isMobile ? "24px" : "96px",
              }}
            >
              <div className="flex flex-col w-full gap-4">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-1 items-center">
                    <Icon name="date" folder="stats" size={20} />
                    <Text
                      className="text-linkColor"
                      weight="medium"
                      size="sm"
                      T="none"
                    >
                      {moment(stat.createdAt).format("DD.MM.YYYY")}
                    </Text>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon name="eye" folder="stats" size={20} />
                    <Text
                      className="text-linkColor"
                      weight="medium"
                      size="sm"
                      T="none"
                    >
                      {stat.view}
                    </Text>
                  </div>
                  <Text
                    className="text-linkColor"
                    weight="medium"
                    size="sm"
                    T="none"
                  >
                    {t("catalogS")}: {stat.catalog.title}
                  </Text>
                </div>
                <Text
                  className="text-primary10 !text-[32px] leading-[120%]"
                  weight="bold"
                  size=""
                  T="none"
                >
                  {stat[`title${locale}`]}
                </Text>
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="none"
                >
                  {stat[`about${locale}`]}
                </Text>
              </div>
              <div className="flex flex-col w-full gap-4">
                <Text
                  className="text-primary10 !text-[32px] leading-[120%]"
                  weight="bold"
                  size=""
                  T="none"
                >
                  Как отбирались игры
                </Text>
                {/* <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="none"
                >
                  При составлении списка топовых шутеров 2024 года мы учитывали
                  несколько ключевых факторов:
                </Text> */}
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="none"
                >
                  {stat[`content${locale}`]}
                </Text>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-6 p-6 bg-input rounded-[16px] w-[23.5%]"
            style={{ width: isMobile ? "100%" : "23.5%" }}
          >
            <Text
              weight="bold"
              size="xl"
              T="stats"
              className="text-primary10 leading-[140%]"
            >
              intersting
            </Text>
            {stat?.popular.map((e) => {
              return (
                <div className="flex flex-col gap-2" key={e.id}>
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-1 items-center">
                      <Icon name="date" folder="stats" size={20} />
                      <Text
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                        T="none"
                      >
                        {moment(e.createdAt).format("DD.MM.YYYY")}
                      </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon name="eye" folder="stats" size={20} />
                      <Text
                        className="text-linkColor"
                        weight="medium"
                        size="sm"
                        T="none"
                      >
                        {e.view}
                      </Text>
                    </div>
                  </div>
                  <Text
                    T="none"
                    weight="medium"
                    size="sm"
                    className="text-primary10"
                  >
                    {e[`title${locale}`]}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatView;
