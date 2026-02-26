import Swal from "sweetalert2";

export function showPasskeyAlert(passkey) {
  Swal.fire({
    icon: "success",
    title: "Your Print Passkey",
    html: `
      <p style="margin-bottom: 10px;">
        This is your personal print access code.
        <strong>Please copy and save it.</strong>
      </p>

      <div style="
        background:#f8f9fa;
        border:2px dashed #0d6efd;
        padding:15px;
        border-radius:8px;
        font-size:1.8rem;
        font-weight:bold;
        letter-spacing:3px;
        text-align:center;
        margin:15px 0;
      ">
        ${passkey}
      </div>

      <p style="font-size:0.9rem; color:#6c757d;">
        You will need this code to print your documents.
      </p>
    `,
    confirmButtonText: "Copy Passkey",
    allowOutsideClick: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await navigator.clipboard.writeText(passkey);

      Swal.fire({
        icon: "success",
        title: "Copied Successfully!",
        text: "Keep this passkey safe. You will need it to access the files at the cybercafe.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
}