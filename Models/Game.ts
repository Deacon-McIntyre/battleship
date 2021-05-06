import {IShot} from "./Shot";
import {Coordinate, ICoordinate} from "./Coordinate";

export interface IGame {
	isWon: () => boolean;
	isLost: () => boolean;
	inPlay: () => boolean;
	isHit: (shot: IShot) => boolean;
	didLastShotHit: () => boolean;
	generateShip: () => void;
	addShot: (shot: IShot) => void;
	isShotOutOfBounds: (shot: IShot) => boolean;
	isShotDuplicate: (shot: IShot) => boolean;
	getLastShot: () => IShot;
	shotsLeft: () => number;
}

export class Game implements IGame {
	static MAXIMUM_X: number = 5;
	static MAXIMUM_Y: number = 5;
	static SHIP_LENGTH: number = 3;
	static MAXIMUM_SHOTS = 10;

	shipCoords: ICoordinate[];
	shotsFired: IShot[];

	constructor() {
		this.shipCoords = [];
		this.shotsFired = [];
		this.generateShip();
	}

	inPlay(): boolean {
		return !this.isLost() && !this.isWon();
	}

	isLost(): boolean {
		return this.shotsFired.length >= Game.MAXIMUM_SHOTS;
	}

	isWon(): boolean {
		let numberOfHits = 0;

		for (let i = 0; i < this.shotsFired.length; i++) {
			let currentShot = this.shotsFired[i];

			if (this.isHit(currentShot)) {
				numberOfHits++;
			}
		}

		return numberOfHits === Game.SHIP_LENGTH;
	}

	isHit(shot: IShot): boolean {
		for (let i = 0; i < this.shipCoords.length; i++) {
			if (this.shipCoords[i].isEqual(shot)) {
				return true;
			}
		}

		return false;
	}

	didLastShotHit(): boolean {
		if (this.shotsFired.length === 0) {
			return false;
		}

		// Do the logic of checking whether the current shot matches any of the stored coordinates
		const lastShot = this.getLastShot();

		return this.isHit(lastShot);
	}

	generateShip() {
		// Get a random starting x and starting y
		const startX = Math.floor(Math.random() * (Game.MAXIMUM_X - Game.SHIP_LENGTH + 1)) + 1;
		const startY = Math.floor(Math.random() * Game.MAXIMUM_Y) + 1;

		for (let i = startX; i < startX + Game.SHIP_LENGTH; i++) {
			this.shipCoords.push(new Coordinate(i, startY));
		}
	}

	addShot(shot: IShot): void {
		this.shotsFired.push(shot);
	}

	getLastShot(): IShot {
		return this.shotsFired[this.shotsFired.length - 1];
	}

	isShotOutOfBounds(shot: IShot): boolean {
		return shot.x <= 0
			|| shot.y <= 0
			|| shot.x > Game.MAXIMUM_X
			|| shot.y > Game.MAXIMUM_Y;
	}

	isShotDuplicate(shot: IShot): boolean {
		this.shotsFired.forEach(firedShot => {
			if(shot.isEqual(firedShot)) {
				return true;
			}
		});

		return false;
	}

	shotsLeft(): number {
		return Game.MAXIMUM_SHOTS - this.shotsFired.length;
	}
}
