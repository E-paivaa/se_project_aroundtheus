// Imports

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards,config} from "../utils/constant.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Elements

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileNameInput = document.querySelector("#profile-name-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector(".profile__add-button");
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

// Create Card Function

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}
const renderCard = (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
};


// Section

const section = new Section({items: initialCards, renderer: renderCard},".cards");
section.renderItems();



// Image Popup

const newImagePopup = new PopupWithImage("#preview-image-modal");
newImagePopup.setEventListeners();



// Form Popup -Profile

const editProfilePopup = new PopupWithForm({popupSelector: "#profile-edit-modal",handleFormSubmit: handleProfileFormSubmit});
editProfilePopup.setEventListeners();



// Form Popup -Card

const newCardPopup = new PopupWithForm({popupSelector:"#add-card-modal", handleFormSubmit:handleAddCardFormSubmit});
newCardPopup.setEventListeners();



// User Info

const userInfo = new UserInfo(profileName, profileTitle);



// Profile Submit Form Function

function handleProfileFormSubmit(userData) {
  const name = userData.name;
  const description = userData.description;
  userInfo.setUserInfo({ name, description });
  editProfilePopup.close();
  profileEditForm.reset();
}

// AddCard Submit Form Function


function handleAddCardFormSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.url;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  newCardPopup.close();
}

// Image Click Function

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

// Form Validator

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

    //----------------Event Listener----------------//


// Profile Edit Button

profileEditButton.addEventListener("click", () => {
  const { description, name } = userInfo.getUserInfo();
  profileName.value = name;
  profileTitle.value = description;
  editProfilePopup.open();
});

// AddCard Button

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
