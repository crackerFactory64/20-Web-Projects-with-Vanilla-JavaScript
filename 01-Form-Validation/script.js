const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const isEmail = (email) => {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.value.trim() == "") {
      showError(input, `${getFieldName(input)} can not be empty`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value != "") {
    if (input.value.trim().length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters long`
      );
    } else if (input.value.trim().length > max) {
      showError(
        input,
        `${getFieldName(input)} can't be more than ${max} characters long`
      );
    } else {
      showSuccess(input);
    }
  }
};

const checkEmail = (input) => {
  if (input.value.trim() != "") {
    if (isEmail(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, "Must be a valid email address");
    }
  }
};

const checkPasswords = (input1, input2) => {
  if (input1.value.length != "" && input2.value != "") {
    if (input1.value == input2.value) {
      showSuccess(input2);
    } else {
      showError(input2, `Passwords must match`);
    }
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 32);
  checkEmail(email);
  checkPasswords(password, password2);
});
