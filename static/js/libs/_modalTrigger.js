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
}) => {
  const btn$ = $(buttonSelector);
  const modal$ = $(modalSelector);

  if (!btn$.length || !modal$.length) {
    console.warn(
      `Modal trigger not found: ${buttonSelector} → ${modalSelector}`
    );
    return null;
  }

  const modalInstance = new Modal(modal$.get(0), {
    keyboard: false,
    backdrop: "static",
    ...modalOptions,
  });

  btn$.off("click.modalTrigger").on("click.modalTrigger", () => {
    modalInstance.show();
  });

  return modalInstance;
};