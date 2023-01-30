import axios from 'axios';

class Busquedas{

    historial = ['Tegucigalpa','Madrid', 'San José']

    constructor(){
        //TODO LEER DB
    }

    get paramsMapbox(){
        return {
            'access_token': 'pk.eyJ1IjoicmF1bHJvbWVybzI2IiwiYSI6ImNsZGl4bjkzcjFneXczcG1wYWo1OHdlc2sifQ.kpzVNWm4rIrqWqTFFmqYLg',
            'limit': 5,
            'language': 'es'
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
            console.log(resp.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}

export {Busquedas}