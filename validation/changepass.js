const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePass(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";



  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }






  // New password check
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password is required";
  } else if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
      errors.newPassword = "New password must be at least 6 characters";
    }



  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword = "Confirm password is required";
  } else if (!Validator.equals(data.newPassword, data.newPassword2)) {
      errors.newPassword = "Passwords do not match";
    }





  return {
    errors,
    isValid: isEmpty(errors)
  };
};
