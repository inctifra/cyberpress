import "../../../sass/base/pages/select_account.scss";
import $ from "jquery";
import api from "../../libs/axios";
import {toast, ToastProvider} from "../../libs/toast/toast"
import { getApiWithHeaders as apiWithHeaders } from "../../libs/axios";

$(function(){
    ToastProvider("top-center")
    const accChoices = $(".select-account-page button[account-choices]");
    const subBtn = $(".select-account-page .select-account-btn")
    accChoices.on("click", function(event){
        event.stopPropagation()
        accChoices.removeClass("active");
        $(this).addClass("active")
        $(this).find(".status-check").addClass("active")
        $(this).find(".status-check").find("i.bi-check").show();
        subBtn.removeAttr("disabled");
    });

    subBtn.on("click", async function(event){
        event.stopPropagation()
        const val = accChoices.data("account");
        const label = $(this).text()
        const url = $(this).data("action")
        $(this).text("Updating account type...")
        console.log(val);
        try {
            const {data} = await api.post(url,{"account": val});
            toast.success("Account Type Set", data.message|| "Account Type setup successful. Redirecting...")
            setTimeout(() => {
                window.location.href=data.url;
            }, 1000);
        } catch (error) {
            
        } finally {
            $(this).text(label)
        }
    })

})