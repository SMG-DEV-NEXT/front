"use client";
import React from "react";
import Button from "../Button";
import Text from "../Text";
import TwoFactorInput from "../TwoFactorInput";

function Forget2FA({ code, setCode, onApply, isMobile, isTwoFactorForget }) {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 z-[1] min-w-[302px] w-[302px]">
        <Text
          T="login"
          className="text-primary10 text-center leading-[120%]"
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
              label={!isTwoFactorForget ? "codeEmail" : undefined}
              setCode={setCode}
              onComplete={(code) => onApply(code)}
            />
          </div>

          <Button T="login" className="w-full h-[46px]">
            reset
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="view relative h-full w-full flex items-center justify-center pt-[64px] pb-[344px]">
      <div className="flex flex-col gap-6 z-[1]">
        <Text
          T="login"
          className="text-primary10 leading-[120%]"
          size="t48"
          weight="bold"
        >
          reset
        </Text>
        <div className="flex flex-col bg-input p-6 gap-6 rounded-2xl">
          <div className="flex flex-col gap-4 w-full">
            <TwoFactorInput
              length={6}
              label={!isTwoFactorForget ? "codeEmail" : undefined}
              code={code}
              setCode={setCode}
              onComplete={(code) => onApply(code)}
            />
          </div>

          <Button T="login" className="w-full h-[46px]">
            reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Forget2FA;
