"use client";
import React, { useEffect, useState } from "react";
import AdminButton from "../components/button";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import CatalogTable from "../components/tables/CatalogTable";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminCatalog } from "@/services/Admin";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";
import DeleteModal from "../components/Modals/deleteModal";

const CatalogView = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpenMultipleDelete, setIsOpenMultipleDelete] = useState(false);
  const [items, setItems] = useState([]);
  const { data, isPending } = useQuery({
    queryFn: AdminCatalog.getAllCatalogs,
    queryKey: ["get-all"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const deleteMutate = useMutation({
    mutationFn: AdminCatalog.deleteCatalog,
    mutationKey: ["delete-catalog"],
    onSuccess: (e) => {
      const { message } = e.data;
      setItems(items.filter((a) => a.id !== message));
      toast.success("Deleted successfuly!");
    },
  });

  const deleteMultipleMutate = useMutation({
    mutationFn: AdminCatalog.deleteCatalogs,
    mutationKey: ["delete-catalogs"],
    onSuccess: (e) => {
      setItems(items.filter((a) => !selectedIds.includes(a.id)));
      setSelectedIds([]);
      toast.success(e.data.message);
    },
  });

  const deleteCatalog = (id) => {
    deleteMutate.mutate(id);
  };

  useEffect(() => {
    if (!data) return;
    setItems(data ? data.data : []);
  }, [data]);

  const getSelectedCatalogNames = () => {
    const titles = selectedIds.map((e) => items.find((i) => i.id === e)?.title);
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
            text={getSelectedCatalogNames()}
            onClose={() => setIsOpenMultipleDelete(false)}
            onDelete={deleteItems}
          />
        </Modal>
        <AdminPageHeader
          route={"catalog"}
          buttonText="add"
          isHaveMultipleDeleteButton={true}
          onDelete={() => {
            setIsOpenMultipleDelete(!!selectedIds.length > 0);
          }}
          buttonOnClick={() => router.push(`/${locale}/admin/catalog/create`)}
        />
        {isPending ? (
          <Loading />
        ) : (
          <CatalogTable
            items={items}
            deleteCatalog={deleteCatalog}
            isPending={deleteMutate.isPending}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        )}
      </div>
    </AdminContainer>
  );
};

export default CatalogView;
