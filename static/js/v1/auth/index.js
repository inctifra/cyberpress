import $ from "jquery";

$(document).ready(async function () {
  const [{ setupAjaxForm }, { toast, ToastProvider }] = await Promise.all([
    import("../../libs/formHandler"),
    import("../../libs/toast/toast"),
  ]);
  ToastProvider("top-right");
  setupAjaxForm("#login-form", {
    onSuccess: (data) => {
      const { success, message, redirect_url } = JSON.parse(data.html);
      if (success) {
        toast.success(
          "Login Successful",
          message || "You have successfully logged in.",
          3000,
        );
      }
      if (redirect_url) {
        setTimeout(() => {
          window.location.href = redirect_url;
        }, 3000);
      }
    },
    onError: (err, formValues, form, cleanedError) => {
      
      const { message } = JSON.parse(cleanedError.raw.html);
      console.error("Login failed", message, cleanedError);
      toast.error(
        "Failed Login",
        message || "Login failed. Please check your credentials.",
        5000,
      );
    },
  });

  setupAjaxForm("#signup-form", {
    onSuccess: (data) => {
        toast.success(
          "Signup Successful",
          "Your account has been created. Please check your email to confirm your account.",
          5000,
        );
    },
    onError: (err, formValues, form, cleanedError) => {
        toast.error(
          "Failed Signup",
          "Registration failed. Please check the provided information.",
          5000,
        );
    },
    modifyFormData: (data) => {
      const { password1, password2 } = Object.fromEntries(data.entries());
      if (password1 !== password2) {
        toast.error(
          "Password Mismatch",
          "The passwords you entered do not match. Please try again.",
          5000,
        );
        return null;
      }
      return data;
    },
  });
});
