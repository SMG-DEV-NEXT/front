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
          <div className="logo w-[84px] h-[84px] bg-black rounded-full flex items-center justify-center">
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
            if (e.value === selectedTab.value) {
              return (
                <div
                  className={`p-[2px] relative rounded-xl ${" bg-[linear-gradient(to_right,#8B6DCA_0%,transparent_41%,#8B6DCA_100%)]"}`}
                  key={e.value}
                >
                  <div
                    className={`relative z-[1] overflow-hidden flex py-[13px] px-4 items-center rounded-xl justify-between cursor-pointer bg-${"input"}`}
                  >
                    <div className="absolute right-[0] top-[0] z-[0]">
                      <Icon name="elipse" size={200} folder="cheat" />
                    </div>
                    <div className="absolute left-[0]  z-[0]">
                      <ActiveLightIcon />
                    </div>
                    <div
                      className="flex  items-center gap-2  cursor-pointer"
                      key={e.value}
                      onClick={() => handleChooseTab(e)}
                    >
                      <Component color="#8B6DCA" />
                      <Text
                        T="account"
                        weight="medium"
                        size="sm"
                        className="text-primary10"
                      >
                        {e.label}
                      </Text>
                    </div>{" "}
                  </div>
                </div>
              );
            }
            return (
              <div
                className="flex bg-black items-center gap-2  rounded-[12px] cursor-pointer py-[13px] px-4"
                key={e.value}
                onClick={() => handleChooseTab(e)}
              >
                <Component />
                <Text
                  T="account"
                  weight="medium"
                  size="sm"
                  className="text-linkColor"
                >
                  {e.label}
                </Text>
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
        <div className="logo w-[84px] h-[84px] bg-black rounded-full flex items-center justify-center">
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
          if (e.value === selectedTab.value) {
            return (
              <div
                className={`p-[2px] relative rounded-xl ${" bg-[linear-gradient(to_right,#8B6DCA_0%,transparent_41%,#8B6DCA_100%)]"}`}
                key={e.value}
              >
                <div
                  className={`relative z-[1] overflow-hidden flex py-[13px] px-4 items-center rounded-xl justify-between cursor-pointer bg-${"input"}`}
                >
                  <div className="absolute right-[0] top-[0] z-[0]">
                    <Icon name="elipse" size={200} folder="cheat" />
                  </div>
                  <div className="absolute left-[0]  z-[0]">
                    <ActiveLightIcon />
                  </div>
                  <div
                    className="flex  items-center gap-2  cursor-pointer"
                    key={e.value}
                    onClick={() => handleChooseTab(e)}
                  >
                    <Component color="#8B6DCA" />
                    <Text
                      T="account"
                      weight="medium"
                      size="sm"
                      className="text-primary10"
                    >
                      {e.label}
                    </Text>
                  </div>{" "}
                </div>
              </div>
            );
          }
          return (
            <div
              className="flex bg-black items-center gap-2  rounded-[12px] cursor-pointer py-[13px] px-4"
              key={e.value}
              onClick={() => handleChooseTab(e)}
            >
              <Component />
              <Text
                T="account"
                weight="medium"
                size="sm"
                className="text-linkColor"
              >
                {e.label}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountTab;
