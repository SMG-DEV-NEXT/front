"use client";

import React, { useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { MainSettings } from "@/script/main";
import { useSettings } from "@/context/Middle";
import Text from "@/components/Text";
import { useTranslations } from "next-intl";
import PositionEditor from "../components/PositionEditor";
import AdminUploadImage from "../components/ImageUpload";
import AdminButton from "../components/button";

const MainAdminView = () => {
  const { updateSetting, settings, isLoading, isLoadingSaveQuery } =
    useSettings();
  const T = useTranslations("Index");
  const HeaderRoutesOptions = [
    { value: "catalog", label: T("catalog") },
    { value: "FAQ", label: T("FAQ") },
    { value: "guarante", label: T("guarante") },
    { value: "contacts", label: T("contacts") },
  ];
  const [inputs, setInputs] = useState({
    ...MainSettings,
    ...(settings.data.find((e) => e.title === "main")?.settings || {}),
  });
  const handleChange = (n, value, block) => {
    const name = n;
    if (block) {
      setInputs({
        ...inputs,
        [block]: {
          ...inputs[block],
          [name]: value,
        },
      });
      return;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function placeItemAtPosition(item, position) {
    const arr = inputs.header.routes;
    const filtered = arr.filter((el) => el !== item);
    const pos = Math.max(0, Math.min(position, filtered.length));
    filtered.splice(pos, 0, item);
    handleChange("routes", filtered, "header");
  }

  function changeImage(item, position) {
    const arr = [...inputs.footer.payLogos];
    arr[position] = item;
    handleChange("payLogos", arr, "footer");
  }

  return (
    <AdminContainer>
      <AdminPageHeader
        buttonOnClick={() => updateSetting("main", inputs)}
        route="settings"
        buttonText="save"
      />

      <div className="flex flex-col mt-6 gap-6 pb-4">
        <div className="flex flex-col">
          <Text T="admin" className="text-primary10" weight="semi" size="md">
            header
          </Text>
          <div className="flex gap-4 w-full mt-4">
            <div className="w-[40%]">
              <AdminUploadImage
                size={"46x51"}
                value={inputs.header.logo}
                onChange={(e) => handleChange("logo", e, "header")}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <PositionEditor
                itemValue={inputs.header.routes[0]}
                items={HeaderRoutesOptions}
                pos={1}
                label="page"
                onChangePosition={placeItemAtPosition}
              />
              <PositionEditor
                itemValue={inputs.header.routes[1]}
                items={HeaderRoutesOptions}
                pos={2}
                onChangePosition={placeItemAtPosition}
                label="page"
              />
              <PositionEditor
                itemValue={inputs.header.routes[2]}
                items={HeaderRoutesOptions}
                pos={3}
                onChangePosition={placeItemAtPosition}
                label="page"
              />
              <PositionEditor
                itemValue={inputs.header.routes[3]}
                items={HeaderRoutesOptions}
                pos={4}
                onChangePosition={placeItemAtPosition}
                label="page"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Text T="admin" className="text-primary10" weight="semi" size="md">
            footer
          </Text>
          <div className="flex gap-4 w-full mt-4 flex-col">
            <div className="w-[40%]">
              <AdminUploadImage
                size={"46x51"}
                value={inputs.footer.logo}
                onChange={(e) => handleChange("logo", e, "footer")}
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className="flex w-full justify-between">
                <Text
                  T="admin"
                  weight="semi"
                  size="lg"
                  className="text-primary10"
                >
                  logoPay
                </Text>
                {/* <AdminButton
                  onClick={() =>
                    handleChange(
                      "payLogos",
                      [...inputs.footer.payLogos, ""],
                      "footer"
                    )
                  }
                >
                  add
                </AdminButton> */}
              </div>
              <div className="flex gap-4 ">
                {inputs.footer.payLogos.map((e, i) => {
                  return (
                    <div className="flex flex-col  w-full">
                      <Text
                        T="none"
                        weight="semi"
                        size="md"
                        className="text-primary10"
                      >
                        Logo {i + 1}
                      </Text>
                      <AdminUploadImage
                        key={crypto.randomUUID()}
                        value={e}
                        size={"40x40"}
                        onChange={(val) => changeImage(val, i)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default MainAdminView;
