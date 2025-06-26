"use client";

import React, { useEffect, useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { FAQService } from "@/services/FAQ";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Text from "@/components/Text";
import AdminBox from "../components/Box";
import AdminUploadImage from "@/components/admin/components/ImageUpload";
import { toast } from "react-toastify";
import AdminButton from "../components/button";
import CodeEditor from "./bloks/Code";
import Blok from "./bloks/blok";
import Screenshot from "./bloks/Screenshots";
import ButtonEditor from "./bloks/button";
import DownloadTable from "./bloks/tableEditor";
import Icon from "@/components/Icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

const blocksTypes = [
  {
    label: "blok",
    icon: "blok",
  },
  {
    label: "screenshot",
    icon: "screenshot",
  },
  {
    label: "goto",
    icon: "url",
  },
  {
    label: "code",
    icon: "code",
  },
  {
    label: "table",
    icon: "table",
  },
];

const AdminFaqStatView = () => {
  const locale = useLocale();
  const { id, stat: idStat } = useParams();
  const router = useRouter();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [dataStat, setDataStat] = useState({
    titleru: "",
    titleen: "",
    icon: "",
    textru: "",
    texten: "",
    iconActive: "",
  });
  const [bloks, setBloks] = useState([]);
  const { data, isPending } = useQuery({
    queryKey: "get-faq-block",
    queryFn: () => FAQService.getBlockFaq(id),
  });

  const { data: allStats, isPending: isLoadingStats } = useQuery({
    queryKey: "get-faq-stats",
    queryFn: () => FAQService.getAllStats(),
  });

  const { data: stat, isPending: loadingStat } = useQuery({
    queryKey: ["get-faq-stat", idStat],
    queryFn: () => FAQService.getFaqStat(idStat),
    enabled: idStat !== "create",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (stat && stat.data) {
      setDataStat({
        ...JSON.parse(stat.data.data),
      });
      setBloks(JSON.parse(stat.data.content));
    }
  }, [stat]);

  const createStat = useMutation({
    mutationFn: FAQService.createFaqStat,
    mutationKey: "create-faq-stat",
    onSuccess: ({ data }) => {
      if (data && data.id) {
        setDataStat({
          titleru: "",
          titleen: "",
          icon: "",
          textru: "",
          texten: "",
          iconActive: "",
        });
        toast.success("Created successfuly");
        router.push(`/${locale}/admin/faq/${id}/${data.id}`);
      }
    },
  });

  const updateStat = useMutation({
    mutationFn: FAQService.updateFaqStat,
    mutationKey: "update-faq-stat",
    onSuccess: () => {
      toast.success("Updated successfuly");
    },
  });

  const handleDataChange = (name, value) => {
    setDataStat({
      ...dataStat,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (idStat === "create") {
      createStat.mutate({
        faqBlockId: id,
        type: "CUSTOM",
        content: JSON.stringify(bloks),
        data: JSON.stringify(dataStat),
      });
    } else {
      updateStat.mutate({
        statId: idStat,
        data: {
          content: JSON.stringify(bloks),
          data: JSON.stringify(dataStat),
        },
      });
    }
  };

  const handleChangeBlok = (order, name, value) => {
    const newBloks = bloks.map((e) => {
      if (e.order === order) {
        return {
          ...e,
          [name]: value,
        };
      }
      return e;
    });
    setBloks(newBloks);
  };
  console.log(
    isPending || (loadingStat && idStat !== "create") || isLoadingStats
  );
  if (isPending || (loadingStat && idStat !== "create") || isLoadingStats)
    return <Loading />;

  const handleAddBlock = (type) => {
    if (type === "table") {
      return setBloks([
        ...bloks,
        { type, order: bloks.length, rows: [], cols: [] },
      ]);
    }
    setBloks([...bloks, { type, order: bloks.length }]);
  };

  const handleDeleteBlock = (order) => {
    setBloks(
      bloks.filter((e) => e.order !== order).map((e, i) => ({ ...e, order: i }))
    );
  };

  return (
    <AdminContainer>
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          route="faq"
          buttonText="save"
          buttonOnClick={handleSave}
          isDisabledButton={createStat.isPending || updateStat.isPending}
          settingsRoute={data?.data[`title${locale}`]}
          faqStatRoute={dataStat[`title${locale}`] || "New Stat"}
        />
        <div className="flex flex-col p-4 gap-4 bg-input rounded-2xl mt-6">
          <Text T="admin" weight="bold" size="md" className="text-primary10">
            mainInformation
          </Text>
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            style={{ padding: "0px" }}
            value={{ rus: dataStat.titleru, en: dataStat.titleen }}
            onChange={handleDataChange}
            name="title"
            label="title"
          />
          <AdminBox
            isMultipleLanguage={true}
            isUpperCode={false}
            style={{ padding: "0px" }}
            value={{ rus: dataStat.textru, en: dataStat.texten }}
            onChange={handleDataChange}
            name="text"
            label="about"
          />
          <div className="flex gap-4">
            <AdminUploadImage
              label={"logoInactive"}
              size="20 x 20"
              width={20}
              height={20}
              value={dataStat.icon}
              onChange={(e) => handleDataChange("icon", e)}
            />
            <AdminUploadImage
              label={"logoActive"}
              size="20 x 20"
              width={20}
              height={20}
              value={dataStat.iconActive}
              onChange={(e) => handleDataChange("iconActive", e)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between w-full">
            <Text T="admin" weight="semi" size="lg" className="text-primary10">
              bloks
            </Text>
            <Dropdown>
              <DropdownTrigger>
                <div
                  className="flex cursor-pointer bg-primary80 px-3 py-[6px] rounded-[8px]"
                  style={{ maxWidth: "max-content" }}
                >
                  <Text
                    T="admin"
                    size="sm"
                    weight="semi"
                    className="text-[#141A21]"
                  >
                    add
                  </Text>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select Blok"
                className="flex flex-col rounded-2xl overflow-hidden items-center"
              >
                {blocksTypes.map((e) => {
                  return (
                    <DropdownItem
                      key={e.label}
                      onClick={() => handleAddBlock(e.label)}
                      className="language-item justify-center"
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={20} name={e.icon} folder="admin" />
                        <Text
                          T="admin"
                          className="text-linkColor"
                          weight="medium"
                          size="sm"
                        >
                          {e.label}
                        </Text>
                      </div>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          {bloks.map((e) => {
            if (e.type === "code") {
              return (
                <CodeEditor
                  {...e}
                  handleChange={handleChangeBlok}
                  handleDelete={handleDeleteBlock}
                />
              );
            }
            if (e.type === "blok") {
              return (
                <Blok
                  {...e}
                  handleChange={handleChangeBlok}
                  handleDelete={handleDeleteBlock}
                />
              );
            }
            if (e.type === "screenshot") {
              return (
                <Screenshot
                  {...e}
                  handleChange={handleChangeBlok}
                  handleDelete={handleDeleteBlock}
                />
              );
            }
            if (e.type === "goto") {
              return (
                <ButtonEditor
                  {...e}
                  handleChange={handleChangeBlok}
                  values={allStats.data}
                  locale={locale}
                  handleDelete={handleDeleteBlock}
                />
              );
            }
            if (e.type === "table") {
              return (
                <DownloadTable
                  {...e}
                  handleChange={handleChangeBlok}
                  handleDelete={handleDeleteBlock}
                />
              );
            }
            return <div>{e.type}</div>;
          })}
        </div>
      </div>
    </AdminContainer>
  );
};

export default AdminFaqStatView;
