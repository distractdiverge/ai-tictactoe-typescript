import { Player, Cell } from './game';
import { Move } from './move';
import * as ndarray from 'ndarray';
import * as pool from 'ndarray-scratch';
import ops from 'ndarray-ops';
import show from 'ndarray-show';
import diag from 'ndarray-diagonal';
import _ from 'lodash';

/**
 * A simple tic-tac-toe board where
 *  '-1' represents 'X'
 *  '0' represents an empty cell
 *  '1' represents 'O'
 */
class Board {

    constructor(width = 3, height = 3) {
        if (width <= 0) {
            throw new RangeError('width must be greater than zero');
        }

        if (height <= 0) {
            throw new RangeError('height must be greater than zero');
        }

        this._board = pool.zeros([height, width]);
        this._currentTurn = Game.PlayerX;
    }

    toString() {
        return show(this._board);
    }

    get height() {
        return _.first(this._board.shape);
    }

    get width() {
        return _.last(this._board.shape);
    }

    get currentTurn() {
        return this._currentTurn;
    }

    // TODO: Make this internal so only applyMove can mutate the state
    setTile(x, y, value) {
        if (x < 0 || x >= this.width) {
            throw new RangeError(`x must be between 0 and ${this.width-1}`);
        }

        if (y < 0 || y >= this.height) {
            throw new RangeError(`y must be between 0 and ${this.height-1}`)
        }

        if (Game.Players.indexOf(value) == -1) {
            throw new RangeError(`value must be one of the following values ${Game.Players}`);
        }

        this._board.set(y, x, value);
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width) {
            throw new RangeError(`x must be between 0 and ${this.width-1}`);
        }

        if (y < 0 || y >= this.height) {
            throw new RangeError(`y must be between 0 and ${this.height-1}`)
        }

        return this._board.get(y, x);
    }

    applyMove(move) {
        if( !(move instanceof Move) ) {
            throw new Error('move must be an instanceof Move');
        }

        if(this.getTile(move.x, move.y) !== Game.EmptyCell) {
            throw new Error('cell must be empty to apply move');
        }

        let nextPlayer;
        if (move.player === Game.PlayerX) {
            nextPlayer = Game.PlayerO;
        }
        else if( move.player === Game.PlayerO) {
            nextPlayer = Game.PlayerX;
        }

        if (move.player !== this._currentTurn) {
            throw new Error(`The board's current player is ${this._currentTurn} but a move for player `+
                `${move.player} was attempted.`);
        }

        this.setTile(move.x, move.y, move.player);
        this._currentTurn = nextPlayer;
    }

    applyMoveCloning(move) {
        const clone = _.cloneDeep(this);

        clone.applyMove(move);

        return clone;
    }

    /**
     * Returns true if any player can play a move, false if all tiles have been filled.
     */
    areMovesAvailable() {
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                const val = this.getTile(x, y);
                if( val === Game.EmptyCell) {
                    // Return True if any cells are '0'
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Return the list of available moves for the current state of the board.
     */
    availableMoves() {
        const moves = [];

        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                const val = this.getTile(x, y);
                if( val === Game.EmptyCell) {
                    moves.push(new Move(x, y, this._currentTurn));
                }
            }
        }

        return moves;
    }

    /**
     * Checks the state of the board to determine if there is a winner
     * Returns the value of the winner, or '0' for no winner.
     */
    checkWinner() {
        //
        // The winner check algorithm takes advantage of the fact that cell values are signed integers
        // If all of the cells in a row / col / diag are equal to the sign and number of cells, that sign won
        // eg. all row values sumed equals 3, then 'O' won because it is the positive cell type.
        //

        for(let row = 0; row < this.height; row++) {
            const sum = ops.sum(this._board.pick(row));
            if (sum == Game.PlayerX*this.width) {
                return Game.PlayerX;
            }
            if (sum == Game.PlayerO*this.width) {
                return Game.PlayerO;
            }
        }

        for(let col = 0; col < this.width; col++) {
            const sum = ops.sum(this._board.pick(null, col));
            if (sum == Game.PlayerX*this.height) {
                return Game.PlayerX;
            }

            if (sum == Game.PlayerO*this.height) {
                return Game.PlayerO;
            }
        }

        const diagArr = diag(this._board);
        const diagSum = ops.sum(diagArr);
        if ( diagSum == Game.PlayerX*diagArr.size) {
            return Game.PlayerX;
        }

        if (diagSum == Game.PlayerO*diagArr.size) {
            return Game.PlayerO;
        }

        return Game.EmptyCell;
    }
}

module.exports = Board;