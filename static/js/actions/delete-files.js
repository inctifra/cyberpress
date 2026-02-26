import { setupAjaxForm } from "../libs/formHandler";
import { showToast } from "../libs/toast";

setupAjaxForm("#fileDeleteForm", {
  onSuccess: (data) => {
    showToast({
      message: data.detail || "Files deleted successfully.",
      type: "success",
    });
  },

  onError: (err) => {
    showToast({
      message: err?.response?.data?.detail || "Something went wrong. Try again.",
      type: "error",
      duration: 10000,
    });
  },
});