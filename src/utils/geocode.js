const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibGlnaHQ3MTEiLCJhIjoiY2tpMWJvZW1wMWZtdTMwbHQzdGFsbWZxaCJ9.IbuhqCvRfit6igCgPwaCtg';
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location services', undefined )
        }
        else if(body.features.length === 0){
            callback('Unable to find location, try another search', undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;