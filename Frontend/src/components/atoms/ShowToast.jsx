"use client";

import { toast } from "react-toastify";

export const ToastStatus = {
  Success: "Success",
  Warning: "Warning",
  Failure: "Failure",
  Info: "Info",
};

function ShowToast(status, message) {
  switch (status) {
    case ToastStatus.Success:
      toast.success(message, { containerId: "notification-toast" });
      break;
    case ToastStatus.Failure:
      toast.error(message, { containerId: "notification-toast" });
      break;
    case ToastStatus.Warning:
      toast.warn(message, { containerId: "notification-toast" });
      break;
    case ToastStatus.Info:
      toast(message, { containerId: "notification-toast" }); // Simple message toast
      break;
    default:
      toast.warn(message, { containerId: "notification-toast" });
  }
}

export default ShowToast;
