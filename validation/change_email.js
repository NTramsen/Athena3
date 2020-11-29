const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePass(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newPassword = !isEmpty(data.newEmail) ? data.newEmail : "";
  data.newPassword2 = !isEmpty(data.newEmail2) ? data.newEmail2 : "";



  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }






  // New email checks
  if (Validator.isEmpty(data.newEmail)) {
    errors.newEmail = "New email is required";
  } else if (!Validator.isEmail(data.newEmail)) {
      errors.newEmail = "Please enter a valid email";
    }



  if (Validator.isEmpty(data.newEmail2)) {
    errors.newEmail2 = "Confirm email is required";
  } else if (!Validator.equals(data.newEmail, data.newEmail2)) {
      errors.newEmail2 = "Emails do not match";
    }





  return {
    errors,
    isValid: isEmpty(errors)
  };
};
