import axios from 'axios';

class Busquedas{

    historial = ['Tegucigalpa','Madrid', 'San José']

    constructor(){
        //TODO LEER DB
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWheater(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
        }
    }

    async ciudad(lugar = ''){
        //peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            //({}) significa regresar un objeto de forma implicita
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))
        } catch (error) {
            return [];
        }
    }

    async climaLugar( lat, lon ){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsWheater
            });

            const resp = await instance.get();
            const {weather,main} = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export {Busquedas}