const today = document.getElementById('today');

let dateNow = new Date();

let dateFormat = (dateNow.getMonth()+1) <10 ? `${dateNow.getFullYear()}-0${dateNow.getMonth()+1}-${dateNow.getDate()}` : `${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}`

let todayMin = today.setAttribute('min', dateFormat);

today.setAttribute('value', dateFormat);

console.log(dateFormat);


//weather 
//let locationIcon = document.querySelector('.weather-icon'); - w fetchu robiłam wtedy locationIcon.innerHTML
//const {icon} = data.weather[0];

function weatherDep() {
    let departure = document.getElementById("departure");
    let cityDep = departure.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityDep}&appid=af4cddf8ba6d2ac99ba304abc62d2cc7`)
    .then ((resp) => resp.json())
    .then(function (data) {
        document.getElementById('showWX').innerHTML = `Aktualna temperatura w mieście wylotu to: ${((data.main.temp - 273.15).toFixed(1))} &#x2103, a odczuwalna to ${((data.main.feels_like - 273.15).toFixed(1))} &#x2103`
        document.getElementById('weather-icon').innerHTML = `<img src="icons/${icon}.png">`;
    })
};





    //date & time
let dateObj = new Date();
let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
let date = ('0' + dateObj.getDate()).slice(-2);
let year = dateObj.getFullYear();
let d = date + '/' + month;

let time = dateObj.getHours() + ":" + dateObj.getMinutes();

document.getElementById("date-form-1").innerHTML = `Dziś mamy ${d}, godzina ${time}`;