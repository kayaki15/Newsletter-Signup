const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');

const app = express()
const port = 3000

app.use(express.static("public") ) ;

app.use(bodyParser.urlencoded({extended : true }));
{}

app.get("/" , function(req , res){
res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req , res){

///////////////////::this part for showing in console :

console.log(req.body);
var fName = req.body.firstName;
var lName = req.body.lastName;
var email = req.body.email;
////////////////////////////// this part to display data in Browser :

var result = "<h4>First Name</h4>" + fName + "<h4>Last Name</h4> " +  lName  + "<h4>E-mail </h4> "   + email;
  res.send("The Data is  : " + result);

});


app.listen(port, () => {
  console.log(`setup is running on 3000 http://localhost:${port}`)
})
