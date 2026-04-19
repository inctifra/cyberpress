import "../../sass/base/styles.scss";
import $ from "jquery";
import { ToastProvider } from "../libs/toast/toast";


$(async () => {
  ToastProvider("top-right");
  const [{initUploadForm}] = await Promise.all([
    import("../actions/upload-files"),
    import("../actions/access-files"),
    import("../actions/delete-files"),
    import("../actions/request-print"),
    import("../libs/axios"),
    import("../libs/formHandler"),
    import("../libs/toast"),
    import("./store"),
    import("../v1/index"),
  ]);
  initUploadForm();
});
