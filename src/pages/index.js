import {
  config,
  cardSelector,
  editProfileFormElement,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileAddButton,
  newCardEditForm,
  avatarForm,
  changeAvatarImageButton,
  removeCardForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

//////////////////////////////////////////////////////// FORM VALIDATOR //////////////////////////////////////////////////////////////////////////////////////////

// EDIT PROFILE
const editProfileValidator = new FormValidator(config, editProfileFormElement);
editProfileValidator.enableValidation();
// ADD CARD
const addCardValidator = new FormValidator(config, newCardEditForm);
addCardValidator.enableValidation();
// AVATAR
const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();
// DELETE CARD
const removeCardValidator = new FormValidator(config, removeCardForm);
removeCardValidator.enableValidation();

/////////////////////////////////////////////////////////// API ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d533d942-ce99-4f90-bda4-a2261b4322be",
    "Content-Type": "application/json",
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INITIAL CARDS
let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = getCardElement(cardData);
          cardSection.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // PROFILE INFO
const userInfo = new UserInfo({
  userName: "#profile-title-js",
  userAbout: "#profile-description-js",
  userAvatar: ".profile__image",
});
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log("Failed to fetch user info:", err);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CARD DATA
function getCardElement(cardData) {
  const card = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeClick
  );
  return card.getView();
}

//////////////////////////////////////////////////////////////  FORM  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// EDIT PROFILE
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    profileEditPopup.renderLoading(true);
    api
      .setUserInfo(formData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.log("Failed to update user info:", err);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false);
      });
  }
);

// ADD CARD
const addCardPopup = new PopupWithForm("#add-image-modal", (inputValues) => {
  addCardPopup.renderLoading(true);
  api
    .addCard(inputValues)
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log("Failed to add card:", err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

// DELETE CARD
const deleteCardModal = new PopupWithForm("#remove-card-modal");
function handleCardDelete(card) {
  deleteCardModal.open();
  deleteCardModal.setSubmitAction(() => {
    deleteCardModal.renderLoading(true);
    api
      .deleteCard(card.id)
      .then(() => {
        card.deleteCard();
        deleteCardModal.close();
      })
      .catch((err) => {
        console.log("Failed to delete card:", err);
      })
      .finally(() => {
        deleteCardModal.renderLoading(false);
      });
  });
}

// AVATAR
const avatarModalPopup = new PopupWithForm("#avatar-modal", (formData) => {
  const avatarUrl = formData["avatar-form"];
  avatarModalPopup.renderLoading(true);
  api
    .setUserAvatar(avatarUrl)
    .then((userData) => {
      userInfo.setUserInfo({ avatar: userData.avatar });
      avatarModalPopup.close();
    })
    .catch((err) => {
      console.log("Failed to update avatar:", err);
    })
    .finally(() => {
      avatarModalPopup.renderLoading(false);
    });
});

// PREVIEW IMAGE
const imagePopup = new PopupWithImage("#preview-image-modal");

/////////////////////////////////////////////////////////   FUNCTION   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PREVIEW IMAGE
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

// LIKE
function handleLikeClick(card) {
  api
    .setCardLikes(card.id, card.isLiked)
    .then((newCardData) => {
      card.updateLikes(newCardData.isLiked);
    })
    .catch((err) => {
      console.log("Failed to update card likes status:", err);
    });
}

////////////////////////////////////////////////////////////////   EVENT LISTENERS  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// PROFILE EDIT
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.about;
  profileEditPopup.open();
});

addCardPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

// CHANGE AVATAR
changeAvatarImageButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarModalPopup.open();
});

imagePopup.setEventListeners();
profileEditPopup.setEventListeners();
avatarModalPopup.setEventListeners();
deleteCardModal.setEventListeners();
