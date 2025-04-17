import React from "react";
import Text from "../../Text";
import Icon from "../../Icons";
import CustomLink from "../../CustomLink";

const RouteCheat = ({ catalogName, cheatName, catalogId }) => {
  return (
    <div className="flex items-center gap-1">
      <CustomLink url="/">
        <Text className="text-linkColor" weight="medium" size="sm" T="cheat">
          home
        </Text>
      </CustomLink>
      <Icon name="arrowRight" folder="cheat" />
      <CustomLink url="/catalog">
        <Text className="text-linkColor" weight="medium" size="sm" T="cheat">
          catalog
        </Text>
      </CustomLink>
      <Icon name="arrowRight" folder="cheat" />
      <CustomLink url={`/catalog/${catalogId}`}>
        <Text className="text-linkColor" weight="medium" size="sm" T="none">
          {catalogName}
        </Text>
      </CustomLink>
      <Icon name="arrowRight" folder="cheat" />
      <Text className="text-linkColor" weight="medium" size="sm" T="none">
        {cheatName}
      </Text>
    </div>
  );
};

export default RouteCheat;
