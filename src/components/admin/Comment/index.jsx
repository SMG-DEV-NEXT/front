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

const limits = [30, 50, 100];
const CommentPage = () => {
  const [filterInputs, setFilterInputs] = useState({
    cheatTitle: "",
    startDate: undefined,
    endDate: undefined,
    sorting: "desc",
    mail: "",
    page: 1,
    limit: 30,
  });
  const debouncedFilters = useDebounce(filterInputs, 500);

  const { data, isPending } = useQuery({
    queryFn: () => CheatsService.getAllCommentsAdmin(filterInputs),
    queryKey: ["key", debouncedFilters],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {}, [filterInputs]);

  const handleChangeFilter = (name, value) => {
    setFilterInputs({
      ...filterInputs,
      [name]: value,
    });
  };

  return (
    <AdminContainer>
      <AdminPageHeader route={"comment"} />
      <div className="flex flex-col">
        <FilterComments inputs={filterInputs} setInputs={handleChangeFilter} />
      </div>
      {data ? <CommentTable items={data.data} /> : <Loading noPage={true} />}
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
                className="py-[6px] text-primary10 cursor-pointer border-[#919EAB3D] px-3 border  text-sm font-medium  flex items-center justify-center rounded-[8px]"
              >
                {e}
              </div>
            );
          })}
        </div>

        {data && (
          <Pagination
            itemsPerPage={data.data.pageCount}
            onPageChange={(e) => handleChangeFilter("page", e.selected + 1)}
          />
        )}
      </div>
    </AdminContainer>
  );
};

export default CommentPage;
