import { setupAjaxForm } from "../libs/formHandler";
import { showToast } from "../libs/toast";
import { Modal } from "bootstrap";

setupAjaxForm("#fileAccessForm", {
  onSuccess: (data) => {
    const modalBody = document.querySelector("#filesModal .modal-body");

    if (!modalBody) {
      console.error("Modal body not found");
      return;
    }

    modalBody.innerHTML = data;

    const elem = document.querySelector("#filesModal");
    const modal = new Modal(elem, {
      backdrop: "static",
      keyboard: false,
    });

    modal.show();
  },

  onError: (err) => {
    console.error("Access form error:", err);
    showToast({
      message: "Something went wrong. Try again.",
      type: "error",
    });
  },
});