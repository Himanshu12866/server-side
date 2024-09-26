const express = require('express');
const mongoclient = require('mongodb').MongoClient;
const cors = require('cors');
const url = "mongodb://127.0.0.1:27017"
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the API Server");
    res.end()
})
app.get("/categories", (req, res) => {
    mongoclient.connect(url).then(clientObj => {
        let db = clientObj.db("admin")
        db.collection("categories").find({}).toArray().then(document => {
            res.send(document)
            res.end()
        })
    })
})

app.get("/products", (req, res) => {
    mongoclient.connect(url).then(clientObj => {
        let db = clientObj.db("admin")
        db.collection("products").find({}).toArray().then(document => {
            res.send(document)
            res.end()
        })
    })
})

app.post("/add-products", (req, res) => {
    let product = {
        id: parseInt(req.body.id),
        title: req.body.title,
        price: parseInt(req.body.price),
        description: req.body.description,
        image: req.body.image,
        rating: {
            rate: parseInt(req.body.rate),
            count: parseInt(req.body.count)
        }
    }

    mongoclient.connect(url).then(clientObj => {
        let db = clientObj.db("admin")
        db.collection("products").insertOne(product).then(() => {
            res.redirect("/products")
            res.end();
        })
    })
})
app.put("/edit-products/:id", (req, res) => {
    let product = {
        id: parseInt(req.body.id),
        title: req.body.title,
        price: parseInt(req.body.price),
        description: req.body.description,
        image: req.body.image,
        rating: {
            rate: parseInt(req.body.rate),
            count: parseInt(req.body.count)
        }
    }
    mongoclient.connect(url).then(clientObj => {
        let db = clientObj.db("admin")
        db.collection("products").updateOne({ id: parseInt(req.params.id) }, { $set: product }).then(() => {
            res.redirect("/products")
            res.end()
        })
    })
})
app.delete("/delete-product/:id" , (req,res) => {
    mongoclient.connect(url).then(clientObj => {
        let cid = parseInt(req.params.id)
        let db = clientObj.db("admin")
        db.collection("products").deleteOne({id:cid}).then(() => {
            res.redirect("/products")
            res.end()
        })
    })
})
app.listen(1000)
console.log("Server started at  http://127.0.0.1:1000")
