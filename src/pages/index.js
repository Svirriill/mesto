import './index.css'
import { config, formElement } from '../utils/constants.js';
import { Section } from '../Components/Section.js';
import { Card } from '../Components/Card.js';
import { PopupWithImage } from '../Components/PopupWithImage.js'
import FormValidator from '../Components/FormValidator.js';
import { PopupWithForm } from '../Components/PopupWithForm.js';
import { UserInfo } from '../Components/UserInfo.js';
import { Api } from '../Components/Api.js';

const popupElement = '.popup_element';
const buttonOpenPopupElements = document.querySelector('.profile__button');
const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const buttonOpenPopupAvatar = document.querySelector('.profile__image');

const formAddCards = document.querySelector('.popup__form_elements');
const formAddAvatar = document.querySelector('.popup__form_avatar');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const title = '.profile__title';
const subtitle = '.profile__subtitle';
const avatar = '.profile__image';
const avatarEdit = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup__input_type_src-avatar');

const userInformation = new UserInfo(title, subtitle);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'dc3c97d1-1035-4b28-91f1-6584655ffbcb',
    'Content-Type': 'application/json'
}
})

const popupImage = new PopupWithImage('.popup_image', '.popup__image', '.popup__figcaption');

const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorElement = new FormValidator(config, formAddCards);
const formValidatorAvatar = new FormValidator(config, formAddAvatar);

formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();
formValidatorAvatar.enableValidation();

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupImage.open(item.name, item.link);
                popupImage.setEventListeners(item.name, item.link);
            }
        },
            '.template-elements'
        );
        const cardElement = card.generateCard();
        section.addItem(cardElement);
    }
},
    '.elements'
);

const initialCards = [];

api.getUserData()
.then((data) => {
    userInformation.getUserInfo(data.name, data.about);
})

// api.getInitialCards()
// .then((result) => {
//     section.renderItems(result);
//     console.log(result)
// })

api.getInitialCards()
  .then((res) => {
      const data = res;
      data.forEach(item => {
          const card = {name, link};
          initialCards.push(card);
      })})
  .then(() => renderer())
  .catch((err) => {
    console.log(err); 
  });

// const popupWithFormProfile = new PopupWithForm({
//     popupSelector: '.popup_profile',
//     handleFormSubmit: data => 
//         userInformation.setUserInfo(data),
// },
//     '.popup__form');
    
const popupWithFormProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    handleFormSubmit: (data) => {
            api
            .patchUserData(data.name, data.about)
        .then((data) => {
          userInformation.setUserInfo(data.name, data.about);
    })
    .catch((err) => console.log(err));
}
});

popupWithFormProfile.setEventListeners();

const popupWithFormCards = new PopupWithForm({
    popupSelector: popupElement,
    handleFormSubmit: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: () => {
                popupImage.open(item.name, item.link)
                popupImage.setEventListeners(item.name, item.link);
            }
        },
            '.template-elements',
    //         api
    //   .postCard(item.name, item.link)
    //   .then(handleData)
    //   .catch((err) => console.log(err));
        );
        const cardElement = card.generateCard();
        section.addItem(cardElement);
    }
});
popupWithFormCards.setEventListeners();

const popupWithFormAvatar = new PopupWithForm({popupSelector: '.popup_avatar',
handleFormSubmit: (data) => {
        api
      .patchAvatar(data)    
      .then((data) => {
        avatarEdit.src = data.avatar;
      })
      .catch((err) => console.log(err));
  },
}
);
popupWithFormAvatar.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", () => {
    const userInfo = userInformation.getUserInfo()
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.about;
    formValidatorProfile.resetForm();
    popupWithFormProfile.open();
});

buttonOpenPopupElements.addEventListener("click", () => {
    popupWithFormCards.open();
    formValidatorElement.resetForm();
});

buttonOpenPopupAvatar.addEventListener("click", () => {
    popupWithFormAvatar.open();
    formValidatorAvatar.resetForm();
});