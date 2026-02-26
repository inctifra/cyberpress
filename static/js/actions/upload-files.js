import { setupAjaxForm } from "../libs/formHandler";
import { showToast } from "../libs/toast";
import { createDropzone } from "../libs/createDropzone";
import { showPasskeyAlert } from "../libs/passkeyAlert";

export function initUploadForm() {
  const dropzoneElement = document.querySelector("#fileDropzone");
  if (!dropzoneElement) return;

  const dropzone = createDropzone({
    selector: "#fileDropzone",
    url: "/upload",
    autoProcessQueue: false,
    uploadMultiple: true,
  });

  if (!dropzone) return;

  setupAjaxForm("#uploadForm", {
    modifyFormData: (formData, form) => {
      if (dropzone.files.length === 0) {
        showToast({
          message: "Please select at least one file.",
          type: "error",
        });
        return false;
      }

      formData.delete("files");

      dropzone.files.forEach((file) => {
        formData.append("files", file);
      });

      return formData;
    },

    onSuccess: (data) => {
      const { message,access_code } = data;
      showToast({
        message: message || "Files uploaded successfully!",
        type: "success",
      });
      setTimeout(() => {
      dropzone.removeAllFiles(true);
      }, 2000);
      showPasskeyAlert(access_code);
    },

    onError: (err, values, form, cleanedError) => {
        const errorMessage = cleanedError?.message || cleanedError?.error || cleanedError?.detail || "An error occurred while uploading files.";
        showToast({
          message: errorMessage,
          type: "error",
        });
      console.error("Upload error:", cleanedError?.message || cleanedError?.detail || "Unknown error");
    },
  });
}

// a58bb3
// 8c2f40
