function getCards(id, amount = 10) {
	fetch(`api.php?startID=${id}&amount=${amount}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Virhe datan haussa");
			}
			return response.json();
		})
		.then((data) => {
			renderCards(data.cards);
			cards.push(...data.cards);
			nextCardID = data.cards[data.cards.length - 1].id + 1;
		})
		.catch((e) => {
			console.error(e);
		});
}

function renderCards(data) {
	let main = document.querySelector("main");

	data.forEach((card) => {
		let elem = document.createElement("div");
		elem.className = "card";

		let heading = document.createElement("h3");
		heading.innerHTML = `Kortti #${card.id}`;
		elem.appendChild(heading);

		let text = document.createElement("article");
		text.innerHTML = card.text;
		elem.appendChild(text);

		let counter = document.createElement("p");
		counter.innerHTML = `${card.likes} tykkäsi tästä`;
		elem.appendChild(counter);

		main.appendChild(elem);
	});
}

function scrollHandler() {
	if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
		return;
	}

	if (nextCardID < 100) {
		getCards(nextCardID);
		return;
	}

	document.removeEventListener("scroll", scrollHandler);
}

document.addEventListener("scroll", scrollHandler);

let cards = [];
let nextCardID = 1;

window.setTimeout(() => getCards(nextCardID), 500);
