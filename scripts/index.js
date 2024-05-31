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

  const profileEditButton = document.querySelector("#profile-edit-button");
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const profileCloseButton = profileEditModal.querySelector("#modal-close-button");
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileTitleInput = document.querySelector('#profile-title-input');
  const profileDescriptionInput = document.querySelector('#profile-description-input');
  const profileEditForm = profileEditModal.querySelector(".modal__form");
  const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
  const cardListEl = document.querySelector(".cards__list");  

  // Functions

  function closePopup() {
    profileEditModal.classList.remove('modal_opened');
  }
  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title')
    cardImageEl.setAttribute("src", cardData.link);
    cardImageEl.setAttribute("alt", cardData.name);
    cardTitleEl.textContent = cardData.name; 
     return cardElement;
  }  

  // Event Handlers

  function handleProfileEditSubmit (e) {
    e.preventDefault(); 
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopop();
  }
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
  });  

  // Event Listeners

  profileEditButton.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add('modal_opened');
  });
  profileCloseButton.addEventListener("click", closePopup);
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);