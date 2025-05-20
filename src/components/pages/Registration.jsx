"use client";
import React, { useState } from "react";
import Text from "../Text";
import Input from "../Input";
import Checkbox from "../checkbox";
import Button from "../Button";
import CustomLink from "../CustomLink";
import UserService from "../../services/User";
import { useMutation } from "@tanstack/react-query";
import { toastError } from "../../utils/error";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { useRouter } from "next/navigation";
import { setAccessToken } from "../../utils/token";
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
      toastError("terms_required");
      return;
    }

    if (inputs.password !== inputs.confirmPassword) {
      toastError("passwords_do_not_match");
      return;
    }

    mutation.mutate(inputs);
  };
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1] w-[302px]  w-full max-w-[552px] items-center">
        <Text
          className="text-primary10 leading-[120%]"
          size="2xl"
          weight="bold"
        >
          register
        </Text>
        <div className="flex flex-col bg-input  gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              value={inputs.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              label="email"
              type="mail"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
            <Input
              label="nick"
              value={inputs.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              type="text"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="profile"
              placeholder="DuckStep3"
            />
            <Input
              label="password"
              iconLeft="lock"
              value={inputs.password}
              onChange={(e) => handleChangeInput("password", e.target.value)}
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
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
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
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
              <div className=" gap-1 w-full whitespace-nowrap">
                <div className="flex gap-1">
                  <Text className="text-linkColor" weight="medium" size="sm">
                    C
                  </Text>
                  {/* <CustomLink url="/"> */}
                  <Text
                    className="text-linkColor underline"
                    weight="medium"
                    size="sm"
                  >
                    rules
                  </Text>
                </div>
                {/* </CustomLink> */}
                <Text className="text-linkColor" weight="medium" size="sm">
                  review
                </Text>
              </div>
            </Checkbox>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full h-[46px]"
              disabled={mutation.isPending}
              onClick={handleSumbit}
            >
              register
            </Button>
            <Button
              T="login"
              onClick={goToLogin}
              className="w-full h-[46px]"
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
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[234px]">
      <div className="flex flex-col gap-6 z-[1]  w-[39%] max-w-[552px] items-center">
        <Text
          className="text-primary10 leading-[120%]"
          size="t48"
          weight="bold"
        >
          register
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl w-full">
          <div className="flex flex-col gap-4 w-full">
            <Input
              value={inputs.email}
              onChange={(e) => handleChangeInput("email", e.target.value)}
              label="email"
              type="mail"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="mail"
              placeholder="example@gmail.com"
            />
            <Input
              label="nick"
              value={inputs.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              type="text"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              iconLeft="profile"
              placeholder="DuckStep3"
            />
            <Input
              label="password"
              iconLeft="lock"
              value={inputs.password}
              onChange={(e) => handleChangeInput("password", e.target.value)}
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              type="password"
              iconRight={true}
              placeholder="password"
            />
            <Input
              label="RewritePassword"
              value={inputs.confirmPassword}
              onChange={(e) =>
                handleChangeInput("confirmPassword", e.target.value)
              }
              iconLeft="lock"
              styleDiv={{ backgroundColor: "#272c33", height: "46px" }}
              type="password"
              iconRight={true}
              placeholder="password"
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
                {/* <CustomLink url="/"> */}
                <Text
                  className="text-linkColor underline"
                  weight="medium"
                  size="sm"
                >
                  rules
                </Text>
                {/* </CustomLink> */}
                <Text className="text-linkColor" weight="medium" size="sm">
                  review
                </Text>
              </div>
            </Checkbox>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full  h-[46px]"
              disabled={mutation.isPending}
              onClick={handleSumbit}
            >
              register
            </Button>
            <CustomLink url="/login" className="w-full">
              <Button
                T="login"
                className="w-full  h-[46px]"
                variant="secondary"
              >
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
