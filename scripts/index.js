// imports
const express = require('express');
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
//gsavblsplVmZKem2


app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/api/users', (req, res) => {

    client
    .connect()
    .then(client =>
      client
        .db("test")
        .collection("test")
        .find()
        .toArray()
    )
    .then(cols => {
      res.send(cols);
    })
    .finally(() => {
      client.close();
    });
    
});



app.listen(3000, () => {
    console.log("started");
});

// const { MongoClient } = require('mongodb');

// async function main() {
//     const uri = ""
// }
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     console.log("Request url:" + req.url);
// });

// server.listen(3000, '127.0.0.1', () => {
//     console.log("Server listening...");
// });


// console.log("HEllo>");