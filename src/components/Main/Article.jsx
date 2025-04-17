"use client";
import React from "react";
import Text from "../Text";
import Image from "next/image";
import "./index.scss";
import CustomLink from "../CustomLink";
import { useMobile } from "../../hooks/useMobile";
function Article({
  data = "04.11.2024",
  title = "Как пользоваться приватным читом Rust",
  img = "/images/game.png",
  id,
}) {
  const isMobile = useMobile();
  return (
    <CustomLink url={!id ? `/stats` : `/stats/${id}`} className="h-full">
      <div className="flex h-full article bg-[#181a1f] rounded-2xl overflow-hidden relative flex-col cursor-pointer">
        <Image
          src={img}
          width="264"
          height={isMobile ? "177" : "153"}
          alt="Article"
          style={{ height: isMobile ? "177px" : "153px" }}
          className={` w-full object-cover h-[${isMobile ? "177" : "153"}px]`}
        />
        <div className="flex flex-col p-6 gap-2">
          <Text T="none" weight="medium" className="text-linkColor" size="sm">
            {data}
          </Text>
          <Text T="none" weight="bold" className="text-primary10" size="lg">
            {title}
          </Text>
        </div>
      </div>
    </CustomLink>
  );
}

export default Article;
