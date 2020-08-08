import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    _setEventListeners() {
        super.setEventListeners();
    }

    open() {
        super.open();
        const popupImage = this._popup.querySelector('.popup_image');
        popupImage.textContent = nameElement;
        popupImage.src = linkElement;
        const popupImageDescription = this._popup.querySelector('.popup__figure');
        popupImageDescription.textContent = linkElement;
    }
}