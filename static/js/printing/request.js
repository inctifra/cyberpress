import $ from 'jquery';

$(function(

){
    const  init = async()=>{
        const [{}] = await Promise.all([
            import("../base/pages/printingRequest"),
            import("./actions/search"),
            import("./cafes/select"),
            import("./core/navigation"),
        ])
    }

    init();
})