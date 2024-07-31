import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImageElement = this._popupElement.querySelector("#modal-image");
    this._cardTitleElement =
      this._popupElement.querySelector("#modal-preview-image-title");
  }

  open(data) {
    this._cardImageElement.src = data.link;
    this._cardImageElement.alt = data.name;
    this._cardTitleElement.textContent = data.name;
    super.open();
  }
}