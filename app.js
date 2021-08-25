//jshint esversion:6

const express = require("express");
const request = require('https');
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
  res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function(req,res) {

  const fn = req.body.fname;
  const ln = req.body.lname;
  const en = req.body.ename;

  const data = {
    members:[
      {
        "email_address": en,
        "status": "subscribed",
        "merge_fields": {
      	FNAME: fn,
      	LNAME: ln
      }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/865785689d";
  const options = {
    method: "POST",
    auth: "rituraj:c7b70190f4c6c57f00d2b0415dd2b097-us5"
  };

  const request = https.request(url,options,function(response)
  {
    if (response.statusCode == 200){
      res.sendFile(__dirname+"/success.html");
    }else{res.sendFile(__dirname+"/failure.html");}

      response.on("data",function(data) {
        console.log(JSON.parse(data));
      });
  });

});


app.post("/failure",function(req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res) {
  console.log("Server running at 3000");
});
