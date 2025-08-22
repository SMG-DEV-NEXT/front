"use client";
import AdminBox from "@/components/admin/components/Box";
import React, { useEffect, useState } from "react";
import Tab from "./Tab";
import Text from "@/components/Text";
import Input from "@/components/Input";
import AdminButton from "@/components/admin/components/button";
import EdtiBlokTab from "./EditBlokTab";
import { toast } from "react-toastify";
const TabEditModal = ({
  tab,
  handleSaveTabFunction,
  selectedBlock,
  setSelectedBlock,
  theme,
}) => {
  const [inputs, setInputs] = useState({ ...tab, oldKey: tab.key });
  const [newFunctionValue, setNewFunctionValue] = useState("");
  const handleChangeInput = (name, value) => {
    setInputs((e) => ({
      ...e,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (tab.id !== inputs.id) {
      setInputs({ ...tab, oldKey: tab.key });
    }
  }, [tab]);

  useEffect(() => {
    handleSaveTabFunction(inputs);
  }, [inputs]);

  const handleAddFunction = () => {
    const itemCheck = inputs.blocks.find((e) => e.title === newFunctionValue);
    if (itemCheck) {
      toast.error("Already exist.");
      return;
    }
    setInputs({
      ...inputs,
      blocks: [
        ...inputs.blocks,
        {
          title: newFunctionValue,
          items: [],
        },
      ],
    });
    setNewFunctionValue("");
  };
  const onDelete = (title) => {
    setInputs({
      ...inputs,
      blocks: inputs.blocks.filter((e) => e.title !== title),
    });
    setNewFunctionValue("");
  };

  // useEffect(() => {
  //   console.log(11111);
  //   if (tab.oldKey !== inputs?.oldKey) {
  //     setInputs({ ...tab, oldKey: tab.key });
  //   }
  //   setInputs({ ...tab });
  // }, [tab]);

  const handleEditFunction = (name, value) => {
    setInputs({
      ...inputs,
      blocks: inputs.blocks.map((e) => {
        if (e.title === selectedBlock.title) {
          return {
            ...e,
            [name]: value,
          };
        }
        return e;
      }),
    });
    setSelectedBlock({
      ...selectedBlock,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col w-full items-center gap-3 min-w-[600px]">
      <AdminBox
        value={inputs.key}
        name="key"
        isInput={true}
        style={{ padding: 0 }}
        onChange={handleChangeInput}
      />
      <div className="flex flex-col w-full gap-4">
        <Text
          T="admin"
          weight="semi"
          size="md"
          className="text-primary10 dark:text-linkColor"
        >
          blok
        </Text>
        <div className="flex gap-2 w-full  items-center flex-wrap">
          {inputs.blocks.map((e, i) => {
            return (
              <Tab
                isActive={e.title === selectedBlock?.title}
                onDelete={() => onDelete(e.title)}
                key={crypto.randomUUID()}
                title={e.title}
                onSelect={() => setSelectedBlock(e)}
              />
            );
          })}
          <div className="flex gap-2">
            <Input
              value={newFunctionValue}
              onChange={(e) => setNewFunctionValue(e.target.value)}
              styleDiv={
                theme !== "dark"
                  ? { backgroundColor: "#272c33", height: "38px" }
                  : {}
              }
            />
          </div>
          <div className="flex items-center ">
            <AdminButton
              onClick={() => {
                handleAddFunction();
              }}
            >
              add
            </AdminButton>
          </div>
        </div>
        {selectedBlock?.title && (
          <EdtiBlokTab
            theme={theme}
            onChange={handleEditFunction}
            blok={selectedBlock}
          />
        )}
      </div>
    </div>
  );
};

export default TabEditModal;
