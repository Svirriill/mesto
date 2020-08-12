import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    _setEventListeners() {
        super.setEventListeners();
    }

    open(name, link) {
        super.open();
        this._popupImage = document.querySelector('.popup__image');
        this._popupTitle = document.querySelector('.popup__figcaption');
        this._popupImage.src = link;
        this._popupTitle.alt = name;
        this._popupTitle.textContent = name;
    }
}

