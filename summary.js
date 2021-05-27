//displaying summary
let storedData = JSON.parse(sessionStorage.getItem('flightSelected'));
let storedTime = JSON.parse(sessionStorage.getItem('flightDate'));
let storedSeats = JSON.parse(sessionStorage.getItem('seatsSelected'));
let fullPrice = JSON.parse(sessionStorage.getItem('price'));

document.getElementById("departure").innerHTML = `${storedData.departure}`;
document.getElementById("arrival").innerHTML = `${storedData.arrival}`;
document.getElementById("date").innerHTML = `${storedTime}`;
document.getElementById("passengers").innerHTML = `${storedData.passengers}`;
document.getElementById("luggage").innerHTML = `${displayLuggage()}`;
document.getElementById("seats").innerHTML = `${storedSeats}`;
document.getElementById("price").innerHTML = `${fullPrice}`;
document.getElementById("currency").innerHTML = ` ${displayCurrency()}`;

//displaying correct luggage
function displayLuggage(){
    let luggage = JSON.parse(sessionStorage.getItem('luggagePrice'));
    if(luggage == 0){
        return "Tylko podręczny"
    }
    else if(luggage ==40){
        return "10kg rejestrowany"
    }
    else if(luggage=70){
        return "20kg rejestrowany"
    }
};

//displaying correct currency

function displayCurrency() {
    let currency = JSON.parse(sessionStorage.getItem('currency'));
    if(sessionStorage.getItem('currency') === null) {
        return "PLN"
    }
    else {
        return currency
    }
}

//weather widget
var day1 = new Date(); 
var day2 = new Date(storedTime);

var difference= Math.abs(day2-day1);
days = (difference/(1000 * 3600 * 24))+1

console.log(days)

function load() {
    if (days < 16) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storedData.arrival}&appid=af4cddf8ba6d2ac99ba304abc62d2cc7`)
        .then ((resp) => resp.json())
        .then(function (data) {
            let weather = data["weather"]["0"]["icon"];
            console.log(weather);
            console.log(storedData.arrival);
                document.getElementById('weather-forecast').innerHTML = `${((data.main.temp - 273.15).toFixed(1))} &#x2103` 
                document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weather}@2x.png">`;
            })
        }
    else {
        document.getElementById('weather-forecast').innerHTML = `Przepraszamy, data wylotu zbyt odległa` 
    }
}

load();


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