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
  }    
];

// Elements


const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileNameInput = document.querySelector("#profile-name-input");
const imageUrlInput = document.querySelector("#image-url-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardModalButton = document.querySelector(".profile__add-button");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#image-url-input");
const previewImageModal = document.querySelector("#preview-image-modal");
const modals = document.querySelectorAll(".modal__close-button");

// Buttons

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const addCardCloseButton = document.querySelector("#add-card-modal-button-close");
const previewImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
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
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button")
  
  cardImageEl.addEventListener("click", () => {
    const modalImage = previewImageModal.querySelector("#modal-image");
    const modalTitle = previewImageModal.querySelector("#modal-preview-image-title");
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button_active");
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileTitleInput.value = profileTitle.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

profileEditCloseButton.addEventListener("click", () => {
  profileName.textContent = profileNameInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(profileEditModal);
});

addCardCloseButton.addEventListener("click", () => {
  cardTitleInput.textContent = profileNameInput.value;
  cardUrlInput.textContent = cardUrlInput.value;
  closeModal(addCardModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));