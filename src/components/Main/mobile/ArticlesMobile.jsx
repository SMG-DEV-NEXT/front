import React from "react";
import Text from "../../Text";
import Link from "next/link";
import Icon from "../../Icons";
import CustomLink from "../../CustomLink";
import Article from "../Article";
import Image from "next/image";
import "../index.scss";
import Effect from "../../Animations/Effect";
import { useLocale } from "next-intl";
import { MomentFunctions } from "@/services/Moment";

function ArticlesBottom({ data }) {
  const locale = useLocale();
  return (
    <div className="w-full bg-mainBlack py-[164px] relative">
      {/* <Image
        src="/images/ArticlesBG.png"
        fill
        alt="article"
        objectFit="cover"
        style={{ inset: "inital", top: "10%", zIndex: 1 }}
      /> */}
      <div className="container relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center justify-between">
            <Text T="Main" weight="bold" size="t38" className="text-primary10">
              Blogs
            </Text>
            <CustomLink url="/stats" className="pt-2 cursor-pointer">
              <Icon name="arrowRightCricle" />
            </CustomLink>
          </div>
          <div className="articlesMobile justify-between gap-6">
            <Effect type="to-right">
              <Article
                data={MomentFunctions.statsDate(data.data[0]?.createdAt)}
                title={
                  data.data[0] ? data.data[0][`title${locale}`] : undefined
                }
                img={data.data[0]?.Image1}
                id={data.data[0]?.id}
              />
            </Effect>
            <Effect type="to-right">
              <Article
                data={MomentFunctions.statsDate(data.data[1]?.createdAt)}
                title={
                  data.data[1] ? data.data[1][`title${locale}`] : undefined
                }
                img={data.data[1]?.Image1}
                id={data.data[1]?.id}
              />
            </Effect>
            <Effect type="to-right">
              <Article
                data={MomentFunctions.statsDate(data.data[2]?.createdAt)}
                title={
                  data.data[2] ? data.data[2][`title${locale}`] : undefined
                }
                img={data.data[2]?.Image1}
                id={data.data[2]?.id}
              />
            </Effect>
            <Effect type="to-right">
              <Article
                data={MomentFunctions.statsDate(data.data[3]?.createdAt)}
                title={
                  data.data[3] ? data.data[3][`title${locale}`] : undefined
                }
                img={data.data[3]?.Image1}
                id={data.data[3]?.id}
              />
            </Effect>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesBottom;
