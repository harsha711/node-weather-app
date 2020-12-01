const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid=0d4fbf66cfe0e84f7cecc5e03de75a93&units=metric';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to the server', undefined);
        }
        else if(body.cod === "404")
        {
            callback('Inavlid Input, search for different location', undefined);
        }
        else{
            callback(undefined, 'The temperature in '+body.name + ' is '+body.main.temp);
        }
    })
}

module.exports = forecast;