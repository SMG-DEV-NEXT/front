"use client";

import AdminContainer from "@/components/admin/components/container";
import AdminPageHeader from "@/components/admin/components/header";
import PlanItem from "@/components/admin/components/plan/edit/PlanItem";
import Loading from "@/app/loading";
import { CheatService } from "@/services/Admin";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PlanUpdate = () => {
  const router = useRouter();
  const locale = useLocale();
  const [usd, setUSD] = useState(null);
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryFn: () => {
      return CheatService.getPlan(id);
    },
    queryKey: ["get-plan"],
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
  const [plan, setPlan] = useState({
    day: {
      keys: [],
      prcent: 0,
      price: 0,
    },
    week: {
      keys: [],
      prcent: 0,
      price: 0,
    },
    month: {
      keys: [],
      prcent: 0,
      price: 0,
    },
  });

  const mutate = useMutation({
    mutationFn: CheatService.updatePlan,
    mutationKey: ["update-plan"],
    onSuccess: (e) => {
      toast.success("Updated successfuly.");
    },
  });

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_tfZjgKTbQ86JVJJm1yKs75nITIE3sDnyYLQCaFyc"
  );

  useEffect(() => {
    if (freecurrencyapi && usd === null) {
      freecurrencyapi
        .latest({
          base_currency: "USD",
          currencies: "RUB",
        })
        .then((response) => {
          setUSD(response.data.RUB);
        });
    }
  }, [freecurrencyapi]);

  useEffect(() => {
    if (data?.data) {
      setPlan({
        ...data.data,
      });
    }
  }, [data?.data]);

  const changePrice = (format, value) => {
    setPlan({
      ...plan,
      [format]: {
        ...plan[format],
        price: value * 1,
      },
    });
  };

  const changePrcent = (format, value) => {
    setPlan({
      ...plan,
      [format]: {
        ...plan[format],
        prcent: value * 1,
      },
    });
  };

  const changeKeys = (format, value) => {
    setPlan({
      ...plan,
      [format]: {
        ...plan[format],
        keys: value,
      },
    });
  };

  const handleSave = () => {
    mutate.mutate({ id, data: plan });
  };

  if (isPending) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }
  return (
    <AdminContainer>
      <div className="flex flex-col gap-6 pb-10">
        <AdminPageHeader
          route={"plan"}
          buttonText="save"
          isDisabledButton={mutate.isPending}
          settingsRoute={"plan"}
          buttonOnClick={handleSave}
        />
        <PlanItem
          format="day"
          keys={plan.day?.keys}
          exchange={usd}
          prcent={plan.day?.prcent}
          onChangePrice={changePrice}
          onChangeKeys={changeKeys}
          setPrsent={changePrcent}
          price={plan.day?.price}
        />
        <PlanItem
          format="week"
          keys={plan.week?.keys}
          onChangePrice={changePrice}
          exchange={usd}
          prcent={plan.week?.prcent}
          onChangeKeys={changeKeys}
          setPrsent={changePrcent}
          price={plan.week?.price}
        />
        <PlanItem
          format="month"
          keys={plan.month?.keys}
          exchange={usd}
          onChangePrice={changePrice}
          prcent={plan.month?.prcent}
          onChangeKeys={changeKeys}
          setPrsent={changePrcent}
          price={plan.month?.price}
        />
      </div>
    </AdminContainer>
  );
};

export default PlanUpdate;
