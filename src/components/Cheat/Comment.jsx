"use client";
{
  /* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.361 2.7265C9.03157 1.31382 10.9691 1.31382 11.6396 2.7265L12.7986 5.16797C13.0649 5.72895 13.5796 6.11777 14.175 6.20773L16.7664 6.59924C18.2659 6.82577 18.8646 8.74161 17.7796 9.84123L15.9044 11.7417C15.4736 12.1783 15.277 12.8074 15.3787 13.424L15.8213 16.1074C16.0775 17.6601 14.51 18.8442 13.1689 18.1111L10.851 16.8442C10.3184 16.5531 9.6822 16.5531 9.14964 16.8442L6.83179 18.1111C5.49065 18.8442 3.92318 17.6601 4.17931 16.1075L4.62198 13.424C4.72369 12.8074 4.52709 12.1783 4.09623 11.7417L2.22105 9.84123C1.13605 8.74161 1.73477 6.82577 3.23421 6.59924L5.82564 6.20773C6.42107 6.11777 6.9358 5.72895 7.20208 5.16797L8.361 2.7265Z" fill="#79CA6D"/>
</svg> */
}

import React, { useState } from "react";
import Text from "../Text";
import "./index.scss";
import Input from "../Input";
import Button from "../Button";
import { useLocale, useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import CheatsService from "@/services/Cheats";
import { toast } from "react-toastify";
import moment from "moment";

export const Star = ({ color }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M8.361 2.7265C9.03157 1.31382 10.9691 1.31382 11.6396 2.7265L12.7986 5.16797C13.0649 5.72895 13.5796 6.11777 14.175 6.20773L16.7664 6.59924C18.2659 6.82577 18.8646 8.74161 17.7796 9.84123L15.9044 11.7417C15.4736 12.1783 15.277 12.8074 15.3787 13.424L15.8213 16.1074C16.0775 17.6601 14.51 18.8442 13.1689 18.1111L10.851 16.8442C10.3184 16.5531 9.6822 16.5531 9.14964 16.8442L6.83179 18.1111C5.49065 18.8442 3.92318 17.6601 4.17931 16.1075L4.62198 13.424C4.72369 12.8074 4.52709 12.1783 4.09623 11.7417L2.22105 9.84123C1.13605 8.74161 1.73477 6.82577 3.23421 6.59924L5.82564 6.20773C6.42107 6.11777 6.9358 5.72895 7.20208 5.16797L8.361 2.7265Z"
      />
    </svg>
  );
};

const StarsColors = ["#79CA6D", "#CAC86D", "#CA9A6D"];

const Comment = ({ starTab, mobile, comment }) => {
  const star = starTab > 3 ? 0 : starTab > 1 ? 1 : 2;
  const StarColor = StarsColors[star];
  const t = useTranslations("comments");
  if (mobile) {
    return (
      <div className="flex bg-black justify-between rounded-[12px] py-[18px] px-[14px] items-center">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center justify-between">
            <Text
              T="none"
              className="text-primary10 leading-[140%]"
              weight="bold"
              size="md"
            >
              {comment.user.email}
            </Text>
            <div
              style={{ backgroundColor: `${StarColor}26` }}
              className={`flex gap-1 py-2 px-3 bg-[${StarColor}26] items-center rounded-[8px]`}
            >
              <Text
                T="none"
                style={{ color: StarColor }}
                className={`text-[${StarColor}]`}
                weight="semi"
                size="sm"
              >
                {comment.stars}
              </Text>
              <Star color={StarColor} />
            </div>
          </div>
          <Text className="text-primary10" T="none" weight="medium" size="sm">
            {comment.text}
          </Text>
        </div>
      </div>
    );
  }
  return (
    <div className="flex bg-black justify-between rounded-[12px] py-[18px] px-6 items-center">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Text
            T="none"
            className="text-primary10 leading-[120%]"
            weight="bold"
            size="md"
          >
            {comment.user.email}
          </Text>
          <Text className="text-linkColor" T="none" weight="medium" size="sm">
            {moment(comment.createdAt).format("DD.MM.YY")} {t("V")}{" "}
            {moment(comment.createdAt).format("HH:mm")}
          </Text>
        </div>
        <Text className="text-primary10" T="none" weight="medium" size="sm">
          {comment.text}
        </Text>
      </div>
      <div
        style={{ backgroundColor: `${StarColor}26` }}
        className={`flex gap-1 py-2 px-3 bg-[${StarColor}26] items-center rounded-[8px]`}
      >
        <Text
          T="none"
          style={{ color: StarColor }}
          className={`text-[${StarColor}]`}
          weight="semi"
          size="sm"
        >
          {comment.stars}
        </Text>
        <Star color={StarColor} />
      </div>
    </div>
  );
};

const CommentInput = ({
  value,
  setValue,
  mobile,
  send,
  stars,
  setStars,
  isLoading,
}) => {
  const t = useTranslations("comments");

  if (mobile) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 py-[18px] bg-black rounded-[12px] px-6">
          <Text
            T="comments"
            className="text-linkColor whitespace-nowrap
"
            weight="medium"
            size="sm"
          >
            myStar
          </Text>
          {Array.from({ length: 5 }).map((e, i) => {
            return (
              <div className="cursor-pointer" onClick={() => setStars(i + 1)}>
                <Star
                  color={i < stars ? StarsColors[0] : `${StarsColors[0]}26`}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full">
          {" "}
          <Input
            placeholder={t("enterComment")}
            styleDiv={{ backgroundColor: "#272C33", padding: "18px 24px" }}
            value={value}
            setValue={setValue}
          ></Input>
        </div>

        <Button
          T="comments"
          disabled={isLoading}
          className="mt-3 h-[56px]"
          onClick={send}
        >
          send
        </Button>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="w-full">
        {" "}
        <Input
          placeholder={t("enterComment")}
          styleDiv={{ backgroundColor: "#272C33", padding: "18px 24px" }}
          value={value}
          setValue={setValue}
        ></Input>
      </div>
      <div className="flex items-center gap-2 py-[18px] bg-black rounded-[12px] px-6">
        <Text
          T="comments"
          className="text-linkColor whitespace-nowrap
"
          weight="medium"
          size="sm"
        >
          myStar
        </Text>
        {Array.from({ length: 5 }).map((e, i) => {
          return (
            <div className="cursor-pointer" onClick={() => setStars(i + 1)}>
              <Star
                color={i < stars ? StarsColors[0] : `${StarsColors[0]}26`}
              />
            </div>
          );
        })}
      </div>
      <Button T="comments" disabled={isLoading} onClick={send}>
        send
      </Button>
    </div>
  );
};

const Comments = ({ mobile, cheat }) => {
  const [value, setValue] = useState("");
  const locale = useLocale();
  const [stars, setStars] = useState(5);
  const [comments, setComments] = useState(cheat.comments);
  const { user } = useSelector((state) => state.auth);

  const handleSend = useMutation({
    mutationFn: CheatsService.createComment,
    mutationKey: ["create"],
    onSuccess: (e) => {
      if (!e.data) return;
      toast.success(
        locale === "ru" ? "Комментарий отправлен" : "Comment submitted"
      );
      setValue("");
      setStars(5);
      setComments([...comments, e.data]);
    },
  });

  const handleSendComment = () => {
    handleSend.mutate({
      cheatId: cheat.id,
      text: value,
      stars,
    });
  };

  const isOpenInput = () => {
    const email = user.email;
    const comment = comments.find((e) => e.user.email == email);
    return !comment;
  };

  if (mobile) {
    return (
      <div className="flex flex-col w-full gap-4">
        <Text
          T="comments"
          className="text-primary10 leading-[140%]"
          weight="bold"
          size="xl"
        >
          title
        </Text>
        <div className="flex flex-col gap-6 bg-input rounded-[16px] p-6">
          {comments.length > 0 && (
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[360px] comment-scroll pr-2">
              {comments.map((e) => {
                return (
                  <Comment
                    starTab={e.stars}
                    key={e.id}
                    comment={e}
                    mobile={mobile}
                  />
                );
              })}
            </div>
          )}
          {user ? (
            <>
              {isOpenInput() ? (
                <CommentInput
                  stars={stars}
                  setStars={setStars}
                  send={handleSendComment}
                  mobile={mobile}
                  value={value}
                  isLoading={handleSend.isPending}
                  setValue={setValue}
                />
              ) : (
                <div className="py-[18px] rounded-[12px] px-6 bg-black">
                  <Text
                    T="comments"
                    className="text-linkColor"
                    size="sm"
                    weight="medium"
                  >
                    commentLimit
                  </Text>
                </div>
              )}
            </>
          ) : (
            <div className="py-[18px] rounded-[12px] px-6 bg-black">
              <Text
                T="comments"
                className="text-linkColor"
                size="sm"
                weight="medium"
              >
                forSendMessage
              </Text>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-4 mt-[48px]">
      <Text
        T="comments"
        className="text-primary10 leading-[140%]"
        weight="bold"
        size="xl"
      >
        title
      </Text>
      <div className="flex flex-col gap-6 bg-input rounded-[16px] p-6">
        {comments.length > 0 && (
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[360px] comment-scroll pr-2">
            {comments.map((e) => {
              return (
                <Comment
                  starTab={e.stars}
                  key={e.id}
                  comment={e}
                  mobile={mobile}
                />
              );
            })}
          </div>
        )}
        {user ? (
          <>
            {isOpenInput() ? (
              <CommentInput
                stars={stars}
                setStars={setStars}
                send={handleSendComment}
                mobile={mobile}
                value={value}
                isLoading={handleSend.isPending}
                setValue={setValue}
              />
            ) : (
              <div className="py-[18px] rounded-[12px] px-6 bg-black">
                <Text
                  T="comments"
                  className="text-linkColor"
                  size="sm"
                  weight="medium"
                >
                  commentLimit
                </Text>
              </div>
            )}
          </>
        ) : (
          <div className="py-[18px] rounded-[12px] px-6 bg-black">
            <Text
              T="comments"
              className="text-linkColor"
              size="sm"
              weight="medium"
            >
              forSendMessage
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
