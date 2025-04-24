"use client";
import React, { useState, useEffect } from "react";
import Text from "../Text";
import Input from "../Input";
import CustomSelect from "../Select";
import { useTranslations } from "next-intl";
import { useMobile } from "@/hooks/useMobile";

function StatsHeader({ search, setSearch, selectedFilter, setSelectedFilter }) {
  const t = useTranslations("stats");
  const [mounted, setMounted] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const isMobile = useMobile();

  useEffect(() => {
    setMounted(true); // This runs only on the client
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);

    return () => clearTimeout(handler);
  }, [debouncedSearch]);

  if (!mounted) return null;
  const options = [
    { value: "new", label: t("new") },
    { value: "old", label: t("old") },
  ];

  const handleSetFilterType = (e) => {
    const type = e.value;
    setSelectedFilter(e);
  };

  if (isMobile) {
    return (
      <div className="flex w-full justify-between items-center gap-6 flex-col">
        <Text T="stats" weight="bold" size="t48" className="text-primary10">
          title
        </Text>
        <div className="flex gap-2 flex-col w-full">
          <Input
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            iconLeft="searchNew"
            placeholder={t("search")}
            styleDiv={{ padding: "20px", width: "100%" }}
          />
          <CustomSelect
            inputStyles={{
              backgroundColor: "#181A1F",
              padding: "9px",
              minWidth: "min-content",
              whiteSpace: "nowrap",
              width: "100%",
            }}
            placeholderColor="#7B8293"
            menuStyles={{
              backgroundColor: "#181A1F",
              width: "100%",
            }}
            options={options}
            value={selectedFilter}
            setValue={handleSetFilterType}
            placeholder={t("filterDate")}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-between items-center">
      <Text T="stats" weight="bold" size="t48" className="text-primary10">
        title
      </Text>
      <div className="flex gap-2">
        <Input
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          iconLeft="searchNew"
          placeholder={t("search")}
          styleDiv={{ padding: "20px", width: "300px" }}
        />
        <CustomSelect
          inputStyles={{
            backgroundColor: "#181A1F",
            padding: "9px",
            minWidth: "min-content",
            whiteSpace: "nowrap",
            width: "196px",
          }}
          placeholderColor="#7B8293"
          menuStyles={{
            backgroundColor: "#181A1F",
          }}
          options={options}
          value={selectedFilter}
          setValue={handleSetFilterType}
          placeholder={t("filterDate")}
        />
      </div>
    </div>
  );
}

export default StatsHeader;
