import $ from "jquery";

/**
 * Creates a file renderer for dropzone uploads
 * @param {Object} options
 * @param {string} options.previewTemplate - HTML template string with data-dz-* attributes
 * @param {jQuery} options.container - jQuery element to append previews to
 * @param {Function} options.onRemove - Callback when file is removed
 * @returns {Object} - Methods: addFile(file), removeFile(file), updateProgress(file, progress)
 */
export function createDropzoneRenderer(options) {
  const { previewTemplate, container, onRemove } = options;
  const fileElements = new Map();
  const simulations = new Map();

//   90e2cd -> file access code 1

  function addFile(file) {
    const $el = $(previewTemplate);
    fileElements.set(file, $el);
    console.log(fileElements)
    return $el;
  }

  function removeFile(file) {
    const $el = fileElements.get(file);
    if ($el) {
      $el.remove();
      fileElements.delete(file);
    }
  }

  function updateProgress(file, progress) {
    const $el = fileElements.get(file);
    if ($el) {
      $el
        .find("[data-dz-uploadprogress]")
        .attr("style", `width: ${progress}% !important;`);
    }
  }

  function setError(file, message) {
    const $el = fileElements.get(file);
    if ($el) {
      $el.find("[data-dz-errormessage]").text(message);
      $el.addClass("dz-error");
    }
  }

  function formatSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(1)) +
      " " +
      ["B", "KB", "MB", "GB"][i]
    );
  }

  function startSimulation(file) {
    let uploaded = 0;
    const total = file.size;
    const tick = Math.min(50 * 1024, total / 20);

    const interval = setInterval(() => {
      uploaded += tick + Math.random() * tick * 0.5;
      if (uploaded >= total) {
        uploaded = total;
        clearInterval(interval);
        updateProgress(file, total);
      } else {
        const progress = (uploaded / total) * 100;
        updateProgress(file, progress);
      }
    }, 100);
  }

  function stopSimulation(file) {
    const interval = simulations.get(file);
    if (interval) {
      clearInterval(interval);
      simulations.delete(file);
    }
  }

  return { addFile, removeFile, updateProgress, setError, startSimulation };
}
