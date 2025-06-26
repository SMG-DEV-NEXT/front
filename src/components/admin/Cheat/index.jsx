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
import CheatTable from "../components/tables/CheatTable";

const CheatView = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpenMultipleDelete, setIsOpenMultipleDelete] = useState(false);
  const [items, setItems] = useState([]);
  const { data, isPending } = useQuery({
    queryFn: CheatService.getCheats,
    queryKey: ["get-all-cheats"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const deleteMutate = useMutation({
    mutationFn: CheatService.deleteCheat,
    mutationKey: ["delete-catalog"],
    onSuccess: (e) => {
      const { message } = e.data;
      setItems(items.filter((a) => a.id !== message));
      toast.success("Deleted successfuly!");
    },
  });

  const deleteMultipleMutate = useMutation({
    mutationFn: CheatService.deleteCheats,
    mutationKey: ["delete-catalogs"],
    onSuccess: (e) => {
      if (!e) return;
      setItems(items.filter((a) => !selectedIds.includes(a.id)));
      setSelectedIds([]);
      toast.success(e.data.message);
    },
  });

  const deleteCheat = (id) => {
    deleteMutate.mutate(id);
  };

  useEffect(() => {
    if (!data) return;
    setItems(data ? data.data : []);
  }, [data]);

  const getSelectedCheatNames = () => {
    const titles = selectedIds.map(
      (e) =>
        items.find((i) => i.id === e)[`title${locale === "ru" ? "Ru" : "En"}`]
    );
    return titles.join(",");
  };

  const deleteItems = () => {
    setIsOpenMultipleDelete(false);
    deleteMultipleMutate.mutate(selectedIds);
  };

  const locale = useLocale();
  return (
    <AdminContainer>
      <div className="flex flex-col w-full">
        <Modal
          isOpen={isOpenMultipleDelete}
          customTop={240}
          onClose={() => setIsOpenMultipleDelete(false)}
        >
          <DeleteModal
            text={getSelectedCheatNames()}
            onClose={() => setIsOpenMultipleDelete(false)}
            onDelete={deleteItems}
          />
        </Modal>
        <AdminPageHeader
          route={"cheat"}
          buttonText="add"
          isHaveMultipleDeleteButton={true}
          onDelete={() => setIsOpenMultipleDelete(!!selectedIds.length > 0)}
          buttonOnClick={() => router.push(`/${locale}/admin/cheats/create`)}
        />
        {isPending ? (
          <Loading />
        ) : (
          <CheatTable
            items={items}
            deleteCheat={deleteCheat}
            isPending={deleteMutate.isPending}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        )}
      </div>
    </AdminContainer>
  );
};

export default CheatView;
