require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const apiKey = process.env["API_KEY "];

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

