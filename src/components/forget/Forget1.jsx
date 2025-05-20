"use client";
import React from "react";
import Input from "../Input";
import Button from "../Button";
import Text from "../Text";
import { toastError } from "../../utils/error";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";

function Forget1({ email, setEmail, setStep, isMobile, setIsTwoFactorForget }) {
  const mutate = useMutation({
    mutationFn: UserService.forgetStep1,
    mutationKey: ["forget"],
    onSuccess: ({ data }) => {
      setStep(2);
      console.log(data);
      setIsTwoFactorForget(data.isTwoFactor);
    },
  });
  const onChangeStep = () => {
    if (!email) {
      toastError("email_required");
      return;
    }
    mutate.mutate(email);
  };
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1] w-full min-w-[302px] max-w-[302px] items-center">
        <Text
          T="login"
          className="text-primary10 whitespace-nowrap leading-[120%]"
          size="2xl"
          weight="bold"
        >
          reset
        </Text>
        <div className="flex flex-col bg-input gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              label="email"
              type="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
          </div>
          <Button
            disabled={mutate.isPending}
            T="login"
            className="w-full h-[46px]"
            onClick={onChangeStep}
          >
            reset
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[234px]">
      <div className="flex flex-col gap-6 z-[1] w-[39%] max-w-[552px] items-center">
        <Text
          T="login"
          className="text-primary10 whitespace-nowrap leading-[120%]"
          size="t48"
          weight="bold"
        >
          reset
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              label="email"
              type="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
          </div>
          <Button
            disabled={mutate.isPending}
            T="login"
            className="w-full h-[46px]"
            onClick={onChangeStep}
          >
            reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Forget1;
