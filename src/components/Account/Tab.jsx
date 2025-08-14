"use client";
import React, { useState } from "react";
import Text from "../Text";
import Image from "next/image";
import Icon from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";
import { setAuth } from "../../redux/authSlice";
import Modal from "../Modal";
import LogoutModal from "../admin/components/Modals/logout";
import { AccountTabs } from "@/components/pages/Account";
import { removeAccessToken } from "../../utils/token";
import { ActiveLightIcon } from "@/components/Cheat/Route/CardAndPay/Pay";

const AccountTab = ({ selectedTab, setSelectedTab, mobile }) => {
  const user = useSelector((state) => state.auth.user);
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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
  const handleChooseTab = (e) => {
    if (e.value === "logout") {
      setIsOpenLogoutModal(true);
      return;
    }
    setSelectedTab(e);
  };

  if (!user) return null;
  if (mobile) {
    return (
      <div className="flex flex-col p-6 gap-6 bg-input rounded-[16px] w-full">
        {isOpenLogoutModal && (
          <Modal
            isOpen={isOpenLogoutModal}
            onClose={() => setIsOpenLogoutModal(false)}
            customTop={130}
          >
            <LogoutModal
              onClose={() => setIsOpenLogoutModal(false)}
              onLogout={logout}
            />
          </Modal>
        )}
        <div className="flex gap-4 items-center">
          <div className="logo w-[84px] h-[84px] bg-black rounded-full flex items-center justify-center overflow-hidden rounded-full">
            <Image
              src={
                user.logo ||
                "https://res.cloudinary.com/dqdiocjpu/image/upload/v1741361925/nextjs_uploads/fiixoackkehzjubvt5og.png"
              }
              width={84}
              alt="logo"
              height={84}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Text
              T="none"
              weight="bold"
              size="xl"
              className="text-primary10 leading-[140%]"
            >
              {user.name}
            </Text>
            <div className="py-2 px-3 bg-black text-center rounded-[8px]">
              <Text
                T="account"
                weight="medium"
                size="sm"
                className="text-primary10"
              >
                user
              </Text>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          {AccountTabs.map((e) => {
            const Component = e.icon;
            const isActive = e.value === selectedTab.value;

            return (
              <div
                key={e.value}
                onClick={() => handleChooseTab(e)}
                className="p-[2px] relative rounded-xl overflow-hidden transition-all duration-700"
              >
                {/* Gradient background layer (fades in/out) */}
                <div
                  className={`absolute inset-0 rounded-xl
          transition-opacity duration-700
          bg-[linear-gradient(to_right,#8B6DCA_0%,transparent_41%,#8B6DCA_100%)]
          ${isActive ? "opacity-100" : "opacity-0"}
        `}
                />

                {/* Inner content */}
                <div
                  className={`relative z-[1] overflow-hidden transition-colors duration-700
          flex py-[13px] px-4 items-center rounded-xl justify-between cursor-pointer
          ${isActive ? "bg-input" : "bg-black"}
        `}
                >
                  {/* Background icons */}
                  <div
                    className={`absolute right-0 top-0 z-[-1]
            transition-opacity duration-700
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
                  >
                    <Icon name="elipse" size={200} folder="cheat" />
                  </div>

                  <div
                    className={`absolute left-0 z-[-1]
            transition-opacity duration-700
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
                  >
                    <ActiveLightIcon />
                  </div>

                  {/* Icon + Text */}
                  <div className="flex items-center gap-2 z-[1]">
                    <Component color={isActive ? "#8B6DCA" : undefined} />
                    <Text
                      T="account"
                      weight="medium"
                      size="sm"
                      className={`transition-colors duration-700 ${
                        isActive ? "text-primary10" : "text-linkColor"
                      }`}
                    >
                      {e.label}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-6 gap-6 bg-input rounded-[16px] w-[32%]">
      {isOpenLogoutModal && (
        <Modal
          isOpen={isOpenLogoutModal}
          onClose={() => setIsOpenLogoutModal(false)}
          customTop={130}
        >
          <LogoutModal
            onClose={() => setIsOpenLogoutModal(false)}
            onLogout={logout}
          />
        </Modal>
      )}
      <div className="flex gap-4 items-center">
        <div className="logo w-[84px] h-[84px] bg-black rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={
              user.logo ||
              "https://res.cloudinary.com/dqdiocjpu/image/upload/v1741361925/nextjs_uploads/fiixoackkehzjubvt5og.png"
            }
            width={84}
            height={84}
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Text
            T="none"
            weight="bold"
            size="xl"
            className="text-primary10 leading-[140%] "
          >
            {user.name}
          </Text>
          <div className="py-2 px-3 bg-black text-center rounded-[8px]">
            <Text
              T="account"
              weight="medium"
              size="sm"
              className=" text-linkColor"
            >
              user
            </Text>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        {AccountTabs.map((e) => {
          const Component = e.icon;
          const isActive = e.value === selectedTab.value;

          return (
            <div
              key={e.value}
              onClick={() => handleChooseTab(e)}
              className="p-[2px] relative rounded-xl overflow-hidden transition-all duration-700"
            >
              {/* Gradient background layer (fades in/out) */}
              <div
                className={`absolute inset-0 rounded-xl
          transition-opacity duration-700
          bg-[linear-gradient(to_right,#8B6DCA_0%,transparent_41%,#8B6DCA_100%)]
          ${isActive ? "opacity-100" : "opacity-0"}
        `}
              />

              {/* Inner content */}
              <div
                className={`relative z-[1] overflow-hidden transition-colors duration-700
          flex py-[13px] px-4 items-center rounded-xl justify-between cursor-pointer
          ${isActive ? "bg-input" : "bg-black"}
        `}
              >
                {/* Background icons */}
                <div
                  className={`absolute right-0 top-0 z-[-1]
            transition-opacity duration-700
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
                >
                  <Icon name="elipse" size={200} folder="cheat" />
                </div>

                <div
                  className={`absolute left-0 z-[-1]
            transition-opacity duration-700
            ${isActive ? "opacity-100" : "opacity-0"}
          `}
                >
                  <ActiveLightIcon />
                </div>

                {/* Icon + Text */}
                <div className="flex items-center gap-2 z-[1]">
                  <Component color={isActive ? "#8B6DCA" : undefined} />
                  <Text
                    T="account"
                    weight="medium"
                    size="sm"
                    className={`transition-colors duration-700 ${
                      isActive ? "text-primary10" : "text-linkColor"
                    }`}
                  >
                    {e.label}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountTab;
