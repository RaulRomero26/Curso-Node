import axios from 'axios';

class Busquedas{

    historial = ['Tegucigalpa','Madrid', 'San José']

    constructor(){
        //TODO LEER DB
    }

    async ciudad(lugar = ''){
        //peticion http
        //console.log('ciudad',lugar);
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return []; //retornar los lugares
            
        } catch (error) {
            return [];
        }
    }
}

export {Busquedas}