export default class Card {
  constructor(
    { isLiked, _id, name, link },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleCardLike,
    checkIfLiked
  ) {
    this._isLiked = isLiked;
    this._id = _id;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._checkIfLiked = checkIfLiked;
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

  // EVENT LISTENER PRIVATE FUNCTIONS
  _handleHeartButton() {
    console.log(this._cardElement);
    this._cardElement
      .querySelector(".heart-button")
      .classList.toggle("heart-button_active");
  }

  // DELETEING CARDS ADDING LIKES
  domDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // DISPLAY OF CARD PUBLIC FUNCTION

  generateCard() {
    this._cardElement = this._cardSelector.cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._setEventListeners();

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._checkIfLiked(this._isLiked, this._cardElement);

    return this._cardElement;
  }
}
