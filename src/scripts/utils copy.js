export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// export const popupFigure = document.querySelector('.popup_image');

// export const popupOpen = (popup) => {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keyup', popupRemoveEsc);        
// };

// export const popupClose = (popup) => {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keyup', popupRemoveEsc);
// };

// export function popupRemoveEsc(evt) {
//     const escCode = 27;
//     if (evt.keyCode !== escCode) {
//         return;
//     }
//     //console.log("HELLO");
//     const openedPopup = document.querySelector('.popup_opened');
//     if (openedPopup) {
//         popupClose(openedPopup);
//     }
// }