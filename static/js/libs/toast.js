import ToasterUi from 'toaster-ui';

const toaster = new ToasterUi();

/**
 * Show a toast notification
 * @param {Object} options - Toast options
 * @param {string} options.message - Content of the toast
 * @param {string} [options.type='default'] - Type of toast: default, success, error, warning, info, loading, custom
 * @param {number} [options.duration=3000] - Duration in ms for auto-close
 * @param {boolean} [options.autoClose=true] - Whether to auto-close the toast
 * @param {boolean} [options.allowHtml=false] - Allow HTML content
 * @param {Object} [options.styles={}] - Custom styles for the toast
 * @param {Function} [options.onClose] - Callback when toast closes
 * @returns {number} toastId - ID of the created toast
 */
export function showToast({
  message = '',
  type = 'default',
  duration = 4000,
  autoClose = true,
  allowHtml = false,
  styles = {},
  onClose = () => {},
} = {}) {
  const toastId = toaster.addToast(message, type, {
    duration,
    autoClose,
    allowHtml,
    styles,
    onClose,
  });

  return toastId;
}

/**
 * Update a toast by ID
 * @param {number} toastId - The ID of the toast
 * @param {Object} options - Same options as showToast
 */
export function updateToast(toastId, {
  message,
  type = null,
  duration = null,
  autoClose = null,
  allowHtml = null,
  styles = null,
  onClose = null,
} = {}) {
  toaster.updateToast(toastId, message, type, {
    ...(duration !== null && { duration }),
    ...(autoClose !== null && { autoClose }),
    ...(allowHtml !== null && { allowHtml }),
    ...(styles !== null && { styles }),
    ...(onClose !== null && { onClose }),
  });
}


export function showCustomAlertMessage({
  selector = ".checkout-response",
  message = "",
  showDuration = 400,
  visibleDuration = 10000,
  hideDuration = 400,
} = {}) {
  const $msg = $(selector);

  if (!$msg.length) return;

  $msg
    .stop(true, true)
    .removeClass("d-none")
    .hide()
    .text(message)
    .fadeIn(showDuration);

  setTimeout(function () {
    $msg.fadeOut(hideDuration, function () {
      $msg.addClass("d-none");
    });
  }, visibleDuration);
}