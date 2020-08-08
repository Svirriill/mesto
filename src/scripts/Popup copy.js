export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
    }

    _handleOverlayEscClose(e) {
        if (e.target.classList.contains('popup_opened') || (e.key == 'Escape')) {
            const openedPopup = document.querySelector('.popup_opened');
            if (openedPopup) {
                openedPopup.classList.remove('popup_opened');
            }
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__esc').addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', this._handleOverlayEscClose);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleOverlayEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleOverlayEscClose);
    }
}
