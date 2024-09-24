
// var os = require("os");		// os is a module 
// 	console.log(os.cpus())
// 	console.log(os.freemem())
// 	console.log(os.platform())
// 	console.log(os.arch())
// 	console.log(os.release())


// var http = require("http")
// var app = http.createServer((request, response) => {
// 	response.writeHead(200, { "content-type": "text/html" })

// 	response.write("<h2>Welcome to the Node JS Server</h2>");
// 	response.end();
// })
// app.listen(4000)
// console.log(`Server Started... "http://127.0.0.1:4000"`)


// let http = require("http")
// let app = http.createServer((req, res) => {
// 	res.writeHead(200, { "content-type": "application/json" });
// 	res.write(JSON.stringify(
// 		[
// 		{ 
// 			"name": "Himanshu", 
// 			"lastName": "Mishra",
// 			 "age": 22
// 			 }, 
// 			 { 
// 				"name": "Hema",
// 				 "lastName": "Mishra",
// 				  "age": 22
// 				 }
// 				]
// 			)
// 		)
// 		res.end()
// })
// app.listen(4500)
// console.log(`Server started at .... "http://127.0.0.1:4500`)


// var mongoClient = require("mongodb").MongoClient;
// var http = require("http")
// var url = "mongodb://localhost:27017/";
// var app = http.createServer((req, res) => {
// 	res.writeHead(200, {"content-type":"application/json"})
// 	mongoClient.connect(url)
// 	.then(clientObj => {
// 		var db = clientObj.db("admin")
// 		db.collection("products").find({}).toArray().then(
// 			document => {
// 				res.write(JSON.stringify(document));
// 				res.end()
// 			}
// 		)
// 	})
// })
// app.listen(4200)
// console.log(`Server started at "http://127.0.0.1:4200"`)

// var http = require("http")
// var mongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017";
// var app = http.createServer((req, res) => {
// 	res.writeHead(200, { "content-type": "application/json" })
// 	mongoClient.connect(url).
// 		then(clientObj => {
// 			var db = clientObj.db("newcollection")

// 			db.collection("newcolletion").find({}).toArray()
// 				.then(
// 					document => {
// 						res.write(JSON.stringify(document));
// 						res.end()
// 					}
// 				)
// 		})
// })
// app.listen(5000)
// console.log(`Server started at "http://127.0.0.1:5000"`)


const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const app = express();


app.get("/", (req, res) => {
	res.send("<h1>Welcome to the API home page</h1>")
})
app.get("/men", (req, res) => {
	res.send("<h2>Welcome to the Mens Fashion</h2>")
})
app.get("/products", (req, res) => {
	mongoClient.connect(url).
		then(clientObj => {
			var db = clientObj.db("admin")
			db.collection("products").find({}).toArray().then(
				document => {
					res.send(document)
					res.end()
				}
			)
		})
})
app.get("/cat" , (req,res) => {
	mongoClient.connect(url).then(clientObj => {
		let db = clientObj.db("admin")
		db.collection("categories").find({}).toArray().then(document => {
			res.send(document)
			res.end()
		})
	})
})

app.get("/products/:category" , (req,res) => {
	mongoClient.connect(url)
	.then(clientObj => {
		var db = clientObj.db("admin")
		db.collection("products").find({"category": req.params.category}).toArray().then(document => {
			res.send(document)
			res.end()
		})
	})
})

app.get("/products/:id" ,async  (req,res) => {

	let queryId =parseInt(req.params.id)
const clientObj =await mongoClient.connect(url)
const db = clientObj.db("admin")
const document =await db.collection("products").find({id:queryId}).toArray()
res.send(document)
res.end()
	
	// mongoClient.connect(url)
	// .then(clientObj => {
	// 	var db = clientObj.db("admin")
	// 	console.log("inner client ")
	// 	db.collection("products").find({"id": queryId }).toArray().then(
	// 		document => {
	// 		if(document.length === 0){
	// 			res.send("<h1>404 Product Not Found</h1>")
	// 			res.end()
	// 		}
	// 		else{
	// 			res.send(document)
	// 			res.end()
	// 		}
	// 		}
	// 	)
	// })
})
app.get("*" , (req,res) => {
	res.send("<h1>404 Error Not Found</h1>")
})
app.listen(5000)
console.log(`Server started at "http://127.0.0.1:5000"`)