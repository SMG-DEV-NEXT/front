"use client";
import React, { useState } from "react";
import Checkbox from "../checkbox";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import Modal from "@/components/Modal";
import DeleteModal from "../Modals/deleteModal";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const CatalogTable = ({
  items,
  selectedIds,
  setSelectedIds,
  deleteCatalog,
  isPending,
}) => {
  const [isReversed, setIsReversed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    titleCatalog: "",
    isMultiple: false,
  });
  const onSelectItem = (e) => {
    if (selectedIds.includes(e)) {
      setSelectedIds(selectedIds.filter((a) => a !== e));
      return;
    }
    setSelectedIds([...selectedIds, e]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(items.map((e) => e.id));
  };

  const onClickDeleteIcon = (title, id) => {
    setDeleteInformation({
      isOpenModal: true,
      titleCatalog: title,
      id,
    });
  };

  const onCloseDeleteModal = () => {
    setDeleteInformation({
      isMultiple: false,
      isOpenModal: false,
      titleCatalog: "",
    });
  };

  const editItem = (id) => {
    router.push(`/${locale}/admin/catalog/${id}`);
  };

  const data = isReversed ? [...items].reverse() : items;
  return (
    <div className="flex w-full bg-input rounded-[16px] text-white mt-6 overflow-hidden">
      {deleteInformation.isOpenModal && (
        <Modal
          onClose={onCloseDeleteModal}
          customTop={150}
          isOpen={deleteInformation.isOpenModal}
        >
          <DeleteModal
            onDelete={() => {
              deleteCatalog(deleteInformation.id);
              onCloseDeleteModal();
            }}
            onClose={onCloseDeleteModal}
            text={deleteInformation.titleCatalog}
          />
        </Modal>
      )}
      <table className="w-full">
        <thead className="bg-[#1E2026]">
          <tr className="w-full">
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Checkbox
                  isChecked={selectedIds.length === items.length}
                  setIsChecked={handleSelectAll}
                />
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  position
                </Text>
                <div
                  className="flex"
                  style={{
                    transform: `rotate(${isReversed ? 180 : 0}deg)`,
                    transition: "0.3s",
                  }}
                  onClick={() => setIsReversed(!isReversed)}
                >
                  <Icon
                    name="arrowF"
                    folder="admin"
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                </div>
              </div>
            </th>
            {/* <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  logo
                </Text>
              </div>
            </th> */}
            <th className="w-[40%]">
              <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  name
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  status
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-end flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  actions
                </Text>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={e.id} className="w-full">
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center">
                    <Checkbox
                      isChecked={selectedIds.includes(e.id)}
                      setIsChecked={() => onSelectItem(e.id)}
                    />
                  </div>
                </td>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.position}
                    </Text>
                  </div>
                </th>
                {/* <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  logo
                </Text>
              </div>
            </th> */}
                <th className="w-[40%]">
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.title}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    {e.type === "published" ? (
                      <Icon
                        name="publish"
                        folder="admin"
                        className="w-[24px] h-6"
                      />
                    ) : (
                      <div className="relative">
                        <Icon
                          name="unpublish"
                          folder="admin"
                          className="w-[24px] h-6"
                        />
                        <div className="absolute top-1/2 left-1/2 rotate-45 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[31px] bg-[#DE5959] "></div>
                      </div>
                    )}
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-end flex items-center gap-[16px]">
                    <AdminButton onClick={() => editItem(e.id)}>
                      addSettings
                    </AdminButton>
                    <div
                      className="flex items-center bg-[#DE595926] px-3 py-[6px] rounded-[8px] cursor-pointer"
                      onClick={() => onClickDeleteIcon(e.title, e.id)}
                    >
                      <Icon name="trash" folder="admin" />
                    </div>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CatalogTable;
