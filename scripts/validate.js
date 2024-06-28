const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  
  function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.add(inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(errorClass);
    }
  }
  
  function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.remove(inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(errorClass);
    }
  }
  
  function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, options);
    } else {
      hideInputError(formEl, inputEl, options);
    }
  }
  
  function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    const isFormValid = Array.from(inputEls).every(
      (inputEl) => inputEl.validity.valid
    );
  
    if (isFormValid) {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    }
  }
  
  function setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = formEl.querySelectorAll(inputSelector);
    const submitButton = formEl.querySelector(submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }
  
  function enableValidation(options) {
    const formEls = document.querySelectorAll(options.formSelector);
    formEls.forEach((formEl) => {
      setEventListeners(formEl, options);
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
    });
  }
  
  enableValidation(config);