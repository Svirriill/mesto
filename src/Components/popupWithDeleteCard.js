import { Popup } from "./Popup.js";

export class PopupWithDeleteCard extends Popup {
  constructor( popupSelector, { submitButton } ) {
    super(popupSelector)
    this._submitButton = submitButton;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
        this._submit();
        this.close()
    });
  }
}
// export class PopupWithDeleteCard extends Popup {
//   constructor(popupSelector) {
//     super(popupSelector);
//     this._deleteCard = this._deleteCard.bind(this);
//   }

//   close() {
//     super.close();
//     this._button.removeEventListener("click", this._deleteCard);
//   }

//   _deleteCard() {
//     this._handleApi();
//     this.close();
//   }

//   handleButton(handleApi) {
//     this._handleApi = handleApi;
//     this._button = this._popup.querySelector('.popup__button_delete');
//     this._button.addEventListener("click", this._deleteCard);
//   }
// }