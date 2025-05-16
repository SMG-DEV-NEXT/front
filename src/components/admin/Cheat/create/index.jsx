"use client";

import AdminBox from "@/components/admin/components/Box";
import AdminContainer from "@/components/admin/components/container";
import AdminPageHeader from "@/components/admin/components/header";
import AdminUploadImage from "@/components/admin/components/ImageUpload";
import TagSelector from "@/components/admin/components/TagSelector";
import AdminUpload from "@/components/admin/components/Upload";
import Text from "@/components/Text";
import { AdminCatalog, CheatService } from "@/services/Admin";
import cheatTypes from "@/utils/cheat-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FunctionsCheat from "./functions";
import Requirments from "./requirments";
import getBody from "@/utils/getBodyForCreateCheat";

const CheatCreate = () => {
  const t = useTranslations("admin");
  const { data, isPending } = useQuery({
    queryFn: AdminCatalog.getAllCatalogs,
    queryKey: ["get-all"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  const initialInputs = {
    titleEn: "Title Game",
    titleRu: "Title Game",
    status: { label: t("active"), value: "published", color: "#22C55E" },
    position: 1,
    aboutRu: "",
    aboutEn: "",
    image1: "",
    image2: "",
    catalog: null,
    type: cheatTypes[0],
    link: "",
    metaTitleRu: "",
    metaTitleEn: "",
    metaRu: "",
    metaEn: "",
    tags: [],
    images: [],
    videos: [],
    imageUrl: "",
    functions: [],
    instructionRu: "",
    instructionEn: "",
    requirments: {},
    minimumPrice: 1000,
  };
  const [inputs, setInputs] = useState(initialInputs);

  const mutation = useMutation({
    mutationFn: CheatService.createCheat,
    mutationKey: ["Create"],
    onSuccess: (e) => {
      if (e) {
        toast.success("Created successfuly!");
        setInputs(initialInputs);
      }
    },
  });

  const handleChangeInput = (name, value) => {
    setInputs((e) => ({
      ...e,
      [name]: value,
    }));
  };

  const statusLabels = [
    { label: t("active"), value: "published", color: "#22C55E" },
    { label: t("inactive"), value: "unpublished", color: "#DE5959" },
  ];

  const onClickSaveButton = () => {
    mutation.mutate(getBody(inputs));
  };

  const options = data?.data
    ? data.data.map((e) => ({ label: e.title, value: e.id }))
    : null;

  return (
    <AdminContainer>
      <AdminPageHeader
        buttonText="save"
        route="cheats/create"
        buttonOnClick={onClickSaveButton}
        isDisabledButton={mutation.isPending}
        settingsRoute={"cheat"}
      />
      <div className="flex flex-col gap-6 mt-6 pb-6">
        <AdminBox
          value={{ rus: inputs.titleRu, en: inputs.titleEn }}
          name="title"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"cheatTitle"}
        />
        <AdminBox
          value={{ rus: inputs.aboutRu, en: inputs.aboutEn }}
          name="about"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"cheatAbout"}
        />
        {/* <AdminBox
          value={inputs.minimumPrice}
          name="minimumPrice"
          type="number"
          onChange={handleChangeInput}
          label={"minimumPrice"}
        /> */}
        <div className="flex gap-6">
          <AdminUploadImage
            label={"cheatOblojka"}
            value={inputs.image1}
            onChange={(e) => handleChangeInput("image1", e)}
          />
          <AdminUploadImage
            label={"cheatPrevyu"}
            value={inputs.image2}
            onChange={(e) => handleChangeInput("image2", e)}
          />
        </div>
        <div className="flex gap-6">
          {data && (
            <AdminBox
              value={inputs.catalog}
              name="catalog"
              select={options}
              onChange={handleChangeInput}
              label={"cheatCategory"}
            />
          )}
          <AdminBox
            value={inputs.type}
            name="type"
            select={cheatTypes}
            onChange={handleChangeInput}
            label={"cheatStatus"}
          />
          <AdminBox
            value={inputs.status}
            name="status"
            select={statusLabels}
            onChange={handleChangeInput}
            label={"siteStatus"}
          />
        </div>
        <AdminBox
          value={inputs.link}
          name="link"
          onChange={handleChangeInput}
          label={"cheatLink"}
        />
        <Text T="none" weight="bold" size="lg" className="text-primary10">
          SEO
        </Text>
        <AdminBox
          value={{ rus: inputs.metaTitleRu, en: inputs.metaTitleEn }}
          name="metaTitle"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"head"}
        />
        <AdminBox
          value={{ rus: inputs.metaRu, en: inputs.metaEn }}
          name="meta"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"meta"}
        />
        <TagSelector
          value={inputs.tags}
          onChange={handleChangeInput}
          name="tags"
        />
        <Text T="admin" weight="bold" size="lg" className="text-primary10">
          more
        </Text>
        <div className="flex gap-6">
          <AdminUpload
            links={inputs.images}
            countOfFiles={10}
            label={"cheatImages"}
            onChange={handleChangeInput}
            name="images"
          />
          <AdminUpload
            links={inputs.videos}
            countOfFiles={1}
            width={300}
            label={"video"}
            onChange={handleChangeInput}
            name="videos"
            type="video"
          />
        </div>
        <FunctionsCheat
          functions={inputs.functions}
          onChange={handleChangeInput}
        />
        <Requirments value={inputs.requirments} onChange={handleChangeInput} />
        <AdminBox
          value={{ rus: inputs.instructionRu, en: inputs.instructionEn }}
          name="instruction"
          maxLength={300}
          isMultipleLanguage={true}
          onChange={handleChangeInput}
          label={"instruction"}
        />
        <div className="flex gap-2 items-start">
          <AdminBox
            value={inputs.position}
            name="position"
            type="number"
            onChange={handleChangeInput}
            label={"position"}
          />

          <AdminUploadImage
            label={"logo"}
            size={40}
            value={inputs.imageUrl}
            onChange={(e) => handleChangeInput("imageUrl", e)}
          />
        </div>
      </div>
    </AdminContainer>
  );
};

export default CheatCreate;

// {
//   "titleEn": string,
//   "titleRu":  string,
//   "status": publish || unpublish,
//   "position": number,
//   "aboutRu": string,
//   "aboutEn": string,
//   "image1": string,
//   "image2": string,
//   "categorId": string,
//   "type": undetected || detected,update,risk,freeze,
//   "link": string,
//   "metaTitleRu": string,
//   "metaTitleEn": string,
//   "metaRu": string,
//   "metaEn": string,
//   "tags": [
//       {
//           "ru": "asdas",
//           "en": "asda"
//       }
//   ],
//   "images": string[
//       "https://res.cloudinary.com/dqdiocjpu/image/upload/v1743016734/nextjs_uploads/qeh1cfxr0nyjlc56s6jt.png"
//   ],
//   "videos":string[
//       "https://res.cloudinary.com/dqdiocjpu/video/upload/v1743016741/nextjs_uploads/snmx0cl5yzry3blb4fhy.mp4"
//   ],
//   "imageUrl": string,
//   "functions": [
//       {
//           "title": "asdasdas",
//           "functions": [
//               {
//                   "title": "asdasd",
//                   "about": "asdas"
//               }
//           ]
//       }
//   ],
//   "instructionRu": string,
//   "instructionEn": string,
//   "requirments": {name:value}[]
// }
