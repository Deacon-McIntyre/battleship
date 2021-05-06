import {ICoordinate} from "./Coordinate";

export interface IShot extends ICoordinate {
	isInputInvalid: () => boolean;
	build: () => void;
	rawInput: string;
}

export class Shot implements IShot {
	input: string;

	x: number = 0;
	y: number = 0;

	constructor(input: string) {
		this.input = input;

		if (!this.isInputInvalid()) {
			this.build()
		}
	}

	isInputInvalid() {
		const re = /^\d+,\d+$/g;
		return this.input == null || !re.test(this.input);
	}

	build() {
		const values = this.input.split(',');

		this.x = parseInt(values[0], 10);
		this.y = parseInt(values[1], 10);
	}

	isEqual(coord: ICoordinate): boolean {
		return this.x === coord.x && this.y === coord.y;
	}

	get rawInput() {
		return this.input;
	}
}
