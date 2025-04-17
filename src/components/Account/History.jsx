import React, { useState } from "react";
import Text from "../Text";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "../Button";
import Pagination from "../../components/pagination";

const HistoryAccountItem = () => {
  const t = useTranslations("account");

  return (
    <>
      <tr className="h-2" />
      <tr className=" p-3 w-full mt-4">
        <td className="bg-black rounded-s-[12px] p-3 w-full">
          <div className="flex items-cecnter gap-3">
            <div className="w-[46px] h-[46px] rounded-full overflow-hidden">
              <Image
                src={"/images/game.png"}
                objectFit="contain"
                alt="Background"
                className="h-[46px]"
                width={46}
                height={46}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Text className="text-primary10" weight="bold" size="md" T="none">
                SMG для Rust
              </Text>
              <Text
                className="text-linkColor"
                weight="medium"
                size="sm"
                T="none"
              >
                1 {t("month")}
              </Text>
            </div>
          </div>
        </td>
        <td className="text-center bg-black px-[26px]">
          <Text className="text-linkColor" weight="medium" size="sm" T="none">
            31.10.24
          </Text>
        </td>
        <td className="text-center bg-black rounded-e-[12px] w-full  justify-end">
          <div className="flex gap-6 items-center  ">
            <Text className="text-primary10" weight="semi" size="lg" T="none">
              1000$
            </Text>
            <div className="flex gap-2">
              <Button
                variant="secondary"
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
          </div>
        </td>
      </tr>
    </>
  );
};
const HistoryAccountItemMobile = () => {
  const t = useTranslations("account");

  return (
    <div className="flex flex-col w-full bg-black rounded-[12px] p-3">
      <div className="flex items-center gap-3">
        <div className="w-[46px] h-[46px] rounded-[8px] overflow-hidden">
          <Image
            src={"/images/game.png"}
            objectFit="contain"
            className="h-[46px]"
            width={46}
            alt="Background"
            height={46}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Text className="text-primary10" weight="bold" size="md" T="none">
            SMG для Rust
          </Text>
          <Text
            className="text-linkColor"
            weight="medium"
            size="sm"
            T="none"
          >
            1 {t("month")}
          </Text>
        </div>
        <Text className="text-linkColor ml-auto " weight="medium" size="sm" T="none">
          31.10.24
        </Text>
      </div>
      <div className="flex items-center justify-between w-full mt-[14px] mb-5">
        <Text
          className="text-linkColor"
          weight="semi"
          size="xl"
          T="account"
        >
          priceTable
        </Text>
        <Text className="text-primary10 text-end" weight="semi" size="lg" T="none">
          1000$
        </Text>
      </div>

      <div className="flex gap-2 w-full flex-col">
        <Button
          variant="secondary"
          T="account"
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

const HistoryAccount = ({ mobile }) => {
  const [viewItems, setViewItems] = useState(items.slice(0, 7));
  if (mobile) {
    return (
      <div className="flex bg-input rounded-[16px] p-6 gap-6 flex-col items-center w-full">
        <div className="flex flex-col gap-[10px] w-full ">
          {viewItems.map((e) => {
            return <HistoryAccountItemMobile mobile={true} />;
          })}
        </div>
        <Pagination
          itemsPerPage={7}
          items={items}
          onPageChange={(e) => setViewItems(e)}
        />
      </div>
    )
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
          </tr>
        </thead>
        <tbody>
          <tr className="h-4"></tr>
          {viewItems.map((e) => {
            return <HistoryAccountItem />;
          })}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={7}
        items={items}
        onPageChange={(e) => setViewItems(e)}
      />
    </div>
  );
};

export default HistoryAccount;
