"use client";
import Image from "next/image";
import React from "react";
import Text from "../../Text";
import RouteCheat from "../../Cheat/Route";
import CardAndPay from "../../Cheat/Route/CardAndPay";
import FunctionalCheat, { FunctionalItemsMobile } from "../../Cheat/Functional";
import Medias from "../../Cheat/Media";
import Comments from "../../Cheat/Comment";
import { useMobile } from "@/hooks/useMobile";
import Programs from "@/components/Cheat/Route/CardAndPay/Programs";
import PayCard from "@/components/Cheat/Route/CardAndPay/Pay";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import Loading from "@/app/loading";

const View = () => {
  const isMobile = useMobile();
  const { cheat } = useParams();
  const { data, isPending } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => CheatsService.getCheat(cheat),
    queryKey: ["get-cheat"],
    retry: false,
  });

  if (!data?.data && !isPending) return notFound();

  if (isPending || !data) {
    return <Loading />;
  }

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
        <div className="container flex flex-col gap-10 z-[1]">
          <CardAndPay mobile={isMobile} cheat={data.data} />
          <FunctionalCheat mobile={isMobile} cheat={data.data} />
          <PayCard mobile={isMobile} cheat={data.data} />
          <Medias mobile={isMobile} cheat={data.data} />
          <Programs mobile={isMobile} cheat={data.data} />
          <FunctionalItemsMobile cheat={data.data} />
          <Comments mobile={isMobile} cheat={data.data} />
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[158px]">
      {/* <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      /> */}
      <div className="container z-[1]">
        <CardAndPay mobile={isMobile} cheat={data.data} />
        <FunctionalCheat mobile={isMobile} cheat={data.data} />
        <Medias mobile={isMobile} cheat={data.data} />
        <Comments mobile={isMobile} cheat={data.data} />
      </div>
    </div>
  );
};

export default View;
