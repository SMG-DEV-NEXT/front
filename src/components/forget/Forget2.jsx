"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Text from "../Text";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";
import { toastError } from "../../utils/error";

function Forget2({ email, setStep, isMobile }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const mutation = useMutation({
    mutationFn: UserService.forgetStep3,
    mutationKey: ["forget3"],
    onSuccess: () => {
      setStep(4);
    },
  });

  const handleSubmit = () => {
    if (password !== password2) {
      toastError("Password and confirm password do not match.");
      return;
    }
    mutation.mutate({
      email,
      password,
    });
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
              label="password"
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="qwery123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="RewritePassword"
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="qwery123"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            T="login"
            className="w-full"
          >
            change
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[234px]">
      {/* <Image
        alt="Background"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        src="/images/loginBg.png"
        fill
        className="z-[0]"
      /> */}
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
              label="password"
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="qwery123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="RewritePassword"
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="qwery123"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            T="login"
            className="w-full"
          >
            change
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Forget2;
