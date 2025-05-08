import React, { useState } from "react";
import Icon from "../Icons";
import Text from "../Text";
import Button from "../Button";
import Input from "../Input";
import ImageUpload from "../UploadImage/Index";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";
import { toastError } from "../../utils/error";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";

const DefaultSettings = ({ user, mobile, usd }) => {
  const [inputs, setInputs] = useState({
    name: user?.name,
    image: user?.logo,
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  const handleChangeInput = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const mutate = useMutation({
    mutationFn: UserService.saveAccount,
    mutationKey: ["update"],
    onSuccess: ({ data }) => {
      dispatch(setAuth(data));
    },
  });

  const handleSave = () => {
    if (inputs.password !== inputs.confirmPassword) {
      toastError("Password and confirm password do not match.");
      return;
    }
    mutate.mutate(inputs);
  };

  const getPriceTransactions = () => {
    const transactionsPrice = user?.transactions.reduce((prev, next) => {
      return prev + next.checkoutedPrice;
    }, 0);
    return usd
      ? `${(transactionsPrice / usd).toFixed(2)} $`
      : `${transactionsPrice} ₽`;
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex w-full justify-between bg-input rounded-[16px] p-6">
        <div className="flex flex-col w-full gap-3 justify-center items-center">
          <Icon name="magazin" size={64} folder="account" />
          <div className="flex flex-col gap1 justify-center items-center">
            <Text
              T="account"
              size="sm"
              weight="medium"
              className="text-linkColor"
            >
              count
            </Text>
            <Text T="none" size="xl" weight="bold" className="text-primary10">
              {user?.transactions.length}
            </Text>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 justify-center items-center">
          <Icon name="wallet" size={64} folder="account" />
          <div className="flex flex-col gap1 justify-center items-center">
            <Text
              T="account"
              size="sm"
              weight="medium"
              className="text-linkColor"
            >
              price
            </Text>
            <Text T="none" size="xl" weight="bold" className="text-primary10">
              {getPriceTransactions()}
            </Text>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 justify-center items-center">
          <Icon name="commentBig" size={64} folder="account" />
          <div className="flex flex-col gap1 justify-center items-center">
            <Text
              T="account"
              size="sm"
              weight="medium"
              className="text-linkColor"
            >
              comments
            </Text>
            <Text T="none" size="xl" weight="bold" className="text-primary10">
              {user?.comments.length}
            </Text>
          </div>
        </div>
        {!mobile && (
          <div className="flex flex-col w-full gap-3 justify-center items-center">
            <Icon name="bronze" size={64} folder="account" />
            <div className="flex flex-col gap1 justify-center items-center">
              <Text
                T="account"
                size="sm"
                weight="medium"
                className="text-linkColor"
              >
                raiting
              </Text>
              <Text
                T="account"
                size="xl"
                weight="bold"
                className="text-primary10"
              >
                bronze
              </Text>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col bg-input gap-4 rounded-[16px] p-6">
        <Input
          label="nick"
          type="text"
          styleDiv={{ backgroundColor: "#272c33" }}
          iconLeft="profile"
          value={inputs.name}
          onChange={(e) => handleChangeInput("name", e.target.value)}
          placeholder="DuckStep3"
        />
        <Input
          label="password"
          iconLeft="lock"
          styleDiv={{ backgroundColor: "#272c33" }}
          type="password"
          iconRight={true}
          placeholder="qwery123"
          value={inputs.password}
          onChange={(e) => handleChangeInput("password", e.target.value)}
        />
        <Input
          label="RewritePassword"
          iconLeft="lock"
          styleDiv={{ backgroundColor: "#272c33" }}
          type="password"
          iconRight={true}
          placeholder="qwery123"
          value={inputs.confirmPassword}
          onChange={(e) => handleChangeInput("confirmPassword", e.target.value)}
        />
        <ImageUpload
          label="image"
          value={inputs.image}
          onChange={(e) => handleChangeInput("image", e)}
        />
        <Button
          T="account"
          disabled={mutate.isPending}
          onClick={() => handleSave()}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default DefaultSettings;
