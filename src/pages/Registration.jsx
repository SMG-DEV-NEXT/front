"use client";
import Image from "next/image";
import React, { useState } from "react";
import Text from "../components/Text";
import Input from "../components/Input";
import Checkbox from "../components/checkbox";
import Button from "../components/Button";
import CustomLink from "../components/CustomLink";
import UserService from "../services/User";
import { useMutation } from "@tanstack/react-query";
import { toastError } from "../utils/error";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../utils/token";
/* auth */

function ViewRegistration({ isMobile, goToLogin, onClose }) {
  const [isCheckedForget, setIsCheckedForget] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: UserService.registration,
    onSuccess: ({ data }) => {
      const { user, token } = data;
      setAccessToken(token);
      if (isMobile) {
        onClose();
      }
      dispatch(setAuth(user));
      if (!isMobile) {
        // window.location = `/${locale}`;
        router.push(`/${locale}`);
      }
    },
  });

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSumbit = () => {
    if (!isCheckedForget) {
      toastError(
        "You must read and agree to the terms and conditions of the service."
      );
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      toastError("Password and confirm password do not match.");
      return;
    }
    mutation.mutate(inputs);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1]  w-full max-w-[552px] items-center">
        <Text className="text-primary10" size="2xl" weight="bold">
          register
        </Text>
        <div className="flex flex-col bg-input  gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              value={inputs.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              label="email"
              type="mail"
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
            <Input
              label="nick"
              value={inputs.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              type="text"
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="profile"
              placeholder="DuckStep3"
            />
            <Input
              label="password"
              iconLeft="lock"
              value={inputs.password}
              onChange={(e) => handleChangeInput("password", e.target.value)}
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="qwery123"
            />
            <Input
              label="RewritePassword"
              value={inputs.confirmPassword}
              onChange={(e) =>
                handleChangeInput("confirmPassword", e.target.value)
              }
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="qwery123"
            />
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              text="forget"
              checked={isCheckedForget}
              onCheck={setIsCheckedForget}
            >
              <div className="flex gap-1 w-full whitespace-nowrap">
                <Text className="text-linkColor" weight="medium" size="sm">
                  C
                </Text>
                <CustomLink url="/">
                  <Text
                    className="text-linkColor underline"
                    weight="medium"
                    size="sm"
                  >
                    rules
                  </Text>
                </CustomLink>
                <Text className="text-linkColor" weight="medium" size="sm">
                  review
                </Text>
              </div>
            </Checkbox>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full"
              disabled={mutation.isPending}
              onClick={handleSumbit}
            >
              register
            </Button>
            <Button
              T="login"
              onClick={goToLogin}
              className="w-full"
              variant="secondary"
            >
              login
            </Button>
          </div>
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
        fill
        alt="Image"
        className="z-[0]"
      />
      <div className="flex flex-col gap-6 z-[1]  w-[39%] max-w-[552px] items-center">
        <Text className="text-primary10" size="t48" weight="bold">
          register
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              value={inputs.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              label="email"
              type="mail"
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
            <Input
              label="nick"
              value={inputs.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              type="text"
              styleDiv={{ backgroundColor: "#272c33" }}
              iconLeft="profile"
              placeholder="DuckStep3"
            />
            <Input
              label="password"
              iconLeft="lock"
              value={inputs.password}
              onChange={(e) => handleChangeInput("password", e.target.value)}
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="qwery123"
            />
            <Input
              label="RewritePassword"
              value={inputs.confirmPassword}
              onChange={(e) =>
                handleChangeInput("confirmPassword", e.target.value)
              }
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33" }}
              type="password"
              iconRight={true}
              placeholder="qwery123"
            />
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              text="forget"
              checked={isCheckedForget}
              onCheck={setIsCheckedForget}
            >
              <div className="flex gap-1 w-full whitespace-nowrap">
                <Text className="text-linkColor" weight="medium" size="sm">
                  C
                </Text>
                <CustomLink url="/">
                  <Text
                    className="text-linkColor underline"
                    weight="medium"
                    size="sm"
                  >
                    rules
                  </Text>
                </CustomLink>
                <Text className="text-linkColor" weight="medium" size="sm">
                  review
                </Text>
              </div>
            </Checkbox>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full"
              disabled={mutation.isPending}
              onClick={handleSumbit}
            >
              register
            </Button>
            <CustomLink url="/login" className="w-full">
              <Button T="login" className="w-full" variant="secondary">
                login
              </Button>
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRegistration;
