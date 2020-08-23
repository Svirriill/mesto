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
const element = document.querySelector('.element');
const formAddCards = document.querySelector('.popup__form_elements');
const formAddAvatar = document.querySelector('.popup__form_avatar');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const title = '.profile__title';
const subtitle = '.profile__subtitle';
const avatarEdit = document.querySelector('.profile__image');
const buttonDeleteCard = document.querySelector('.element__button_delete');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'dc3c97d1-1035-4b28-91f1-6584655ffbcb',
    'Content-Type': 'application/json'
}
})
// .then((res) => res.json())
// .then((result) => {
//     avatarEdit.src = result.avatar;
//     newUserName = result.name;
//     newUserAbout = result.about;
//     const userInformation = new UserInfo({userName: newUserName, userInfo: newUserAbout});

//     userInformation.getUserInfo(result);
//     console.log(result);
// })





const formValidatorProfile = new FormValidator(config, formElement);
const formValidatorElement = new FormValidator(config, formAddCards);
const formValidatorAvatar = new FormValidator(config, formAddAvatar);

formValidatorProfile.enableValidation();
formValidatorElement.enableValidation();
formValidatorAvatar.enableValidation();

const userInformation = new UserInfo(title, subtitle);

const popupImage = new PopupWithImage('.popup_image', '.popup__image', '.popup__figcaption');



const initialCards = [];



// api.getUserData()
// .then((data) => {
//     userInformation.setUserInfo(data);
// })
//     .catch((err) => {
//       console.log(err);
//     });

// api.getInitialCards()
// .then((item) => {
//     section.renderItems(item);
// })
// .catch((err) => {
//     console.log(`Ошибка: ${err}`);
//   });
    
const popupWithFormProfile = new PopupWithForm({
    popupSelector: '.popup_profile',
    handleFormSubmit: (data) => {
        popupWithFormProfile.handleButton('Cохранение...');
            api
            .patchUserData(data.name, data.about)
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
      .then(handleData)
      .catch((err) => console.log(err))
    }
});
popupWithFormCards.setEventListeners();

const popupWithFormAvatar = new PopupWithForm({popupSelector: '.popup_avatar',
handleFormSubmit: (data) => {
    popupWithFormAvatar.handleButton('Cохранение...');
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

const popupWithDeleteCard = new PopupWithDeleteCard('.popup_delete-image', {
  submitButton: (data) = {

  }
})
popupWithDeleteCard.setEventListeners();

const section = new Section('.elements');
// function buttonDelete() {
//   buttonDeleteCard.addEventListener('click', () => {

//   })
// }
const handleData = (item) => {
    const card = new Card(
        item, {
        handleCardClick: () => {
            popupImage.open(item.name, item.link)
            popupImage.setEventListeners(item.name, item.link);
        },
        handleButtonRemove: () => {
            popupWithDeleteCard.open();
            popupWithDeleteCard.handleButton(function () {
              api
                .deleteCard(item._id)
                .then(() => {
                  card.deleteCard();
                })
                .catch((err) => console.log(err));
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
          .catch((err) => console.log(err));
      } else {
        api
          .deleteLike(item._id)
          .then((res) => {
            card.setLikes(res.likes);
            card.removeColorLike();
          })
          .catch((err) => console.log(err));
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
  

Promise.all([api.getInitialCards(), api.getUserData()])
 .then((data) => {
    userInformation.setUserInfo(data[1]);
    avatarEdit.src = data[1].avatar;

    section.renderItems(data[0].reverse(), handleData);    
  })
  .catch((err) => console.log(err));

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