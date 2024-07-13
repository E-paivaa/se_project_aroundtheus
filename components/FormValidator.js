export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputEls = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    if (errorMessageEl) {
      inputEl.classList.add(this._inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(this._errorClass);
    }
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    if (errorMessageEl) {
      inputEl.classList.remove(this._inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(this._errorClass);
    }
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButtonState() {
    const isFormValid = !this._hasInvalidInput();

    if (isFormValid) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    console.log(this._formElement instanceof HTMLFormElement);

    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formElement.reset();
      this._inputEls.forEach((inputEl) => this._hideInputError(inputEl));
      this._disableSubmitButton();
    });

    this._setEventListeners();
  }
}
