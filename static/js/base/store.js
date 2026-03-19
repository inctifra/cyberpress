import Alpine from "alpinejs";

window.Alpine = Alpine;

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
});

Alpine.start();
