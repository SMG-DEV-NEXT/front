"use client";
import Image from "next/image";
import React from "react";
import Input from "../Input";
import Button from "../Button";
import Text from "../Text";
import { toastError } from "../../utils/error";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";

function Forget1({ email, setEmail, setStep, isMobile }) {
  const mutate = useMutation({
    mutationFn: UserService.forgetStep1,
    mutationKey: ["forget"],
    onSuccess: () => {
      setStep(2);
    },
  });
  const onChangeStep = () => {
    if (!email) {
      toastError("Email field is required.");
      return;
    }
    mutate.mutate(email);
  };
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1] w-full min-w-[350px] max-w-[552px] items-center">
        <Text
          T="login"
          className="text-primary10 whitespace-nowrap"
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
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
          </div>
          <Button
            disabled={mutate.isPending}
            T="login"
            className="w-full"
            onClick={onChangeStep}
          >
            reset
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[64px] pb-[234px]">
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        alt="Background"
        fill
        className="z-[0]"
      />
      <div className="flex flex-col gap-6 z-[1] w-[39%] max-w-[552px] items-center">
        <Text
          T="login"
          className="text-primary10 whitespace-nowrap"
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
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
          </div>
          <Button
            disabled={mutate.isPending}
            T="login"
            className="w-full"
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
