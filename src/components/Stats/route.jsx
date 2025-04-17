import React from "react";
import Text from "../Text";
import Icon from "../Icons";
import CustomLink from "../CustomLink";

const RouteStat = ({ catalogName, statName, catalogId }) => {
  return (
    <div className="flex items-center gap-1">
      <CustomLink url="/">
        <Text className="text-linkColor" weight="medium" size="sm" T="cheat">
          home
        </Text>
      </CustomLink>
      <Icon name="arrowRight" folder="cheat" />
      <CustomLink url="/stats">
        <Text className="text-linkColor" weight="medium" size="sm" T="stats">
          title
        </Text>
      </CustomLink>
      <Icon name="arrowRight" folder="cheat" />
      <CustomLink url={`/stats/#${catalogId}`}>
        <Text className="text-linkColor" weight="medium" size="sm" T="none">
          {catalogName}
        </Text>
      </CustomLink>
      <Icon name="arrowRight" folder="cheat" />
      <Text className="text-linkColor" weight="medium" size="sm" T="none">
        {statName}
      </Text>
    </div>
  );
};

export default RouteStat;
