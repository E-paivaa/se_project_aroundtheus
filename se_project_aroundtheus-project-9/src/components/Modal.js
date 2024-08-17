export default class Modal {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
    this._modal = document.querySelector(this._modalSelector);
    this._closeWithEsc = this._closeWithEsc.bind(this);
    this._closeWithClick = this._closeWithClick.bind(this);
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeWithEsc);
    this._modal.addEventListener("click", this._closeWithClick);
  }

  close() {
    document.removeEventListener("keydown", this._closeWithEsc);
    this._modal.removeEventListener("click", this._closeWithClick);
    this._modal.classList.remove("modal_opened");
  }

  _closeWithEsc(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _closeWithClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    const modalCloseIcon = this._modal.querySelector(".modal__close");
    if (modalCloseIcon) {
      modalCloseIcon.addEventListener("click", () => {
        console.log("Close button clicked");
        this.close();
      });
    }
  }
}
