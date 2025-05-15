import React, { useState, useEffect } from "react";
import Text from "../Text";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Button from "../Button";
import Pagination from "../../components/pagination";
import CheckotuService from "@/services/Checkout";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import getLanguage from "@/utils/get-language";

import moment from "moment";
import { useRouter } from "next/navigation";
const types = {
  day: "1 day",
  week: "1 week",
  month: "1 month",
};

const HistoryAccountItem = ({
  cheat,
  checkoutedPrice,
  type,
  usd,
  locale,
  createdAt,
  router,
}) => {
  const t = useTranslations("account");

  return (
    <>
      <tr className="h-2" />
      <tr className=" p-3 w-full mt-4">
        <td className="bg-black rounded-s-[12px] p-3 w-full">
          <div className="flex items-cecnter gap-3">
            <div className="w-[46px] h-[46px] rounded-full overflow-hidden">
              <Image
                src={cheat.image1}
                objectFit="contain"
                alt="Background"
                className="h-[46px]"
                width={46}
                height={46}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Text
                className="text-primary10 leading-[120%]"
                weight="bold"
                size="md"
                T="none"
              >
                {cheat[`title${getLanguage(locale)}`]}
              </Text>
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="none"
              >
                1 {t(type)}
              </Text>
            </div>
          </div>
        </td>
        <td className="text-center bg-black px-[26px]">
          <Text className="text-linkColor" weight="medium" size="sm" T="none">
            {moment(createdAt).format("DD.MM.YYYY")}
          </Text>
        </td>
        <td className="text-center bg-black  w-full  justify-end">
          <div className="flex gap-6 items-center  ">
            <Text
              className="text-primary10 whitespace-nowrap text-center leading-[120%]"
              weight="semi"
              size="lg"
              T="none"
            >
              {usd ? (checkoutedPrice / usd).toFixed(2) : checkoutedPrice}{" "}
              {usd ? "$" : "₽"}
            </Text>
          </div>
        </td>
        <td className="text-center bg-black pl-2 rounded-e-[12px] w-full  justify-end">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/${locale}/catalog/${cheat.catalogId}/${cheat.id}`)
              }
              T="account"
              className="text-[14px] h-[46px] whitespace-nowrap"
            >
              otziv
            </Button>
            <Button
              T="account"
              className="text-[14px] h-[46px] whitepspace-nowrap mr-3"
            >
              download
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};
const HistoryAccountItemMobile = ({
  cheat,
  checkoutedPrice,
  type,
  usd,
  locale,
  createdAt,
  router,
}) => {
  const t = useTranslations("account");

  return (
    <div className="flex flex-col w-full bg-black rounded-[12px] p-3">
      <div className="flex items-center gap-3">
        <div className="w-[46px] h-[46px] rounded-[8px] overflow-hidden">
          <Image
            src={cheat.image1}
            objectFit="contain"
            alt="Background"
            className="h-[46px]"
            width={46}
            height={46}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Text
            className="text-primary10 leading-[120%]"
            weight="bold"
            size="md"
            T="none"
          >
            {cheat[`title${getLanguage(locale)}`]}
          </Text>
          <Text className="text-linkColor" weight="medium" size="sm" T="none">
            1 {t(type)}
          </Text>
        </div>
        <Text className="text-linkColor" weight="medium" size="sm" T="none">
          {moment(createdAt).format("DD.MM.YYYY")}
        </Text>
      </div>
      <div className="flex items-center justify-between w-full mt-[14px] mb-5">
        <Text className="text-linkColor" weight="semi" size="xl" T="account">
          priceTable
        </Text>
        <Text
          className="text-primary10 text-end leading-[120%]"
          weight="semi"
          size="lg"
          T="none"
        >
          {usd ? (checkoutedPrice / usd).toFixed(2) : checkoutedPrice}{" "}
          {usd ? "$" : "₽"}
        </Text>
      </div>

      <div className="flex gap-2 w-full flex-col">
        <Button
          variant="secondary"
          T="account"
          onClick={() =>
            router.push(`/${locale}/catalog/${cheat.catalogId}/${cheat.id}`)
          }
          className="text-[14px] w-full h-[46px] whitespace-nowrap"
        >
          otziv
        </Button>
        <Button
          T="account"
          className="text-[14px] w-full h-[46px] whitepspace-nowrap mr-3"
        >
          download
        </Button>
      </div>
    </div>
  );
};

const items = Array.from({ length: 30 }, (_, index) => ({
  items: "asd",
}));

const HistoryAccount = ({ mobile, usd }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [viewItems, setViewItems] = useState(items.slice(0, 7));
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: ["get-list", page],
    queryFn: () => CheckotuService.getListClient({ page }),
    refetchOnWindowFocus: false,
  });

  if (isPending || !data)
    return (
      <div className="flex bg-input rounded-[16px] p-6 gap-6 flex-col items-center w-full">
        <Loading />
      </div>
    );
  if (mobile) {
    return (
      <div className="flex bg-input rounded-[16px] p-6 gap-6 flex-col items-center w-full">
        <div className="flex flex-col gap-[10px] w-full ">
          {data.data.data.map((e) => {
            return (
              <HistoryAccountItemMobile
                mobile={true}
                router={router}
                usd={usd}
                locale={locale}
                key={e.id}
                {...e}
              />
            );
          })}
        </div>
        <Pagination
          current={data.data.page}
          itemsPerPage={data.data.totalPages}
          onPageChange={(e) => {
            setPage(e.selected + 1);
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex bg-input rounded-[16px] p-6 gap-6 flex-col items-center w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start pl-3">
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="account"
              >
                name
              </Text>
            </th>
            <th className="text-center ">
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="account"
              >
                date
              </Text>
            </th>
            <th className="text-start">
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="account"
              >
                priceTable
              </Text>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-4"></tr>
          {data?.data.data.map((e) => {
            return (
              <HistoryAccountItem
                router={router}
                usd={usd}
                locale={locale}
                key={e.id}
                {...e}
              />
            );
          })}
        </tbody>
      </table>
      <Pagination
        current={data.data.page}
        itemsPerPage={data.data.totalPages}
        onPageChange={(e) => {
          setPage(e.selected + 1);
        }}
      />
    </div>
  );
};

export default HistoryAccount;
