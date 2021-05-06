export interface ICoordinate {
	x: number;
	y: number;
	isEqual: (coord: ICoordinate) => boolean;
}

export class Coordinate implements ICoordinate {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	isEqual(coord: ICoordinate): boolean {
		return this.x === coord.x && this.y === coord.y;
	}
}
