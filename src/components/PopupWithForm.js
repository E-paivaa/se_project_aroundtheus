import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormSubmit ) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._inputList = [...this._popupForm.querySelectorAll("input")];
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector("modal__save-button");
    this._setEventListeners();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputEl) => {
      formValues[inputEl.name] = inputEl.value;
    });
    return formValues;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues()
      this._handleFormSubmit(data);
      this.reset();
    });
  }
  reset() {
    this._popupForm.reset();
    super.close();
  }
}
