"use client";
import React, { useState } from "react";
import Text from "../../Text";
import Input from "../../Input";
import Button from "../../Button";
import CustomSelect from "../../Select";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icons";
import ReselllerService from "@/services/Reseller";
import { HugeGlow, LeftIcon, RightIcon } from "../../Main/i";
import { toast } from "react-toastify";
import { useMobile } from "@/hooks/useMobile";
import { toastError } from "@/utils/error";
/* auth */

function View() {
  const isMobile = useMobile();
  const t = useTranslations("Index");

  const [inputs, setInputs] = useState({});

  const mutation = useMutation({
    mutationFn: ReselllerService.request,
    mutationKey: ["resellerRequest"],
    onSuccess: () => {
      toast.success(t("successRequest"));
      setInputs({
        resourse: "",
        count: "",
        payMethod: null,
        email: "",
        product: "",
      });
    },
    onError: (err) => {},
  });

  const onSave = () => {
    const { payMethod, ...values } = inputs;
    const isHaveInvalidField = Object.keys(values).forEach((element) => {
      return !!values[element]?.length;
    });
    if (isHaveInvalidField || !payMethod?.label) {
      toastError(t("fieldsError"));
      return;
    }
    mutation.mutate({
      ...values,
      payMethod: payMethod?.label,
    });
  };

  const handleChangeInput = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

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
      value: "steam",
      label: "Steam Skins",
      icon: <Icon name="steam" folder="pay" />,
    },
    {
      value: "crypto",
      label: "Crypto",
      icon: <Icon name="crypto" folder="pay" />,
    },
  ];

  if (isMobile) {
    return (
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden pt-[64px] pb-[164px]">
        <div className="flex flex-col gap-8 z-[1] w-full px-2  items-center">
          <div className="flex flex-col gap-6">
            <Text
              T="reseller"
              className="text-primary10 text-center leading-[120%]"
              size="t48"
              weight="bold"
            >
              title
            </Text>
            <Text
              T="reseller"
              className="text-linkColor text-center leading-[120%]"
              size="sm"
              weight="normal"
            >
              text
            </Text>
          </div>
          <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full relative">
            <div className="flex flex-col gap-4 w-full z-[3] relative">
              <Input
                label="resurse"
                value={inputs.resourse}
                onChange={(e) => handleChangeInput("resourse", e.target.value)}
                type="text"
                styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
                iconLeft="resourse"
                placeholder={t("resuresePl")}
              />
              <Input
                label="email"
                value={inputs.email}
                onChange={(e) => handleChangeInput("email", e.target.value)}
                type="mail"
                styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
                iconLeft="mail"
                placeholder={t("emailPL")}
              />
              <Input
                label="audotoria"
                value={inputs.count}
                onChange={(e) => handleChangeInput("count", e.target.value)}
                type="text"
                styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
                iconLeft="group"
                placeholder={t("audotoriaPL")}
              />
              <Input
                label="product"
                value={inputs.product}
                onChange={(e) => handleChangeInput("product", e.target.value)}
                type="text"
                styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
                iconLeft="product"
              />
              <CustomSelect
                options={options}
                label={"methodPay"}
                inputStyles={{ height: "46px" }}
                value={inputs.payMethod}
                setValue={(e) => handleChangeInput("payMethod", e)}
              />
            </div>
            <Button
              disabled={mutation.isPending}
              className="w-full h-[46px]"
              onClick={() => {
                onSave();
              }}
            >
              send
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden h-full w-full flex items-center justify-center pt-[64px] pb-[164px]">
      <div className="absolute top-[2] z-[0] left-[0] h-full">
        <LeftIcon />
      </div>
      <div className="absolute top-[0%] z-[2] right-[0%] h-full">
        <RightIcon />
      </div>
      <div className="absolute  overflow-hidden top-[-20%] left-[15%] ">
        <HugeGlow />
      </div>
      <div className="flex flex-col gap-8 z-[1] w-[45%] max-w-[570px] items-center">
        <div className="flex flex-col gap-6">
          <Text
            T="reseller"
            className="text-primary10 text-center leading-[120%]"
            size="t48"
            weight="bold"
          >
            title
          </Text>
          <Text
            T="reseller"
            className="text-linkColor text-center leading-[120%]"
            size="sm"
            weight="normal"
          >
            text
          </Text>
        </div>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full relative">
          <div className="absolute right-[-200px] top-[-150px] z-[-1]">
            <Icon name="moneyLogo" size={237} className="z-[1]" />
          </div>
          <div className="flex flex-col gap-4 w-full z-[3] relative">
            <Input
              label="resurse"
              value={inputs.resourse}
              onChange={(e) => handleChangeInput("resourse", e.target.value)}
              type="text"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="resourse"
              placeholder={t("resuresePl")}
            />
            <Input
              label="email"
              value={inputs.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              type="mail"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="mail"
              placeholder={t("emailPL")}
            />
            <Input
              label="audotoria"
              value={inputs.count}
              onChange={(e) => handleChangeInput("count", e.target.value)}
              type="text"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="group"
              placeholder={t("audotoriaPL")}
            />
            <Input
              label="product"
              value={inputs.product}
              onChange={(e) => handleChangeInput("product", e.target.value)}
              type="text"
              placeholder="SKY EFT"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="product"
            />
            <CustomSelect
              options={options}
              label={"methodPay"}
              placeholder={t("selectPlaceholder")}
              inputStyles={{ height: "46px" }}
              value={inputs.payMethod}
              setValue={(e) => handleChangeInput("payMethod", e)}
            />
          </div>
          <Button
            disabled={mutation.isPending}
            className="w-full h-[46px]"
            onClick={() => {
              onSave();
            }}
          >
            send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default View;
