// "use client";

// import React, { useState } from "react";
// import Text from "../Text";
// import Icon from "../Icons";
// import { Tooltip } from "react-tippy";
// import "react-tippy/dist/tippy.css";
// import getLanguage from "@/utils/get-language";
// import { useLocale } from "next-intl";
// const testData = [
//   {
//     logo: "cel",
//     text: "Aimbot",
//     tags: [
//       {
//         text: "Enable (Hold Toggle Always)",
//         tooltip: "There is about this function",
//       },
//     ],
//   },
//   {
//     logo: "cel",
//     text: "Aimbot",
//     tags: [
//       {
//         text: "Enable (Hold Toggle Always)",
//         tooltip: "There is about this function",
//       },
//     ],
//   },
//   {
//     logo: "eye",
//     text: "Aimbot",
//     tags: [
//       {
//         text: "Enable (Hold Toggle Always)",
//         tooltip: "There is about this function",
//       },
//     ],
//   },
// ];

// const Functionalitem = ({ logo = "cel", title, functions }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="flex flex-col gap-4 p-6">
//       <div className="flex w-full justify-between">
//         <div className="flex items-center gap-3">
//           <div className="bg-[#8B6DCA26] flex items-center rounded-[8px] justify-center w-[48px] h-[48px]">
//             <Icon name={logo} folder="products" />
//           </div>
//           <Text
//             T="none"
//             weight="semi"
//             size="lg"
//             className="text-primary10 leading-[120%]"
//           >
//             {title}
//           </Text>
//         </div>
//         <div
//           className="flex items-center jufity-center cursor-pointer"
//           onClick={() => setIsOpen(!isOpen)}
//           style={{ transform: `rotate(${isOpen ? "0" : "180"}deg)` }}
//         >
//           <Icon name="arrow" folder="products" />
//         </div>
//       </div>
//       {isOpen && (
//         <div className="flex flex-wrap gap-2">
//           {functions.length === 0 && (
//             <Text
//               T="cheats"
//               className="text-linkColor"
//               weight="medium"
//               size="sm"
//             >
//               emptyTags
//             </Text>
//           )}
//           {functions.map((e, i) => {
//             return (
//               <Tooltip
//                 title={"asdasd"}
//                 interactive={false}
//                 position="right"
//                 key={crypto.randomUUID()}
//                 trigger="mouseenter"
//                 arrow={true}
//                 arrowSize="big" // Makes the triangle bigger
//                 className="custom-tooltip"
//               >
//                 <div
//                   id={`tab-${i}`}
//                   className="py-2 px-3 bg-black rounded-[8px]"
//                 >
//                   <Text
//                     T="none"
//                     className="text-linkColor"
//                     weight="medium"
//                     size="sm"
//                   >
//                     {e.title}
//                   </Text>
//                 </div>
//               </Tooltip>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export const FunctionalItemsMobile = ({ cheat }) => {
//   return (
//     <div className={`flex gap-6  w-full  overflow-auto scrollbar-hide`}>
//       <div className="flex flex-col gap-4 w-full">
//         <Text className="text-primary10" T="product" weight="bold" size="xl">
//           functional
//         </Text>
//         <div className="flex flex-col  w-full rounded-[16px] bg-input">
//           {cheat.functions.map((e, i) => {
//             return (
//               <div className="flex flex-col w-full" key={crypto.randomUUID()}>
//                 {i !== 0 && <div className="w-full bg-[#404658] h-[2px]"></div>}
//                 <Functionalitem {...e} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// const FunctionalCheat = ({ mobile, cheat }) => {
//   const locale = useLocale();
//   const text = cheat[`about${getLanguage(locale)}`];
//   const [isOpen, setIsOpen] = useState(false);
//   if (mobile) {
//     return (
//       <div className="flex flex-col gap-6 w-full ">
//         <div className="flex flex-col justify-between gap-4 w-full">
//           <div className="flex flex-col gap-4">
//             <Text
//               className="text-primary10"
//               T="product"
//               weight="bold"
//               size="xl"
//             >
//               about
//             </Text>
//             <Text T="none" className="text-primary10" size="sm" weight="medium">
//               {text}
//             </Text>
//           </div>
//           {/* <Text
//             T="product"
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-linkColor underline cursor-pointer"
//             size="sm"
//             weight="medium"
//           >
//             more
//           </Text> */}
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div
//       className={
//         isOpen
//           ? "flex flex-col gap-6 w-full mt-[48px]"
//           : "flex gap-6 w-full mt-[48px]"
//       }
//     >
//       <div className="flex flex-col gap-4 w-full">
//         <Text
//           className="text-primary10 leading-[140%]"
//           T="product"
//           weight="bold"
//           size="xl"
//         >
//           functional
//         </Text>
//         {false ? (
//           <div className="flex relative rounded-[16px] items-stretch overflow-y-auto scrollbar-hide  bg-input">
//             <div className="flex flex-col  h-full w-full  bg-input">
//               {cheat.functions.map((e, i) => {
//                 return (
//                   <div className="flex border-r border-[#404658] flex-col w-full">
//                     {i !== 0 && (
//                       <div className="w-full bg-[#404658] h-[2px]"></div>
//                     )}
//                     <Functionalitem {...e} />
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="flex flex-col  w-full  bg-input">
//               {cheat.functions.map((e, i) => {
//                 return (
//                   <div className="flex border-l border-[#404658] flex-col w-full border-r border-">
//                     {i !== 0 && (
//                       <div className="w-full bg-[#404658] h-[2px]"></div>
//                     )}
//                     <Functionalitem {...e} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col  w-full rounded-[16px] bg-input">
//             {cheat.functions.map((e, i) => {
//               return (
//                 <div className="flex flex-col w-full" key={crypto.randomUUID()}>
//                   {i !== 0 && (
//                     <div className="w-full bg-[#404658] h-[2px]"></div>
//                   )}
//                   <Functionalitem {...e} />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FunctionalCheat;
// components/SettingsPanel.tsx
"use client";

import { useState } from "react";
import Text from "../Text";
import "./index.scss";
import data from "./exampleData.json";

import SelectedTabFunctional from "./functional/tab";

export default function SettingsPanel({ mobile, cheat }) {
  const [selectedTab, setSelectedTab] = useState(cheat.functions[0]);

  return (
    <div
      className="flex flex-col gap-4 "
      style={{ marginTop: mobile ? "0px" : "40px" }}
    >
      <Text
        T="product"
        weight="bold"
        size="xl"
        className="leading-[140%] text-primary10"
      >
        functional
      </Text>
      <div
        className="flex overflow-hidden rounded-2xl h-full  bg-input gap-6
    "
      >
        <div
          className={`flex flex-col  w-[${
            mobile ? 8 : 20
          }%]  max-w-[200px] border-r border-linkColor`}
        >
          {cheat.functions.map((e, index) => {
            return (
              <div
                onClick={() => setSelectedTab(e)}
                className={`flex bg-${
                  e.title === selectedTab.title
                    ? "primary80"
                    : "tertiary hover:bg-primary10 hover:bg-opacity-10 transition-colors duration-200 group"
                } gap-2 w-full justify-center items-start py-5  px-5 cursor-pointer ${
                  index === cheat.functions.length - 1
                    ? ""
                    : "border-b border-linkColor"
                }`}
              >
                {e.icon && (
                  <div
                    className="w-5 h-5 flex items-center"
                    dangerouslySetInnerHTML={{
                      __html: e.icon
                        .replace(
                          /fill=".*?"/g,
                          `fill="${
                            e.title === selectedTab.title
                              ? "#E9E3F6"
                              : "#8B6DCA"
                          }"`
                        )
                        .replace(/width=".*?"/g, 'width="20"')
                        .replace(/height=".*?"/g, 'height="20"')
                        // fallback in case width/height not present at all
                        .replace("<svg", '<svg width="20" height="20"'),
                    }}
                  ></div>
                )}
                {!mobile && (
                  <Text
                    T="none"
                    weight="semi"
                    size="lg"
                    style={{
                      color:
                        e.title === selectedTab.title ? "#E9E3F6" : "#8B6DCA",
                    }}
                  >
                    {e.title}
                  </Text>
                )}
              </div>
            );
          })}
        </div>
        {selectedTab && <SelectedTabFunctional tab={selectedTab} />}
      </div>
    </div>
  );
}
