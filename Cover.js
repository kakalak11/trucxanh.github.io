import { Node } from "./Node.js";
export class Cover extends Node {
    constructor(image) {
        //Need img source
        super();
        this.image = image;
        this.view.style.backgroundColor = "orange";
        this.view.style.width = "88px";
        this.view.style.height = "88px";
        this.view.style.border = "2px solid black";
        this.view.style.backgroundRepeat = "no-repeat";
        this._index;
        this._deleted;
    }

    //Cover have 3 state, show || hide && delete, logic is in the newGame
    //3 function to define the state of the cover when called

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
    }

    get backgroundColor() {
        return null;
    }

    set backgroundColor(value) {
        this.view.style.backgroundColor = value;
    }

    get del() {
        return this._deleted;
    }

    open() {
        if (!this._deleted) {
            this.view.style.backgroundImage = this.image;
        }
        else return null;
    }
    close() {
        if (!this._deleted) {
            this.view.style.backgroundImage = "none";
        }
        else return null;
    }
    delete() {
        this.view.style.backgroundImage = "none";
        this.view.style.backgroundColor = "black";
        this._deleted = true;
        //how about remove eventListener ?
    }
}