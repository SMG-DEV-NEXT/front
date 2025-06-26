"use client";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AdminContainer from "../components/container";
import { useMutation, useQuery } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import Loading from "@/app/loading";
import AdminPageHeader from "../components/header";
import CommentDisabledInput, {
  CommentEditor,
} from "../components/Comments/Inputs";
import moment from "moment";
import { toast } from "react-toastify";

const CommentEdit = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({});
  const { data, isPending } = useQuery({
    queryKey: ["get-comment", id],
    queryFn: () => CheatsService.getComment(id),
    refetchOnWindowFocus: false,
  });

  const mutate = useMutation({
    mutationFn: CheatsService.saveComment,
    mutationKey: ["update"],
    onSuccess: () => {
      toast.success("Updated!");
    },
  });

  useEffect(() => {
    if (data?.data) {
      setInputs(data.data);
    }
  }, [data]);

  if (!data?.data && !isPending) return notFound();

  const onClickSaveButton = () => {
    mutate.mutate({
      id,
      data: {
        text: inputs.text,
        stars: inputs.stars,
      },
    });
  };

  if (isPending || !data?.data || !data?.data?.user) {
    return <Loading />;
  }

  return (
    <AdminContainer>
      <AdminPageHeader
        buttonText="save"
        route="comment/edit"
        buttonOnClick={onClickSaveButton}
        isDisabledButton={mutate.isPending}
        settingsRoute={data?.data?.user?.name}
      />
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex gap-6">
          <CommentDisabledInput
            label="date"
            value={moment(data.data.createdAt).format("DD.MM.YYYY")}
          />
          <CommentDisabledInput label="userName" value={data.data.user.name} />
          <CommentDisabledInput
            label="category"
            value={data.data.cheat.catalog.title}
          />
          <CommentDisabledInput label="cheat" value={data.data.cheat.titleRu} />
        </div>
        <CommentEditor inputs={inputs} setInputs={setInputs} />
      </div>
    </AdminContainer>
  );
};

export default CommentEdit;
