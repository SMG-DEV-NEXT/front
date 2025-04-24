import React from "react";
import Text from "../Text";
import Image from "next/image";
import Effect from "../Animations/Effect";

function About() {
  return (
    <div className="flex relative w-full  py-[64px] bg-input bg-[url('/images/aboutBG.png')] bg-no-repeat bg-center bg-cover">
      <div className="container relative z-[2]">
        <Effect type="to-right">
          <div className="flex flex-col gap-6 w-[40%]">
            <Text T="Main" className="text-primary10" size="t48" weight="bold">
              aboutT
            </Text>
            <div className="flex flex-col gap-4">
              <Text
                T="Main"
                weight="medium"
                className="text-linkColor"
                size="sm"
              >
                aboutT1
              </Text>
              <Text
                T="Main"
                weight="medium"
                className="text-linkColor"
                size="sm"
              >
                aboutT2
              </Text>
            </div>
          </div>
        </Effect>
      </div>
    </div>
  );
}

export default About;
