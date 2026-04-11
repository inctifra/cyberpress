import $ from "jquery";
import "../base/pages/printingRequest";
import { ToastProvider } from "../libs/toast/toast";

$(function () {
    ToastProvider("top-right");
  const init = async () => {
    const [{}] = await Promise.all([
      import("./actions/search"),
      import("./cafes/select"),
      import("./core/navigation"),
    ]);
  };

  init();
});
