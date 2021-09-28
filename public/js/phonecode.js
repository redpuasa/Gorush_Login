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


const phoneInputField_2 = document.querySelector("#contact_2");
const phoneInput_2 = window.intlTelInput(phoneInputField_2, {
	preferredCountries: ["bn", "id", "my", "sg"],
	utilsScript:
	"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

phoneInputField_2.addEventListener("input", function(){
  validatePhone();
  let code_2 = phoneInput_2.getSelectedCountryData().dialCode;
  document.getElementById("code_2").setAttribute("value", code_2);
});

function validatePhone_2(){
  if(!(phoneInput_2.isValidNumber())) {
    phoneInputField_2.setCustomValidity("Invalid Phone Number");
  } else {
    phoneInputField_2.setCustomValidity('');
  }
}