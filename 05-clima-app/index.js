import {leerInput, inquirerMenu, pausa}  from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

const main = async() =>{ 
    const busquedas = new Busquedas();
    let opt;

    do {
        // Imprimir el menú
        opt = await inquirerMenu();
      
        switch(opt){
            case 1:
                //mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                //buscar lugares

                //seleccionar el lugar

                //clima

                //resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Lat:',);
                console.log('Lng:',);
                console.log('Temperatura:',);
                console.log('Minima:',);
                console.log('Máxima:',);
            break;
        }

       if(opt !== 0 ) await pausa();

    } while( opt !== 0 );

}

main();