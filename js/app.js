
let game;
const button = document.getElementById('btn__reset');
const qwerty = document.getElementById('qwerty');
const keys = document.querySelectorAll('.key');
const overlay = document.getElementById('overlay');

//On click "start game" button the game starts
button.addEventListener('click', () => {
	game = new Game();
	game.resetGame();
	game.startGame();
})

//On click on screen keyboard, triggers handleInteraction method
qwerty.addEventListener('click', event => {
	if (event.target.className === 'key') {
		game.handleInteraction(event.target);
	}
})

//On keydow triggers handleInteraction method;
keys.forEach(key => {
	addEventListener('keydown', event => {
		if (event.key === key.textContent && overlay.style.display === 'none') {
			game.handleInteraction(key);
		}
	})
})


