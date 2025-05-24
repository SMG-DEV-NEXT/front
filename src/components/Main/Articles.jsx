import React from "react";
import Text from "../Text";
import Link from "next/link";
import Icon from "../Icons";
import CustomLink from "../CustomLink";
import Article from "./Article";
import Image from "next/image";
import Effect from "../Animations/Effect";
import { MomentFunctions } from "@/services/Moment";
import { useLocale } from "next-intl";
import { BottomAxyus } from "./i";
function Articles({ data }) {
  const locale = useLocale();
  return (
    <div className="w-full bg-mainBlack py-[164px] relative">
      <div className="absolute right-0 bottom-[-13%]">
        <BottomAxyus />
      </div>
      <div className="container relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col gap-[32px]">
          <div className="flex items-center justify-between">
            <Text
              T="Main"
              weight="bold"
              size="t48"
              className="text-primary10 leading-[120%]"
            >
              Blogs
            </Text>
            <CustomLink url="/stats" className="pt-2 cursor-pointer">
              <Icon name="arrowRightCricle" size={25} />
            </CustomLink>
          </div>
          <div className="flex justify-between gap-6">
            <Effect type="to-right" className="min-h-full w-full">
              <Article
                data={MomentFunctions.statsDate(data.data[0]?.createdAt)}
                title={
                  data.data[0] ? data.data[0][`title${locale}`] : undefined
                }
                img={data.data[0]?.Image1}
                id={data.data[0]?.id}
              />
            </Effect>
            <Effect type="to-top" className="min-h-full w-full">
              <Article
                data={MomentFunctions.statsDate(data.data[1]?.createdAt)}
                title={
                  data.data[1] ? data.data[1][`title${locale}`] : undefined
                }
                img={data.data[1]?.Image1}
                id={data.data[1]?.id}
              />
            </Effect>
            <Effect type="to-top" className="min-h-full w-full">
              <Article
                data={MomentFunctions.statsDate(data.data[2]?.createdAt)}
                title={
                  data.data[2] ? data.data[2][`title${locale}`] : undefined
                }
                img={data.data[2]?.Image1}
                id={data.data[2]?.id}
              />
            </Effect>
            <Effect type="to-left" className="min-h-full w-full">
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

export default Articles;
