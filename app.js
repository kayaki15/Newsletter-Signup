const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');
const https = require('https');

const app = express()
const port = 3000

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
})); {}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  ///////////////////::this part for showing in console :


  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  // console.log(req.body);

  ////////////////////////////// this part to display data in Browser :
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }

    }]
  };

  //
  // var result = "<h4>First Name</h4>" + fName + "<h4>Last Name</h4> " +  lName  + "<h4>E-mail </h4> "   + email;
  //   res.send("The Data is  : " + result);
  const jsonData = JSON.stringify(data);
  const url = 'https://us20.api.mailchimp.com/3.0/lists/f5d8787336';


  const options = {
    method: "POST",
    auth: "benomar:04238645c2d9676094ef765c9e7f7243-us20"

  }
  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {



      res.sendFile(__dirname + "/Success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));

    })

  })

  request.write(jsonData);
  request.end();

});


app.post("/failure", function(req, res){

  res.redirect("/") ;
})

app.listen(port, () => {
  console.log(`setup is running on 3000 http://localhost:${port}`)
})

/////api key  04238645c2d9676094ef765c9e7f7243-us20
//// audience id : f5d8787336.
