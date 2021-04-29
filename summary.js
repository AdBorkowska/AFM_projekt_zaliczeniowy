let storedData = JSON.parse(sessionStorage.getItem('flightSelected'));
let storedSeats = JSON.parse(sessionStorage.getItem('seatsSelected'));
console.log(storedData.departure)

document.getElementById("departure").innerHTML = `${storedData.departure}`;
document.getElementById("arrival").innerHTML = `${storedData.arrival}`;
document.getElementById("date").innerHTML = `${storedData.date}`;
document.getElementById("passengers").innerHTML = `${storedData.passengers}`;
document.getElementById("luggage").innerHTML = `${storedData.departure}`;
document.getElementById("seats").innerHTML = `${storedSeats}`;
document.getElementById("price").innerHTML = `${storedData.departure}`;