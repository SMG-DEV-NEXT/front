"use client";
import React, { useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import CheckoutService from "@/services/Checkout";
import Pagination from "@/components/pagination";
import Text from "@/components/Text";
import TransactionTable from "@/components/admin/components/tables/TransactionTable";
import Loading from "@/app/loading";
import CustomSelect from "@/components/Select";
import { CheatService } from "@/services/Admin";
import getLanguage from "@/utils/get-language";
import Input from "@/components/Input";
import Checkbox from "@/components/checkbox";

const limits = [30, 50, 100];

const TransactionView = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    cheatId: "",
    startDate: "",
    endDate: "",
    search: "",
    page: 1,
    limit: 30,
    reseller: false,
    referral: false,
    promo: false,
  });
  const { data: cheats, isPending: loading } = useQuery({
    queryFn: CheatService.getPlansTransactions,
    queryKey: ["get-all-dataa"],
    staleTime: 0,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
  const { data, isPending } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const query = new URLSearchParams();

      if (filters.cheatId) query.append("cheatId", filters.cheatId);
      if (filters.startDate) query.append("startDate", filters.startDate);
      if (filters.endDate) query.append("endDate", filters.endDate);
      if (filters.page) query.append("page", filters.page.toString());
      if (filters.limit) query.append("limit", filters.limit.toString());
      if (filters.search) query.append("search", filters.search);
      if (filters.reseller) query.append("reseller", true);
      if (filters.referral) query.append("referral", true);
      if (filters.promo) query.append("promo", true);
      return CheckoutService.getList(query.toString());
    },
    cacheTime: 0,
    staleTime: 0, // optional: keeps data fresh for 5 min
  });
  // const GetMutation = useMutation({
  //   mutationFn: CheatService.getPlans,
  //   mutationKey: ["get-filter"],
  //   onSuccess: ({ data }) => {
  //     setPlans(data);
  //   },
  // });

  const handleChangeFilter = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const locale = useLocale();
  const selectedCheat = cheats
    ? cheats?.data?.find((e) => e?.cheat?.id === filters?.cheatId)
    : null;
  return (
    <AdminContainer>
      <div className="flex flex-col w-full">
        <AdminPageHeader route={"transaction"} />
        <div className="flex mt-4 w-full gap-5 justify-between">
          {!loading && cheats?.data && (
            <div className=" w-2/4">
              <CustomSelect
                options={cheats.data.map((e) => ({
                  label: e.cheat?.[`title${getLanguage(locale)}`],
                  value: e.cheat?.id,
                }))}
                value={
                  selectedCheat
                    ? {
                        label:
                          selectedCheat.cheat[`title${getLanguage(locale)}`],
                        value: selectedCheat.cheat.id,
                      }
                    : null
                }
                inputStyles={{ paddingTop: "0px", height: "20px" }}
                setValue={(e) => handleChangeFilter("cheatId", e.value)}
              />
            </div>
          )}
          <Input
            value={filters.search}
            styleDiv={{ height: "38px" }}
            setValue={(e) => handleChangeFilter("search", e)}
            placeholder="IP Adress or User Name/Email"
          />
          <div className="flex items-center gap-[14px]">
            <Text
              T="admin"
              weight="medium"
              size="md"
              className="text-primary10 whitespace-nowrap"
            >
              fromDate
            </Text>
            <Input
              value={filters.startDate}
              styleDiv={{
                backgroundColor: "inherit",
                height: "34px",
                border: "1px solid #7B8293",
              }}
              name="startDate"
              type="date"
              setValue={(e) => handleChangeFilter("startDate", e)}
            />
            <Text
              T="admin"
              weight="medium"
              size="md"
              className="text-primary10"
            >
              toDate
            </Text>
            <Input
              value={filters.endDate}
              styleDiv={{
                backgroundColor: "inherit",
                height: "34px",
                border: "1px solid #7B8293",
              }}
              name="endDate"
              type="date"
              setValue={(e) => handleChangeFilter("endDate", e)}
            />
          </div>
        </div>
        <div className="flex mt-4 gap-6">
          <Checkbox
            text={"resellers"}
            checked={filters.reseller}
            onCheck={(e) => handleChangeFilter("reseller", e)}
          />
          <Checkbox
            text={"referral"}
            checked={filters.referral}
            onCheck={(e) => handleChangeFilter("referral", e)}
          />
          <Checkbox
            text={"promo"}
            checked={filters.promo}
            onCheck={(e) => handleChangeFilter("promo", e)}
          />
        </div>
        {isPending ? (
          <Loading noPage={false} />
        ) : (
          <TransactionTable items={data.data.data} />
        )}
        <div className="flex items-center justify-between w-full mt-6">
          <div className="flex items-center gap-[14px]">
            <Text T="admin" weight="semi" size="sm" className="text-linkColor">
              show
            </Text>
            {limits.map((e) => {
              if (e === filters.limit) {
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
              itemsPerPage={data.data.totalPages}
              onPageChange={(e) => handleChangeFilter("page", e.selected + 1)}
            />
          )}
        </div>
      </div>
    </AdminContainer>
  );
};

export default TransactionView;
