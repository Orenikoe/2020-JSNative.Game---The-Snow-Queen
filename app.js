const DEFAULT_POSITION = 300;
const MOVE_DISTANCE = 10;

const basket = document.getElementById('basket');
const strawberry = document.getElementById('strawberry');
const container = document.querySelector('div');
const body = document.getElementById('body');
let scoreEl;
let scoreEl1;
let negativeCounter;
let positiveCounter;

strawberry.style.top = 0;

let currentPlace = DEFAULT_POSITION;
let counterPos = 1;
let counterNeg = 1;

function createScoreEl() {
	scoreEl = document.createElement('span');
	scoreEl1 = document.createElement('span');

	body.append(scoreEl);

	body.append(scoreEl1);

	scoreEl.className = 'alertbox';
	scoreEl1.className = 'alertbox';
}

function countScore(mode) {
	if (mode === 'pos') {
		scoreEl.innerHTML = '';

		scoreEl.innerHTML = `you collected ${positiveCounter}`;
	} else if (mode === 'neg') {
		scoreEl1.innerHTML = '';
		scoreEl1.innerHTML = `you missed ${negativeCounter}`;
	}
	resetGame();
}

function resetGame() {
	if (negativeCounter === 3) {
		alert('GAME OVER');
		location.reload()
	}
}

function moveBasket(event) {
	if (event.keyCode === 37 && currentPlace > 0) {
		currentPlace -= MOVE_DISTANCE;
		basket.style.left = `${currentPlace}px`;
	} else if (event.keyCode === 39 && currentPlace < 600) {
		currentPlace += MOVE_DISTANCE;
		basket.style.left = `${currentPlace}px`;
	}
}

function strawberryRandomPlaceHandler() {
	let randomLocation = Math.floor(Math.random() * 670);
	strawberry.style.left = `${randomLocation}px`;
	setTimeout(initStrawberryLocation, 1);
}

function initStrawberryLocation() {
	let randomTime = Math.floor(Math.random() * 2 + 2);
	setTimeout(() => {
		strawberry.style.animationIterationCount = 800;
	}, randomTime * 1000);
}

function strawberryInBasket(num) {
	const strX = strawberry.getBoundingClientRect().x;
	const basketX = basket.getBoundingClientRect().x;
	if (
		strX >= basketX &&
		basketX + basket.getBoundingClientRect().width >= strX
	) {
		strawberryRandomPlaceHandler();
		positiveCounter = counterPos++;
		countScore('pos');

		return 0;
	} else if (num === container.clientHeight) {
		negativeCounter = counterNeg++;
		console.log(negativeCounter);
		countScore('neg');
	}

	return num;
}

setInterval(() => {
	let num = +strawberry.style.top.match(/\d+/)[0];
	if (
		num >=
		container.clientHeight - basket.getBoundingClientRect().height / 2
	) {
		num = strawberryInBasket(num);
	}
	if (num === container.clientHeight) {
		num = 0;
		strawberryRandomPlaceHandler();
	}
	strawberry.style.top = num + 2 + 'px';
}, 10);

document.addEventListener('keydown', moveBasket);
createScoreEl();
