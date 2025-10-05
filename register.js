
const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");

document.getElementById("show-register").addEventListener("click", () => {
  loginSection.classList.add("d-none");
  registerSection.classList.remove("d-none");
});

document.getElementById("show-login").addEventListener("click", () => {
  registerSection.classList.add("d-none");
  loginSection.classList.remove("d-none");
});

//REGISTER
const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordAgain = document.getElementById("password-again");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const registerBtn = document.getElementById("register-btn");

function validateRegisterForm() {
  const allFilled =
    username.value.trim() &&
    password.value.trim() &&
    passwordAgain.value.trim() &&
    firstname.value.trim() &&
    lastname.value.trim();

  const passwordsMatch = password.value === passwordAgain.value;

  registerBtn.disabled = !(allFilled && passwordsMatch);

  if (password.value && passwordAgain.value && !passwordsMatch) {
    passwordAgain.classList.add("is-invalid");
  } else {
    passwordAgain.classList.remove("is-invalid");
  }
}

[username, password, passwordAgain, firstname, lastname].forEach(input =>
  input.addEventListener("input", validateRegisterForm)
);

registerBtn.addEventListener("click", () => {
  const userData = {
    username: username.value.trim(),
    password: password.value.trim(),
    firstname: firstname.value.trim(),
    lastname: lastname.value.trim(),
  };

  localStorage.setItem("registeredUser", JSON.stringify(userData));
  alert("Registration successful!");
  document.getElementById("register-form").reset();
  registerBtn.disabled = true;

  registerSection.classList.add("d-none");
  loginSection.classList.remove("d-none");
});

//LOGIN
const loginBtn = document.getElementById("login-btn");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginAlert = document.getElementById("login-alert");

loginBtn.addEventListener("click", () => {
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  if (
    storedUser &&
    storedUser.username === loginUsername.value.trim() &&
    storedUser.password === loginPassword.value.trim()
  ) {
    localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
    loginAlert.classList.add("d-none");
    window.location.href = "main.html";
  } else {
    loginAlert.classList.remove("d-none");
  }
});
