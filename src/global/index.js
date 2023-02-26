import { toast } from "react-toastify";
window.generateRandomId = () => Math.random().toString(36).slice(2);

window.toastify = (msg, type) => {
  switch (type) {
    case "success":
      return toast.success(msg);
    case "info":
      return toast.info(msg);
    case "error":
      return toast.error(msg);

    default:
      break;
  }
};
