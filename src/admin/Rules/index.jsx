"use client";

import { useSettings } from "@/context/Middle";
import React, { useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import AdminUploadImage from "../components/ImageUpload";
import AdminBox from "../components/Box";

const RulesAdminView = () => {
  const { updateSetting, settings, isLoading, isLoadingSaveQuery } =
    useSettings();
  const [inputs, setInputs] = useState({
    textru: "",
    texten: "",
    ...(settings.data.find((e) => e.title === "rules")?.settings || {}),
  });

  const handleChange = (n, value, block) => {
    const name = n;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <AdminContainer>
      <AdminPageHeader
        route="rules"
        buttonText="save"
        buttonOnClick={() => updateSetting("rules", inputs)}
        isDisabledButton={isLoadingSaveQuery}
      />
      <div className="mt-6">
        <AdminBox
          isMultipleLanguage={true}
          isUpperCode={false}
          maxLength={300}
          name="text"
          label="rules"
          minTextAreaHeight={250}
          value={{
            rus: inputs.textru,
            en: inputs.texten,
          }}
          onChange={(e, value) => handleChange(e, value)}
        />
      </div>
    </AdminContainer>
  );
};

export default RulesAdminView;
