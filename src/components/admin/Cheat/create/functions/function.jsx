"use client";

import AdminButton from "@/components/admin/components/button";
import Input from "@/components/Input";
import Text from "@/components/Text";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-tippy/dist/tippy.css";
import Modal from "@/components/Modal";
import TabEditModal from "./TabEditModal";
import Tab from "./Tab";

const FunctionItem = ({
  f,
  onAddItem,
  onDeleteItem,
  handleSaveTabFunction,
  handleChangeIcon,
}) => {
  const [newTabValue, setNewTabValue] = useState();
  const [selectedTab, setSelectedTab] = useState();
  const handleAddElement = () => {
    if (!newTabValue) {
      toast.error("Fields is missing.");
      return;
    }
    const itemCheck = f.tabs.find((e) => e.key === newTabValue);
    if (itemCheck) {
      toast.error("Already exist.");
      return;
    }
    setNewTabValue("");
    onAddItem({
      key: newTabValue,
      blocks: [],
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <Input
        value={f.icon}
        label="Icon"
        onChange={(e) => handleChangeIcon(e.target.value)}
        styleDiv={{ backgroundColor: "#272c33", height: "38px" }}
      />
      <Text T="admin" weight="semi" size="md" className="text-primary10">
        tabsFunctions
      </Text>
      <div className="flex gap-2 items-center flex-wrap">
        {f.tabs.map((e, i) => {
          return (
            <Tab
              // isActive={e.key === selectedTab?.key}
              onDelete={() => onDeleteItem(i)}
              key={crypto.randomUUID()}
              title={e.key}
              onSelect={() => setSelectedTab(e)}
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
          <AdminButton
            onClick={() => {
              handleAddElement(newTabValue);
              setNewTabValue("");
            }}
          >
            add
          </AdminButton>
        </div>
      </div>
      {selectedTab && (
        <Modal
          width={"600px"}
          isOpen={selectedTab?.key}
          onClose={() => setSelectedTab({})}
        >
          <TabEditModal
            handleSaveTabFunction={handleSaveTabFunction}
            tab={selectedTab}
          />
        </Modal>
      )}
    </div>
  );
};

export default FunctionItem;
