import { validationSettings } from "../utils/constants.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithConfirm from "../components/ModalWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/* ELEMENTS */
//  PROFILE ELEMENTS
const avatarPicture = document.querySelector(".profile__avatar_edit-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileNameInput = document.querySelector("#profile-name-input");
const profileBadgeInput = document.querySelector("#profile-badge-input");
const profileEditForm = profileEditModal.querySelector("#modal-form-1");
const avatarEditModal = document.querySelector("#avatar-change-modal");
const avatarEditForm = avatarEditModal.querySelector("#modal-form-3");
// CARD ELEMENTS
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardDivEl = document.querySelector(".cards");
// CARD ADD BUTTON ELEMENTS
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector("#modal-form-2");
// NEW SECTION CLASS FOR CARDS
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(makeCard(item));
    },
  },
  ".cards"
);

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "53632a1f-419c-4aa1-93c5-782b5878b96a",
    "Content-Type": "application/json",
  },
});

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

// Edit Profile Modal
const editProfileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfileModal.setEventListeners();

//New Card Modal
const newCardModal = new ModalWithForm("#card-add-modal", handleCardAddSubmit);
newCardModal.setEventListeners();

//Preview Image Modal
const previewImageModal = new ModalWithImage("#image-preview-modal");
previewImageModal.setEventListeners();

//Delete Confirm Modal
const deleteConfirmModal = new ModalWithConfirm(
  "#delete-check-modal",
  handleCardDeleteSubmit
);
deleteConfirmModal.setEventListeners();
// Avatar Change Modal
const avatarChangeModal = new ModalWithForm(
  "#avatar-change-modal",
  handleAvatarChangeSubmit
);
avatarChangeModal.setEventListeners();

//USER INFO CLASS
const user = new UserInfo(
  ".profile__name",
  ".profile__badge",
  ".profile__picture"
);

/* FUNCTIONS */

function handleImageClick(title, link) {
  previewImageModal.open(title, link);
}

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

function checkIfLiked(ifLiked, element) {
  if (ifLiked === true) {
    element
      .querySelector(".heart-button")
      .classList.toggle("heart-button_active");
  }
}

function handleDeleteClick(cardId) {
  console.log(cardId);
  deleteConfirmModal.open(cardId);
}

// VALIDATION
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(validationSettings, cardAddForm);
const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);

avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

/* EVENT HANDLERS */

function handleProfileEditSubmit({ name, badge }) {
  user.setUserInfoOnSubmit(name, badge);
  editProfileModal.setLoading(true, "Saving...");
  api
    .updateProfile({ name, badge })
    .then((message) => {
      console.log(message);
    })
    .finally(editProfileModal.setLoading(false, "Saving..."));
  editProfileModal.close();
}

function handleCardAddSubmit({ name, cardUrl }) {
  cardSection.addItem(
    makeCard({
      name: name,
      link: cardUrl,
    })
  );
  newCardModal.setLoading(true, "Saving...");
  api
    .addCard({ name, cardUrl })
    .then((message) => {
      console.log(message);
    })
    .finally(newCardModal.setLoading(false, "Saving..."));
  newCardModal.close();
}

function handleCardDeleteSubmit(card) {
  console.log(card._id);
  api.deleteCard(card._id).then((message) => {
    console.log(message);
    card.domDeleteCard();
    deleteConfirmModal.close();
  });
}

function handleAvatarChangeSubmit(Url) {
  console.log(Url.avatarUrl);
  avatarChangeModal.setLoading(true, "Saving...");
  api
    .updateAvatar(Url.avatarUrl)
    .then((res) => {
      console.log(res);
    })
    .finally(avatarChangeModal.setLoading(false, "Saving..."));
  user.setAvatarPic(Url.avatarUrl);
  avatarChangeModal.close();
}

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

/* EVENT LISTENERS */
// OPEN MODAL
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  editFormValidator.resetValidation();
  profileNameInput.value = userInput.name;
  profileBadgeInput.value = userInput.badge;
  editProfileModal.open();
});

cardAddButton.addEventListener("click", () => {
  newCardModal.open();
  cardFormValidator.toggleButtonState();
});

avatarPicture.addEventListener("click", () => {
  avatarChangeModal.open();
  avatarFormValidator.toggleButtonState();
});
