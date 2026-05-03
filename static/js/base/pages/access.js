import $ from "jquery";
import "../../../sass/base/pages/access.scss";
import api, { getApiWithHeaders as apiWithHeaders } from "../../libs/axios";
import { initializeModalTrigger } from "../../libs/_modalTrigger";
import { toast, ToastProvider } from "../../libs/toast/toast";

document.addEventListener("DOMContentLoaded", function () {
  if (!$(".tab-btn").length) return;

  const $tabs = $(".tab-btn");
  const $panels = $(".form-panel");

  $tabs.on("click", function () {
    const target = $(this).data("target");
    $tabs.removeClass("active");
    $(this).addClass("active");
    $panels.removeClass("active-panel");
    $panels.filter(`[data-panel="${target}"]`).addClass("active-panel");
  });
});

async function handleAccess() {
  const searchUrl = new URLSearchParams();
  const accessContainer = $(".files-area .search-filter-files");

  $(".search-filter-form input").on("keyup", function (e) {
    if (e.key == "Enter") {
      const val = $(this).val();
      console.log(val);
      if (val.length < 3) return;

      $(".skeleton-card").fadeIn(1000, function () {
        $(this).addClass("active");
      });
      const actionUrl = $(this).data("action");
      searchUrl.set("access_code", val);
      const fullUrl = `${actionUrl}?${searchUrl.toString()}`;

      $.get(fullUrl)
        .done((r) => {
          $(".skeleton-card").fadeOut(1000, function () {
            $(this).removeClass("active");
          });

          accessContainer.html(r);

          const scriptJson = $("script#session-data").text();
          if (!scriptJson) return;

          const jsonData = JSON.parse(scriptJson);
          console.log(jsonData);
          const { access_code, files } = jsonData;
          window.CyberConnectStore.setFiles(files);
          handleDelete();
        })
        .fail((e) => console.log(e));

      // setTimeout(()=>{
      //    $(".skeleton-card").fadeOut(1000, function(){
      //      $(this).removeClass("active");
      //    })
      // }, 3000)
    }
  });
}

async function handleDelete(){
  ToastProvider("top-center")

  const $triggerBtn = $(".file-actions a#delete-file");
  // const $container = $("#fileDeleteModal");

  // console.log($triggerBtn);
  // console.log($container);

  $triggerBtn.on("click", async function(){
    console.log($(this));

    const url = $(this).data("file-delete-url")
    const id = $(this).data("file-id")

    if(window.confirm("This action is irreversible!")){
      try {
        const {data} = await api.post(url, {});
        console.log(data)
        toast.success("Success Deletion", "File was deleted successfully", 5000)
      } catch (error) {
        toast.error("Failed to delete", "Your file could not be deleted", 5000)
      } finally {
        $(`[data-file-container-id=${id}]`).fadeOut(1000)
      }
    }
  })
}

async function handleFileFilter() {
  const $filterBtns = $(".upload-files-status-filter button");
  $filterBtns.on("click", function (event) {
    event.stopPropagation();
    $filterBtns.removeClass("active");
    $(this).addClass("active");
    const status = $(this).data("filter");
    window.CyberConnectStore.setFilter(status);

    window.CyberConnectStore.subscribe((state) => {
      const conn = Array.from(state.files).filter((c) => c.status == status);
      console.log(conn);
    });
  });
}

handleAccess();
handleFileFilter();
