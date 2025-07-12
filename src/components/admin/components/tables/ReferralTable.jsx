"use client";
import React, { useState } from "react";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import Modal from "@/components/Modal";
import DeleteModal from "../Modals/deleteModal";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const ReferralTable = ({ items = { data: [] }, isPending, deleteItem }) => {
  const router = useRouter();
  const locale = useLocale();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    title: "",
  });

  const editItem = (id) => {
    router.push(`/${locale}/admin/referral/${id}`);
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
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  referralKod
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  weight="semi"
                  T="preview"
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
                  referralOwner
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
                  referralViewsCount
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
                  transactionsCount
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
                      {e.prcentToPrice}%
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
                      {e.owner}
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
                      {e.viewsCount}
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
                      {e.transactions.length}
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

export default ReferralTable;
