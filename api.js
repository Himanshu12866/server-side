const express = require('express');
const mongoclient = require('mongodb').MongoClient;
const cors = require('cors');
const url = "mongodb://127.0.0.1:27017"
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get("/" , (req,res) => {
    mongoclient.connect(url).then(clientObj => {
        let db = clientObj.db("admin")
    })
})