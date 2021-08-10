const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const https = require("https");
const app = express();
// use of body parse
app.use(bodyparser.urlencoded({
  extended: true
}));

// to make our data static or public for all areas so that any folder
// can access that data
app.use(express.static("public"));

// to get the signup at localhost:3000
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");

});



// this post file is connected to the form tag of our signup.html in
// which we have specified action and method
// this file accepts the data and post it
app.post("/", function(req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
        }
     }]
};


  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/baa77179b6"
  const options = {
    method : "POST",
    auth: "sneha:74b29c7798d5c74c93063704320633b3-us5"
  }
  const request = https.request(url, options, function (response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");

    }
    else {
      res.sendFile(__dirname+"/failure.html");

    }
    response.on("data", function(data) {
console.log(JSON.parse(data));
    });
  });
request.write(jsonData);
request.end();
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/simon", function(req, res) {
  res.sendFile(__dirname+"/simon.html");
});
app.post("/drumkit", function(req, res) {
  res.sendFile(__dirname+"/drumkit.html");
});
app.post("/pitch", function(req, res) {
  res.sendFile(__dirname+"/dice.html");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running in port 3000");
});

// API KEY
// 74b29c7798d5c74c93063704320633b3-us5

// list id
// baa77179b6
