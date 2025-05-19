"use client";
import React, { useEffect, useState } from "react";
import Text from "../Text";
import Input from "../Input";
import Card from "../Main/Card";
import Pagination from "../pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import CatalogService from "@/services/Catalog";
import Loading from "@/app/loading";
import { useMobile } from "@/hooks/useMobile";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useLocale } from "next-intl";

function View() {
  const [search, setSearch] = useState("");
  const locale = useLocale();
  const isMobile = useMobile();
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [usd, setUSD] = useState(null);
  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_tfZjgKTbQ86JVJJm1yKs75nITIE3sDnyYLQCaFyc"
  );
  const [catalogData, setCatalogData] = useState({
    data: null,
    total: 0,
    page: 1,
  });

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

  // Fetch catalogs initially
  const query = useQuery({
    queryFn: () => CatalogService.getCatalogs({ limit: 16, page: 1 }),
    queryKey: ["get-catalogs"],
    refetchOnWindowFocus: false,
    suspense: true,
  });

  // Mutation to fetch filtered data
  const catalogMutation = useMutation({
    mutationFn: CatalogService.getCatalogs,
    mutationKey: ["get-catalogs"],
    onSuccess: (response) => {
      setCatalogData(response.data);
    },
  });

  // Set initial data when query fetches results
  useEffect(() => {
    if (query.data) {
      setCatalogData(query.data.data);
    }
  }, [query.data]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch data when search term changes
  useEffect(() => {
    if (debouncedSearch || debouncedSearch === "") {
      catalogMutation.mutate({
        page: 1,
        limit: 16,
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch]);

  // Handle pagination change
  const handlePageChange = (page) => {
    catalogMutation.mutate({ page, limit: 16, search });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[112px]">
      <div className="container flex flex-col items-center gap-6 z-[1]">
        <Text
          T="catalog"
          className="text-primary10 leading-[120%]"
          weight="bold"
          size="t48"
        >
          gameCatalog
        </Text>
        <Text
          T="catalog"
          className="text-linkColor  text-center"
          weight="medium"
          style={{ width: isMobile ? "70%" : "35%" }}
          size="sm"
        >
          catalogText
        </Text>

        <Input
          value={search}
          onChange={handleSearchChange}
          iconLeft="searchNew"
          placeholder="Введите название товара"
          styleDiv={{ padding: "20px" }}
        />

        {catalogData.data && !catalogMutation.isPending ? (
          <>
            <div className="flex flex-wrap justify-center gap-6">
              {catalogData.data.length === 0 ? (
                <Text weight="semi" size="md" className="text-linkColor mt-5">
                  empty
                </Text>
              ) : (
                catalogData.data.map((item) => (
                  <Card
                    key={item.id}
                    {...item}
                    usd={usd}
                    imageWidth={isMobile ? "350" : "264"}
                  />
                ))
              )}
            </div>
            {catalogData.total > 1 && (
              <Pagination
                itemsPerPage={catalogData.total}
                current={catalogData.page}
                onPageChange={(e) => handlePageChange(e.selected + 1)}
              />
            )}
          </>
        ) : (
          <Loading noPage={true} />
        )}
      </div>
    </div>
  );
}

export default View;
