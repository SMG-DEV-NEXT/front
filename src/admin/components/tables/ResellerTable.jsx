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
import getLanguage from "@/utils/get-language";
import { Star } from "@/components/Cheat/Comment";
import moment from "moment";

const ResellerTable = ({ items = { data: [] }, isPending, deleteItem }) => {
  console.log(items);
  const [isReversed, setIsReversed] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    title: "",
  });

  const editItem = (id) => {
    router.push(`/${locale}/admin/resellers/${id}`);
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
  const data = isReversed ? [...items.data].reverse() : items.data;
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
                  T="account"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  date
                </Text>
                <div
                  className="flex w-[18px] h-[18px]"
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
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  weight="semi"
                  T="admin"
                  size="sm"
                  className="text-linkColor"
                >
                  userName
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-start">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  mail
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  prcent
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
                      {moment(e.createdAt).format("DD.MM.YYYY")}
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
                      {e.name || "-"}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.email}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="py-3 px-[18px] flex items-center break-all justify-center flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.prcent}%
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
                      onClick={() => onClickDeleteIcon(e.name, e.id)}
                    >
                      <Icon name="trash" folder="admin" />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
          {/* {data.map((e, i) => {
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
                <th>
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
            </th>
                <th className="w-[40%]">
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e[`title${locale === "ru" ? "Ru" : "En"}`]}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    {e.status === "published" ? (
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
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    {CheatType && (
                      <Text
                        T="none"
                        weight="semi"
                        size="sm"
                        style={{
                          color: CheatType.color,
                          background: CheatType.background,
                        }}
                        className={`rounded-full py-1 px-2 text-${CheatType.color} bg-${CheatType.background}`}
                      >
                        {CheatType.label}
                      </Text>
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
                      onClick={() =>
                        onClickDeleteIcon(
                          e[`title${locale === "ru" ? "Ru" : "En"}`],
                          e.id
                        )
                      }
                    >
                      <Icon name="trash" folder="admin" />
                    </div>
                  </div>
                </th>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default ResellerTable;
