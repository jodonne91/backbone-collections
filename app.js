var express = require('express');
var path = require('path');

var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

var cupcakeDB = require("./cupcakeDB") // this is so stupid
cupcakeDB.init()

// List
app.get("/cupcakes", function(req, res){
  res.json(cupcakeDB.list())
})

// Create
app.put("/cupcakes/", function(req, res){
  res.json(cupcakeDB.create(req.body))
})

// Read
app.get("/cupcakes/:flavorId", function(req, res){
  res.json(cupcakeDB.read(req.params.flavorId))
})

// Update
app.post("/cupcakes/:flavorId", function(req, res){
  res.json(cupcakeDB.update(req.params.flavorId, req.body))
})

// Delete
app.delete("/cupcakes/:flavorId", function(req, res){
  res.json(cupcakeDB.delete(req.params.flavorId))
})

module.exports = app;
