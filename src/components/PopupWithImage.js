import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__card-image");
    this._imageText = this._popupElement.querySelector(".modal__image-text");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = `Photo of ${name}`;
    this._imageText.textContent = name;

    super.open();
  }
}
