"use client";
import React, { useState } from "react";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import Modal from "@/components/Modal";
import DeleteModal from "../Modals/deleteModal";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import moment from "moment";
import Image from "next/image";

const ContactTable = ({ items = { data: [] }, isPending, deleteItem }) => {
  const router = useRouter();
  const locale = useLocale();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    title: "",
  });

  const editItem = (id) => {
    router.push(`/${locale}/admin/contacts/${id}`);
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
            <th className="w-[70%]">
              <div className="h-[56px] px-[18px] flex items-center justify-start">
                <Text
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  contact
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
                    <Image
                      alt="Logo"
                      src={e.icon}
                      width={48}
                      height={48}
                      sizes={49}
                    />
                    <div className="flex flex-col gap">
                      <Text
                        T="none"
                        weight="semi"
                        size="sm"
                        className="text-linkColor"
                      >
                        {e[`title${locale}`] || "-"}
                      </Text>
                      <Text
                        T="none"
                        weight="semi"
                        size="sm"
                        className="text-linkColor"
                      >
                        {e.url.slice(0, 50) + "..." || "-"}
                      </Text>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-start gap-[6px]">
                    {e.status === "active" ? (
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
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-end flex items-start gap-[6px]">
                    <AdminButton onClick={() => editItem(e.id)}>
                      addSettings
                    </AdminButton>
                    <div
                      className="flex items-center bg-[#DE595926] px-3 py-[6px] rounded-[8px]"
                      style={{ cursor: isPending ? "default" : "pointer" }}
                      onClick={() =>
                        onClickDeleteIcon(e[`title${locale}`], e.id)
                      }
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

export default ContactTable;
