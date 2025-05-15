import { toast } from "react-toastify";
import Icon from "../components/Icons";
import { StyleError } from "../../costants/toast";

export const toastError = (e) => {
  if (typeof toast.error !== "function") return null;
  return toast.error(e, {
    style: StyleError,
    className: "custom-toast",
    icon: <Icon name="error" />,
  });
};
