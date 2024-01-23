
function getCards(id, amount = 10) {
	
	if (isLoading) {
		return;
	}
	
	isLoading=true;
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
			isLoading=false;
		})
		.catch((e) => {
			console.error(e);
			isLoading=false;	
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
	//scrollHeight - Math.round(el.scrollTop) === el.clientHeight
	//if (( window.innerHeight + window.scrollTop) >= document.body.offsetHeight) {	
	//console.log(window.innerHeight+document.documentElement.scrollTop,document.documentElement.offsetHeight);	
	
	if (( window.innerHeight + document.documentElement.scrollTop ) < document.documentElement.offsetHeight) {
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
let isLoading=false;

window.setTimeout(() => getCards(nextCardID), 500);
