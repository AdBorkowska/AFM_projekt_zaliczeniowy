//date picker

const today = document.getElementById('today');
let dateNow = new Date();
let dateFormat = (dateNow.getMonth()+1) <10 ? `${dateNow.getFullYear()}-0${dateNow.getMonth()+1}-${dateNow.getDate()}` : `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`
let todayMin = today.setAttribute('min', dateFormat);

today.setAttribute('value', dateFormat);
console.log(dateFormat);

//weather index.html


document.getElementById("departure").addEventListener("change",function(){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.value}&appid=af4cddf8ba6d2ac99ba304abc62d2cc7`)
        .then ((resp) => resp.json())
        .then(function (data) {
        let weather = data["weather"]["0"]["icon"];
        console.log(weather);
            document.getElementById('showWX').innerHTML = `Aktualna temperatura w mieście wylotu to: ${((data.main.temp - 273.15).toFixed(1))} &#x2103, a odczuwalna to ${((data.main.feels_like - 273.15).toFixed(1))} &#x2103` 
            document.getElementById('weather-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weather}@2x.png">`;
        })
    })
    

//date & time

let dateObj = new Date();
let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
let date = ('0' + dateObj.getDate()).slice(-2);
let year = dateObj.getFullYear();
let d = date + '/' + month;

let time = dateObj.getHours() + ":" + dateObj.getMinutes();

document.getElementById("date-form-1").innerHTML = `Dziś mamy ${d}, godzina ${time}`;

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


//popup login if not logged on


//storing data from selection screen
const storeSelection = (ev) => {
    let flightData = {
        departure: document.getElementById("departure").value,
        arrival: document.getElementById("arrival").value,
        departureDate: document.getElementById("departureDate"),
        passengers: document.getElementById("passengers").value
    }
    document.forms[0].reset();
    sessionStorage.setItem("flightSelected", JSON.stringify(flightData));
}

document.getElementById("confirm-btn").addEventListener("click", storeSelection);

let storedData = JSON.parse(sessionStorage.getItem('flightSelected'))

console.log(storedData.departure);

