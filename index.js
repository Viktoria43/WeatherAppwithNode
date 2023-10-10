require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const ejs = require('ejs');
const apiKey = process.env.API_KEY ;

app.listen(3000);
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
    const { lat, lon } = req.query;

    const params = {
        lat,
        lon,
        appid: apiKey,
    };

    axios
        .get('https://api.openweathermap.org/data/2.5/weather', { params })
        .then((response) => {
            const apiResponse = response.data;
            res.json(apiResponse); // Send the API response as JSON to the client
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        });
});