import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._previewImageModal = this._modal;
    this._image = this._previewImageModal.querySelector(
      "#modal-preview-image-src"
    );
    this._text = this._previewImageModal.querySelector(
      ".modal__image-preview_text"
    );
  }

  open(title, link) {
    this._image.src = link;
    this._image.alt = title;
    this._text.textContent = title;
    super.open();
  }
}
