"use client";
import Image from "next/image";
import { useState } from "react";
import Text from "../Text";
import CustomLink from "../CustomLink";
import Icon from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { removeAccessToken } from "../../utils/token";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useRouter } from "next/navigation";

const HeaderMyAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const mutate = useMutation({
    mutationFn: UserService.logout,
    mutationKey: "logout",
    onSuccess: () => {
      dispatch(setAuth({}));
      removeAccessToken();
    },
  });

  const logout = () => {
    mutate.mutate();
    router.push("/");
  };
  return (
    <div className="relative ">
      {/* Логотип пользователя */}
      <div className="relative flex">
        <Dropdown>
          <DropdownTrigger>
            <button
              // onClick={() => setIsOpen(!isOpen)}
              className="w-[48px] h-[48px] rounded-[12px] overflow-hidden outline-none"
            >
              <Image
                src={
                  user.logo ||
                  "https://res.cloudinary.com/dqdiocjpu/image/upload/v1741361925/nextjs_uploads/fiixoackkehzjubvt5og.png"
                }
                className="w-[48px] h-[48px] object-cover"
                height={48}
                width={48}
                alt="image"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem className="" onClick={() => {}}>
              <div className="w-[236px] cursor-default right-0 top-[100%] mt-4 w-48 bg-black rounded-[16px] flex flex-col gap-4  z-10 p-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex flex-col items-center">
                    <div className="w-[64px] h-[64px] rounded-full overflow-hidden z-[0]">
                      <Image
                        src={
                          user.logo ||
                          "https://res.cloudinary.com/dqdiocjpu/image/upload/v1741361925/nextjs_uploads/fiixoackkehzjubvt5og.png"
                        }
                        className="w-[64px] h-[64px] object-cover z-[0]"
                        height={48}
                        width={48}
                        alt="image"
                      />
                    </div>
                    <div className="py-1 min-w-full px-2 bg-black relative rounded-[40px] mt-[-10%] z-[2] border border-linkColor text-center">
                      <Text
                        weigth="medium"
                        className="!text-[10px] text-linkColor leading-[140%]"
                        T="account"
                      >
                        user
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Text
                      T="none"
                      className="text-primary10 leading-[140%]"
                      weight="bold"
                      size="sm"
                    >
                      {user.name}
                    </Text>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between gap-4">
                        <Text
                          T="account"
                          className="text-linkColor !text-[12px] leading-[140%]"
                          weight="medium"
                        >
                          count
                        </Text>
                        <Text
                          T="none"
                          className="text-linkColor !text-[12px] leading-[140%]"
                          weight="bold"
                        >
                          {user.transactions.length}
                        </Text>
                      </div>

                      <div className="flex justify-between gap-4">
                        <Text
                          T="account"
                          className="text-linkColor !text-[12px] leading-[140%]"
                          weight="medium"
                        >
                          comments
                        </Text>
                        <Text
                          T="none"
                          className="text-linkColor !text-[12px] leading-[140%]"
                          weight="bold"
                        >
                          {user.comments.length}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col gap-1">
                    <CustomLink url="/account#history">
                      <div className="flex items-center gap-1">
                        <Icon name="buy" folder="account" size={16} />
                        <Text
                          T="account"
                          weigth="bold"
                          size="sm"
                          className="text-linkColor"
                        >
                          historyM
                        </Text>
                      </div>
                    </CustomLink>
                    <CustomLink url="/account#history">
                      <div className="flex items-center gap-1">
                        <Icon name="comment" folder="account" size={16} />
                        <Text
                          T="account"
                          weigth="bold"
                          size="sm"
                          className="text-linkColor"
                        >
                          help
                        </Text>
                      </div>
                    </CustomLink>
                  </div>
                  <div className="flex flex-col gap-1">
                    <CustomLink url="/account#default">
                      <div className="flex items-center gap-1">
                        <Icon name="setting" folder="account" size={16} />
                        <Text
                          T="account"
                          weigth="bold"
                          size="sm"
                          className="text-linkColor"
                        >
                          settings
                        </Text>
                      </div>
                    </CustomLink>
                    <CustomLink url="/">
                      <div className="flex items-center gap-1" onClick={logout}>
                        <Icon name="out" folder="account" size={16} />
                        <Text
                          T="account"
                          weigth="bold"
                          size="sm"
                          className="text-linkColor"
                        >
                          logoutMain
                        </Text>
                      </div>
                    </CustomLink>
                  </div>
                </div>
                {user.isAdmin && (
                  <CustomLink url="/admin/dashboard">
                    <div className="flex w-full items-center justify-center gap-1 text-center">
                      <Text
                        T="none"
                        weigth="bold"
                        size="sm"
                        className="text-linkColor"
                      >
                        Admin Dashboard
                      </Text>
                    </div>
                  </CustomLink>
                )}
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* Выпадающее меню */}
        {isOpen && (
          <div className="absolute w-[350px] right-0 top-[100%] mt-4 w-48 bg-black rounded-[16px] flex flex-col gap-4  z-10 p-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex flex-col items-center">
                <div className="w-[64px] h-[64px] rounded-full overflow-hidden z-[0]">
                  <Image
                    src="/images/game.png"
                    className="w-[64px] h-[64px] object-cover z-[0]"
                    height={48}
                    width={48}
                    alt="image"
                  />
                </div>
                <div className="py-[3px] min-w-full px-2 bg-black relative rounded-[40px] mt-[-10%] z-[2] border border-linkColor text-center">
                  <Text
                    weigth="medium"
                    className="text-[10px] text-linkColor leading-[140%]"
                    T="account"
                  >
                    user
                  </Text>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Text
                  T="none"
                  className="text-primary10"
                  weight="bold"
                  size="sm"
                >
                  DuckStep3
                </Text>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between gap-4">
                    <Text
                      T="account"
                      className="text-linkColor text-[12px] leading-[140%]"
                      weight="medium"
                    >
                      count
                    </Text>
                    <Text
                      T="none"
                      className="text-linkColor text-[12px] leading-[140%]"
                      weight="bold"
                    >
                      12
                    </Text>
                  </div>

                  <div className="flex justify-between gap-4">
                    <Text
                      T="account"
                      className="text-linkColor text-[12px] leading-[140%]"
                      weight="medium"
                    >
                      comments
                    </Text>
                    <Text
                      T="none"
                      className="text-linkColor text-[12px] leading-[140%]"
                      weight="bold"
                    >
                      12
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-1">
                <CustomLink url="/account#history">
                  <div className="flex items-center gap-1">
                    <Icon name="buy" folder="account" size={16} />
                    <Text
                      T="account"
                      weigth="bold"
                      size="sm"
                      className="text-linkColor"
                    >
                      historyM
                    </Text>
                  </div>
                </CustomLink>
                <CustomLink url="/account#history">
                  <div className="flex items-center gap-1">
                    <Icon name="comment" folder="account" size={16} />
                    <Text
                      T="account"
                      weigth="bold"
                      size="sm"
                      className="text-linkColor"
                    >
                      help
                    </Text>
                  </div>
                </CustomLink>
              </div>
              <div className="flex flex-col gap-1">
                <CustomLink url="/account#history">
                  <div className="flex items-center gap-1">
                    <Icon name="setting" folder="account" size={16} />
                    <Text
                      T="account"
                      weigth="bold"
                      size="sm"
                      className="text-linkColor"
                    >
                      settings
                    </Text>
                  </div>
                </CustomLink>
                <CustomLink url="/">
                  <div className="flex items-center gap-1" onClick={logout}>
                    <Icon name="out" folder="account" size={16} />
                    <Text
                      T="account"
                      weigth="bold"
                      size="sm"
                      className="text-linkColor"
                    >
                      logoutMain
                    </Text>
                  </div>
                </CustomLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMyAccount;
