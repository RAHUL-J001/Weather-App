const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {


   const city = req.body.City;
   const state = req.body.State;
   const country = req.body.Country;
   const query = city+`%2C`+state+`%2C`+country;
   const appKey = "dbf9a6c2aaf53ff4a071a9829c50c9c9";
   const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + appKey + "&units=" + unit;


    const request = https.get(url, function(response) {

    response.on("data", function(data) {
    const weather = JSON.parse(data);
    const temp = weather.main.temp;
    const feels_like = weather.main.feels_like;
    const humidity = weather.main.humidity;
    const  weatherDescription = weather.weather[0].description;
    const icon = weather.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    console.log(temp);

    app.get("request", function(req,res){
       res.sendFile("")
    });

    res.write("<h1>The temperaure in "+ city +" ,"+state+" ,"+ country+" is "+ temp + " degree Celcius</h1>");
    res.write("<h1>The weather is currently "+ weatherDescription + "</h1>");

    res.write("<img src=" + imageURL +">");

    res.send();

    });

  });

});
app.listen("3000", function() {
  console.log("server is running on port 3000");
});
