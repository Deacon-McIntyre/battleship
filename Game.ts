import {IShot} from "./Shot";
import {Coordinate, ICoordinate} from "./Coordinate";

export interface IGame {
    isWon: () => boolean;
    isLost: () => boolean;
    inPlay: () => boolean;
    isHit: () => boolean;
    generateShip: () => void;
    addShot: (shot: IShot) => void;
    shotIsInBounds: (shot:IShot) => boolean;
    getLastShot: () => IShot;
    shotsLeft: () => number;
}

export class Game implements IGame {
    static MAXIMUM_X: number = 5;
    static MAXIMUM_Y: number = 5;
    static MAXIMUM_SHIP_LENGTH: number = 3;
    static MAXIMUM_SHOTS = 10;

    shipCoords: ICoordinate[];
    hits: ICoordinate[];
    shotsFired: IShot[];

    constructor() {
        this.shipCoords = [];
        this.generateShip();
        this.hits = [];
        this.shotsFired = [];
    }

    inPlay(): boolean {
        return !this.isLost() && !this.isWon();
    }

    isLost(): boolean {
        return this.shotsFired.length >= Game.MAXIMUM_SHOTS;
    }

    isWon(): boolean {
        let result = true;

        for(let i = 0; i < this.shipCoords.length; i++) {
            const currentCoord = this.shipCoords[i];

            if(this.hits.indexOf(currentCoord) === -1) {
                result = false;
            }
        }

        return result;
    }

    isHit(): boolean {
        if(this.shotsFired.length === 0) {
            return false;
        }

        // Do the logic of checking whether the current shot matches any of the stored coordinates
        const lastShot = this.getLastShot();
        let success = false;

        for(let i = 0; i < this.shipCoords.length; i++) {
            success = this.shipCoords[i].compare(lastShot);

            if(success) {
                this.hits.push(this.shipCoords[i]);
                break;
            }
        }

        return success;
    }

    generateShip() {
        // Get a random starting x and starting y
        const startX = Math.floor(Math.random() * Game.MAXIMUM_X - (Game.MAXIMUM_X - Game.MAXIMUM_SHIP_LENGTH)) + 1;
        const startY = Math.floor(Math.random() * Game.MAXIMUM_Y) + 1;

        for(let i = startX; i <= Game.MAXIMUM_SHIP_LENGTH; i++) {
            this.shipCoords.push(new Coordinate(i, startY));
        }
    }

    addShot(shot: IShot): void {
        this.shotsFired.push(shot);
    }

    getLastShot(): IShot {
        return this.shotsFired[this.shotsFired.length - 1];
    }

    shotIsInBounds(shot: IShot): boolean {
        return shot.x > 0
            && shot.y > 0
            && shot.x <= Game.MAXIMUM_X
            && shot.y <= Game.MAXIMUM_Y;
    }

    shotsLeft(): number {
        return Game.MAXIMUM_SHOTS - this.shotsFired.length;
    }

}