import Dropzone from "dropzone";

export function initUploadForm() {
  Dropzone.autoDiscover = false;

  const dropzoneElement = document.querySelector("#fileDropzone");
  const form = document.querySelector("#uploadForm");

  if (!dropzoneElement) return;

  const dropzone = new Dropzone(dropzoneElement, {
    url: form.action,
    paramName: "files",
    maxFiles: 5,
    uploadMultiple: true,
    parallelUploads: 5,
    autoProcessQueue: false,
    addRemoveLinks: false,

    acceptedFiles: `.pdf,.doc,.docx,.ppt,.pptx`,

    dictDefaultMessage: "Drop your files here",
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (dropzone.files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    dropzone.processQueue();
  });

  dropzone.on("successmultiple", function (files, response) {
    if (response.success && response.redirect_url) {
      window.location.href = response.redirect_url;
    }
  });
}