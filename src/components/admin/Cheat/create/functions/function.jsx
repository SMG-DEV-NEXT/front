"use client";

import AdminButton from "@/components/admin/components/button";
import Icon from "@/components/Icons";
import Input from "@/components/Input";
import Text from "@/components/Text";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const FunctionItem = ({ f, onChangeTitle, onAddItem, onDeleteItem }) => {
  const [inputs, setInputs] = useState({
    title: "",
    about: "",
  });

  useEffect(() => {
    setInputs({
      title: "",
      about: "",
    });
  }, [f]);

  const handleAddElement = () => {
    const { title, about } = inputs;
    if (!title.length && !about.length) {
      toast.error("Fields is missing.");
      return;
    }
    onAddItem(inputs);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap p-[11px] bg-black rounded-[10px] gap-2">
        {!!f.functions.length ? (
          f.functions.map((e, i) => {
            return (
              <Tooltip
                title={e.about}
                interactive={true}
                position="right"
                trigger="mouseenter"
                arrow={true}
                arrowSize="big" // Makes the triangle bigger
                className="custom-tooltip"
              >
                <div
                  key={i}
                  className="py-[2px] px-[6px] flex items-center gap-[6px] bg-[#7B829329] rounded-[6px]"
                >
                  <Text T="none" weight="semi" className="text-[#97A0B5]">
                    {e.title}
                  </Text>
                  <div
                    className="flex cursor-pointer"
                    onClick={() => onDeleteItem(i)}
                  >
                    <Icon name="remove" folder="admin" size={13} />
                  </div>
                </div>
              </Tooltip>
            );
          })
        ) : (
          <Text T="none" weight="semi" size="md" className="text-primary10">
            Empty
          </Text>
        )}
      </div>
      <div className="flex gap-2 items-end mt-2">
        <Input
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          label="title"
          styleDiv={{ backgroundColor: "#272c33", height: "38px" }}
        />
        <Input
          value={inputs.about}
          onChange={(e) => setInputs({ ...inputs, about: e.target.value })}
          label="tooltip"
          styleDiv={{ backgroundColor: "#272c33", height: "38px" }}
        />
        <div className="flex mb-1">
          <AdminButton onClick={handleAddElement}>add</AdminButton>
        </div>
      </div>
    </div>
  );
};

export default FunctionItem;
