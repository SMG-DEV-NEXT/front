"use client";

import Input from "@/components/Input";
import Text from "@/components/Text";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const PlanItem = ({
  format,
  keys,
  onAddKeys,
  price,
  onChangeKeys,
  prcent,
  setPrsent,
  exchange,
  onChangePrice,
}) => {
  const tCheat = useTranslations("cheat");
  const [txt, setTxt] = useState(keys.join("\n"));
  const textFormats = {
    day: "subscribtionDay",
    week: "subscribtionWeek",
    month: "subscribtionMonth",
  };

  useEffect(() => {
    setTxt(keys.join("\n"));
  }, [keys]);

  const getPriceWithPrcent = () => {
    const pr = (price / 100) * prcent;
    const ex = price * 1 - pr;
    return `${ex.toFixed(2)} / ${(ex / exchange).toFixed(2)}`;
  };

  const onChange = (e) => {
    const newKeys = e.split("\n");
    onChangeKeys(format, newKeys);
    setTxt(e);
  };

  const lineNumbers = txt
    .split("\n")
    .map((_, index) => index + 1 + ".")
    .join("\n");

  return (
    <div className="flex flex-col gap-[27px]">
      <div className="flex gap-1">
        <Text T="admin" weight="semi" size="lg" className="text-primary10">
          {textFormats[format]}
        </Text>
        <Text T="none" weight="semi" size="lg" className="text-linkColor">
          ({keys.length}
          {tCheat("pieces")})
        </Text>
      </div>
      <div className="flex gap-6 flex-col">
        <div className="flex gap-6">
          <div className="bg-input w-1/3 rounded-[16px] p-[16px]">
            <div className="flex items-end gap-2">
              <Input
                label="price"
                value={price}
                setValue={(e) => onChangePrice(format, e)}
                type="number"
                styleDiv={{ background: "#272C33" }}
              />
              <Input
                value={(price / exchange).toFixed(2)}
                type="number"
                styleDiv={{ background: "#272C33" }}
              />
            </div>
          </div>
          <div className="bg-input w-1/3 rounded-[16px] p-[16px]">
            <Input
              label="prcent"
              value={prcent}
              styleDiv={{ background: "#272C33" }}
              max={100}
              setValue={(e) => setPrsent(format, e)}
              type="number"
            />
          </div>
          <div className="bg-input w-1/3 rounded-[16px] p-[16px]">
            <Input
              label="priceWithPrcent"
              styleDiv={{ background: "#272C33" }}
              setValue={() => {}}
              value={getPriceWithPrcent()}
              type="text"
            />
          </div>
        </div>
        <div className="bg-input w-full gap-4 rounded-[16px] p-[16px]">
          <Text T="admin" weight="semi" size="lg" className="text-primary10">
            keys
          </Text>
          <div className="mt-4 overflow-auto max-h-[400px] comment-scroll pr-2 rounded-[10px]">
            <div className="relative bg-black flex w-full rounded-[10px]  gap-1 overflow-hidden ">
              {/* Line Numbers */}
              <pre className="bg-black text-linkColor text-right font-semibold text-md px-4 py-2 select-none overflow-hidden">
                {lineNumbers || "1"}
              </pre>

              {/* Textarea */}
              <textarea
                value={txt}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border-none outline-none resize-none font-semibold text-md text-linkColor bg-black overflow-auto"
                rows={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanItem;
