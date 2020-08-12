import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, popupImage, popupTitle) {
        super(popupSelector);
        this._popupImage = document.querySelector(popupImage);
        this._popupTitle = document.querySelector(popupTitle);
    }

    _setEventListeners() {
        super.setEventListeners();
    }

    open(name, link) {
        super.open();
        this._popupImage.src = link;
        this._popupTitle.alt = name;
        this._popupTitle.textContent = name;
    }
}

