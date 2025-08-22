"use client";
import React, { useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReselllerService from "@/services/Reseller";
import Pagination from "@/components/pagination";
import Text from "@/components/Text";
import Loading from "@/app/loading";
import ResellerTable from "../components/tables/ResellerTable";
import { toast } from "react-toastify";
const limits = [30, 50, 100];

const ResellersAdminView = () => {
  const locale = useLocale();
  const router = useRouter();
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(0);

  const { data, isPending, refetch } = useQuery({
    queryFn: () =>
      ReselllerService.getAllResellers({ skip: page, take: limit }),
    queryKey: ["getAll", limit, page],
    refetchOnWindowFocus: false,
  });

  const deleteReseller = useMutation({
    mutationFn: ReselllerService.deleteReseller,
    mutationKey: ["delete"],
    onSuccess: (e) => {
      if (e.status === 200) {
        toast.success("Deleted");
        refetch();
      }
    },
  });

  return (
    <AdminContainer>
      <AdminPageHeader
        route="resellers"
        buttonText="add"
        buttonOnClick={() => router.push(`/${locale}/admin/resellers/create`)}
      />
      <div className="flex flex-col mt-6 gap-6">
        {isPending ? (
          <Loading noPage={true} />
        ) : (
          <ResellerTable
            deleteItem={deleteReseller.mutate}
            isPending={deleteReseller.isPending}
            items={data?.data}
          />
        )}
        <div className="flex items-center justify-between w-full mt-6">
          <div className="flex items-center gap-[14px]">
            <Text T="admin" weight="semi" size="sm" className="text-linkColor">
              show
            </Text>
            {limits.map((e) => {
              if (e === limit) {
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
                  onClick={() => setLimit(e)}
                  className="py-[6px] text-primary10 dark:text-linkColor dark:border-linkColor cursor-pointer border-[#919EAB3D] px-3 border  text-sm font-medium  flex items-center justify-center rounded-[8px]"
                >
                  {e}
                </div>
              );
            })}
          </div>

          {data && (
            <Pagination
              itemsPerPage={Math.ceil(data.data.total / parseInt(limit))}
              onPageChange={(e) => setPage(e.selected + 1)}
            />
          )}
        </div>
      </div>
    </AdminContainer>
  );
};

export default ResellersAdminView;
