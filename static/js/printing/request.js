import $ from "jquery";
import "../base/pages/printingRequest";

$(function () {
  const init = async () => {
    const [{}] = await Promise.all([
      import("./actions/search"),
      import("./cafes/select"),
      import("./core/navigation"),
    ]);
  };

  init();
});
