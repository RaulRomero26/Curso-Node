import {leerInput, inquirerMenu, listarLugares ,pausa}  from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const main = async() =>{ 
    const busquedas = new Busquedas();
    let opt;

    do {
        // Imprimir el menú
        opt = await inquirerMenu();
      
        switch(opt){
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                //buscar lugares
                const lugares = await busquedas.ciudad(termino);
                
                //seleccionar el lugar
                const id = await listarLugares(lugares);
                if(id === '0') continue;
                //guardar en db
                
                const lugarSel = lugares.find(lugar => lugar.id === id);
                busquedas.agregarHistorial(lugarSel.nombre);
                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng)
                //resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre.green);
                console.log('Lat:',lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Minima:',clima.min);
                console.log('Máxima:',clima.max);
                console.log('Como está el clima:',clima.desc.green);
            break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar,i) =>{
                    const idx = `${ i + 1}`.green;
                    console.log(`${ idx } ${ lugar }`);
                })
            break;
        }

       if(opt !== 0 ) await pausa();

    } while( opt !== 0 );

}

main();