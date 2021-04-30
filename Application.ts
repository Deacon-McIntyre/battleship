import {IUserInterface, UserInterface} from "./UserInterface";
import {Game, IGame} from "./Game";
import {Shot} from "./Shot";

class Application {
    ui: IUserInterface;
    game: IGame;

    constructor() {
        this.ui = new UserInterface(console);
        this.game = new Game();
    }

    run() {
        // Welcome the user
        this.ui.printWelcome();

        while (this.game.inPlay()) {
            this.playTurn();
        }
    }

    playTurn() {
        // Ask the user for input!
        const input = this.ui.getCoordinatesFromUser();
        const shot = new Shot(input);

        /// TODO REFACTOR:
        if (shot.isValid()) {
            shot.build();
            if (this.game.shotIsInBounds) {
                this.game.addShot(shot);

                // Communicate to the user whether it was a hit/miss and how many turns remain
                if (this.game.isHit()) {
                    // Tell the user that it was a hit
                    this.ui.printHit();

                    if (this.game.isWon()) {
                        this.ui.printWinMessage();
                    }
                } else {
                    this.ui.printMiss();
                }

                this.ui.printShotsLeft(this.game.shotsLeft());
            } else {
                this.ui.printOutOfBoundsError(input);
            }
        } else {
            this.ui.printValidationError(input);
        }

    }
}

// const board = new Board();
const app = new Application();

app.run();