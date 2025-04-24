"use client";
import Image from "next/image";
import React, { useState } from "react";
import Text from "../Text";
import Input from "../Input";
import Checkbox from "../checkbox";
import Link from "next/link";
import Button from "../Button";
import TwoFactorInput from "../TwoFactorInput";
import CustomLink from "../CustomLink";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";
import { notFound, redirect, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { setAccessToken } from "../../utils/token";
import { useLocale } from "next-intl";
/* auth */

function View({ isMobile, goToRegistration, goToForgetPassword, onClose }) {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState();
  const [codeInput, setCodeInput] = useState(new Array(6).fill(""));

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale();

  const mutation = useMutation({
    mutationFn: UserService.login,
    onSuccess: ({ data }) => {
      const { user, token, secret } = data;
      if (secret) {
        setStep(2);
        return;
      }
      if (inputs.rememberMe) {
        setAccessToken(token);
      }
      if (isMobile) {
        onClose();
      }
      setCode(secret);
      dispatch(setAuth(user));
      if (!isMobile) {
        window.location = `/${locale}`;
      }
    },
    onError: (err) => {
      setCodeInput(new Array(6).fill(""));
    },
  });

  const handleChangeInput = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handlePassCode = (code) => {
    mutation.mutate({
      ...inputs,
      code,
    });
  };
  if (isMobile) {
    if (step === 2) {
      return (
        <div className="view relative h-full flex items-center justify-center  w-[350px]">
          <div className="flex flex-col bg-input gap-6 rounded-2xl w-full">
            <div className="flex flex-col gap-4 w-full">
              <TwoFactorInput
                length={6}
                code={codeInput}
                setCode={setCodeInput}
                onComplete={(code) => handlePassCode(code)}
              />
            </div>

            <Button T="login" className="w-full">
              login
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="relative h-full  flex items-center justify-center w-[350px]">
        <div className="flex flex-col gap-6 z-[1] w-full max-w-[552px] items-center">
          <Text T="login" className="text-primary10" size="2xl" weight="bold">
            ourCabinet
          </Text>
          <div className="flex flex-col bg-input  gap-6 rounded-2xl w-full">
            <div className="flex flex-col gap-4 w-full">
              <Input
                label="email"
                value={inputs.email}
                onChange={(e) => handleChangeInput("email", e.target.value)}
                type="mail"
                styleDiv={{ backgroundColor: "#272c33" }}
                iconLeft="mail"
                placeholder="example@gmail.com"
              />
              <Input
                value={inputs.password}
                label="password"
                iconLeft="lock"
                onChange={(e) => handleChangeInput("password", e.target.value)}
                styleDiv={{ backgroundColor: "#272c33" }}
                type="password"
                iconRight={true}
                placeholder="asdasdasd"
              />
            </div>
            <div className="flex items-center justify-between">
              <Checkbox
                text="remember"
                checked={inputs.rememberMe}
                onCheck={(e) => handleChangeInput("rememberMe", e)}
              />
              <Text
                className="text-linkColor underline cursor-pointer"
                weight="medium"
                onClick={goToForgetPassword}
                size="sm"
              >
                forget
              </Text>
            </div>
            <div className="flex gap-2 flex-col">
              <Button
                disabled={mutation.isPending}
                T="login"
                className="w-full"
                onClick={() => mutation.mutate(inputs)}
              >
                login
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                onClick={goToRegistration}
              >
                register
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[344px]">
        {/* <Image
          src="/images/loginBg.png"
          style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
          quality={100}
          priority
          fill
          alt="Image"
          className="z-[0]"
        /> */}
        <div className="flex flex-col gap-6 z-[1]">
          <Text T="login" className="text-primary10" size="t48" weight="bold">
            ourCabinet
          </Text>
          <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl">
            <div className="flex flex-col gap-4 w-full">
              <TwoFactorInput
                length={6}
                code={codeInput}
                setCode={setCodeInput}
                onComplete={(code) => handlePassCode(code)}
              />
            </div>

            <Button T="login" className="w-full">
              login
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full w-full flex items-center justify-center pt-[64px] pb-[234px]">
      {/* <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      /> */}
      <div className="flex flex-col gap-6 z-[1] w-[45%] max-w-[570px] items-center">
        <Text
          T="login"
          className="text-primary10 text-center"
          size="t48"
          weight="bold"
        >
          ourCabinet
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              label="email"
              value={inputs.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              type="mail"
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
            <Input
              value={inputs.password}
              label="password"
              iconLeft="lock"
              onChange={(e) => handleChangeInput("password", e.target.value)}
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="asdasdasd"
            />
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              text="remember"
              checked={inputs.rememberMe}
              onCheck={(e) => handleChangeInput("rememberMe", e)}
            />
            <CustomLink url="/forget">
              <Text
                className="text-linkColor underline"
                weight="medium"
                size="sm"
              >
                forget
              </Text>
            </CustomLink>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={mutation.isPending}
              T="login"
              className="w-full"
              onClick={() => mutation.mutate(inputs)}
            >
              login
            </Button>
            <CustomLink url="/registration" className="w-full">
              <Button className="w-full" variant="secondary">
                register
              </Button>
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
