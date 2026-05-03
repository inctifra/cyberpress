import "@popperjs/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./libs/store";

//     if (window.INITIAL_FILES) {
//         window.CyberConnectStore.setFiles(window.INITIAL_FILES);
//     }
// console.log(window.CyberConnectStore)

window.CyberConnectStore.setFiles([
  { id: 1, name: "doc.pdf", status: "active", size: 1024 },
  { id: 2, name: "img.png", status: "expired", size: 2048 },
]);
