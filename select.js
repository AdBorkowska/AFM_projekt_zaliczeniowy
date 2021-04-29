//summary from the previous page
let storedData = JSON.parse(sessionStorage.getItem('flightSelected'))

console.log(storedData.departure);

document.getElementById("summary1").innerHTML = `Lot ${storedData.departure} - ${storedData.arrival}`;

//seat selection
function getCheckedValues() {
    let seats = Array.from(document.querySelectorAll('input[type="checkbox"]'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
    let maxpassengers = storedData.passengers;
    console.log(seats);
    if (seats.length <= maxpassengers) {
    sessionStorage.setItem("seatsSelected", JSON.stringify(seats));
    return seats;
    }
    else if (seats.length > maxpassengers) {
        alert("Osiągnięto limit miejsc")
        let lastElement = seats[seats.length -1];
        document.getElementById(`${lastElement}`).checked = false;
        seats.pop(); 
        // zablokuj resztę
        return seats;
    }
    }

const resultEl = document.getElementById('showSeats');
let seatClicked = document.getElementsByClassName('seat');
for (var i = 0 ; i < seatClicked.length; i++) {
    seatClicked[i].addEventListener('click', () => {
        resultEl.innerHTML = getCheckedValues();
    }); 
}

//displaying & calculating price
let seatNumber = storedData.passengers;
let seatPrice = 100 * seatNumber;
let luggagePrice = 10;

let price = seatPrice + luggagePrice;

document.getElementById("showPrice").innerText = `${price}`

function calc() {

        fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${this.value}?format=json`)
        .then( (resp) => resp.json())
        .then (function (data) {
            let convertedPrice = price / data.rates[0].ask;
            convertedPrice = convertedPrice.toFixed(2);
            document.getElementById("showPrice").innerText = `${convertedPrice}`
        })
    };
document.getElementById("select").addEventListener("change", calc)
