const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const connectionString = `mongodb+srv://ada:ada123@cluster0.jwacu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
console.log('Connected to Database')
const db = client.db('nowabazadanych')
const nazwakolekcji = db.collection('nazwakolekcji')
app.get('/', (req, res) => {
const cursor = db.collection('nazwakolekcji').find()
res.sendFile(__dirname + '/index.html');
})
app.post('/someuserdata', (req, res) => {
console.log(req.body);
nazwakolekcji.insertOne(req.body)
.then(result => {
console.log(result)
})
.catch(error => console.error(error))
})
app.listen(8080, function() {
console.log("Nasłuchiwanie na porcie 8080");
})
})
.catch(error => console.error(error))