import Popup from "./Popup.js";

export class popupWithDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteCard = this._deleteCard;
  }

  close() {
    super.close();
    this._button.removeEventListener("click", this._deleteCard);
  }

  _deleteCard() {
    this._handleApi();
    this.close();
  }

  handleButton(handleApi) {
    this._handleApi = handleApi;
    this._button = this._popup.querySelector('.popup__button_delete');
    this._button.addEventListener("click", this._deleteCard);
  }
}