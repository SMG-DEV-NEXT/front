"use client";

import Loading from "@/app/loading";
import Text from "@/components/Text";
import { FAQService } from "@/services/FAQ";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import FaqTabs from "./tabs";
import FaqStat from "./stat";
import { useLocale } from "next-intl";
import { useMobile } from "@/hooks/useMobile";
const FAQView = () => {
  const [selectedtab, setSelectedTab] = useState(null);
  const locale = useLocale();
  const isMobile = useMobile(1030);
  const { data, isPending } = useQuery({
    queryKey: ["get-faq"],
    queryFn: FAQService.getClientFaq,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      const hash = window.location.hash.replace("#", "");

      if (hash) {
        const i = hash.split("?")[0] * 1;
        const item = data.data[i].stats.find(
          (e) => e.id === hash.split("?")[1]
        );
        if (item)
          return setSelectedTab({
            ...data.data[i].stats.find((e) => e.id === hash.split("?")[1]),
            arrI: i,
          });
        setSelectedTab({ ...data.data[0].stats[0], arrI: i });
        window.location.hash = `#0?${data.data[0].id}`;
      }
      setSelectedTab({ ...data.data[0].stats[0], arrI: 0 });
      window.location.hash = `#0?${data.data[0].id}`;
    }
  }, [data]);

  const handleSelectTab = (indexSection, stat) => {
    window.location.hash = `#${indexSection}?${stat.id}`;
    setSelectedTab({ ...stat, arrI: indexSection });
  };

  if (isPending || !selectedtab)
    return (
      <div className="min-h-[900px] flex items-center">
        <Loading noPage={true} />
      </div>
    );

  const getStatById = (i) => {
    let stat = null;
    data.data[0].stats.forEach((element) => {
      if (element.id === i) stat = element;
    });
    if (stat) return { stat, i: 0 };
    data.data[1].stats.forEach((element) => {
      if (element.id === i) stat = element;
    });
    if (stat) return { stat, i: 1 };
    data.data[2].stats.forEach((element) => {
      if (element.id === i) stat = element;
    });
    if (stat) return { stat, i: 2 };
    return { stat, i: 0 };
  };

  const allStats = data.data[selectedtab.arrI || 0].stats.flat();
  if (isMobile) {
    return (
      <div className="container z-[2] pt-[64px] pb-[164px]">
        <div className="flex w-full items-center flex-col gap-6">
          <Text
            T="none"
            weight="bold"
            size="t48"
            className="text-primary10 leading-[120%]"
          >
            FAQ
          </Text>
          <div className="w-full  flex-col flex gap-6 ">
            <FaqTabs
              handleSelectTab={handleSelectTab}
              sections={data.data}
              mobile={isMobile}
              selectedStat={selectedtab}
            />
            {selectedtab?.data && (
              <FaqStat
                handleChangeTab={handleSelectTab}
                allStats={allStats}
                mobile={isMobile}
                getStatById={getStatById}
                stat={selectedtab}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container z-[2] pt-[64px] pb-[164px]">
      <div className="flex w-full flex-col gap-6">
        <Text T="none" weight="bold" size="t48" className="text-primary10">
          FAQ
        </Text>
        <div className="w-full flex gap-6 items-start">
          <FaqTabs
            handleSelectTab={handleSelectTab}
            sections={data.data}
            selectedStat={selectedtab}
          />
          {selectedtab?.data && (
            <FaqStat
              handleChangeTab={handleSelectTab}
              allStats={allStats}
              getStatById={getStatById}
              stat={selectedtab}
              locale={locale}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQView;
