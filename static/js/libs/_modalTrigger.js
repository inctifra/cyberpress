import { Modal } from "bootstrap";

/**
 * Initialize a Bootstrap modal trigger
 *
 * @param {Object} options
 * @param {string} options.buttonSelector - Selector for trigger button(s)
 * @param {string} options.modalSelector - Selector for modal element
 * @param {Object} options.modalOptions - Bootstrap modal options
 * @returns {Modal|null}
 */
export const initializeModalTrigger = ({
  buttonSelector,
  modalSelector,
  modalOptions = {},
  loadContent = null,
  bodySelector = ".modal-body",
}) => {
  const btn$ = $(buttonSelector);
  const modal$ = $(modalSelector);

  if (!btn$.length || !modal$.length) {
    console.warn(
      `Modal trigger not found: ${buttonSelector} → ${modalSelector}`,
    );
    return null;
  }

  const modalInstance = new Modal(modal$.get(0), {
    keyboard: false,
    backdrop: "static",
    ...modalOptions,
  });

  const body = modal$.find(bodySelector);

  btn$.off("click.modalTrigger").on("click.modalTrigger", async function () {
    try {
     if (typeof loadContent === "function") {
        await loadContent(body, body.data("temp-url"));
      }
      modalInstance.show();
    } catch (error) {
      console.error("Failed to load modal content:", error);
      body.html(`<div class="text-danger p-3">Failed to load content.</div>`);
      modalInstance.show();
    }
  });

  return modalInstance;
};
