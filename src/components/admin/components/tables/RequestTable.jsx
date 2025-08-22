"use client";
import React, { useEffect, useState } from "react";
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
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import ReselllerService from "@/services/Reseller";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

const RequestTable = ({ items = { data: [] }, isPending, deleteItem }) => {
  const [list, setList] = useState([items.data]);
  const [isReversed, setIsReversed] = useState(false);
  const theme = useTheme();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    title: "",
  });

  useEffect(() => {
    setList(items?.data || []);
  }, [items]);

  const [modalInfo, setModalInfo] = useState({
    open: false,
    not: "",
  });
  const updateMutation = useMutation({
    mutationFn: ReselllerService.updateRequest,
    mutationKey: ["update-request"],
    onSuccess: (e) => {
      if (e.data) {
        toast.success("Updated.");
        setList(
          list.map((e) => {
            if (e.id === modalInfo.id) {
              return {
                ...modalInfo,
              };
            }
            return e;
          })
        );
        setModalInfo({ open: false });
      }
    },
  });

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
  const handleCloseModal = () => {
    if (updateMutation.isPending) {
      return;
    }
    setModalInfo({
      open: false,
    });
  };

  const handleSave = () => {
    updateMutation.mutate({
      id: modalInfo.id,
      not: modalInfo.not,
    });
  };

  const data = isReversed ? [...list].reverse() : list;
  return (
    <div className="flex w-full bg-input dark-box rounded-[16px] text-white mt-6 overflow-hidden">
      <Modal isOpen={modalInfo.open} onClose={handleCloseModal}>
        <div
          className={`flex  rounded-2xl bg-input dark-box border-none min-w-[400px]   flex-col gap-2 w-${"full"}`}
        >
          <Text
            weight="semi"
            T="admin"
            size="lg"
            className="text-linkColor text-start"
          >
            not
          </Text>
          <Input
            value={modalInfo.not}
            styleDiv={{
              backgroundColor: theme !== "dark" ? "white" : "#272c33",
            }}
            setValue={(s) =>
              setModalInfo({
                ...modalInfo,
                not: s,
              })
            }
          />
          <div className="flex w-full gap-2 mt-4">
            <Button
              onClick={handleCloseModal}
              disabled={updateMutation.isPending}
              variant="secondary"
              className="w-full"
              T="admin"
            >
              cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="w-full"
              T="admin"
            >
              save
            </Button>
          </div>
        </div>
      </Modal>
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
        <thead className="bg-[#1E2026] dark-head">
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
                  T="admin"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  resurse
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
                  product
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-end">
                <Text weight="semi" size="sm" className="text-linkColor">
                  methodPay
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
                  auditory
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
                  not
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr
                onClick={() => {
                  setModalInfo({
                    open: true,
                    ...item,
                  });
                }}
                key={crypto.randomUUID()}
                className="w-full cursor-pointer dark:border-b dark:border-input last:border-none"
              >
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-start gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {moment(item.createdAt).format("DD.MM.YYYY")}
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
                      {item.resourse || "-"}
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
                      {item.email}
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
                      {item.product}
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
                      {item.payMethod}
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
                      {item.count}
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
                      {item.not}
                    </Text>
                  </div>
                </td>
                <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-end flex items-start gap-[6px]">
                    <div
                      className="flex items-center bg-[#DE595926] px-3 py-[6px] rounded-[8px]"
                      style={{ cursor: isPending ? "default" : "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onClickDeleteIcon(item.resourse, item.id);
                      }}
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

export default RequestTable;
