// export class Section {
//     constructor ( {items, renderer}, containerSelector ) {
//         this._items = items;
//         this._renderer = renderer;
//         this._container = document.querySelector(containerSelector);
//     }

//     renderItems(items){
//         items.forEach(item => {this._renderer(item)});
//     }

//     addItem(element){
//         this._container.append(element)
//     }
// }

export class Section {
    constructor ( containerSelector ) {

        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, renderer){
        items.forEach(item => {renderer(item)});
    }

    addItem(element){
        this._container.prepend(element)
    }
}