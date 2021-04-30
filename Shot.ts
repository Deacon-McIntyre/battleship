import {ICoordinate} from "./Coordinate";

export interface IShot extends ICoordinate{
    isValid: () => boolean;
    build: () => void;
}

export class Shot implements IShot {
    input: string;

    x: number;
    y: number;

    constructor(input: string) {
        this.input = input;
    }

    isValid() {
        const re = /^\d+,\d+$/g;
        return this.input != null && re.test(this.input);
    }

    build() {
        const values = this.input.split(',');

        this.x = parseInt(values[0], 10);
        this.y = parseInt(values[1], 10);
    }

    compare(coord: ICoordinate): boolean {
        throw new Error('Not implemented');
    }
}