"use client";
import React, { useEffect, useState } from "react";
import Text from "../Text";
import ListCheatItem from "../ListCheat";
import Input from "../Input";
import Pagination from "../pagination";
import PriceSortInput from "../priceInput";
import { useMobile } from "@/hooks/useMobile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import Loading from "@/app/loading";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import CheatsMobile from "../Cheat/CheatsMobile";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import getLanguage from "@/utils/get-language";

const typesFilter = ["high_price", "low_price", "raiting"];
export const dynamic = "force-dynamic";

const Cheats = () => {
  const [toViewItems, setToViewItems] = useState([]);
  const [search, setSearch] = useState("");
  const locale = useLocale();
  const cheatsT = useTranslations("cheats");
  const [selectedFilterTag, setSelectedFilterTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [usd, setUSD] = useState(null);
  const [previous, setPrevious] = useState(null);
  const { id } = useParams();
  const [filters, setFilters] = useState({
    search: "",
    type: typesFilter[0],
    price_start: 0,
    price_end: 1000,
    sortingTags: [],
    catalogId: id,
    page: 1,
    limit: 4,
  });
  const isMobile = useMobile(930);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_tfZjgKTbQ86JVJJm1yKs75nITIE3sDnyYLQCaFyc"
  );

  const { data, isLoading, isPending, isError, refetch, isRefetching } =
    useQuery({
      queryKey: ["cheats", filters], // React Query refetches when filters change
      queryFn: () => CheatsService.getCheats(filters),
      keepPreviousData: true,
      placeholderData: previous,
      suspense: true,
      retry: false,
      refetchOnWindowFocus: false, // Get last known data
    });

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters({ ...filters, search });
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);
  useEffect(() => {
    if (freecurrencyapi && usd === null && locale === "en") {
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

  const handleInputChange = (name, value) => {
    if (name === "search") {
      setSearch(value);
      return;
    }
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data) {
      setPrevious(data);
      const uniqueTags = [
        ...new Map(
          api.data
            .flatMap((item) => item.tags) // Extract all tags
            .map((tag) => [JSON.stringify(tag), tag]) // Convert to string for uniqueness
        ).values(),
      ];
      setTags(uniqueTags);
      setSelectedFilterTag(null);
    }
  }, [data]);

  const api = data?.data;

  const getViewItems = () => {
    if (selectedFilterTag) {
      const filteredByTags = [
        ...api.data.filter((e) => {
          const isIncluding = e.tags.find(
            (e) => e[locale] === selectedFilterTag[locale]
          );
          return !!isIncluding;
        }),
      ];
      const withoutFilter = [
        ...api.data.filter((e) => {
          const isIncluding = e.tags.find(
            (e) => e[locale] === selectedFilterTag[locale]
          );
          return !isIncluding;
        }),
      ];
      return [...filteredByTags, ...withoutFilter];
    }
    return api.data;
  };
  // if (!api?.data && !isPending) return notFound();
  if (!data) {
    return <Loading />;
  }
  if (isMobile && api?.data) {
    return (
      <CheatsMobile
        items={getViewItems()}
        toViewItems={toViewItems}
        filters={filters}
        api={api}
        typesFilter={typesFilter}
        T={cheatsT}
        selectedFilterTag={selectedFilterTag}
        setSelectedFilterTag={setSelectedFilterTag}
        tags={tags}
        locale={locale}
        usd={usd}
        id={id}
        handleInputChange={handleInputChange}
        search={search}
        setToViewItems={setToViewItems}
      />
    );
  }

  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[112px]">
      <div className="flex flex-col gap-6 z-[1] container items-center">
        <Text
          T="none"
          className="text-primary10 leading-[120%]"
          weight="bold"
          size="t48"
        >
          {cheatsT("title")} {api?.catalog?.[`head${getLanguage(locale)}`]}
        </Text>
        <Input
          iconLeft="searchNew"
          value={search}
          setValue={(e) => handleInputChange("search", e)}
          placeholder="Введите название товара"
          styleDiv={{ padding: "20px" }}
        />
        <div className="flex gap-6 w-full ">
          <div className="flex flex-col bg-input rounded-2xl w-[32.5%]">
            <div className="p-6 flex flex-col gap-4">
              <Text
                T="cheats"
                className="text-primary10 leading-[140%]"
                size="xl"
                weight="bold"
              >
                sortingTitle
              </Text>
              <div className="flex flex-col gap-3">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleInputChange("type", typesFilter[2])}
                >
                  {filters.type !== typesFilter[2] ? (
                    <div className="border-[2px] rounded-full border-linkColor w-4 h-4"></div>
                  ) : (
                    <div className=" rounded-full w-4 h-4 bg-primary80"></div>
                  )}
                  <Text
                    className="text-linkColor leading-[140%]"
                    size="sm"
                    weight="medium"
                    T="cheats"
                  >
                    reiting
                  </Text>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleInputChange("type", typesFilter[1])}
                >
                  {filters.type !== typesFilter[1] ? (
                    <div className="border-[2px] rounded-full border-linkColor w-4 h-4"></div>
                  ) : (
                    <div className=" rounded-full  w-4 h-4 bg-primary80"></div>
                  )}{" "}
                  <Text
                    className="text-linkColor leading-[140%]"
                    size="sm"
                    weight="medium"
                    T="cheats"
                  >
                    low
                  </Text>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer "
                  onClick={() => handleInputChange("type", typesFilter[0])}
                >
                  {filters.type !== typesFilter[0] ? (
                    <div className="border-[2px] rounded-full border-linkColor w-4 h-4"></div>
                  ) : (
                    <div className=" rounded-full  w-4 h-4 bg-primary80"></div>
                  )}{" "}
                  <Text
                    className="text-linkColor leading-[140%]"
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
                  className="text-primary10 leading-[140%]"
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
            <div className="p-6 flex flex-col gap-4">
              <Text
                T="cheats"
                className="text-primary10 leading-[140%]"
                size="xl"
                weight="bold"
              >
                sortByTegs
              </Text>
              <div className="flex flex-wrap gap-2">
                {!!tags.length ? (
                  tags.map((e) => {
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
          </div>
          {api?.data ? (
            <div className="flex gap-6 flex-col w-[67.5%]">
              {getViewItems().length === 0 ? (
                <Text
                  weight="semi"
                  size="md"
                  className="text-linkColor mt-5 text-center"
                >
                  empty
                </Text>
              ) : (
                getViewItems().map((e) => {
                  return (
                    <ListCheatItem
                      usd={usd}
                      key={crypto.randomUUID()}
                      {...e}
                      catalogId={id}
                    />
                  );
                })
              )}
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
  );
};

export default Cheats;
