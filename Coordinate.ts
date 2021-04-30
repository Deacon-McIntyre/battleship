export interface ICoordinate {
    x: number;
    y: number;
    compare: (coord: ICoordinate) => boolean;
}

export class Coordinate implements ICoordinate {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    compare(coord: ICoordinate): boolean {
        return this.x === coord.x && this.y === coord.y;
    }
}