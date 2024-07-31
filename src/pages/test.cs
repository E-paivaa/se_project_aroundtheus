import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";

// Elements

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileNameInput = document.querySelector("#profile-name-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardModalButton = document.querySelector(".profile__add-button");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewImageModal = document.querySelector("#preview-image-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const addCardCloseButton = document.querySelector(
  "#add-card-modal-button-close"
);
const previewImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);
const modalImage = previewImageModal.querySelector("#modal-image");
const modalTitle = previewImageModal.querySelector(
  "#modal-preview-image-title"
);

// Components 

const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards"
);
section.renderItems();

const newImagePopup = new PopupWithImage("#image-modal");
newImagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
newCardPopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileTitle);

// Functions

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
  section.addItem(card);
}

function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;
  userInfo.setUserInfo({ name, description });
  editProfilePopup.close();
  profileEditForm.reset();
}

function handleAddCardFormSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.url;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  newCardPopup.close();
  addCardFormValidator.disableButton();
}

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = userInfo.getUserInfo().name;
  profileTitleInput.value = userInfo.getUserInfo().description;
  editProfilePopup.open();
});

addNewCardModalButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Validators

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
