export class Section {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, renderer) {
        items.forEach(item => { renderer(item) });
    }

    addItem(element) {
        this._container.prepend(element)
    }
}