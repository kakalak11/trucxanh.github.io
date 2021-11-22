import { Node } from "./Node.js";
export class Label extends Node {

    constructor(string) {
        super();
        this._string = string || "";
        this.string = this._string;
        this.view.style.color = 'black';
        this.view.style.fontSize = "30px";
        this.view.style.visibility = "visible";
        this.view.style.cursor = "default";
        this.view.style.textAlign = "center";
        this.y = 25;
        this.x = 30;
    }

    get string() {
        return this._string;
    }

    set string(value) {
        this._string = value;
        this.view.innerHTML = this._string;
    }

    open() {
        this.view.style.visibility = "visible";
    }
    hide() {
        this.view.style.visibility = "hidden";
    }
}