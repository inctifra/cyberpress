import { setupAjaxForm } from "../libs/formHandler";
import { toast } from "../libs/toast/toast";


setupAjaxForm("#fileDeleteForm", {
  onSuccess: (data) => {
    const message = data.detail || "Files deleted successfully.";
    toast.success("Deletion success", message)
  },

  onError: (err) => {
    const message =
      err?.response?.data?.detail || "Something went wrong. Try again.";
      toast.error("Deletion failure", message)
  },
});
// df91a4
