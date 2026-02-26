import { setupAjaxForm } from "../libs/formHandler";
import { showToast } from "../libs/toast";
import { Modal } from "bootstrap";

setupAjaxForm("#fileAccessForm", {
  onSuccess: (data) => {
    console.log("Access form success");
    const modalBody = document.querySelector("#filesModal .modal-body");

    if (!modalBody) {
      console.error("Modal body not found");
      return;
    }

    modalBody.innerHTML = data;
    // if (modalBody.querySelector(".alert-danger")) {
    //   showToast({
    //     message: "Access failed. Check your passkey.",
    //     type: "error",
    //   });
    //   return;
    // }

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