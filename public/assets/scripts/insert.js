const express = require("express");
const db = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoose = require("mongoose");
const app = express();

mongoose.connect(uri, {
    useNewUrlParser:true, useUnifiedTopology:true
}, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("successfully connected");
    }
});



const insertData=async ()=>{
    let data = await db();
    let result = await data.insert(
        [
            {
                email: "lala",
                username: "addd",
                password: "1234567"
            }
        ]
    )
}