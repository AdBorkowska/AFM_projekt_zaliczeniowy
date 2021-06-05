//date picker

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if (dd < 10) {
    dd ='0'+ dd
} 
if (mm<10) {
    mm = '0' + mm
}

today = yyyy +'-'+ mm +'-'+ dd;
document.getElementById("today").setAttribute("min", today);

document.getElementById("today").addEventListener("change", function() {
    let input = this.value;
    console.log(input);
    sessionStorage.setItem("flightDate", JSON.stringify(input));
});

//flight search

function fetchFlights() {
    let depart = document.getElementById("departure").value;
    switch (depart){
        case "Kraków":
        depart = "KRK-sky";
        break;
        case "Warszawa":
            depart = "WAW-sky"
        break;
    }

    let arrive = document.getElementById("arrival").value;
    switch(arrive){
        case "Chicago":
            arrive = "CHIA-sky"
        break;
        case "Tokio":
            arrive = "NRT-sky"
        break;
        case "Sydney":
        arrive = "SYD-sky" 
        break;
    }
    console.log(depart);
    console.log(arrive);
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/PL/PLN/en_GB/${depart}/${arrive}/anytime/anytime`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "8dfd91e574msh331016455fe40c3p112dd2jsn966f55308c86",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
    .then ((resp) => resp.json())
    .then(function (data) {
        let dates = data["Dates"]["InboundDates"]
        console.log(dates)
    })
    .catch(err => {
        console.error(err);
    })
}

document.getElementById("arrival").addEventListener("change", fetchFlights);
document.getElementById("departure").addEventListener("change", fetchFlights);


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
    

//date & time widget

function getTime() {
    let dateObj = new Date();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let date = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();
    let d = date + '/' + month;
    
    let time = dateObj.getHours() + ":" + dateObj.getMinutes();
    
    document.getElementById("date-form-1").innerHTML = `Dziś mamy ${d}, godzina ${time}`;
}
setInterval(getTime, 1000);

getTime();

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
function checkLogin(e) {
    e.preventDefault();
    document.querySelector("#login-reminder").classList.add("active");
    e.preventDefault();
}

document.querySelector("#btn-login-reminder").addEventListener("click", function(){
    document.querySelector("#login-reminder").classList.remove("active");
});

document.getElementById("confirm-btn").addEventListener("click", checkLogin);

//checks whether form has been submitted
function checkForm(){
    let storedData = JSON.parse(sessionStorage.getItem('flightSelected'));
    let dep = storedData.departure;
    let arr = storedData.arrival;
    if(arr == "" || dep == ""){
        alert("Prosimy uzupełnić formularz!")
    }
    else {
        window.location.href = "./select.html";
    }
}

document.getElementById("btn-continue").addEventListener("click", checkForm);

//storing data from selection screen
const storeSelection = (ev) => {
    let flightData = {
        departure: document.getElementById("departure").value,
        arrival: document.getElementById("arrival").value,
        passengers: document.getElementById("passengers").value
    }
    document.forms[0].reset();
    sessionStorage.setItem("flightSelected", JSON.stringify(flightData));
}

document.getElementById("confirm-btn").addEventListener("click", storeSelection);

let storedData = JSON.parse(sessionStorage.getItem('flightSelected'));