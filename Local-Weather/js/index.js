var x = 387 + "b" + 739 + "bf" + 9 + "f" + 3 + "f" + 3 + "c",
    y = "f" + 167 + "ece" + 2 + "af" + 46 + "e" + 5 + "b" + 2 + "e",
    lat,
    lon,
    icon,
    units = "ca";

var images = {
  "clear-day":"http://crevisio.com/images/posts/96/yjf9TgZEw/Crevisio-96-yjf9TgZEw.jpg",
  "clear-night":"http://i.imgur.com/nwqHT3H.jpg",
  "rain":"http://www.rd.com/wp-content/uploads/sites/2/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg",
  "snow":"http://static.bhphotovideo.com/explora/sites/default/files/Correct.jpg",
  "sleet":"http://www.abccolumbia.com/wp-content/uploads/2016/01/Image4.jpg",
  "wind":"http://upload.wikimedia.org/wikipedia/commons/d/d3/Windy_Hill_Wind_Farm.jpg",
  "fog":"http://static.pexels.com/photos/17579/pexels-photo.jpg",
  "cloudy":"http://static.pexels.com/photos/768/sky-clouds-cloudy-ray-of-sunshine.jpg",
  "partly-cloudy-day":"http://d2f0ora2gkri0g.cloudfront.net/bkpam2185058_partlycloudy_1.jpg",
  "partly-cloudy-night":"http://cdn.weatheravenue.com/img/background/background-night.jpg"
}

$(document).ready(function(){
  if (navigator.geolocation) {
    $("#data").html("<p id='loading'>Gathering your location...</p>");
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      $("#data").html("<p id='data'>Your location:<br>Latitude: " + lat + "<br>Longitude: " + lon + "</p>");
    });
  }
  else {
  alert("Couldn't find your position!");
  }
})

function changeBackground(icon){
  if(icon in images){
  $("body").css("background", "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) )," + " url(" + images[icon] + ")");
}}

function getWeather(lat, lon, units){
  $("#results").html("<p id='results'>Gathering your weather results...</p>");
  $.getJSON("https://crossorigin.me/https://api.darksky.net/forecast/" + x + y + "/" + lat + ',' + lon + "?units="+units+"&lang=en&exclude=minutily,hourly,daily,alerts", function(response){
    console.log(response);
    $("#results").html("<p id='#results'>"
                           + "Summary: " + response["currently"]["summary"]
                           + "<br>Temperature: " + response["currently"]["temperature"] + (units == "ca" ? "°C" : "°F")   
                           + "<br>Pressure: " + response["currently"]["pressure"] + "hPa"
                           + "<br>Humidity: " + Math.round(response["currently"]["humidity"] * 100) + "%"
                           + "<br>Cloud cover: " + Math.round(response["currently"]["cloudCover"] * 100) + "%"
                           + "<br>Wind speed: " + Math.round(response["currently"]["windSpeed"]) + (units == "ca" ? " km/h, " : " mph, ") + response["currently"]["windBearing"] + "°"
                           + "</p>");
    icon = response["currently"]["icon"];
    changeBackground(icon);
})}

$(".getWeather").click(function(){
  getWeather(lat, lon, units);
});

$(".changeUnits").click(function(){
  if(units == "ca"){
    units = "us";
    getWeather(lat, lon, units);
  }
  else {
    units = "ca";
    getWeather(lat, lon, units);
  }
});