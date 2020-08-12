export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            const openedPopup = document.querySelector('.popup_opened');
            if (openedPopup) {
                openedPopup.classList.remove('popup_opened');
                this.close();
            }
        }
    }

    _handleEscClose = (evt) => {
        const ESC_CODE = 'Escape';
        if (evt.code === ESC_CODE) {
          this.close();
        //   console.log(evt);
        }
      }

    setEventListeners() {
        this._popup.querySelector('.popup__esc').addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('keyup', this._handleEscClose);
        this._popup.removeEventListener('keyup', this._handleOverlayClose);
    }
}
