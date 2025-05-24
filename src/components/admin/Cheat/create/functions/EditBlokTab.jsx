"use client";
import AdminBox from "@/components/admin/components/Box";
import AdminButton from "@/components/admin/components/button";
import Input from "@/components/Input";
import Text from "@/components/Text";
import React, { useEffect, useState } from "react";
import EditFunction from "./EditSelectedTabFunction";
import Tab from "./Tab";
import { toast } from "react-toastify";

const EditBlokTab = ({ blok, onChange }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [t, setT] = useState(blok.title);
  const [newItemValue, setNewItemValue] = useState();
  const handleeleteItem = (title) => {
    const newItems = blok.items.filter((e) => e.title !== title);
    if (title === selectedItem?.title) {
      setSelectedItem({});
    }
    onChange("items", newItems);
  };
  useEffect(() => {
    if (blok.title !== t) {
      setT(blok.title), setSelectedItem({});
    }
  }, [blok]);

  const handleAddFunction = () => {
    const itemCheck = blok.items.find((e) => e.title === newItemValue);
    if (itemCheck) {
      toast.error("Already exist.");
      return;
    }
    const newItems = [...blok.items, { title: newItemValue }];
    onChange("items", newItems);
    setNewItemValue("");
  };
  const handleEditFunction = (name, value) => {
    const newItems = blok.items.map((e) => {
      if (e.title === selectedItem.title) {
        return {
          ...e,
          [name]: value,
        };
      }
      return e;
    });
    setSelectedItem({
      ...selectedItem,
      [name]: value,
    });
    onChange("items", newItems);
  };
  return (
    <div className="flex flex-col gap-3">
      <AdminBox
        value={blok.title}
        name="title"
        isInput={true}
        style={{ padding: 0 }}
        onChange={onChange}
        label={"head"}
      />
      <AdminBox
        value={{ rus: blok.aboutru || "", en: blok.abouten || "" }}
        name="about"
        style={{ padding: 0 }}
        isInput={true}
        isMultipleLanguage={true}
        minTextAreaHeight={20}
        isUpperCode={false}
        onChange={onChange}
        label={"about"}
      />
      <div className="flex flex-col gap-4">
        <Text T="admin" weight="semi" size="md" className="text-primary10">
          cheatFunctions
        </Text>
        <div className="flex gap-2 items-center flex-wrap">
          {blok.items.map((e, i) => {
            return (
              <Tab
                isActive={e.title === selectedItem?.title}
                onDelete={() => handleeleteItem(e.title)}
                key={crypto.randomUUID()}
                title={e.title}
                onSelect={() => setSelectedItem(e)}
              />
            );
          })}
          <div className="flex gap-2">
            <Input
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              styleDiv={{ backgroundColor: "#272c33", height: "38px" }}
            />
          </div>
          <div className="flex items-center">
            <AdminButton
              onClick={() => {
                handleAddFunction();
              }}
            >
              add
            </AdminButton>
          </div>
        </div>
        {selectedItem?.title && (
          <EditFunction onChange={handleEditFunction} {...selectedItem} />
        )}
      </div>
    </div>
  );
};

export default EditBlokTab;
