"use client";

import AdminButton from "@/components/admin/components/button";
import Input from "@/components/Input";
import Text from "@/components/Text";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FunctionItem from "./function";
import Tab from "./Tab";
import FunctionsCheatPreview from "@/components/Cheat/Functional";
import Modal from "@/components/Modal";

const FunctionsCheat = ({ functions, onChange }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [newTabValue, setNewTabValue] = useState("");
  const [selectedFunction, setSelectedFunction] = useState({});
  const [selectedBlock, setSelectedBlock] = useState({});
  const [selectedTab, setSelectedTab] = useState();
  const handleAddFunction = () => {
    if (!newTabValue.length) {
      toast.error("Title is missing!");
      return;
    }
    const fun = functions.filter((e) => e.title === newTabValue);
    if (fun.length > 0) {
      toast.error(`You are already have function with title ${newTabValue}`);
      return;
    }
    onChange("functions", [
      ...functions,
      {
        title: newTabValue,
        tabs: [],
      },
    ]);
    setNewTabValue("");
  };

  const handleAddItem = (item) => {
    const newItems = functions.map((e) => {
      if (e.title === selectedFunction.title) {
        return {
          ...e,
          tabs: [...e.tabs, item],
        };
      }
      return e;
    });
    onChange("functions", newItems);

    setSelectedFunction({
      ...selectedFunction,
      tabs: [...selectedFunction.tabs, item],
    });
  };

  const onDeleteItem = (index) => {
    const newSelectedFunctions = {
      ...selectedFunction,
      tabs: selectedFunction.tabs.filter((item, i) => i !== index),
    };
    const newItems = functions.map((e) => {
      if (e.title === selectedFunction.title) {
        return newSelectedFunctions;
      }
      return e;
    });
    onChange("functions", newItems);
    setSelectedFunction(newSelectedFunctions);
  };

  const handleSaveTabFunction = (data) => {
    const newSelectedFunctions = {
      ...selectedFunction,
      tabs: selectedFunction.tabs.map((item) => {
        if (item.key === data.oldKey) {
          return data;
        }
        return item;
      }),
    };
    const newItems = functions.map((e) => {
      if (e.title === selectedFunction.title) {
        return newSelectedFunctions;
      }
      return e;
    });
    onChange("functions", newItems);
    setSelectedFunction(newSelectedFunctions);
  };

  const handleDeleteFunction = (item) => {
    onChange(
      "functions",
      functions.filter((e) => e.title !== item.title)
    );
    if (item.title === selectedFunction.title) {
      setSelectedFunction({});
    }
  };

  const handleChangeIcon = (icon) => {
    const newItems = functions.map((e) => {
      if (e.title === selectedFunction.title) {
        return {
          ...e,
          icon,
        };
      }
      return e;
    });
    onChange("functions", newItems);

    setSelectedFunction({
      ...selectedFunction,
      icon,
    });
  };
  return (
    <div className="flex flex-col p-4 justify-between gap-4 bg-input rounded-[16px] w-full">
      <Modal isOpen={isPreview} onClose={() => setIsPreview(false)}>
        <div className="w-[600px] mt-[-40px]">
          <FunctionsCheatPreview cheat={{ functions }} />
        </div>
      </Modal>
      <div className="flex w-full justify-between items-center">
        <Text T="admin" weight="semi" size="md" className="text-primary10">
          cheatFunctions
        </Text>
        <AdminButton onClick={() => setIsPreview(true)}>preview</AdminButton>
      </div>
      {/* <Text T="admin" weight="semi" size="md" className="text-primary10">
          functionsAlert
        </Text> */}
      <div className="flex gap-2 items-center flex-wrap">
        {functions.map((e, i) => {
          return (
            <Tab
              onDelete={() => handleDeleteFunction(e)}
              onSelect={() => {
                setSelectedFunction(e);
                setSelectedTab();
                setSelectedBlock({});
              }}
              title={e.title}
              isActive={e.title === selectedFunction.title}
              key={i}
            />
          );
        })}
        <div className="flex gap-2">
          <Input
            value={newTabValue}
            onChange={(e) => setNewTabValue(e.target.value)}
            styleDiv={{ backgroundColor: "#272c33", height: "38px" }}
          />
        </div>
        <div className="flex items-center">
          <AdminButton onClick={handleAddFunction}>add</AdminButton>
        </div>
      </div>
      {!!selectedFunction.title && (
        <FunctionItem
          onAddItem={handleAddItem}
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onDeleteItem={onDeleteItem}
          handleChangeIcon={handleChangeIcon}
          f={selectedFunction}
          handleSaveTabFunction={handleSaveTabFunction}
        />
      )}
    </div>
  );
};

export default FunctionsCheat;

// {
//     title:'',
//     functions: [
//         {
//             title:''
//            about:''
//         }
//     ]
// }
