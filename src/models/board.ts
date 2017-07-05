import './game';
import * as ndarray from 'ndarray';
import * as pool from 'ndarray-scratch';

export class Board {
    private _state: ndarray;

    constructor(width:number, height:number) {
        this._state = pool.zeros([width, height], 'double');
    }

    get width():number {
        return this._state.shape[0];
    }

    get height():number {
        return this._state.shape[1];
    }
}