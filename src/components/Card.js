export default class Card {
  constructor(
    { isLiked, _id, name, link },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleCardLike
  ) {
    this._isLiked = isLiked;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
  }

  _setEventListeners() {
    // card like button
    const heart = this._cardElement.querySelector(".heart-button");
    heart.addEventListener("click", () => {
      this._handleHeartButton();
      this._handleCardLike(this);
    });

    // card delete button
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    // handleImageClick
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  //  LIKE BUTTON
  _handleHeartButton() {
    this._cardElement
      .querySelector(".heart-button")
      .classList.toggle("heart-button_active");
  }

  setLiked(isLiked) {
    if (isLiked === true) {
      this._cardElement
        .querySelector(".heart-button")
        .classList.add("heart-button_active");
    } else {
      this._cardElement
        .querySelector(".heart-button")
        .classList.remove("heart-button_active");
    }
  }

  // DELETE CARD
  domDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // CARD FUNCTION
  generateCard() {
    this._cardElement = this._cardSelector.cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._setEventListeners();

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    return this._cardElement;
  }
}
