"use client";
import Image from "next/image";
import React from "react";
import Text from "../../components/Text";
import RouteCheat from "../../components/Cheat/Route";
import CardAndPay from "../../components/Cheat/Route/CardAndPay";
import FunctionalCheat, {
  FunctionalItemsMobile,
} from "../../components/Cheat/Functional";
import Medias from "../../components/Cheat/Media";
import Comments from "../../components/Cheat/Comment";
import { useMobile } from "@/hooks/useMobile";
import Programs from "@/components/Cheat/Route/CardAndPay/Programs";
import PayCard from "@/components/Cheat/Route/CardAndPay/Pay";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import Loading from "@/app/loading";

const View = () => {
  const isMobile = useMobile();
  console.log(isMobile);
  const { cheat } = useParams();
  const { data, isPending } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: () => CheatsService.getCheat(cheat),
    queryKey: ["get-cheat"],
  });

  if (isPending || !data) {
    return <Loading />;
  }

  if (isMobile) {
    return (
      <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[60px] pb-[60px]">
        <Image
          src="/images/loginBg.png"
          style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
          quality={100}
          priority
          fill
          alt="Image"
          className="z-[0]"
        />
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
    <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[64px] pb-[158px]">
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      />
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
