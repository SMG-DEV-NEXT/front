"use client";

import { useSettings } from "@/context/Middle";
import React, { useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import AdminUploadImage from "../components/ImageUpload";
import AdminBox from "../components/Box";

const GuaranteAdminView = () => {
  const { updateSetting, settings, isLoading, isLoadingSaveQuery } =
    useSettings();
  const [inputs, setInputs] = useState({
    logo1: "",
    logo2: "",
    logo3: "",
    block: {
      blockTitleru: "",
      blockTitleen: "",
      blockTextru: "",
      blockTexten: "",
    },
    block1: {
      blockTitleru: "",
      blockTitleen: "",
      blockTextru: "",
      blockTexten: "",
    },
    block2: {
      blockTitleru: "",
      blockTitleen: "",
      blockTextru: "",
      blockTexten: "",
    },
    block3: {
      blockTitleru: "",
      blockTitleen: "",
      blockTextru: "",
      blockTexten: "",
    },
    ...(settings.data.find((e) => e.title === "guarante")?.settings || {}),
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
  return (
    <AdminContainer>
      <AdminPageHeader
        route="guarante"
        buttonText="save"
        buttonOnClick={() => updateSetting("guarante", inputs)}
        isDisabledButton={isLoadingSaveQuery}
      />
      <div className="flex flex-col mt-6 gap-6">
        <div className="flex gap-6">
          <AdminUploadImage
            label={"icon"}
            size="48 x 48"
            width={48}
            height={48}
            value={inputs.logo1}
            onChange={(e) => handleChange("logo1", e)}
          />
          <AdminUploadImage
            label={"icon"}
            size="48 x 48"
            width={48}
            height={48}
            value={inputs.logo2}
            onChange={(e) => handleChange("logo2", e)}
          />
          <AdminUploadImage
            label={"icon"}
            size="48 x 48"
            width={48}
            height={48}
            value={inputs.logo3}
            onChange={(e) => handleChange("logo3", e)}
          />
        </div>
        <div className="bg-input flex flex-col  rounded-[16px]">
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            name="blockTitle"
            label="mainBlock"
            value={{
              rus: inputs.block.blockTitleru,
              en: inputs.block.blockTitleen,
            }}
            onChange={(e, value) => handleChange(e, value, "block")}
          />
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            minTextAreaHeight={250}
            name="blockText"
            value={{
              rus: inputs.block.blockTextru,
              en: inputs.block.blockTexten,
            }}
            onChange={(e, value) => handleChange(e, value, "block")}
          />
        </div>
        <div className="bg-input flex flex-col  rounded-[16px]">
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            name="blockTitle"
            label="guarante1"
            value={{
              rus: inputs.block1.blockTitleru,
              en: inputs.block1.blockTitleen,
            }}
            onChange={(e, value) => handleChange(e, value, "block1")}
          />
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            minTextAreaHeight={250}
            name="blockText"
            value={{
              rus: inputs.block1.blockTextru,
              en: inputs.block1.blockTexten,
            }}
            onChange={(e, value) => handleChange(e, value, "block1")}
          />
        </div>
        <div className="bg-input flex flex-col  rounded-[16px]">
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            name="blockTitle"
            label="guarante2"
            value={{
              rus: inputs.block2.blockTitleru,
              en: inputs.block2.blockTitleen,
            }}
            onChange={(e, value) => handleChange(e, value, "block2")}
          />
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            minTextAreaHeight={250}
            name="blockText"
            value={{
              rus: inputs.block2.blockTextru,
              en: inputs.block2.blockTexten,
            }}
            onChange={(e, value) => handleChange(e, value, "block2")}
          />
        </div>
        <div className="bg-input flex flex-col  rounded-[16px] mb-6">
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            name="blockTitle"
            label="guarante3"
            value={{
              rus: inputs.block3.blockTitleru,
              en: inputs.block3.blockTitleen,
            }}
            onChange={(e, value) => handleChange(e, value, "block3")}
          />
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            maxLength={300}
            minTextAreaHeight={250}
            name="blockText"
            value={{
              rus: inputs.block3.blockTextru,
              en: inputs.block3.blockTexten,
            }}
            onChange={(e, value) => handleChange(e, value, "block3")}
          />
        </div>
      </div>
    </AdminContainer>
  );
};

export default GuaranteAdminView;
