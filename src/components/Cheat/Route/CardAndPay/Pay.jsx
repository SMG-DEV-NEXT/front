"use client";
import React, { useEffect, useRef, useState } from "react";
import Text from "../../../Text";
import Icon from "../../../Icons";
import Button from "../../../Button";
import CustomLink from "../../../CustomLink";
import Checkbox from "../../../checkbox";
import Modal from "../../../Modal";
import PayModal from "../../Pay";
import { useLocale } from "next-intl";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { toastError } from "@/utils/error";
import { useSelector } from "react-redux";

const PayCard = ({ mobile, cheat }) => {
  const plan = cheat.plan;
  const [count, setCount] = useState(1);
  const [confirm, setConfirm] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);
  const [usd, setUSD] = useState(null);
  const locale = useLocale();
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState();
  const { current: payments } = useRef([
    { days: 1, pay: plan.day.price, prcent: plan.day.prcent },
    { days: 7, pay: plan.week.price, prcent: plan.week.prcent },
    { days: 30, pay: plan.month.price, prcent: plan.month.prcent },
  ]);
  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_tfZjgKTbQ86JVJJm1yKs75nITIE3sDnyYLQCaFyc"
  );

  const handleOpenModal = () => {
    if (!active) {
      toastError(
        locale === "ru"
          ? "Пожалуйста, выберите вариант подписки"
          : "Please choose a subscription plan."
      );
      return;
    }
    if (!confirm) {
      toastError(
        locale === "ru"
          ? "Пожалуйста, ознакомьтесь с пользовательским соглашением"
          : "Please review the user agreement."
      );
      return;
    }
    setIsOpenCheckout(true);
  };

  useEffect(() => {
    if (freecurrencyapi && usd === null) {
      freecurrencyapi
        .latest({
          base_currency: "USD",
          currencies: "RUB",
        })
        .then((response) => {
          setUSD(response.data.RUB);
        });
    }
  }, [freecurrencyapi]);

  const getPricePrcent = (price, prcent) => {
    const pr = (price / 100) * prcent;
    return price - pr;
  };

  return (
    <div
      className="flex flex-col w-[30%]"
      style={{ width: mobile ? "100%" : "30%" }}
    >
      <div className="rounded-t-2xl bg-input p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {payments.map((e) => {
              const isActive = e.days === active?.days;
              return (
                <div
                  className={`p-[2px] relative rounded-xl ${
                    isActive &&
                    " bg-[linear-gradient(to_right,#8B6DCA_0%,transparent_41%,#8B6DCA_100%)]"
                  }`}
                  key={e.days}
                  onClick={() => setActive(e)}
                >
                  <div
                    className={`relative z-[1] overflow-hidden flex py-3 px-4 items-center rounded-xl justify-between cursor-pointer bg-${
                      isActive ? "input" : "black"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute right-[0] top-[0] z-[0]">
                        <Icon name="elipse" size={200} folder="cheat" />
                      </div>
                    )}
                    {isActive && (
                      <div className="absolute left-[0] bottom-[0%] z-[0]">
                        <Icon name="elipse2" size={200} folder="cheat" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 z-[1]">
                      {isActive ? (
                        <div className="w-5 h-5 relative">
                          <div className="w-4 h-4 left-[2px] top-[2px] absolute rounded-full border-2 border-[#8b6dc9]" />
                          <div className="w-2 h-2 left-[6px] top-[6px] absolute bg-[#8b6dc9] rounded-full" />
                        </div>
                      ) : (
                        <div className="border rounded-full border-linkColor w-4 h-4"></div>
                      )}
                      <div className="flex gap-1">
                        <Text
                          className="text-linkColor"
                          size="sm"
                          weight="medium"
                          T="none"
                        >
                          {e.days}
                        </Text>
                        <Text
                          className="text-linkColor"
                          size="sm"
                          weight="medium"
                          T="cheat"
                        >
                          day
                        </Text>
                      </div>
                    </div>
                    {e.prcent > 0 ? (
                      <div className="flex gap-1 items-center ">
                        <Text
                          className="text-linkColor line-through mb-[-10px]"
                          T="none"
                          weight="semi"
                          size="sm"
                        >
                          {locale == "ru" ? e.pay : (e.pay / usd).toFixed(2)}{" "}
                          {locale === "ru" ? "₽" : "$"}
                        </Text>
                        <Text
                          className="text-primary10"
                          T="none"
                          weight="semi"
                          size="lg"
                        >
                          {locale == "ru"
                            ? getPricePrcent(e.pay, e.prcent)
                            : (getPricePrcent(e.pay, e.prcent) / usd).toFixed(
                                2
                              )}{" "}
                          {locale === "ru" ? "₽" : "$"}
                        </Text>
                      </div>
                    ) : (
                      <Text
                        className="text-primary10"
                        T="none"
                        weight="semi"
                        size="lg"
                      >
                        {locale == "ru" ? e.pay : (e.pay / usd).toFixed(2)}{" "}
                        {locale === "ru" ? "₽" : "$"}
                      </Text>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="bg-primary80 py-3 px-4 rounded-[12px]">
              <Text
                T="cheat"
                className="text-primary10 cursor-pointer"
                weight="medium"
                size="sm"
              >
                otherVariants
              </Text>
            </div>
          </div>
          <div className="flex items-center justify-between py-3 px-4 bg-black rounded-[12px]">
            <Text
              T="cheat"
              weight="medium"
              size="sm"
              className="text-linkColor"
            >
              count
            </Text>
            <div className="flex items-center gap-3">
              <div
                className="w-[20px] h-[20px] rounded-[4px] bg-input cursor-pointer"
                onClick={() => setCount(count > 1 ? count - 1 : 1)}
              >
                <Icon name="arrowLeftP" />
              </div>
              <div className="flex gap-1">
                <Text
                  weight="semi"
                  size="lg"
                  className="text-primary10"
                  T="none"
                >
                  {count}
                </Text>
                <Text
                  weight="semi"
                  size="lg"
                  className="text-primary10"
                  T="cheat"
                >
                  pieces
                </Text>
              </div>
              <div
                className="w-[20px] h-[20px] rounded-[4px] bg-input cursor-pointer"
                onClick={() => setCount(count + 1)}
              >
                <Icon name="arrowRightP" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {active && (
              <>
                <div
                  className="flex w-full items-center gap-2  py-3 px-4 bg-black rounded-[12px]"
                  style={{ height: "46px" }}
                >
                  <Text
                    T="cheat"
                    weight="medium"
                    size="sm"
                    className="text-linkColor"
                  >
                    price
                  </Text>
                  <Text
                    weight="semi"
                    size="lg"
                    className="text-primary10 whitespace-nowrap"
                    T="none"
                  >
                    {locale === "ru"
                      ? `${active?.pay * count} ₽`
                      : `${((active?.pay * count) / usd).toFixed(2)} $`}
                  </Text>
                </div>
                <Button T="cheat" onClick={() => handleOpenModal()}>
                  buy
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Checkbox text="forget" checked={confirm} onCheck={setConfirm}>
              <div className="flex  w-full whitespace-nowrap flex-col">
                <Text
                  T="cheat"
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                >
                  rules
                </Text>
                <CustomLink url="/">
                  <Text
                    className="text-primary80 "
                    weight="medium"
                    size="sm"
                    T="cheat"
                  >
                    rules2
                  </Text>
                </CustomLink>
              </div>
            </Checkbox>
          </div>
        </div>
      </div>
      <Modal
        width={552}
        isOpen={isOpenInfoModal}
        customTop={120}
        onClose={() => setIsOpenInfoModal(false)}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center iconInfo gap-2">
            <Icon name="infoI" folder="cheat" />
            <Text className="text-primary80" weight="semi" size="sm" T="cheat">
              instructions
            </Text>
          </div>
          <Text T="none" weight="medium" size="sm" className="text-primary10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate
          </Text>
        </div>
      </Modal>
      <Modal
        width={552}
        isOpen={isOpenCheckout}
        customTop={120}
        onClose={() => setIsOpenCheckout(false)}
      >
        <div className="flex flex-col gap-6">
          <PayModal
            mobile={mobile}
            pay={active}
            getPrcent={getPricePrcent}
            user={user}
            locale={locale}
            usd={usd}
          />
        </div>
      </Modal>
      <div
        onClick={() => setIsOpenInfoModal(true)}
        className="rounded-b-2xl px-4 py-3 flex items-center cursor-pointer gap-2 bg-primary80"
      >
        <Icon name="info" folder="cheat" />
        <Text className="text-primary10" T="cheat" weight="semi" size="sm">
          instructions
        </Text>
      </div>
    </div>
  );
};

export default PayCard;
