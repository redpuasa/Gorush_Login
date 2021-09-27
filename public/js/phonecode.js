const phoneInputField = document.querySelector("#contact_1");
const phoneInput = window.intlTelInput(phoneInputField, {
	preferredCountries: ["bn", "id", "my", "sg"],
	utilsScript:
	"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

phoneInputField.addEventListener("input", function(){
  validatePhone();
  let code = phoneInput.getSelectedCountryData().dialCode;
  document.getElementById("code").setAttribute("value", code);
});

function validatePhone(){
  if(!(phoneInput.isValidNumber())) {
    phoneInputField.setCustomValidity("Invalid Phone Number");
  } else {
    phoneInputField.setCustomValidity('');
  }
}

const phoneInputField1 = document.querySelector("#contact_2");
const phoneInput1 = window.intlTelInput(phoneInputField1, {
	preferredCountries: ["bn", "id", "my", "sg"],
	utilsScript:
	"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

phoneInputField1.addEventListener("input", function(){
  validatePhone();
  let code1 = phoneInput1.getSelectedCountryData().dialCode1;
  document.getElementById("code").setAttribute("value", code1);
});

function validatePhone1(){
  if(!(phoneInput1.isValidNumber())) {
    phoneInputField1.setCustomValidity("Invalid Phone Number");
  } else {
    phoneInputField1.setCustomValidity('');
  }
}