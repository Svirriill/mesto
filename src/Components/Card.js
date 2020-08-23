export class Card {
  constructor( data, { handleCardClick, handleButtonRemove, handleButtonLike }, containerSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._containerSelector = containerSelector;
    this._handleCardClick = handleCardClick;
    this._handleButtonRemove = handleButtonRemove;
    this._handleButtonLike = handleButtonLike;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._containerSelector).content.cloneNode(true);;
    return cardElement;
  }

  generateCard(id) {
    this._element = this._getTemplate();
  
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementRemoveCard = this._element.querySelector('.element__delete');
    if (id === "041db7563b399766fc049987") {
      this._elementRemoveCard.classList.add("element__delete_active");
    }
    this._elementLike = this._element.querySelector('.element__like');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
    this._removeEventListeners();

  }

  setColorLike(userId, arrLikes) {
    arrLikes.forEach((element) => {
      element._id === userId
        ? this._elementLike.classList.add("element__like_active")
        : null;
    });
  }

  removeColorLike() {
    this._elementLike.classList.remove("element__like_active")
  }

  setLikes(arrLikes) {
    this._elementLikeNumber.textContent = arrLikes.length;
    this._elementLikeNumber.dataset.people = arrLikes
      .reduce((acc, item) => {
        acc.push(item.name);
        return acc;
      }, [])
    }

  getElementLike() {
    return this._elementLike;
  }
  setLikeListener() {
    this._element.querySelector('.element__like_active').addEventListener('click', (e) => {
      e.target.classList.toggle('element__like_active');
    });
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", this._handleButtonLike);
    this._elementRemoveCard.addEventListener("click", this._handleButtonRemove);
    this._elementImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }

  _removeEventListeners() {
    this._elementLike.removeEventListener("click", this._handleButtonLike);
    this._elementRemoveCard.removeEventListener("click", this._handleButtonRemove);
    this._elementImage.removeEventListener("click", () => this._handleCardClick(this._name, this._link));
  }
}