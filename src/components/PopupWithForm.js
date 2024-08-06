import { data } from "autoprefixer";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, userInfo }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._inputList = [...this._popupForm.querySelectorAll("input")];
    this._handleFormSubmit = handleFormSubmit;
    this._userInfo = userInfo;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((inputEl) => {
      data[inputEl.name] = inputEl.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._handleFormSubmit(data);
      this._popupForm.reset();
    });
  }
}