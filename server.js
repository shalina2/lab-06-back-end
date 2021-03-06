'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();


const PORT = process.env.PORT||3000;


const app = express();

app.use(cors());

app.get ('/' ,(request,response)=> {
    response.send('server is on');
})
app.get ('/location', (request,response)=> {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
});

function searchToLatLong(query) {
    const geoData = require('./geo.json');
    const location = new Location(geoData.results[0]);
        location.search_query =query;
        return location;
}

function Location(data) {
    this.formatted_query = data.formatted_address;
    this.latitude = data.geometry.location.lat;
    this.longitude = data.geometry.location.lng;

}

app.listen(PORT, ()=> console.log(`App is up on ${PORT}`));

app.get ('/weather', (request,response)=> {
   
    const weatherData = searchWeather(request.query.data);
    response.send(weatherData);
});

function searchWeather() {
    const darkSkyData = require('./darksky.json');
    const weather = [];
    //weather.push(new Weather(darkSkyData.currently))
    darkSkyData.daily.data.forEach(day=> {
        weather.push(new Weather(day));
    })
    return weather;
}



function Weather (data) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day = new Date(data.time*1000);
    this.time =`${months[day.getMonth()]} ${day.getDate()}`
    this.forecast =data.summary;
}
