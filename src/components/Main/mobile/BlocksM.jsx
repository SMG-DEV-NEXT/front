"use clients";
import React from "react";
import Icon from "../../Icons";
import Text from "../../Text";
import Image from "next/image";
import Effect from "../../Animations/Effect";
import { RightIcon } from "../i";
import { StartsIcon } from "../Blocks";

const EasyUseBlock = () => {
  return (
    <div className="flex h-full rounded-[16px] min-h-[400px] overflow-hidden relative p-6 bg-input rounded-2xl bg-no-repeat bg-center bg-cover">
      {/* <Image fill src="/images/easyBG.webp" alt="background" /> */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/frame288.png" // Добавь изображение сюда
          alt="Authority EFT Cards"
          fill
          className="object-cover object-top opacity-80"
          quality={100}
          priority
        />
        {/* Градиент для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F] via-[#0C0C0F]/80 to-transparent z-10" />
      </div>
      <div className="flex z-[2] flex-col justify-between">
        <div
          className="flex items-center gap-2 p-3 rounded-xl"
          style={{
            backgroundColor: "rgba(139, 109, 202, 0.15)",
            maxWidth: "max-content",
          }}
        >
          <Icon name="squareTick" />
          <Text T="Main" className="text-primary80" weight="medium" size="sm">
            reg
          </Text>
        </div>
        <div className="flex flex-col gap-2 w-[80%]">
          <Text
            T="Main"
            weight="bold"
            size="lg"
            className="text-primary10 leading-[20px]"
          >
            same
          </Text>
          <Text T="Main" className="text-linkColor" weight="medium" size="sm">
            sameTitle
          </Text>
        </div>
      </div>
    </div>
  );
};

const Choose = () => {
  return (
    <section className="relative bg-[#0C0C0F] rounded-2xl overflow-hidden px-6 py-6 md:px-10 md:py-8 flex flex-col justify-end sm:min-h-[400px] min-h-[295px]">
      {/* Фоновое изображение с затемнением */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/frame289.png" // Добавь изображение сюда
          alt="Authority EFT Cards"
          fill
          className="object-cover object-top opacity-80"
          quality={100}
          priority
        />
        {/* Градиент для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F] via-[#0C0C0F]/80 to-transparent z-10" />
      </div>

      {/* Текстовый контент */}
      <div className="relative z-20 max-w-[80%] sm:max-w-[80%]">
        <div className="flex flex-col  gap-2">
          <Text
            T="Main"
            weight="bold"
            size="lg"
            className="text-primary10 leading-[20px]"
          >
            choose
          </Text>
          <Text T="Main" className="text-linkColor" weight="medium" size="sm">
            chooseText
          </Text>
        </div>
      </div>
    </section>
  );
  // return (
  //   <div className="flex bg-input rounded-[16px] relative overflow-hidden bg-no-repeat bg-center bg-cover min-h-[295px]">
  //     <div className="absolute top-[-7%] left-0 z-[2] isolate">
  //       <BloksIcon1 />
  //     </div>
  //     <div className="absolute  rotate-[-90deg] left-[-40%] z-[2] isolate">
  //       <BloksIcon1 />
  //     </div>
  //     <div className="absolute  top-[-50%] rotate-[90deg] right-[-40%] z-[2] isolate">
  //       <BloksIcon1 />
  //     </div>
  //     <div
  //       className="absolute z-[0]"
  //       style={{
  //         left: "3.8%",
  //         top: "-10.5%",
  //         width: "35.7%",
  //         height: "67.8%",
  //       }}
  //     >
  //       <Icon name="5" style={{ width: "100%", height: "100%" }} />
  //     </div>

  //     {/* Иконка 2 */}
  //     <div
  //       className="absolute z-[-0]"
  //       style={{
  //         left: "43.1%",
  //         top: "-5.4%",
  //         width: "27.2%",
  //         height: "52.2%",
  //         transform: "rotate(4deg)",
  //       }}
  //     >
  //       <Icon name="5" style={{ width: "100%", height: "100%" }} />
  //     </div>

  //     {/* Иконка 3 */}
  //     <div
  //       className="absolute z-[0]"
  //       style={{
  //         right: "-20.1%",
  //         top: "-11.8%",
  //         width: "45%",
  //         height: "76.6%",
  //         transform: "rotate(20deg)",
  //       }}
  //     >
  //       <Icon name="5" style={{ width: "100%", height: "100%" }} />
  //     </div>
  //     {/* bg-[url('/images/chooseBG.webp')] */}
  //     <div className="absolute bottom-[24px]">
  //       <div className="flex flex-col px-6 gap-2">
  //         <Text
  //           T="Main"
  //           weight="bold"
  //           size="lg"
  //           className="text-primary10 leading-[20px]"
  //         >
  //           choose
  //         </Text>
  //         <Text T="Main" className="text-linkColor" weight="medium" size="sm">
  //           chooseText
  //         </Text>
  //       </div>
  //     </div>
  //   </div>
  // );
};

const Starts = () => {
  return (
    <div className="p-6 flex flex-col gap-2 rounded-2xl bg-input relative h-[144px] overflow-hidden">
      <div className="absolute top-[-200%]">
        <StartsIcon />
      </div>
      <div className="flex items-center gap-[6px] z-[2]">
        <Text
          T="Main"
          className="text-primary10 leading-[140%]"
          size="xl"
          weight="bold"
        >
          starts
        </Text>
        <Icon name="stars" size={124} />
      </div>
      <Text T="Main" className="text-linkColor z-[2]" size="sm" weight="medium">
        startsT
      </Text>
    </div>
  );
};

function BlocksMobile() {
  return (
    <div className="relative flex pb-[80px] z-[5]  pt-[80px]   z-[3]">
      <div className="absolute top-[-20%] z-[2] right-[0%] h-full">
        <RightIcon />
      </div>
      <div className="absolute bottom-[-14%] left-[0]">
        {/* <Icon name="frame301" size={1500} /> */}
      </div>
      <div className="container">
        <div className="flex gap-6 flex-col">
          <Effect type="to-right">
            <EasyUseBlock />
          </Effect>
          <div className="flex flex-col gap-6">
            <Effect type="to-left">
              <Starts />
            </Effect>
            <Effect type="to-right">
              <Choose />
            </Effect>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocksMobile;
