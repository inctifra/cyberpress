import Dropzone from "dropzone";
import { showToast } from "./toast";

export function createDropzone({
  selector,
  url = "/",
  maxFiles = 5,
  maxFilesize = 25, // MB per file
  maxTotalSize = 50, // MB total
  acceptedFiles = ".pdf,.doc,.docx,.ppt,.pptx",
  autoProcessQueue = false,
  uploadMultiple = false,
  addRemoveLinks = true,
}) {
  Dropzone.autoDiscover = false;

  const element = document.querySelector(selector);
  if (!element) return null;

  const dz = new Dropzone(element, {
    url,
    autoProcessQueue,
    uploadMultiple,
    maxFiles,
    maxFilesize,
    acceptedFiles,
    addRemoveLinks,
  });

  // 🚫 Max files exceeded
  dz.on("maxfilesexceeded", function (file) {
    showToast({ message: `Maximum ${maxFiles} files allowed.`, type: "error" });
    this.removeFile(file);
  });

  // 📦 File added
  dz.on("addedfile", function (file) {
    const totalSizeBytes = dz.files.reduce((sum, f) => sum + f.size, 0);
    const maxTotalBytes = maxTotalSize * 1024 * 1024;

    if (totalSizeBytes > maxTotalBytes) {
      showToast({ message: `Total size must not exceed ${maxTotalSize}MB.`, type: "error" });
      dz.removeFile(file);
      return;
    }

    const duplicate = dz.files.find(
      (f) => f !== file && f.name === file.name
    );

    if (duplicate) {
      showToast({ message: `"${file.name}" is already added.`, type: "error" });
      dz.removeFile(file);
    }
  });
  // ❌ Errors
  dz.on("error", function (file, message) {
    showToast({ message, type: "error" });
    dz.removeFile(file);
  });

  return dz;
}