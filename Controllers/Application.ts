import {IUserInterface, UserInterface} from "../Views/UserInterface";
import {Game, IGame} from "../Models/Game";
import {IShot, Shot} from "../Models/Shot";

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

		if (this.game.isWon()) {
			this.ui.printWinMessage();
		} else if (this.game.isLost()) {
			this.ui.printLossMessage();
		}
	}

	playTurn() {
		const input = this.ui.getCoordinatesFromUser();
		const shot = new Shot(input);

		if (this.isShotAllowed(shot)) {
			this.game.addShot(shot);

			if (this.game.didLastShotHit()) {
				this.ui.printHit();
			} else {
				this.ui.printMiss();
			}

			this.ui.printShotsLeft(this.game.shotsLeft());
		}
	}

	isShotAllowed(shot: IShot): boolean {
		if (shot.isInputInvalid()) {
			this.ui.printValidationError(shot.rawInput);
			return false;
		}
		if (this.game.isShotOutOfBounds(shot)) {
			this.ui.printOutOfBoundsError(shot.rawInput);
			return false;
		}
		if (this.game.isShotDuplicate(shot)) {
			this.ui.printDuplicateShotError();
			return false;
		}

		return true;
	}
}

// const board = new Board();
const app = new Application();

app.run();
