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

export const ActiveLightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={245}
      height={46}
      viewBox="0 0 245 46"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <g filter="url(#glow1234)">
        <circle
          cx={96.32}
          cy={122.32}
          r={74.101}
          fill="#8B6DCA"
          transform="rotate(5.036 96.32 122.32)"
          fillOpacity="0.6"
        />
      </g>
      <defs>
        <filter
          id="glow1234"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur stdDeviation="60" />
        </filter>
      </defs>
    </svg>
  );
};

const PayCard = ({ mobile, cheat, ref }) => {
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
    {
      days: 1,
      pay: plan.day?.price,
      prcent: plan.day?.prcent,
      count: cheat.dayCount || 0,
    },
    {
      days: 7,
      pay: plan.week?.price,
      prcent: plan.week?.prcent,
      count: cheat.weekCount || 0,
    },
    {
      days: 30,
      pay: plan.month?.price,
      prcent: plan.month?.prcent,
      count: cheat.monthCount || 0,
    },
  ]);

  useEffect(() => {
    if (active) return;
    if (payments[0].count > 0) {
      setActive(payments[0]);
    } else if (payments[1].count > 0) {
      setActive(payments[1]);
    } else if (payments[2].count > 0) {
      setActive(payments[2]);
    }
  }, [plan]);
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
    const pr = prcent > 0 ? (price / 100) * prcent : 0;
    if (cheat.refUser) {
      const refUserPrice = (price / 100) * cheat.refUser.prcentToPrice;
      return price - (pr + refUserPrice) > 0 ? price - (pr + refUserPrice) : 0;
    }
    return price - pr;
  };

  const openRules = () => {
    window.open(`/${locale}/agreement`, "_blank");
    setConfirm(true);
  };

  return (
    <div className="flex flex-col min-w-[100%]">
      <div className="rounded-t-2xl bg-input p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {payments.map((e) => {
              if (e.count === 0) return;
              const isActive = e.days === active?.days;
              return (
                <div
                  className={`p-[2px] relative rounded-xl overflow-hidden
    transition-all duration-700
  `}
                  key={e.days}
                  onClick={() => {
                    setActive(e);
                    setCount(1);
                  }}
                >
                  {/* Gradient background layer (fades in/out) */}
                  <div
                    className={`absolute inset-0 rounded-xl
      transition-opacity duration-700
      bg-[linear-gradient(to_right,#8B6DCA_0%,transparent_41%,#8B6DCA_100%)]
      ${isActive ? "opacity-100" : "opacity-0"}
    `}
                  />

                  {/* Inner content */}
                  <div
                    className={`relative z-[1] overflow-hidden transition-colors duration-700
      flex py-3 px-4 items-center rounded-xl justify-between cursor-pointer
      ${isActive ? "bg-input" : "bg-black"}
    `}
                  >
                    {/* Animated icons */}
                    <div
                      className={`absolute right-0 top-0 z-[-1]
        transition-opacity duration-700
        ${isActive ? "opacity-100" : "opacity-0"}
      `}
                    >
                      <Icon name="elipse" size={200} folder="cheat" />
                    </div>

                    <div
                      className={`absolute left-0 bottom-[-10%] z-[-1]
        transition-opacity duration-700
        ${isActive ? "opacity-100" : "opacity-0"}
      `}
                    >
                      <ActiveLightIcon />
                    </div>

                    {/* Radio button */}
                    <div className="flex items-center gap-2 z-[1]">
                      {isActive ? (
                        <div className="w-5 h-5 relative">
                          <div className="w-4 h-4 left-[2px] top-[2px] absolute rounded-full border-2 border-[#8b6dc9]" />
                          <div className="w-2 h-2 absolute inset-0 m-auto bg-[#8b6dc9] rounded-full" />
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

                    {/* Price section — same logic */}
                    {e.prcent > 0 || cheat.refUser?.prcentToPrice > 0 ? (
                      <div className="flex gap-1 items-center">
                        <Text
                          className="text-linkColor line-through mb-[-10px] transition-colors duration-500"
                          T="none"
                          weight="semi"
                          size="sm"
                        >
                          {locale == "ru" ? e.pay : (e.pay / usd).toFixed(2)}{" "}
                          {locale === "ru" ? "₽" : "$"}
                        </Text>
                        <Text
                          className="text-primary10 leading-[120%] transition-colors duration-500"
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
                        className="text-primary10 leading-[120%] transition-colors duration-500"
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
            {/* <div className="bg-primary80 py-3 px-4 rounded-[12px]">
              <Text
                T="cheat"
                className="text-primary10 cursor-pointer"
                weight="medium"
                size="sm"
              >
                otherVariants
              </Text>
            </div> */}
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
                onClick={() => {
                  if (active && count < active.count) {
                    setCount(count + 1);
                  }
                }}
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
                      ? `${getPricePrcent(active.pay, active.prcent) * count} ₽`
                      : `${(
                          (getPricePrcent(active.pay, active.prcent) * count) /
                          usd
                        ).toFixed(2)} $`}
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
                <Text
                  className="text-primary80 "
                  weight="medium"
                  size="sm"
                  T="cheat"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openRules();
                  }}
                >
                  rules2
                </Text>
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
        <div
          className="flex flex-col  gap-6"
          style={{ width: mobile ? "302px" : "504px" }}
        >
          <div className="flex items-center iconInfo gap-2">
            <Icon name="infoI" folder="cheat" />

            <Text className="text-primary80" weight="semi" size="sm" T="cheat">
              instructions
            </Text>
          </div>
          <Text T="none" weight="medium" size="sm" className="text-primary10">
            <div
              dangerouslySetInnerHTML={{
                __html: cheat[
                  `instruction${locale === "ru" ? "Ru" : "En"}`
                ].replace(/\n/g, "<br/>"),
              }}
            ></div>
          </Text>
        </div>
      </Modal>
      <Modal
        width={552}
        isOpen={isOpenCheckout}
        customTop={120}
        onClose={() => setIsOpenCheckout(false)}
      >
        <PayModal
          mobile={mobile}
          ref={ref}
          refData={cheat.refUser}
          plnaId={cheat.id}
          active={active}
          count={count}
          pay={active}
          getPrcent={getPricePrcent}
          user={user}
          locale={locale}
          usd={usd}
        />
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
