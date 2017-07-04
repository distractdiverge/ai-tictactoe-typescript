import './game';
import './ndarray';

export class Board {
    private _state: any;

    constructor(width, height) {
        // _state = ndarray(); TODO
    }

    get width() {
        return this._state.shape[0];
    }

    get height() {
        return this._state.shape[1];
    }
}