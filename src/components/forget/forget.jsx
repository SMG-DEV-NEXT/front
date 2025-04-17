"use client";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import Text from "../Text";
import TwoFactorInput from "../TwoFactorInput";

function Forget2FA({ code, setCode, onApply, isMobile }) {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1] min-w-[350px]">
        <Text
          T="login"
          className="text-primary10 text-center"
          size="2xl"
          weight="bold"
        >
          reset
        </Text>
        <div className="flex flex-col bg-input gap-6 rounded-2xl">
          <div className="flex flex-col gap-4 w-full">
            <TwoFactorInput
              length={6}
              code={code}
              setCode={setCode}
              onComplete={(code) => onApply(code)}
            />
          </div>

          <Button T="login" className="w-full">
            reset
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full bg-mainBlack flex items-center justify-center pt-[64px] pb-[344px]">
      <Image
        src="/images/loginBg.png"
        style={{ objectFit: "cover", objectPosition: "top" }} // или 'cover'
        quality={100}
        priority
        alt="Background"
        fill
        className="z-[0]"
      />
      <div className="flex flex-col gap-6 z-[1]">
        <Text T="login" className="text-primary10" size="t48" weight="bold">
          reset
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl">
          <div className="flex flex-col gap-4 w-full">
            <TwoFactorInput
              length={6}
              code={code}
              setCode={setCode}
              onComplete={(code) => onApply(code)}
            />
          </div>

          <Button T="login" className="w-full">
            reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Forget2FA;
