import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._modalForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const inputValues = {};
    this._modalForm.querySelectorAll(".modal__input").forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open(data) {
    this._data = data;
    super.open();
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading(isLoading, message = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = message;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
