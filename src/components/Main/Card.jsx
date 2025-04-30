import Image from "next/image";
import React, { useEffect, useState } from "react";
import Text from "../Text";
import Icon from "../Icons";
import "./index.scss";
import CustomLink from "../CustomLink";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useLocale } from "next-intl";
function Card({
  imageUrl,
  title,
  products,
  minimumPrice,
  imageWidth = "264",
  cheats,
  id,
}) {
  const [usd, setUSD] = useState(null);
  const locale = useLocale();
  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_tfZjgKTbQ86JVJJm1yKs75nITIE3sDnyYLQCaFyc"
  );

  useEffect(() => {
    if (freecurrencyapi && usd === null) {
      freecurrencyapi
        .latest({
          base_currency: "USD",
          currencies: "RUB",
        })
        .then((response) => {
          setUSD(response.data.RUB);
        });
    }
  }, [freecurrencyapi]);
  const getMinimumPrice = () => {
    if (!cheats) return;
    const prices = cheats
      .map((e) => {
        return e.minimumPrice;
      })
      .sort();
    if (locale === "en") {
      return `${((prices[0] || 0) / usd).toFixed(2)} $`;
    }
    return `${prices[0] || 0} ₽`;
  };
  return (
    <div className="flex relative rounded-2xl z-[11]  overflow-hidden flex-col bg-[#272C33] h-[252px]">
      <Image
        src={imageUrl}
        width={imageWidth}
        height="252"
        alt="card"
        className="z-[1]"
      />
      <div className="box"></div>
      <div
        className="absolute z-[2] bottom-[0px] w-full overflow-hidden
"
      >
        {" "}
        <div className="flex flex-col gap-2 px-6 pb-3">
          <Text T="none" className="text-primary10" size="xl" weight="bold">
            {title}
          </Text>
          <div className="flex">
            <Text
              T="none"
              className="text-linkColor pr-1"
              size="sm"
              weight="medium"
            >
              {cheats ? cheats.length : 0}
            </Text>
            <Text T="Main" className="text-linkColor" size="sm" weight="medium">
              product
            </Text>
          </div>
        </div>
        <div className="line shadowBlock"></div>
        <div className="flex justify-between bg-[#272c33]  px-6 py-3">
          <div className="flex gap-1 items-end   ">
            <Text
              T="Main"
              className="text-primary10 pb-[2px]"
              size="sm"
              weight="medium"
            >
              from
            </Text>
            <Text T="none" className="text-primary10" size="lg" weight="medium">
              {getMinimumPrice()}
            </Text>
          </div>
          <CustomLink url={`/catalog/${id}`}>
            <Icon name="arrowRightCricle" className="cursor-pointer" />
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

export default Card;
