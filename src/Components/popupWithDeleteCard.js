import { Popup } from "./Popup.js";

export class PopupWithDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormDelete();
    });
  }

  handlerDelete(handler) {
    this._handleFormDelete = handler;
  }

  close() {
    super.close();
  }
}