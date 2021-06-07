//summary from the previous page
let storedData = JSON.parse(sessionStorage.getItem('flightSelected'));
let storedTime = JSON.parse(sessionStorage.getItem('flightDate'))

console.log(storedData.departure);

document.getElementById("summary1").innerHTML = `Lot ${storedData.departure} - ${storedData.arrival}, ${storedTime}`;

//logo popup
function confirmBack() {
    var c = confirm("Czy chcesz wrócić do strony głównej? Niezapisane dane zostaną utracone");
    if (c == true) {
        window.location.href = "index.html";
    }
}    

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

//checks whether all seats has been selected
function allSeatsTaken() {
    let maxpassengers = storedData.passengers;
    let passengers = parseInt(maxpassengers)
    let storedSeats = JSON.parse(sessionStorage.getItem('seatsSelected'));
    let luggageEmpty = document.getElementById("luggage").value; //checks whether user chosed luggage option
    if(storedSeats.length === passengers && luggageEmpty != ""){
        window.location = "summary.html"
    }
    else {
        alert("Nie wszystkie miejsca zostały wybrane lub nie wybrano typu bagażu")
    }      
}

//displaying & calculating price with luggage
let seatNumber = storedData.passengers;
let seatPrice = 100 * seatNumber;
document.getElementById("showPrice").innerText = `${seatPrice}`
document.getElementById("luggage").addEventListener("change", function() {
    let luggagePrice = parseInt(document.getElementById("luggage").value);
    let price = seatPrice + luggagePrice;
    console.log(price)
    document.getElementById("showPrice").innerText = `${price}`
    sessionStorage.setItem("price", price);
    sessionStorage.setItem("luggage", luggagePrice);
})

//calculating price for different currencies
function calc() {
    var price = parseInt(sessionStorage.getItem("price"));
    console.log(this.value);
    sessionStorage.setItem("currency", JSON.stringify(this.value));
    if (this.value == "USD" || this.value == "EUR" || this.value == "JPY") {
        fetch(`https://api.nbp.pl/api/exchangerates/rates/c/${this.value}?format=json`)
        .then( (resp) => resp.json())
        .then (function (data) {
            let convertedPrice = price / data.rates[0].ask;
            convertedPrice = convertedPrice.toFixed(2);
            document.getElementById("showPrice").innerText = `${convertedPrice}`
            sessionStorage.setItem("price", convertedPrice);
            sessionStorage.setItem("luggage", luggagePrice);
        })
    }
    else {
        document.getElementById("showPrice").innerText = `${price}`
    }
}
document.getElementById("select").addEventListener("change", calc)


//popup login nav

document.querySelector(".show-login").addEventListener("click", function(){
    document.querySelector("#login").classList.add("active");
});

document.querySelector("#btn-login").addEventListener("click", function(){
    document.querySelector("#login").classList.remove("active");
});

document.querySelector(".show-signin").addEventListener("click", function(){
    document.querySelector("#signin").classList.add("active");
});

document.querySelector("#btn-signin").addEventListener("click", function(){
    document.querySelector("#signin").classList.remove("active");
});


