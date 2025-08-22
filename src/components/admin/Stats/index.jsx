"use client";
import React, { useEffect, useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import FilterComments from "../components/Comments/FIlter";
import Text from "@/components/Text";
import Pagination from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import { useDebounce } from "@/hooks/useDebounce";
import Loading from "@/app/loading";
import CommentTable from "../components/tables/CommentTable";
import StatsService from "@/services/Stats";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import StatTable from "../components/tables/StatTable";
import { AdminCatalog } from "@/services/Admin";
import CustomSelect from "@/components/Select";

const limits = [30, 50, 100];
const StatsPage = () => {
  const [filterInputs, setFilterInputs] = useState({
    sorting: "desc",
    page: 1,
    limit: 30,
  });
  const locale = useLocale();
  const router = useRouter();
  const { data: catalogs } = useQuery({
    queryFn: AdminCatalog.getAllCatalogs,
    queryKey: ["get-all"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  const debouncedFilters = useDebounce(filterInputs, 500);

  const { data, isPending } = useQuery({
    queryFn: () => StatsService.getAllStatsAdmin(filterInputs),
    queryKey: ["key", debouncedFilters],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {}, [filterInputs]);

  const handleChangeFilter = (name, value) => {
    if (name === "catalog") {
      setFilterInputs({
        ...filterInputs,
        [name]: value,
        catalogId: value.value,
      });
      return;
    }
    setFilterInputs({
      ...filterInputs,
      [name]: value,
    });
  };

  return (
    <AdminContainer>
      <AdminPageHeader
        route={"stats"}
        buttonText={"add"}
        buttonOnClick={() => router.push(`/${locale}/admin/stats/create`)}
      />
      <div className="flex flex-col">
        <div className="flex items-center w-full gap-[50px]">
          <div className="w-full">
            <FilterComments
              isHaveMailFilter={false}
              v="search"
              inputs={filterInputs}
              setInputs={handleChangeFilter}
            />
          </div>
          <div>
            <CustomSelect
              options={catalogs?.data.map((e) => ({
                label: e.title,
                value: e.id,
              }))}
              value={filterInputs.catalog}
              placeholder="Select Category"
              inputStyles={{
                paddingTop: "0px",
                marginTop: "20px",
                height: "20px",
                background: "tertiary",
                width: "200px",
                whiteSpace: "no-wrap",
              }}
              setValue={(e) => handleChangeFilter("catalog", e)}
            />
          </div>
        </div>
      </div>
      {data ? <StatTable items={data.data.data} /> : <Loading noPage={true} />}
      <div className="flex items-center justify-between w-full mt-6">
        <div className="flex items-center gap-[14px]">
          <Text T="admin" weight="semi" size="sm" className="text-linkColor">
            show
          </Text>
          {limits.map((e) => {
            if (e === filterInputs.limit) {
              return (
                <div
                  key={e}
                  className="py-[6px] bg-primary80 px-3  text-sm font-medium text-primary10 flex items-center justify-center rounded-[8px]"
                >
                  {e}
                </div>
              );
            }
            return (
              <div
                key={e}
                onClick={() => handleChangeFilter("limit", e)}
                className="py-[6px] text-primary10 dark:text-linkColor dark:border-linkColor cursor-pointer border-[#919EAB3D] px-3 border  text-sm font-medium  flex items-center justify-center rounded-[8px]"
              >
                {e}
              </div>
            );
          })}
        </div>

        {data && (
          <Pagination
            itemsPerPage={data.data.totalPages}
            onPageChange={(e) => handleChangeFilter("page", e.selected + 1)}
          />
        )}
      </div>
    </AdminContainer>
  );
};

export default StatsPage;
