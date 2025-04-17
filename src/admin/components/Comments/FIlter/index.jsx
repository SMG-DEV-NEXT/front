"use client";
import Input from "@/components/Input";
import Text from "@/components/Text";
import React from "react";
import AdminBox from "../../Box";

const FilterComments = ({
  inputs,
  setInputs,
  label = "cheat",
  v = "cheatTilte",
  isHaveMailFilter = true,
}) => {
  return (
    <div className="flex flex-col gap-4 mt-5 w-full">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <Text weight="medium" size="md" className="text-primary10">
            {label}
          </Text>
          <Input
            value={inputs[v]}
            placeholder="Начните писать..."
            styleDiv={{
              backgroundColor: "inherit",
              height: "34px",
              border: "1px solid #7B8293",
            }}
            name="cheatTitle"
            setValue={(e) => setInputs(v, e)}
          />
        </div>
        <div className="flex items-center gap-[14px]">
          <Text
            T="admin"
            weight="medium"
            size="md"
            className="text-primary10 whitespace-nowrap"
          >
            fromDate
          </Text>
          <Input
            value={inputs.startDate}
            styleDiv={{
              backgroundColor: "inherit",
              height: "34px",
              border: "1px solid #7B8293",
            }}
            name="startDate"
            type="date"
            setValue={(e) => setInputs("startDate", e)}
          />
          <Text T="admin" weight="medium" size="md" className="text-primary10">
            toDate
          </Text>
          <Input
            value={inputs.endDate}
            styleDiv={{
              backgroundColor: "inherit",
              height: "34px",
              border: "1px solid #7B8293",
            }}
            name="endDate"
            type="date"
            setValue={(e) => setInputs("endDate", e)}
          />
        </div>
      </div>
      {isHaveMailFilter && (
        <AdminBox
          value={inputs.mail}
          name="mail"
          onChange={setInputs}
          label={"mail"}
        />
      )}
    </div>
  );
};

export default FilterComments;
