export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeClick
  ) {
    this.id = _id;
    this.isLiked = isLiked;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.dataset.id = this._id;
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._likeButtonEl = this._cardElement.querySelector(".card__like-button");
    this._deleteButtonEl = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = `Image of ${this._name}`;
    this._setEventListeners();
    this._handleLikeIcon();
  }

  _setEventListeners() {
    this._likeButtonEl.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButtonEl.addEventListener("click", () => {
      this._handleCardDelete(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikes(isLiked) {
    this.isLiked = isLiked;
    this._handleLikeIcon();
  }

  _handleLikeIcon() {
    if (this.isLiked) {
      this._likeButtonEl.classList.add("card__like-button_active");
    } else {
      this._likeButtonEl.classList.remove("card__like-button_active");
    }
  }

  getView() {
    return this._cardElement;
  }
}
