import React, { useState } from "react";
import Forget1 from "../forget/Forget1";
import Forget2 from "../forget/Forget2";
import Forget2FA from "../forget/forget";
import Forget3 from "../forget/Forget3";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/User";
import { toastError } from "../../utils/error";

function Forget({ isMobile, goToLogin }) {
  const [step, setStep] = useState(1);
  const [isTwoFactorForget, setIsTwoFactorForget] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(new Array(6).fill(""));

  const mutation = useMutation({
    mutationFn: UserService.forgetStep2,
    mutationKey: ["forget2"],
    onSuccess: ({ data }) => {
      if (data) {
        setStep(3);
        return;
      }
      toastError("code_wrong");
      setCode(new Array(6).fill(""));
    },
  });

  const handleApplyCode = (c) => {
    mutation.mutate({
      email,
      code: c,
    });
  };

  if (step === 1) {
    return (
      <Forget1
        isMobile={isMobile}
        email={email}
        setIsTwoFactorForget={setIsTwoFactorForget}
        setEmail={setEmail}
        setStep={setStep}
      />
    );
  }
  if (step === 2) {
    return (
      <Forget2FA
        isMobile={isMobile}
        code={code}
        isTwoFactorForget={isTwoFactorForget}
        setCode={setCode}
        onApply={handleApplyCode}
      />
    );
  }
  if (step === 3) {
    return <Forget2 isMobile={isMobile} email={email} setStep={setStep} />;
  }
  return <Forget3 isMobile={isMobile} openLogin={goToLogin} />;
}

export default Forget;
