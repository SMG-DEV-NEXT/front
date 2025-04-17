"use client";

import AdminButton from "@/admin/components/button";
import Input from "@/components/Input";
import Text from "@/components/Text";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FunctionItem from "./function";

const FunctionsCheat = ({ functions, onChange }) => {
  const [newTabValue, setNewTabValue] = useState("");
  const [selectedFunction, setSelectedFunction] = useState({});

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
        functions: [],
      },
    ]);
    setNewTabValue("");
  };

  const handleAddItem = (item) => {
    const newItems = functions.map((e) => {
      if (e.title === selectedFunction.title) {
        return {
          ...e,
          functions: [...e.functions, item],
        };
      }
      return e;
    });
    onChange("functions", newItems);

    setSelectedFunction({
      ...selectedFunction,
      functions: [...selectedFunction.functions, item],
    });
  };

  const onDeleteItem = (index) => {
    const newSelectedFunctions = {
      ...selectedFunction,
      functions: selectedFunction.functions.filter((item, i) => i !== index),
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
  return (
    <div className="flex flex-col p-4 justify-between gap-4 bg-input rounded-[16px] w-full">
      <Text T="admin" weight="semi" size="md" className="text-primary10">
        cheatFunctions
      </Text>
      {/* <Text T="admin" weight="semi" size="md" className="text-primary10">
          functionsAlert
        </Text> */}
      <div className="flex gap-2 items-center flex-wrap">
        {functions.map((e) => {
          if (e.title === selectedFunction.title) {
            return (
              <div
                key={crypto.randomUUID()}
                className="bg-primary80 cursor-pointer py-[6px] px-3 rounded-[8px] border border-[#919EAB3D] flex items-center"
              >
                <Text T="none" weight="semi" className="text-[#141A21]">
                  {e.title}
                </Text>
              </div>
            );
          }
          return (
            <div
              key={crypto.randomUUID()}
              onClick={() => setSelectedFunction(e)}
              className=" py-[6px] cursor-pointer px-3 rounded-[8px] border border-[#919EAB3D] flex items-center"
            >
              <Text T="none" weight="semi" className="text-primary10">
                {e.title}
              </Text>
            </div>
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
          onDeleteItem={onDeleteItem}
          f={selectedFunction}
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
