import Dropzone from "dropzone";
import { showToast } from "./toast";
import { toast } from "./toast/toast";
import { createDropzoneRenderer } from "./utils/dropzoneRenderer";

function processFiles(renderer, files) {
  Array.from(files).forEach((file) => {
    renderer.addFile(file);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      renderer.updateProgress(file, progress);
    }, 200);
  });
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
  dictRemoveFile = '<i class="bi bi-x"></i>',
  clickable = true,
  previewsContainer = "#fileList",
  previewTemplate = `
            <div class="file-item dz-preview dz-file-preview">
                <div class="file-icon"><i class="bi bi-file-earmark"></i></div>
                <div class="flex-grow-1 min-w-0">
                    <p class="fw-medium text-truncate mb-0 dz-filename" style="color: rgba(255,255,255,0.8); font-size: 0.75rem;" data-dz-name></p>
                    <p class="mb-0" style="color: rgba(255,255,255,0.25); font-size: 0.625rem;" data-dz-size></p>
                    <div class="progress-bg">
                        <div class="progress-fill dz-upload" data-dz-uploadprogress></div>
                    </div>
                    <p class="dz-error-message text-danger mb-0" style="font-size: 0.625rem;" data-dz-errormessage></p>
                </div>
            </div>
        `,
  isAuthenticated = false,
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
    dictRemoveFile,
    clickable,
    previewsContainer,
    previewTemplate,
  });

  const renderer = createDropzoneRenderer({
    previewTemplate,
    container: previewsContainer,
    onRemove: (file) => console.log("Removed:", file.name),
  });

  // 🚫 Max files exceeded
  dz.on("maxfilesexceeded", function (file) {
    toast.error("Max File Upload", `Maximum ${maxFiles} files allowed.`, 5000);
    this.removeFile(file);
  });

  // 📦 File added
  dz.on("addedfile", function (file) {
    const totalSizeBytes = dz.files.reduce((sum, f) => sum + f.size, 0);
    const maxTotalBytes = maxTotalSize * 1024 * 1024;
    renderer.addFile(file)
    renderer.startSimulation(file)

    if (totalSizeBytes > maxTotalBytes) {
      toast.error(
        "Max File Upload",
        `Total size must not exceed ${maxTotalSize}MB.`,
        5000,
      );
      dz.removeFile(file);
      return;
    }

    const duplicate = dz.files.find((f) => f !== file && f.name === file.name);

    if (duplicate) {
      toast.error("Existing File", `"${file.name}" is already added.`, 5000);
      dz.removeFile(file);
    }
  });
  // ❌ Errors
  dz.on("error", function (file, message) {
    toast.error("Dropzone Error", message, 5000);
    dz.removeFile(file);
  });


  return dz;
}
