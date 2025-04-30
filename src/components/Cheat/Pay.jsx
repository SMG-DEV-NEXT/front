"use client";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import { useLocale, useTranslations } from "next-intl";
import CustomSelect from "../Select";
import Icon from "../Icons";
import Text from "../Text";
import Button from "../Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReselllerService from "@/services/Reseller";
import { useDebounce } from "@/hooks/useDebounce";
import promoApi from "@/services/Promo";
import CheckoutService from "@/services/Checkout";

//4FGMP!_LK33rugx
// https://4fa3-46-36-113-139.ngrok-free.app/success
// DFVTB362HSBG7RFTHDGACURSA4IG72Y2 ngrok
const PayModal = ({
  mobile,
  pay,
  getPrcent,
  user,
  locale,
  count,
  usd,
  plnaId,
  active,
}) => {
  const [prcent, setPrcent] = useState(pay.prcent);
  const t = useTranslations("Index");
  const [mail, setMail] = useState(user?.email || "");
  const [selectedOption, setSelectedOption] = useState("card");
  const [promo, setPromo] = useState("");
  const typeCheckout =
    active.days === 1 ? "day" : active.days === 7 ? "week" : "month";

  const debouncedMail = useDebounce(mail, 1000);
  const { data: reseller } = useQuery({
    queryFn: () => ReselllerService.check(debouncedMail),
    queryKey: ["check", debouncedMail],
    enabled: !!debouncedMail,
    refetchOnWindowFocus: false,
  });

  const promoQuery = useMutation({
    mutationFn: promoApi.check,
    mutationKey: ["promocheck"],
  });

  const checkoutFunction = useMutation({
    mutationFn: CheckoutService.checkout,
    mutationKey: ["checkout"],
    onSuccess: ({ data }) => {
      if (data) {
        window.location = `/${locale}/preview/${data}`;
      }
    },
  });

  const options = [
    {
      value: "card",
      label: t("card"),
      icon: <Icon name="wallet" folder="pay" />,
    },
    {
      value: "paypal",
      label: "PayPal",
      icon: <Icon name="paypal" folder="pay" />,
    },
    {
      value: "crypto",
      label: "Steam Skins",
      icon: <Icon name="steam" folder="pay" />,
    },
    {
      value: "steam",
      label: "Cripto",
      icon: <Icon name="crypto" folder="pay" />,
    },
  ];

  const handleCheckPrice = (pay, prcent) => {
    let prcentL = prcent;
    if (reseller?.data) {
      prcentL += reseller?.data.prcent;
    }
    if (promoQuery?.data?.data) {
      prcentL += promoQuery?.data?.data.percent;
    }
    if (prcentL === 100) return 0;
    return getPrcent(pay, prcentL).toFixed(2);
  };

  const handleCheckout = () => {
    console.log(plnaId);
    checkoutFunction.mutate({
      email: mail,
      itemId: plnaId,
      promo: promo,
      type: typeCheckout,
      count,
    });
  };

  const isShowingPrcentPrice = promo === true || pay.prcent > 0;
  if (mobile) {
    return (
      <div className="flex flex-col gap-4">
        <Input
          iconLeft="mail"
          value={mail}
          setValue={setMail}
          label={"email"}
          styleDiv={{
            backgroundColor: "#272C33",
          }}
          placeholder="example@gmail.com"
        />
        <CustomSelect
          options={options}
          label={"methodPay"}
          value={selectedOption}
          setValue={setSelectedOption}
        />
        <div className="flex gap-2 items-end">
          <Input
            setValue={setPromo}
            value={promo}
            label={"promo"}
            iconRight={{
              icon: promoQuery?.data?.data ? "tick" : "remove",
              folder: "pay",
            }}
            styleDiv={{
              backgroundColor: "#272C33",
            }}
          />
          <Button
            className=" h-[48px]"
            disabled={promoQuery.isPending}
            onClick={() => promoQuery.mutate(promo)}
          >
            check
          </Button>
        </div>
        <div className="flex gap-2 flex-col mt-2">
          <div className="w-full flex gap-2 py-3 px-4 bg-black items-center rounded-[12px]">
            <Text
              T="cheat"
              weight="medium"
              size="sm"
              className="text-linkColor whitespace-nowrap"
            >
              payPrice
            </Text>
            {isShowingPrcentPrice ? (
              <div className="flex items-start gap-1">
                <Text
                  T="none"
                  weight="semi"
                  size="lg"
                  className="text-primary10 whitespace-nowrap"
                >
                  {locale == "ru"
                    ? handleCheckPrice(pay.pay, pay.prcent) * count
                    : (
                        (handleCheckPrice(pay.pay, pay.prcent) / usd) *
                        count
                      ).toFixed(2)}{" "}
                  {locale === "ru" ? "₽" : "$"}
                </Text>
                <Text
                  T="none"
                  weight="semi"
                  size="SM"
                  className="text-linkColor line-through whitespace-nowrap "
                >
                  {pay.pay * count}
                </Text>
              </div>
            ) : (
              <Text
                T="none"
                weight="semi"
                size="lg"
                className="text-primary10 whitespace-nowrap"
              >
                {pay.pay * count}
              </Text>
            )}
          </div>
          <Button
            T="cheat"
            className="w-full"
            onClick={handleCheckout}
            disabled={checkoutFunction.isPending}
          >
            goToPay
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <Input
        iconLeft="mail"
        label={"email"}
        value={mail}
        setValue={setMail}
        styleDiv={{
          backgroundColor: "#272C33",
        }}
        placeholder="example@gmail.com"
      />
      <CustomSelect
        options={options}
        label={"methodPay"}
        value={selectedOption}
        setValue={setSelectedOption}
      />
      <div className="flex gap-2 items-end">
        <Input
          setValue={setPromo}
          value={promo}
          label={"promo"}
          iconRight={{
            icon: promoQuery?.data?.data ? "tick" : "remove",
            folder: "pay",
          }}
          styleDiv={{
            backgroundColor: "#272C33",
          }}
        />
        <Button
          className=" h-[48px]"
          disabled={promoQuery.isPending}
          onClick={() => promoQuery.mutate(promo)}
        >
          check
        </Button>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="w-full flex gap-2 py-3 px-4 bg-black items-center rounded-[12px]">
          <Text
            T="cheat"
            weight="medium"
            size="sm"
            className="text-linkColor whitespace-nowrap"
          >
            payPrice
          </Text>
          {isShowingPrcentPrice ? (
            <div className="flex items-start gap-1">
              <Text
                T="none"
                weight="semi"
                size="lg"
                className="text-primary10 whitespace-nowrap"
              >
                {locale == "ru"
                  ? handleCheckPrice(pay.pay, pay.prcent) * count
                  : (
                      (handleCheckPrice(pay.pay, pay.prcent) / usd) *
                      count
                    ).toFixed(2)}{" "}
                {locale === "ru" ? "₽" : "$"}
              </Text>
              <Text
                T="none"
                weight="semi"
                size="SM"
                className="text-linkColor line-through whitespace-nowrap"
              >
                {pay.pay * count}
              </Text>
            </div>
          ) : (
            <Text
              T="none"
              weight="semi"
              size="lg"
              className="text-primary10 whitespace-nowrap"
            >
              {pay.pay * count}
            </Text>
          )}
        </div>
        <Button
          T="cheat"
          className="w-full"
          onClick={handleCheckout}
          disabled={checkoutFunction.isPending}
        >
          goToPay
        </Button>
      </div>
    </div>
  );
};

export default PayModal;
