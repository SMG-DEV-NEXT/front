"use client";

import React, { useEffect, useState } from "react";
import AdminContainer from "../components/container";
import AdminPageHeader from "../components/header";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FAQService } from "@/services/FAQ";
import { useLocale } from "next-intl";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
import AdminBox from "../components/Box";
import DeleteModal from "../../admin/components/Modals/deleteModal";
import Text from "@/components/Text";
import AdminButton from "../components/button";
import Icon from "@/components/Icons";
import Modal from "@/components/Modal";

const FaqBlockEdit = () => {
  const locale = useLocale();
  const router = useRouter();
  const [deleteInformation, setDeleteInformation] = useState({
    isOpenModal: false,
    titleCatalog: "",
    isMultiple: false,
  });
  const [inputs, setInputs] = useState({
    titleen: "",
    titleru: "",
    aboutru: "",
    abouten: "",
  });
  const { id } = useParams();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["get-faq-block", id],
    queryFn: () => FAQService.getBlockFaq(id),
    staleTime: 0,
    cacheTime: 0,
  });

  const deleteFaqStat = useMutation({
    mutationFn: FAQService.deleteFaqStat,
    mutationKey: ["delete-faq"],
    onSuccess: () => {
      toast.success("Deleted");
      refetch();
    },
  });

  const updateMutation = useMutation({
    mutationFn: FAQService.updateBlock,
    mutationKey: "update-faq",
    onSuccess: () => {
      toast.success("Updated successfuly.");
    },
  });

  useEffect(() => {
    if (data?.data) {
      setInputs({
        titleen: data?.data.titleen,
        titleru: data?.data.titleru,
        aboutru: data?.data.aboutru || "",
        abouten: data?.data.abouten || "",
      });
    }
  }, [data]);

  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name.toLowerCase()]: value,
    });
  };

  const handleDeleteStat = () => {
    deleteFaqStat.mutate(deleteInformation.id);
  };

  const handleUpdateFaqBlock = () => {
    updateMutation.mutate({ id, data: inputs });
  };
  const onClickDeleteIcon = (title, id) => {
    setDeleteInformation({
      isOpenModal: true,
      titleCheat: title,
      id,
    });
  };

  const onCloseDeleteModal = () => {
    setDeleteInformation({
      isMultiple: false,
      isOpenModal: false,
      titleCheat: "",
    });
  };
  if (isPending) return <Loading />;
  return (
    <AdminContainer>
      {deleteInformation.isOpenModal && (
        <Modal
          onClose={onCloseDeleteModal}
          customTop={150}
          isOpen={deleteInformation.isOpenModal}
        >
          <DeleteModal
            onDelete={() => {
              handleDeleteStat(deleteInformation.id);
              onCloseDeleteModal();
            }}
            onClose={onCloseDeleteModal}
            text={deleteInformation.titleCheat}
          />
        </Modal>
      )}
      <div className="flex flex-col gap-4">
        <AdminPageHeader
          route="faq"
          buttonText="save"
          isDisabledButton={updateMutation.isPending}
          buttonOnClick={handleUpdateFaqBlock}
          settingsRoute={
            inputs[`title${locale}`] || data?.data[`title${locale}`]
          }
        />
        <div className="flex flex-col gap-4">
          <div className="bg-input rounded-2xl flex flex-col">
            <AdminBox
              isMultipleLanguage={true}
              value={{ rus: inputs.titleru, en: inputs.titleen }}
              onChange={handleChange}
              isInput={true}
              name="title"
              maxLength={300}
              label="title"
            />

            <AdminBox
              isMultipleLanguage={true}
              value={{ rus: inputs.aboutru, en: inputs.abouten }}
              onChange={handleChange}
              name="about"
              maxLength={300}
              label="about"
            />
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex w-full justify-between">
              <Text
                T="admin"
                weight="semi"
                size="lg"
                className="text-primary10"
              >
                faqStats
              </Text>

              <AdminButton
                onClick={() => router.push(`/${locale}/admin/faq/${id}/create`)}
              >
                createStat
              </AdminButton>
            </div>
            {data?.data.stats.map((e, i) => {
              const data = JSON.parse(e.data);
              return (
                <div
                  key={e.id}
                  className="flex bg-input items-center justify-between rounded-2xl p-4"
                >
                  <Text
                    T="none"
                    weight="semi"
                    size="lg"
                    className="text-primary10"
                  >
                    {i + 1} {data[`title${locale}`]}
                  </Text>
                  <div className="flex gap-2 items-center">
                    <AdminButton
                      isDelete={true}
                      disabled={deleteFaqStat.isPending}
                      onClick={() => {
                        onClickDeleteIcon(data[`title${locale}`], e.id);
                      }}
                    >
                      delete
                    </AdminButton>
                    <AdminButton
                      onClick={() =>
                        router.push(`/${locale}/admin/faq/${id}/${e.id}`)
                      }
                    >
                      settings
                    </AdminButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default FaqBlockEdit;
