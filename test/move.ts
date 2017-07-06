import {Move} from '../src/models/move';
import {Player} from '../src/models/game';
import { expect } from 'chai';
import * as _ from 'lodash';

describe('Move', () => {

    describe('constructor', () => {

        const players = [Player.PlayerO, Player.PlayerX];
        const xValues = [0,1,2];
        const yValues = [0,1,2];

        _.each(players, (player) => {
            _.each(xValues, (x) => {
                _.each(yValues, (y) => {
                    it(`should set properties x:${x}, y:${y}, player:${player}`, () => {

                        const move = new Move(x, y, player);

                        expect(move).to.exist;
                        expect(move.player).to.equal(player);
                        expect(move.x).to.equal(x);
                        expect(move.y).to.equal(y);
                    });
                });
            });
        });

        const invalidXValues = [-10, -1];
        const invalidYValues = [-10, -1];

        _.each(invalidXValues, (invalidX) => {
           it(`should throw an error with invalid x=${invalidX}`, () => {
              expect(() => {
                  new Move(invalidX, 0, Player.PlayerX);
              }, 'constructor').to.throw(Error, 'x');
           });
        });

        _.each(invalidYValues, (invalidY) => {
            it(`should throw an error with invalid y=${invalidY}`, () => {
               expect(() => {
                   new Move(0, invalidY, Player.PlayerX);
               }).to.throw(Error, 'y');
            });
        });

    });
});