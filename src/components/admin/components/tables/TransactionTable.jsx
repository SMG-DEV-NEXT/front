"use client";
import React, { useState } from "react";
import Text from "@/components/Text";
import Icon from "@/components/Icons";
import AdminButton from "../button";
import { useLocale, useTranslations } from "next-intl";
import getLanguage from "@/utils/get-language";
import { useRouter } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import Modal from "@/components/Modal";

const TransactionTable = ({ items = [] }) => {
  const [isReversed, setIsReversed] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    open: false,
    codes: [],
  });
  const router = useRouter();
  const locale = useLocale();
  const data = isReversed ? [...items].reverse() : items;

  const handleOpenModal = (codes) => {
    setModalInfo({
      open: true,
      codes,
    });
  };

  const handleCloseModal = () => {
    setModalInfo({
      open: false,
      codes: [],
    });
  };
  const t = useTranslations("preview");

  return (
    <div className="flex  overflow-hidden  bg-input rounded-[16px] text-white mt-6 ">
      <Modal isOpen={modalInfo.open} onClose={handleCloseModal}>
        <div
          className={`flex  rounded-2xl bg-input mt-4  p-4 border-linkColor border flex-col gap-2 w-${"full"}`}
        >
          <Text
            T="preview"
            weight="semi"
            size="lg"
            className="text-linkColor text-center"
          >
            codesAdmin
          </Text>
          {modalInfo.codes.map((e, i) => {
            return (
              <div className="flex gap-2 w-full justify-between" key={e}>
                <Text
                  T="none"
                  weight="semi"
                  size="md"
                  className="text-primary10"
                >
                  {t("code")}
                  {i + 1}:
                </Text>
                <Text
                  T="none"
                  weight="semi"
                  size="md"
                  className="text-linkColor"
                >
                  {e}
                </Text>
              </div>
            );
          })}
        </div>
      </Modal>
      <table className="bg-input ">
        <thead className="bg-[#1E2026]">
          <tr className="w-full">
            {/* <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center">
                <Checkbox
                  isChecked={selectedIds.length === items.length}
                  setIsChecked={handleSelectAll}
                />
              </div>
            </th> */}
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
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
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  weight="semi"
                  size="sm"
                  className="text-linkColor text-center"
                >
                  cheat
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
                  get
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text weight="semi" size="sm" className="text-linkColor">
                  promo
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text weight="semi" size="sm" className="text-linkColor">
                  referral
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text weight="semi" size="sm" className="text-linkColor">
                  reseller
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="preview"
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
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="preview"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  price
                </Text>
              </div>
            </th>
            <th>
              <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                <Text
                  T="preview"
                  weight="semi"
                  size="sm"
                  className="text-linkColor"
                >
                  pricePrcent
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
                  ip
                </Text>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr
                key={e.id}
                className="w-full cursor-pointer transition duration-300 hover:bg-gray-300 hover:bg-opacity-30 "
                onClick={() => {
                  handleOpenModal(e.codes);
                }}
              >
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.reseller || e.email}
                    </Text>
                  </div>
                </th>
                {/* <td>
                  <div className="h-[56px] px-[18px] flex items-center justify-center">
                    <Checkbox
                      isChecked={selectedIds.includes(e.id)}
                      setIsChecked={() => onSelectItem(e.id)}
                    />
                  </div>
                </td> *p
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-start flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.reseller || e.email}
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

                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.cheat[`title${locale === "/ru" ? "Ru" : "En"}`]}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="admin"
                      weight="semi"
                      size="sm"
                      style={{
                        backgroundColor: e.isVisited
                          ? "#22C55E29"
                          : "#DE595929",
                        color: e.isVisited ? "#22C55E" : "#DE5959",
                      }}
                      className=" py-[2px] px-[6px] rounded-[6px]"
                    >
                      {e.isVisited ? "yes" : "no"}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="admin"
                      weight="semi"
                      size="sm"
                      style={{
                        backgroundColor: e.promoCode
                          ? "#22C55E29"
                          : "#DE595929",
                        color: e.promoCode ? "#22C55E" : "#DE5959",
                      }}
                      className=" py-[2px] px-[6px] rounded-[6px]"
                    >
                      {e.promoCode ? "yes" : "no"}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="admin"
                      weight="semi"
                      size="sm"
                      style={{
                        backgroundColor: e.referralId
                          ? "#22C55E29"
                          : "#DE595929",
                        color: e.referralId ? "#22C55E" : "#DE5959",
                      }}
                      className=" py-[2px] px-[6px] rounded-[6px]"
                    >
                      {e.referralId ? "yes" : "no"}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="admin"
                      weight="semi"
                      size="sm"
                      style={{
                        backgroundColor: e.reseller ? "#22C55E29" : "#DE595929",
                        color: e.reseller ? "#22C55E" : "#DE5959",
                      }}
                      className=" py-[2px] px-[6px] rounded-[6px]"
                    >
                      {e.reseller ? "yes" : "no"}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {moment(e.createdAt).format("D.MM.YYYY")}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.price}
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.checkoutedPrice} /{" "}
                      {100 - (e.checkoutedPrice / (e.price / 100)).toFixed(2)}%
                    </Text>
                  </div>
                </th>
                <th>
                  <div className="h-[56px] px-[18px] flex items-center justify-center flex items-center gap-[6px]">
                    <Text
                      T="none"
                      weight="semi"
                      size="sm"
                      className="text-linkColor"
                    >
                      {e.ip}
                    </Text>
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

export default TransactionTable;
