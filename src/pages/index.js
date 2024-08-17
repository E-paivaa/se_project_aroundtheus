import { config } from "../utils/constants.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/////////////////////////////////////////////////// ELEMENTS ///////////////////////////////////////////////////////////////////////////

//  PROFILE
const avatarPicture = document.querySelector(".profile__avatar_edit-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#modal-form-1");
const avatarEditModal = document.querySelector("#avatar-change-modal");
const avatarEditForm = avatarEditModal.querySelector("#modal-form-3");

// CARD TEMPLATE
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// CARD ADD
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector("#modal-form-2");

// UNIVERSAL SUBMIT BUTTON
const submitButton = document.querySelector(".modal__button");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SECTION CLASS FOR CARDS
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(makeCard(item));
    },
  },
  ".cards"
);

////////////////////////////////////////////////////////  API KEY  /////////////////////////////////////////////////////////////////////////////////////

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ecb857fe-2b88-4643-8438-abeaf1f6ff24",
    "Content-Type": "application/json",
  },
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CARDS AND USER INFO
api
  .getIntitialCards()
  .then((data) => {
    cardSection.renderItems(data);
  })
  .catch((err) => {
    console.error(err);
  });

api.getUserInfo().then((info) => {
  console.log(info);
  user.setUserInfo(info.name, info.about, info.avatar);
});

//////////////////////////////////////////////////////    FORM    ////////////////////////////////////////////////////////////////////////////////////////////////

// EDIT PROFILE
const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfileModal.setEventListeners();

// ADD CARD MODAL
const newCardModal = new PopupWithForm("#card-add-modal", handleCardAddSubmit);
newCardModal.setEventListeners();

// PREVIEW IMAGE
const previewImageModal = new PopupWithImage("#image-preview-modal");
previewImageModal.setEventListeners();

// DELETE
const deleteConfirmModal = new PopupWithConfirm(
  "#delete-check-modal",
  handleCardDeleteSubmit
);
deleteConfirmModal.setEventListeners();

// AVATAR
const avatarChangeModal = new PopupWithForm(
  "#avatar-change-modal",
  handleAvatarChangeSubmit
);
avatarChangeModal.setEventListeners();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//USER INFO
const user = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__picture"
);

///////////////////////////////////////////  FUNCTION   /////////////////////////////////////////////////////////////////////////////

// IMAGE CLICK
function handleImageClick(title, link) {
  previewImageModal.open(title, link);
}

// CREATE CARD
function makeCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplate,
    handleImageClick,
    handleDeleteClick,
    handleCardLike,
    checkIfLiked
  );
  return card.generateCard();
}

// LIKE
function checkIfLiked(ifLiked, element) {
  if (ifLiked === true) {
    element
      .querySelector(".heart-button")
      .classList.toggle("heart-button_active");
  }
}

// DELETE
function handleDeleteClick(cardId) {
  console.log(cardId);
  deleteConfirmModal.open(cardId);
}

/////////////////////////////////////////////////  VALIDATOR  ////////////////////////////////////////////////////////////////////////////////////

// PROFILE
const editFormValidator = new FormValidator(config, profileEditForm);

// CARD
const cardFormValidator = new FormValidator(config, cardAddForm);

// AVATAR
const avatarFormValidator = new FormValidator(config, avatarEditForm);

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

///////////////////////////////////////////////////////////  SUBMIT  ////////////////////////////////////////////////////////////////////////////

// PROFILE
function handleProfileEditSubmit({ name, description }) {
  user.setUserInfoOnSubmit(name, description);
  api.updateProfile({ name, description }).then((message) => {
    console.log(message);
  });
  submitButton.textContent = "Saving";
  editProfileModal.close();
}

// CARD
function handleCardAddSubmit({ name, cardUrl }) {
  cardSection.addItem(
    makeCard({
      name: name,
      link: cardUrl,
    })
  );
  api.addCard({ name, cardUrl }).then((message) => {
    console.log(message);
  });
  submitButton.textContent = "Saving";
  newCardModal.close();
}

// DELETE
function handleCardDeleteSubmit(card) {
  console.log(card._id);
  api.deleteCard(card._id).then((message) => {
    console.log(message);
    card.domDeleteCard();
    deleteConfirmModal.close();
  });
}

// AVATAR
function handleAvatarChangeSubmit(Url) {
  console.log(Url.avatarUrl);
  api.updateAvatar(Url.avatarUrl).then((res) => {
    console.log(res);
  });
  user.setAvatarPic(Url.avatarUrl);
  submitButton.textContent = "Saving";
  avatarChangeModal.close();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LIKE & UNLIKE FUNCTION
function handleCardLike(cardData) {
  if (cardData.isLiked === false) {
    api.addLikes(cardData._id).then((res) => {
      console.log(res);
    });
  } else {
    api.removeLikes(cardData._id).then((res) => {
      console.log(res);
    });
    console.log(cardData._id);
  }
}

//////////////////////////////////////////////////  ADD EVENT LISTENERS ///////////////////////////////////////////////////////////////////////////////////

// PROFILE
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  editFormValidator.resetValidation();
  profileNameInput.value = userInput.name;
  profileDescriptionInput.value = userInput.description;
  submitButton.textContent = "Save";
  editProfileModal.open();
});

// CARD
cardAddButton.addEventListener("click", () => {
  submitButton.textContent = "Save";
  newCardModal.open();
  cardFormValidator.toggleButtonState();
});

// AVATAR
avatarPicture.addEventListener("click", () => {
  submitButton.textContent = "Save";
  avatarChangeModal.open();
  avatarFormValidator.toggleButtonState();
});
