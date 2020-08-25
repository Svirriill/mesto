import './index.css'
import { config, formElement } from '../utils/constants.js';
import { Section } from '../Components/Section.js';
import { Card } from '../Components/Card.js';
import { PopupWithImage } from '../Components/PopupWithImage.js'
import FormValidator from '../Components/FormValidator.js';
import { PopupWithForm } from '../Components/PopupWithForm.js';
import { PopupWithDeleteCard } from '../Components/PopupWithDeleteCard.js'
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
const avatarEdit = document.querySelector('.profile__image');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'dc3c97d1-1035-4b28-91f1-6584655ffbcb',
    'Content-Type': 'application/json'
  }
})

const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorElement = new FormValidator(config, formAddCards);
const formValidatorAvatar = new FormValidator(config, formAddAvatar);

formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();
formValidatorAvatar.enableValidation();

const userInformation = new UserInfo(title, subtitle);

const popupImage = new PopupWithImage('.popup_image', '.popup__image', '.popup__figcaption');

const popupWithFormProfile = new PopupWithForm({
  popupSelector: '.popup_profile',
  handleFormSubmit: (data) => {
    popupWithFormProfile.handleButton('Cохранение...');
    api
      .patchUserInfo(data.name, data.about)
      .then((data) => {
        userInformation.setUserInfo(data);
        popupWithFormProfile.close();
      })
      .catch((err) => console.log(err));
  }
});
popupWithFormProfile.setEventListeners();

const popupWithFormCards = new PopupWithForm({
  popupSelector: popupElement,
  handleFormSubmit: (item) => {
    popupWithFormCards.handleButton('Cохранение...');
    api
      .postCard(item.name, item.link)
      .then(handleInfo)
      .catch((err) => console.log(err))
  }
});
popupWithFormCards.setEventListeners();

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (data) => {
    popupWithFormAvatar.handleButton('Cохранение...');
    api
      .patchAvatar(data)
      .then((data) => {
        avatarEdit.src = data.avatar;
        popupWithFormAvatar.close();
      })
      .catch((err) => console.log(err));
  },
}
);
popupWithFormAvatar.setEventListeners();

const popupWithDeleteCard = new PopupWithDeleteCard('.popup_delete-image');
popupWithDeleteCard.setEventListeners();

const section = new Section('.elements');

const handleInfo = (item) => {
  const card = new Card(
    item, {
    handleCardClick: () => {
      popupImage.open(item.name, item.link)
      popupImage.setEventListeners(item.name, item.link);
    },
    handleButtonRemove: (card) => {
      popupWithDeleteCard.open();
      popupWithDeleteCard.handlerDelete(() => {
        api
          .deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            popupWithDeleteCard.close();
          })
          .catch(console.error)
      })
    },
    handleButtonLike: () => {
      if (!card.getElementLike().classList.contains("element__like_active")) {
        api
          .putLike(item._id)
          .then((res) => {
            card.setLikes(res.likes);
            card.setColorLike("041db7563b399766fc049987", res.likes);
          })
          .catch(console.error)
      } else {
        api
          .deleteLike(item._id)
          .then((res) => {
            card.setLikes(res.likes);
            card.removeColorLike();
          })
          .catch(console.error)
      }
    },
  },
    '.template-elements');
  const cardElement = card.generateCard(item.owner._id);
  card.setLikes(item.likes);
  card.setColorLike("041db7563b399766fc049987", item.likes);
  section.addItem(cardElement);
  popupWithFormCards.close();
};


Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((data) => {
    userInformation.setUserInfo(data[1]);
    avatarEdit.src = data[1].avatar;

    section.renderItems(data[0].reverse(), handleInfo);
  })
  .catch(console.error)

buttonOpenPopupProfile.addEventListener("click", () => {
  popupWithFormProfile.handleButton('Cохранить');
  const userInfo = userInformation.getUserInfo()
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  formValidatorProfile.resetForm();
  popupWithFormProfile.open();
});

buttonOpenPopupElements.addEventListener("click", () => {
  popupWithFormCards.handleButton('Cохранить');
  popupWithFormCards.open();
  formValidatorElement.resetForm();
});

buttonOpenPopupAvatar.addEventListener("click", () => {
  popupWithFormAvatar.handleButton('Cохранить');
  popupWithFormAvatar.open();
  formValidatorAvatar.resetForm();
});