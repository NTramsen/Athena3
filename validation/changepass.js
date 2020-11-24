const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePass(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";


  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }


  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }


  // New password check
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password is required";
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "New password must be at least 6 characters";
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
