import Alpine from "alpinejs";
import api from "../libs/axios";
window.Alpine = Alpine;
import {toast} from "../libs/toast/toast"

document.addEventListener("alpine:init", () => {
  Alpine.store("app", {
    contact: {
      phone: "+254705797745",
    },
    message: "Hello, I need help",

    get whatsappLink() {
      const phoneNumber = this.contact.phone.replace("+", "");
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(this.message)}`;
    },
  });

  Alpine.data("profileEdit", () => ({
    editing: false,
    url: null,
    form: {
      full_name: "Jeckonia Kwasa",
      email: "",
      phone: "+254 712 345 678",
      location: "Nairobi, Kenya",
    },
    init() {
     const inputs = this.$el.querySelectorAll("input");
     const url = this.$el.dataset.customerUpdateUrl;

     console.log(url)
     this.url= url

    inputs.forEach((el) => {
      // const type = el.getAttribute("type");

      // if (type === "email") {
      //   const value = el.value;
      //   console.log(value);
      //   this.form["email"] = value;
      // }
      // if (el.getAttribute("name") == "full_name") {
      //   const value = el.value;
      //   console.log(value);
      //   this.form["full_name"] = value;
      // }
        const name = el.getAttribute("name");
        if (!name) return;

        this.form[name] = el.value;
    });

    return this.form;

    },
    startEditing() {
      this.editing = true;
    },
    cancelEditing() {
      this.editing = false;
    },
    getInitials(name) {
      const parts = name.trim().split(" ").filter(Boolean);
      if (parts.length === 1) {
        return parts[0][0].toUpperCase();
      }
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },
    async saveProfile() {
      console.log("Form data to submit:", this.form);

      this.editing = false;
      try {
        const {data} = await api.post(this.url, this.form);
        toast.success("Profile Update",  data.detail, 5000)
      } catch (error) {
        console.log(error)
      }
    },
  }));
});

Alpine.start();
