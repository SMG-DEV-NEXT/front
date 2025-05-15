import React, { useState } from "react";
import Text from "../Text";
import Icon from "../Icons";
import { useTranslations } from "next-intl";
import Input from "../Input";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserService from "../../services/User";
import { setAuth } from "../../redux/authSlice";
import Image from "next/image";

const FA = () => {
  const t = useTranslations("Index");
  const user = useSelector((state) => state.auth.user);
  const [qrCode, setQrCode] = useState("");
  const dispatch = useDispatch();
  const { data, loading } = useQuery({
    queryFn: UserService.get2FA,
    queryKey: ["getQR"],
    enabled: user.isTwoFactorEnabled,
  });
  const mutation = useMutation({
    mutationFn: UserService.genearteFA,
    mutationKey: ["generateQR"],
    onSuccess: ({ data }) => {
      const { qrCode, secret } = data;
      setQrCode(qrCode);
      dispatch(
        setAuth({ ...user, isTwoFactorEnabled: true, twoFactorSecret: secret })
      );
    },
  });
  if (!user.isTwoFactorEnabled) {
    return (
      <div className="flex flex-col bg-input p-6 rounded-[16px] gap-6">
        <div className="flex gap-2 items-start">
          <div className="flex bg-black min-w-[20px] h-[20px] justify-center items-center rounded-[4px]">
            <Text T="none" size="sm" weight="medium" className="text-linkColor">
              1
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <Text
              className="text-primary10 leading-[140%]"
              weight="bold"
              size="xl"
              T="account"
            >
              FA1title
            </Text>
            <Text
              className="text-linkColor"
              weight="medium"
              size="sm"
              T="account"
            >
              FA1sub
            </Text>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex bg-black min-w-[20px] h-[20px] justify-center items-center rounded-[4px]">
            <Text T="none" size="sm" weight="medium" className="text-linkColor">
              2
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <Text
              className="text-primary10 leading-[140%]"
              weight="bold"
              size="xl"
              T="account"
            >
              FA2title
            </Text>
            <Text
              className="text-linkColor"
              weight="medium"
              size="sm"
              T="account"
            >
              FA2sub
            </Text>
          </div>
        </div>
        <Button
          T="account"
          className="h-[46px]"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          generateFA
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-input p-6 rounded-[16px] gap-6">
      <div className="flex gap-2 items-start">
        <div className="flex bg-black min-w-[20px] h-[20px] justify-center items-center rounded-[4px]">
          <Text T="none" size="sm" weight="medium" className="text-linkColor">
            1
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text
            className="text-primary10 leading-[140%]"
            weight="bold"
            size="xl"
            T="account"
          >
            FA1title
          </Text>
          <Text
            className="text-linkColor"
            weight="medium"
            size="sm"
            T="account"
          >
            FA1sub
          </Text>
        </div>
      </div>
      <div className="flex gap-2 items-start">
        <div className="flex bg-black min-w-[20px] h-[20px] justify-center items-center rounded-[4px]">
          <Text T="none" size="sm" weight="medium" className="text-linkColor">
            2
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text
            className="text-primary10 leading-[140%]"
            weight="bold"
            size="xl"
            T="account"
          >
            FA2title
          </Text>
          <Text
            className="text-linkColor"
            weight="medium"
            size="sm"
            T="account"
          >
            FA2sub
          </Text>
        </div>
      </div>
      <div className="pt-[32px] flex items-center justify-center">
        {/* <Icon name="qr" folder="account" size={196} /> */}
        {data?.data && (
          <Image
            src={data.data.qrCode}
            alt="QR Code"
            width={200}
            height={200}
            unoptimized
          />
        )}
      </div>
      <Input
        label={"facode"}
        placeholder={t("enterFacode")}
        isCopyButton={true}
        value={user.twoFactorSecret}
        styleDiv={{ backgroundColor: "#272c33" }}
      />
      {/* <Input
        label={"googleCode"}
        placeholder={t("enterGoogleCode")}
        styleDiv={{ backgroundColor: "#272c33" }}
      />
      <Button T="account">save</Button> */}
    </div>
  );
};

export default FA;
