require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const ejs = require('ejs');
const apiKey = process.env.API_KEY ;
app.listen(3999);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs'); // Use 'ejs' as the view engine

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/weather', (req, res) => {
    const city = req.query.city;
    const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    axios
        .get(apiURL)
        .then((response) => {
            const data = response.data;
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            const apiURLcurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

axios
    .get(apiURLcurrent)
                .then((response)=>{

                    const dataCurrent = response.data;
                    const mainData = dataCurrent.weather[0].main;
                    let backgroundClass =    'backgroundClass';
                    if (mainData === 'Clouds') {
                        backgroundClass = 'clouds';
                    } else if (mainData === '') {
                        backgroundClass = 'clouds';
                    } else {
                        backgroundClass =    backgroundClass; // A default background for other conditions
                    }
                    console.log(mainData);
                    const mainDescription = dataCurrent.weather[0].description;
                    const temperature = dataCurrent.main.temp;
                    const feelsTemp = dataCurrent.main.feels_like;
                    const maxTemp = dataCurrent.main.temp_max;
                    const minTemp = dataCurrent.main.temp_min;
                    const wind = dataCurrent.wind.speed;



                    res.render('weather', {title: 'Weather',mainData:mainData,mainDescription:mainDescription,temperature:temperature,feelsTemp:feelsTemp,maxTemp:maxTemp,minTemp:minTemp,wind:wind,city:city,backgroundClass:backgroundClass});
                })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    });

        })
});