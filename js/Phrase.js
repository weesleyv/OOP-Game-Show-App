class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase();
	}
	/*
	 Display phrase on the board
	 */
	addPhraseToDisplay() {
		const ul = document.querySelector('#phrase ul');
		//loop through phrase to create li and add classes
		for (let i = 0; i < this.phrase.length; i++) {
			const li = document.createElement('li');
			ul.appendChild(li);
			if (this.phrase[i] === ' ') {
				li.classList.add('space');
				li.textContent = ' ';
			} else {
				li.classList.add('hide', 'letter', this.phrase[i]);
				li.textContent = this.phrase[i];
			}
		}
	}

	/**
	* Checks if passed letter is in phrase
	* @param (string) letter - Letter to check
	*/
	checkLetter(letter) {
		let matchCount = 0;
		for (let i = 0; i < this.phrase.length; i++) {
			if (this.phrase[i] === letter) {
				matchCount++
			}
		}
		if (matchCount > 0) {
			return true
		} else {
			return false
		}
	}

	/**
	* Displays passed letter on screen after a match is found
	* @param (string) letter - Letter to display
	*/
	showMatchedLetter(letter) {
		const matchedLetters = document.getElementsByClassName(letter);
		for (let i = 0; i < matchedLetters.length; i++) {
			matchedLetters[i].classList.remove('hide');
			matchedLetters[i].classList.add('show');
		}
	}
}