import Image from "next/image";
import React from "react";
import Text from "../../components/Text";
import Icon from "../../components/Icons";
import Effect from "../../components/Animations/Effect";
import { useMobile } from "@/hooks/useMobile";
import { useQuery } from "@tanstack/react-query";
import { ContactsService } from "@/services/Contacts";
import { useLocale } from "next-intl";

const ContactsView = () => {
  const isMobile = useMobile(1133);
  const locale = useLocale();
  const { data, isPending, refetch } = useQuery({
    queryFn: ContactsService.getAllContacts,
    queryKey: ["get"],
    refetchOnWindowFocus: false,
  });

  const handleClickUrl = (e) => {
    window.open(e, "_blank");
  };

  const items = !isPending
    ? data.data.filter((e) => e.status === "active")
    : [];

  return (
    <div
      className={`view relative h-full w-full bg-mainBlack flex items-center justify-center pb-[${
        isMobile ? "60px" : "256px"
      }] pt-[${isMobile ? "60px" : "64px"}] `}
      style={{ paddingBottom: isMobile ? "60px" : "256px" }}
    >
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      />
      <div className="container flex flex-col gap-[48px] items-center z-[1]">
        <div className="flex flex-col gap-6  items-center">
          <Text
            T="contacts"
            weight="bold"
            size="t48"
            className="text-primary10"
          >
            contactsT
          </Text>
          <Text
            T="contacts"
            weight="medium"
            size="sm"
            className="text-linkColor text-center max-w-[450px]"
          >
            contactsS
          </Text>
        </div>
        <div
          className={
            isMobile ? "flex gap-6 w-full flex-col" : "flex gap-6 w-full "
          }
        >
          {items.map((e) => {
            return (
              <Effect key={e.id} type="to-top" className="w-full">
                <div
                  onClick={() => handleClickUrl(e.url)}
                  className="flex cursor-pointer relative flex-col items-center overflow-hidden w-full py-6 bg-input rounded-[16px] gap-3"
                >
                  <Icon
                    name="light3"
                    className={`absolute w-full z-[1] ${
                      isMobile ? "top-[-70px]" : "top-0"
                    }`}
                  />
                  <Image
                    src={e.icon}
                    width={64}
                    height={64}
                    alt="logo"
                    className="z-[2]"
                  />{" "}
                  <div className="flex flex-col items-center gap-1 z-[2]">
                    <Text
                      className="text-primary10"
                      weight="bold"
                      size="20"
                      T="none"
                    >
                      {e[`title${locale}`]}
                    </Text>
                    <Text
                      className="text-linkColor"
                      weight="medium"
                      size="sm"
                      T="none"
                    >
                      {e[`text${locale}`]}
                    </Text>
                  </div>
                </div>
              </Effect>
            );
          })}
        </div>
      </div>
    </div>
  );
  return (
    <div
      className={`view relative h-full w-full bg-mainBlack flex items-center justify-center pb-[${
        isMobile ? "60px" : "256px"
      }] pt-[${isMobile ? "60px" : "64px"}] `}
      style={{ paddingBottom: isMobile ? "60px" : "256px" }}
    >
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        fill
        alt="Image"
        className="z-[0]"
      />
      <div className="container flex flex-col gap-[48px] items-center z-[1]">
        <div className="flex flex-col gap-6  items-center">
          <Text
            T="contacts"
            weight="bold"
            size="t48"
            className="text-primary10"
          >
            contactsT
          </Text>
          <Text
            T="contacts"
            weight="medium"
            size="sm"
            className="text-linkColor text-center max-w-[450px]"
          >
            contactsS
          </Text>
        </div>
        <div
          className={
            isMobile ? "flex gap-6 w-full flex-col" : "flex gap-6 w-full "
          }
        >
          <Effect type="to-right" className="w-full">
            <div className="flex relative flex-col items-center overflow-hidden w-full py-6 bg-input rounded-[16px] gap-3">
              <Icon
                name="light3"
                className={`absolute w-full z-[1] ${
                  isMobile ? "top-[-70px]" : "top-0"
                }`}
              />
              <Icon name="3" folder="contacts" className="z-[2] " size={64} />
              <div className="flex flex-col items-center gap-1 z-[2]">
                <Text
                  className="text-primary10"
                  weight="bold"
                  size="20"
                  T="contacts"
                >
                  discordT
                </Text>
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="contacts"
                >
                  discordS
                </Text>
              </div>
            </div>
          </Effect>
          <Effect type="to-top" className="w-full">
            <div className="flex relative flex-col items-center overflow-hidden w-full py-6 bg-input rounded-[16px] gap-3">
              <Icon
                name="light3"
                className={`absolute w-full z-[1] ${
                  isMobile ? "top-[-70px]" : "top-0"
                }`}
              />
              <Icon name="2" folder="contacts" className="z-[2] " size={64} />
              <div className="flex flex-col items-center gap-1 z-[2]">
                <Text
                  className="text-primary10"
                  weight="bold"
                  size="20"
                  T="contacts"
                >
                  vkT
                </Text>
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="contacts"
                >
                  vkS
                </Text>
              </div>
            </div>
          </Effect>
          <Effect type="to-top" className="w-full">
            <div className="flex relative flex-col items-center overflow-hidden w-full py-6 bg-input rounded-[16px] gap-3">
              <Icon
                name="light3"
                className={`absolute w-full z-[1] ${
                  isMobile ? "top-[-70px]" : "top-0"
                }`}
              />
              <Icon name="1" folder="contacts" className="z-[2] " size={64} />
              <div className="flex flex-col items-center gap-1 z-[2]">
                <Text
                  className="text-primary10"
                  weight="bold"
                  size="20"
                  T="contacts"
                >
                  tgT
                </Text>
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="contacts"
                >
                  tgS
                </Text>
              </div>
            </div>
          </Effect>
          <Effect type="to-left" className="w-full">
            <div className="flex relative flex-col items-center overflow-hidden w-full py-6 bg-input rounded-[16px] gap-3">
              <Icon
                name="light3"
                className={`absolute w-full z-[1] ${
                  isMobile ? "top-[-70px]" : "top-0"
                }`}
              />
              <Icon name="1" folder="contacts" className="z-[2] " size={64} />
              <div className="flex flex-col items-center gap-1 z-[2]">
                <Text
                  className="text-primary10"
                  weight="bold"
                  size="20"
                  T="contacts"
                >
                  helpT
                </Text>
                <Text
                  className="text-linkColor"
                  weight="medium"
                  size="sm"
                  T="contacts"
                >
                  helpS
                </Text>
              </div>
            </div>
          </Effect>
        </div>
      </div>
    </div>
  );
};

export default ContactsView;
