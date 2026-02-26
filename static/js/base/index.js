import "../../sass/base/styles.scss";
import $ from "jquery";

$(async () => {
  const [{initUploadForm}] = await Promise.all([
    import("../actions/upload-files"),
    import("../actions/access-files"),
    import("../actions/delete-files"),
    import("../libs/axios"),
    import("../libs/formHandler"),
    import("../libs/toast"),
  ]);
  initUploadForm();
});
