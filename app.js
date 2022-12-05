//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const validate = require(__dirname + "/validator.js");
const address = require(__dirname + "/getAddress.js");

var endereco = [];
var item = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {item:item, endereco:endereco});
});


app.post("/", function(req, res){
  const text = req.body.textToConvert;
  item = validate.validate(text);
  endereco = address.getAddress(item);
  res.redirect("/")
});

app.listen(process.env.PORT || 3000);
