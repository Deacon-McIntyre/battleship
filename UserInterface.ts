import {IOutput} from "./IOutput";

const prompt = require('prompt-sync')();

export interface IUserInterface {
    printWelcome: () => void;
    getCoordinatesFromUser: () => string;
    printValidationError: (input: string) => void;
    printOutOfBoundsError: (input: string) => void;
    printHit: () => void;
    printMiss: () => void;
    printWinMessage: () => void;
    printShotsLeft: (shotsLeft: number) => void;
}

export class UserInterface implements IUserInterface {
    output: IOutput;

    constructor(output: IOutput) {
        this.output = output;
    }

    printWelcome(): void {
        this.output.log('Welcome to Battleship!');
    }

    getCoordinatesFromUser(): string {
        return prompt('Enter your co-ordinates in the format: [x, y]');
    }

    printValidationError(input: string): void {
        this.output.log(`Invalid co-ordinates: ${input}`);
    }

    printOutOfBoundsError(input: string): void {
        this.output.log(`Shot is out of bounds: ${input}`);
    }

    printHit() {
        this.output.log('Shot hit the target!');
    }

    printMiss(): void {
        this.output.log('Shot missed. Please try again.');
    }

    printWinMessage(): void {
        this.output.log('You won! Hooray!');
    }

    printShotsLeft(shotsLeft: number): void {
        this.output.log(`Shots left: ${shotsLeft}`);
    }
}