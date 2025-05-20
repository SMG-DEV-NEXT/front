import { toast } from "react-toastify";
import Icon from "../components/Icons";
import { StyleError } from "../../costants/toast";
import ru from "../../messages/ru.json";
import en from "../../messages/en.json";
import { getLocale } from "./getlocale";

export const toastError = (e) => {
  if (typeof toast.error !== "function") return null;
  const locale = getLocale();
  const translations = locale === "en" ? en.errors : ru.errors;
  const terror = translations[e] || e;
  return toast.error(terror, {
    style: StyleError,
    className: "custom-toast",
    icon: <Icon name="error" />,
  });
};
