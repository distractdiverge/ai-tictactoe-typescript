import {Player} from './game';

export class Move {

    private _x: number;
    private _y: number;

    private _player: Player;

    constructor(x: number, y: number, player: Player) {
        if (x < 0) {
            throw new RangeError('_x must be greater than 0');
        }

        if (y < 0) {
            throw new RangeError('_y must be greater than 0');
        }

        this._x = x;
        this._y = y;
        this._player = player;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get player() {
        return this._player;
    }
}