export const config = {
  formSelector: "modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const handleFetchError = (message) => {
  return (err) => {
    console.error(`${message}: ${err}`);
  };
};

///////////////////////////////////////////////////////// ELEMENTS /////////////////////////////////////////////////////////////////////////////////////////////

// CARD
export const cardSelector = "#card-template";
export const editProfileFormElement = document.querySelector(
  "#edit-profile-modal"
);
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");

export const profileTitle = document.querySelector("#profile-title-js");
export const profileDescription = document.querySelector(
  "#profile-description-js"
);
export const profileTitleInput = document.querySelector("#profile-name");
export const profileDescriptionInput = document.querySelector(
  "#profile-description"
);
export const avatarModal = document.querySelector("#avatar-modal");
export const avatarForm = document.querySelector("#avatar-form");
export const avatarUrlInput = document.querySelector("#avatar-url");
export const changeAvatarImageButton = document.querySelector(
  "#change-avatar-image"
);

export const profileAddButton = document.querySelector("#profile-add-button");
export const addNewCardImageModal = document.querySelector("#add-image-modal");

export const newCardEditForm =
  addNewCardImageModal.querySelector(".modal__image-card");

export const cardListEl = document.querySelector(".cards__list");


export const removeCardModal = document.querySelector("#remove-card-modal");
export const removeCardForm = document.querySelector("#remove-card-form");


export const imagePopupModal = document.querySelector("#preview-image-modal");
