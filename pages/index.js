import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

// Functions

function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
  }
  document.addEventListener("keydown", closeModalESC);
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
  }
  document.removeEventListener("keydown", closeModalESC);
}

function closeModalESC(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleImageClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalTitle.textContent = name;
  openModal(previewImageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

addNewCardModalButton.addEventListener("click", () => openModal(addCardModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const cardData = {
    name: form.querySelector("#card-title-input").value,
    link: form.querySelector("#image-url-input").value,
  };
  renderCard(cardData, cardListEl);
  closeModal(addCardModal);
  form.reset();
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditCloseButton.addEventListener("click", () => {
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(profileEditModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

previewImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
