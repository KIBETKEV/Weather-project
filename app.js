const express = require('express');
const https = require ("https");
const bodyParser = require ("body-parser");



const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {

res.sendFile(__dirname + "/index.html")

});

app.post('/', function(req, res){
  let unit;

if (req.body.tempOptn === "Farenheit"){
  unit = "imperial"
}else{
  unit="metric"
}
  const query = req.body.cityName
  const key = "a7ea9307fd2ec786be395995ff088714"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid="+ key;
  https.get(url, function (response){
      response.on("data", function (data){
      const weatherData = JSON.parse(data)//JSON.parse structures data from API to readable JS
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const weatherIcon = weatherData.weather[0].icon
      const Urlimage = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write ("<h1>The temperature in " + query + " is " + temp + req.body.tempOptn  +"</h1>");
      res.write ("<img src =" + Urlimage + ">");
      res.send();
      });
      
  });

})

 

  
  app.listen(3000, function () {
    console.log("Server is running");
  });