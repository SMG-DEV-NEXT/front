"use client";
import React, { useEffect, useState } from "react";
import AdminButton from "../components/button";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import CatalogTable from "../components/tables/CatalogTable";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminCatalog, CheatService } from "@/services/Admin";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";
import DeleteModal from "../components/Modals/deleteModal";
import PlanTable from "../components/tables/PlanTable";
import Text from "@/components/Text";
import CustomSelect from "@/components/Select";

const DateFilterTabs = [
  { label: "all2", value: "all" },
  { label: "day", value: "day" },
  { label: "week", value: "weel" },
  { label: "month", value: "month" },
];

const PlansView = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpenMultipleDelete, setIsOpenMultipleDelete] = useState(false);
  const [selectedTime, setSelectedTime] = useState(DateFilterTabs[0]);
  const [selectedCatalog, setSelectedCatalog] = useState({});
  const [plans, setPlans] = useState(null);
  const [items, setItems] = useState([]);

  const { data, isPending } = useQuery({
    queryFn: AdminCatalog.getAllCatalogs,
    queryKey: ["get-all"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const GetMutation = useMutation({
    mutationFn: CheatService.getPlans,
    mutationKey: ["get-filter"],
    onSuccess: ({ data }) => {
      setPlans(data);
    },
  });

  useEffect(() => {
    if (!data) return;
    setItems(data ? data.data : []);
  }, [data]);

  useEffect(() => {
    if (!selectedCatalog.value) return;
    GetMutation.mutate(selectedCatalog.value);
  }, [selectedCatalog]);

  const locale = useLocale();
  return (
    <AdminContainer>
      <div className="flex flex-col w-full">
        <AdminPageHeader
          route={"plan"}
          buttonText="add"
          buttonOnClick={() => router.push(`/${locale}/admin/cheats/create`)}
        />
        {!isPending && (
          <div className="flex my-6 w-full justify-between items-center">
            <div className="flex items-center gap-3">
              <Text T="admin" weight="semi" className="text-linkColor">
                game
              </Text>
              <CustomSelect
                options={items.map((e) => ({ label: e.title, value: e.id }))}
                value={selectedCatalog}
                menuStyles={{ width: "200px" }}
                inputStyles={{ paddingTop: "0px", height: "20px" }}
                setValue={setSelectedCatalog}
              />
            </div>
            <div className="flex gap-[14px] items-center">
              <Text T="admin" weight="semi" className="text-linkColor">
                timePlan
              </Text>
              <div className="flex gap-2">
                {DateFilterTabs.map((e) => {
                  return (
                    <div
                      className="py-[6px] px-3 border cursor-pointer border-[#919EAB3D] rounded-[8px]"
                      onClick={() => setSelectedTime(e)}
                      key={e.value}
                      style={{
                        background:
                          selectedTime.value === e.value
                            ? "#8B6DCA"
                            : "inherit",
                      }}
                    >
                      <Text
                        T="admin"
                        weight="semi"
                        className={
                          e.value === selectedTime.value
                            ? "text-[#141A21]"
                            : "text-linkColor"
                        }
                      >
                        {e.label}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {isPending ? (
          <Loading />
        ) : plans ? (
          <PlanTable items={plans} time={selectedTime.value} />
        ) : (
          <Text
            T="none"
            weight="semi"
            className="text-linkColor w-full text-center mt-3"
          >
            Please select game
          </Text>
        )}
      </div>
    </AdminContainer>
  );
};

export default PlansView;
