import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this.handleFormSubmit = handleFormSubmit;
  }

  open(card) {
    this.card = card;
    console.log(this.card._id);
    super.open(this._modal);
  }

  close() {
    super.close(this._modal);
  }

  setEventListeners() {
    super.setEventListeners();
    this._modal.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit(this.card);
    });
  }
}
