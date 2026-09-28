const form = document.querySelector("#innmelding");
const email = document.querySelector("#email");
const emailConfirm = document.querySelector("#email-confirm");
const formStatus = document.querySelector("#form-status");

function validateEmails() {
  if (email.value !== emailConfirm.value) {
    emailConfirm.setCustomValidity("E-postadressene må være like.");
  } else {
    emailConfirm.setCustomValidity("");
  }
}

email.addEventListener("input", validateEmails);
emailConfirm.addEventListener("input", validateEmails);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  validateEmails();

  if (!form.checkValidity()) {
    formStatus.textContent = "Kontroller feltene og prøv igjen.";
    form.reportValidity();
    return;
  }

  formStatus.textContent =
    "Skjemaet er gyldig. I en ferdig løsning ville opplysningene blitt sendt til serveren.";
});