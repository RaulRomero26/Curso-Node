const argv = require('yargs')
    .option('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type:   'boolean',
        demandOption: false,
        describe: 'Muestra la tabla en consola'
    })
    .option('h', {
        alias: 'hasta',
        type:   'number',
        demandOption: false,
        default: 10,
        describe: 'Hasta que numero se va a multiplicar'
    })
    .check((argv,options) =>{
        if( isNaN(argv.base)){
            throw 'La base tiene que ser un numero';
        }
        return true;
    })
    .argv;


    module.exports = argv;