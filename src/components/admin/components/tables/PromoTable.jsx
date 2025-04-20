"use client";
import React, { useState } from "react";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import Modal from "@/components/Modal";
import DeleteModal from "../Modals/deleteModal";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PromoTable = ({ items = { data: [] }, isPending, deleteItem }) => {
  const router = useRouter();
  const locale = useLocale();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    title: "",
  });

  const editItem = (id) => {
    router.push(`/${locale}/admin/promo/${id}`);
  };

  const onClickDeleteIcon = (title, id) => {
    if (isPending) return;
    setDeleteInformation({
      isOpenModal: true,
      title: title,
      id,
    });
  };

  const onCloseDeleteModal = () => {
    setDeleteInformation({
      isOpenModal: false,
      title: "",
    });
  };
  const data = items.data;
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
              deleteItem(deleteInformation.id);
              onCloseDeleteModal();
            }}
            onClose={onCloseDeleteModal}
            text={deleteInformation.title}
          />
        </Modal>
      )}
      <table className="w-full">
        <thead className="bg-[#1E2026]">
          <tr className="w-full">
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-start">
                <Text weight="semi" size="sm" className="text-linkColor">
                  promo
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  weight="semi"
                  T="admin"
                  size="sm"
                  className="text-linkColor"
                >
                  prcent
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  weight="semi"
                  T="admin"
                  size="sm"
                  className="text-linkColor"
                >
                  status
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  weight="semi"
                  T="admin"
                  size="sm"
                  className="text-linkColor"
                >
                  maxActivate
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  weight="semi"
                  T="admin"
                  size="sm"
                  className="text-linkColor"
                >
                  activate
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-end">
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
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={crypto.randomUUID()} className="w-full">
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.code}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.percent}%
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-start gap-[6px]">
                    {e.status === "active" ? (
                      <div className="flex bg-[#22C55E29] py-[2px] px-[6px] rounded-[6px]">
                        <Text
                          T="admin"
                          weight="bold"
                          className="text-[#22C55E] font-[12px]"
                        >
                          active
                        </Text>
                      </div>
                    ) : (
                      <div className="flex bg-[#DE595929] py-[2px] px-[6px] rounded-[6px]">
                        <Text
                          T="admin"
                          weight="bold"
                          className="text-[#DE5959] font-[12px]"
                        >
                          inactive
                        </Text>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.maxActivate}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.count}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-end flex items-start gap-[6px]">
                    <AdminButton onClick={() => editItem(e.id)}>
                      addSettings
                    </AdminButton>
                    <div
                      className="flex items-center bg-[#DE595926] px-3 py-[6px] rounded-[8px]"
                      style={{ cursor: isPending ? "default" : "pointer" }}
                      onClick={() => onClickDeleteIcon(e.code, e.id)}
                    >
                      <Icon name="trash" folder="admin" />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PromoTable;
