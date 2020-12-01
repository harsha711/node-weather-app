const express = require('express');

const path = require('path');

const hbs = require('hbs');

const forecast = require('./utils/forecast');

const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000

// console.log(__dirname);
// console.log(path.join(__dirname,'../public');

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Harsha'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About"
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: "Help"
    })
})

app.get('/weather', ( req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "Please include an address term"
        })
    }
    geocode(req.query.address, (error, response) => {
        if(error)
        {
            return res.send({error: error});
        }
        forecast(response.latitude, response.longitude, (error, data) => {
            if(error)
            {
                return res.send({error :error});
            }
            res.send({data: data});
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: "Please provide a search term"
        })
    }
    console.log(req.query);     
    res.send({
        products: []
    })
})

app.get('/help/*', (req ,res) => {
    res.render('404',{
        title: "404",
        message: "help article not found"

    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: "404",
        message: "page not found"
    })
})
app.listen(port);