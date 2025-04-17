"use client";
import React, { useState } from "react";
import Text from "../Text";
import Icon from "../Icons";
import PopularStats from "./Popular";
import CustomSelect from "../Select";

const LeftStats = ({
  mobile,
  selectedGame,
  setSelectedGame,
  games,
  popular,
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  if (mobile) {
    const options = games.map((e) => {
      return {
        value: e.id,
        label: e.title,
        stats: e.stats.length,
        isStat: true,
      };
    });
    const selectedOption = selectedGame.game
      ? {
          label: selectedGame.game?.title,
          value: selectedGame.game?.id,
        }
      : {};
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="flex bg-input rounded-[16px] flex-col">
          <Text
            T="stats"
            weight="bold"
            size="xl"
            className="text-primary10 p-6"
          >
            catalog
          </Text>
          <div className="flex flex-col gap-4 pb-4 px-6">
            <CustomSelect
              inputStyles={{
                backgroundColor: "#272C33",
                minWidth: "min-content",
                whiteSpace: "nowrap",
                width: "100%",
              }}
              placeholderColor="#7B8293"
              menuStyles={{
                backgroundColor: "#272C33",
                width: "100%",
              }}
              options={options}
              value={selectedOption}
              setValue={(e) => setSelectedGame(e.value)}
            />
          </div>
        </div>
        {!mobile && <PopularStats />}
      </div>
    );
  }
  return (
    <div className="flex w-[30%] flex-col gap-6">
      <div className="flex bg-input rounded-[16px] flex-col">
        <Text T="stats" weight="bold" size="xl" className="text-primary10 p-6">
          catalog
        </Text>
        <div className="flex flex-col gap-4 pb-4">
          {games.map((e, i) => {
            return (
              <div key={e.id} className="flex flex-col gap-4">
                <div
                  className="flex relative overflow-hidden justify-between px-6 w-full cursor-pointer"
                  onClick={() => setSelectedGame(e.id)}
                >
                  {e.id === selectedGame?.game?.id && (
                    <div
                      className="absolute bg-primary80 w-5 h-5 rounded-full top-[50%] left-[-10px]"
                      style={{ transform: "translateY(-50%)" }}
                    ></div>
                  )}
                  <Text
                    className="text-linkColor max-w-[150px] truncate block"
                    T="none"
                    weight="medium"
                    size="sm"
                  >
                    {e.title}
                  </Text>
                  <Text
                    className="text-linkColor w-[32px] h-[20px] rounded-[6px] bg-[#272A30] flex items-center justify-center"
                    T="none"
                    weight="medium"
                    size="sm"
                  >
                    {e.stats.length}
                  </Text>
                </div>
                {i + 1 !== games.length && (
                  <div className="w-full bg-[#404658] h-[2px]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {!mobile && <PopularStats popular={popular} />}
    </div>
  );
};

export default LeftStats;
