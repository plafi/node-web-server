const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3030;

var app = express();

// Kur dona me da kodin copa copa e e thirim neper files
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// Pi rujm logat ku po him neper faqe
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now +': '+req.method+' '+req.url;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
            console.log("Error");
    });
    next();
});

/*app.use((req, res, next) => { // pa next dmth kodi jet qetu nuk vazhdon mu ekzekutu e na e kena perdor per maintainance
    res.render('maintenance.hbs'); 
});*/

app.use(express.static(__dirname + '/public')); //mundem me ju qas file help.html me /help.html

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'HOME',
        welcomeMessage: 'Hey There'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

