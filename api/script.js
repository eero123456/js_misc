//const API_URL = "https://api.boffsaopendata.fi/referencerates/v2/api/V2";
const API_URL = "rates.json";

let rates = {};

function getRates() {
	fetch(API_URL)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Virhe kurssien haussa");
			}
			return response.json();
		})
		.then((data) => {
			rates = data;
			updateTable();
		})
		.catch((e) => {
			console.error(e);
			displayError(e);
		});
}

function displayError(error) {
	document.getElementById("error-msg").innerHTML = error.message;
	// Piilotetaan virhe 2.5s jälkeen
	setTimeout(() => (document.getElementById("error-msg").innerHTML = ""), 2500);
}

function updateTable() {
	let table = document.querySelector("#rates-table");
	table.innerHTML = `<tr>
            <th>Valuutta</th>
            <th>Lyhenne</th>
            <th>Kurssi EUR</th>
        </tr>`;

	let filter = document.getElementById("filter").value.toUpperCase();

	rates.forEach((currency) => {
		// lisätään vain rivit jotka alkaa suodattimen tekstillä
		if (!currency.Currency.startsWith(filter)) {
			return;
		}
		// Luodaan rivit taulukkoon
		let row = document.createElement("tr");

		let td = document.createElement("td");
		td.innerText = currency.CurrencyNameFi;
		row.appendChild(td);

		let td2 = document.createElement("td");
		td2.innerText = currency.Currency;
		row.appendChild(td2);

		let td3 = document.createElement("td");

		td3.innerHTML = parseCurrencyValue(currency);

		row.appendChild(td3);

		table.appendChild(row);
	});
}

function parseCurrencyValue(currency) {
	if (!currency.ExchangeRates[0]?.Value) {
		return "-";
	}

	let rateStr = currency.ExchangeRates[0].Value;
	// tiedostossa desimaalierottimena pilkku, joten pitää korvata pisteellä jotta JS lukee numeron oikein
	let rate = parseFloat(rateStr.replace(",", "."));
	// pyöristys kolmeen desimaaliin
	return rate.toFixed(3);
}
