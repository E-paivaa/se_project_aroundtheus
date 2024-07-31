export default class Popup {
    constructor({ popupSelector }) {
      this._popupElement = document.querySelector(popupSelector);
      this._closeModalESC = this._closeModalESC.bind(this);
    }
  
    open() {
      this._popupElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._closeModalESC);
    }
  
    close() {
      this._popupElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._closeModalESC);
    }
  
    _closeModalESC = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  
    setEventListeners() {
      const closeButton = this._popupElement.querySelector(".modal__close-button");
      closeButton.addEventListener("click", () => {
        this.close();
      });
      this._popupElement.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("modal_opened")) {
          this.close();
        }
      });
    }
  }