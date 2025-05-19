"use client";
import React, { useMemo, useState } from "react";
import Text from "../Text";
import ListCheatItem from "../ListCheat";
import Input from "../Input";
import Pagination from "../pagination";
import PriceSortInput from "../priceInput";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Loading from "@/app/loading";
import getLanguage from "@/utils/get-language";
export const dynamic = "force-dynamic";

const CheatsMobile = ({
  items,
  toViewItems,
  T,
  search,
  handleInputChange,
  setToViewItems,
  filters,
  typesFilter = [],
  api,
  locale,
  tags,
  selectedFilterTag,
  usd,
  setSelectedFilterTag,
  id,
}) => {
  const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);
  const itemList = useMemo(() => {
    return items?.length === 0 ? (
      <Text weight="semi" size="md" className="text-linkColor mt-5">
        empty
      </Text>
    ) : (
      items?.map((e) => {
        return (
          <ListCheatItem
            usd={usd}
            key={crypto.randomUUID()}
            {...e}
            catalogId={id}
          />
        );
      })
    );
  }, [items]); // won't re-render unless data changes

  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[112px]">
      <div className="flex flex-col gap-6 z-[1] container items-center">
        <Text
          T="none"
          className="text-primary10 leading-[120%]"
          weight="bold"
          size="t48"
        >
          {T("title")} {api?.catalog?.[`head${getLanguage(locale)}`]}
        </Text>
        <Input
          iconLeft="searchNew"
          value={search}
          setValue={(e) => handleInputChange("search", e)}
          placeholder="Введите название товара"
          styleDiv={{ padding: "20px" }}
        />
        <div className="flex w-full justify-end">
          <Text
            size="base"
            weight="medium"
            className="text-primary10 cursor-pointer underline"
            onClick={() => setIsOpenFilterMobile(true)}
          >
            filters
          </Text>
        </div>
        <Modal
          isOpen={isOpenFilterMobile}
          width={400}
          customTop={"50px"}
          onClose={() => setIsOpenFilterMobile(false)}
        >
          <div className="flex flex-col w-[302px] bg-input rounded-2xl w-full">
            <div className="pb-6 flex flex-col gap-4">
              <Text
                T="cheats"
                className="text-primary10"
                size="xl"
                weight="bold"
              >
                sortingTitle
              </Text>
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => handleInputChange("type", typesFilter[2])}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {filters?.type !== typesFilter[2] ? (
                    <div className="border rounded-full border-linkColor w-4 h-4"></div>
                  ) : (
                    <div className="border rounded-full border-linkColor w-4 h-4 bg-primary80"></div>
                  )}
                  <Text
                    className="text-linkColor"
                    size="sm"
                    weight="medium"
                    T="cheats"
                  >
                    reiting
                  </Text>
                </div>
                <div
                  onClick={() => handleInputChange("type", typesFilter[1])}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {filters?.type !== typesFilter[1] ? (
                    <div className="border rounded-full border-linkColor w-4 h-4"></div>
                  ) : (
                    <div className="border rounded-full border-linkColor w-4 h-4 bg-primary80"></div>
                  )}
                  <Text
                    className="text-linkColor"
                    size="sm"
                    weight="medium"
                    T="cheats"
                  >
                    low
                  </Text>
                </div>
                <div
                  onClick={() => handleInputChange("type", typesFilter[0])}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {filters?.type !== typesFilter[0] ? (
                    <div className="border rounded-full border-linkColor w-4 h-4"></div>
                  ) : (
                    <div className="border rounded-full border-linkColor w-4 h-4 bg-primary80"></div>
                  )}
                  <Text
                    className="text-linkColor"
                    size="sm"
                    weight="medium"
                    T="cheats"
                  >
                    high
                  </Text>
                </div>
              </div>
            </div>
            {!api.hideFilterBar ? (
              <div className="p-6 flex flex-col gap-4 border-y border-y-[#404658]">
                <Text
                  T="cheats"
                  className="text-primary10"
                  size="xl"
                  weight="bold"
                >
                  sortingBycost
                </Text>
                <PriceSortInput
                  currency={usd ? "$" : "₽"}
                  range={filters.range}
                  setRange={(e) => handleInputChange("range", e)}
                  min={api?.lowPrice}
                  usd={usd}
                  max={api?.maxPrice}
                />
              </div>
            ) : (
              <div className="h-[1px] flex flex-col gap-4 border-y border-y-[#404658]"></div>
            )}
            <div className="py-6 flex flex-col gap-4">
              <Text
                T="cheats"
                className="text-primary10"
                size="xl"
                weight="bold"
              >
                sortByTegs
              </Text>
              <div className="flex flex-wrap gap-2">
                {!!tags?.length ? (
                  tags?.map((e) => {
                    return (
                      <div
                        key={crypto.randomUUID()}
                        onClick={() => setSelectedFilterTag(e)}
                        className={`flex py-2 px-3 rounded-lg bg-${
                          selectedFilterTag?.[locale] === e[locale]
                            ? "primary80"
                            : "black"
                        } cursor-pointer`}
                      >
                        <Text
                          T="none"
                          className={`text-${
                            selectedFilterTag?.[locale] === e[locale]
                              ? "primary10"
                              : "linkColor"
                          }`}
                          weight="medium"
                          size="sm"
                        >
                          {e[locale]}
                        </Text>
                      </div>
                    );
                  })
                ) : (
                  <Text
                    T="cheats"
                    weight="semi"
                    size="md"
                    className="text-linkColor"
                  >
                    emptyTags
                  </Text>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-t-[#404658] pt-6">
              <Button>filter</Button>
              <Button variant="secondary">clear</Button>
            </div>
          </div>
        </Modal>
        <div className="flex gap-6 w-full items-start">
          <div className="flex gap-6 flex-col  w-full flex-wrap justify-center items-center">
            {api?.data ? (
              <div className="flex gap-6 justify-center items-center flex-col w-full">
                {itemList}
                {api?.total > 1 && (
                  <Pagination
                    itemsPerPage={api?.total * 1}
                    current={api?.page * 1}
                    onPageChange={(e) =>
                      handleInputChange("page", e.selected + 1)
                    }
                  />
                )}
              </div>
            ) : (
              <div className="w-[67.5%] flex items-center">
                <Loading noPage={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheatsMobile;
