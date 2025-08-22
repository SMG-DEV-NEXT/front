"use client";

import Text from "@/components/Text";
import React from "react";
import AdminBox from "../../Box";
import { Star } from "@/components/Cheat/Comment";

const CommentDisabledInput = ({ label, value }) => {
  return (
    <div className="flex bg-input dark-box gap-4 w-full flex-col p-4 rounded-[16px]">
      <Text
        T="admin"
        weight="semi"
        size="md"
        className="text-primary10 dark:text-linkColor"
      >
        {label}
      </Text>
      <div className="flex rounded-[8px] pr-2 pl-3 py-[6px] border border-[#919EAB3D]">
        <Text
          T="none"
          weight="semi"
          size="md"
          className="text-primary10 dark:text-linkColor"
        >
          {value}
        </Text>
      </div>
    </div>
  );
};

export const CommentEditor = ({ inputs, setInputs }) => {
  return (
    <div className="flex bg-input dark-box gap-4 w-full flex-col rounded-[16px]">
      <div className="flex flex-col">
        <AdminBox
          label="review"
          value={inputs.text || ""}
          viewLength={true}
          name={"text"}
          style={{ border: "none" }}
          onChange={(e, v) => setInputs({ ...inputs, text: v })}
          maxLength={300}
        />
        <div className="flex w-full justify-between px-4 pb-4">
          <Text
            T="admin"
            weight="semi"
            size="md"
            className="text-primary10 dark:text-linkColor"
          >
            review
          </Text>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((e) => {
              return (
                <div
                  className="flex w-5 h-5 cursor-pointer"
                  onClick={() => setInputs({ ...inputs, stars: e })}
                >
                  <Star color={e <= inputs.stars ? "#8B6DCA" : "#637381"} />
                </div>
              );
            })}
            <Text
              T="none"
              weight="semi"
              size="md"
              className="text-primary10 dark:text-linkColor"
            >
              {inputs.stars}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDisabledInput;
