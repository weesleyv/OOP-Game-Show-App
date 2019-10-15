class Game {
	constructor() {
		this.missed = 0;
		this.phrases = this.createPhrases();
		this.activePhrase = null;
	}

	/*
	* Creates phrases for use in game
	* @return {array} An array of phrases that could be used in the game
	*/
	createPhrases() {
		const phrases = [];
		const phrase = new Phrase('A bird in the hand is worth two in the bush');
		const phrase1 = new Phrase('A Piece of Cake');
		const phrase2 = new Phrase('You can not judge a book by its cover');
		const phrase3 = new Phrase('Let the cat out of the bag');
		const phrase4 = new Phrase('Once in a blue moon');
		phrases.push(phrase, phrase1, phrase2, phrase3, phrase4)
		
		return phrases
	}


	/*
	* Selects random phrase from phrases property
	* @return {Object} Phrase object chosen to be used
	*/
	getRandomPhrase() {
		const allPhrases = this.createPhrases();
		const randomPhrase = allPhrases[Math.floor(Math.random() * allPhrases.length)];
		return randomPhrase;
	}

	/**
	* Begins game by selecting a random phrase and displaying it to user
	*/
	startGame() {
		const overlay = document.getElementById('overlay');
		overlay.style.display = 'none';

		this.started = true;
		let currentPhrase = this.getRandomPhrase();
		this.activePhrase = currentPhrase;
		currentPhrase.addPhraseToDisplay();
	}

	/**
	* Checks for winning move
	* @return {boolean} True if game has been won, false if game wasn't
	won
	*/
	checkForWin() {
		const hidenLetters = document.querySelectorAll('.hide');
		if (hidenLetters.length === 0) {
			return true
		} else {
			return false
		}
	}

	/**
	* Increases the value of the missed property
	* Removes a life from the scoreboard by replacing img
	* Checks if player has remaining lives and ends game if player is out
	*/
	removeLife() {
		const lifeImgs = document.querySelectorAll('img[src="images/liveHeart.png"]');
		lifeImgs[0].src = `images/lostHeart.png`;
		this.missed +=1;
		if (this.missed === 5) {
			this.gameOver()
		}
	}

	/**
	* Displays game over message
	* @param {boolean} gameWon - Whether or not the user won the game
	*/
	gameOver(gameWon) {
		const overlay = document.getElementById('overlay');
		const overlayH1 = document.getElementById('game-over-message');
	
		overlay.style.display = 'flex';

		if (gameWon) {
			overlayH1.textContent = 'You won!';
			overlay.className = 'win';
		} else {
			overlayH1.textContent = 'You lose!';
			overlay.className = 'lose';
		}
	}

	/**
	* removes phrase elements (li)
	* resets button classes and lives imgs
	*/
	resetGame() {
		const phraseUl = document.querySelector('#phrase ul');
		const letterButtons = document.querySelectorAll('.keyrow .key');
		const lifeImages = document.querySelectorAll('img[src="images/lostHeart.png"]');
		lifeImages.forEach(img => {
			img.src = 'images/liveHeart.png'
		})
		letterButtons.forEach(button => {
			button.disabled = false;
			button.className = 'key';
		})
		phraseUl.innerHTML = '';
	}

	/**
	* Handles onscreen keyboard button clicks
	* @param (HTMLButtonElement) button - The clicked button element
	*/
	handleInteraction(button) {
		const letter = button.textContent;
		const activePhrase = this.activePhrase;
		button.disabled = true;
		if (activePhrase.checkLetter(letter) === false) {
			button.classList.add('wrong');
			this.removeLife();
		} else {
			button.classList.add('chosen');
			activePhrase.showMatchedLetter(letter);
			this.checkForWin();
			if (this.checkForWin() === true) {
				this.gameOver(true)
			}
		}
	};
}