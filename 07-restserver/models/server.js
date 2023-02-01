const express = require('express');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    middlewares(){
        //Directorio publico la ruta base /
        this.app.use( express.static('public'))
    }

    routes(){
        this.app.get('/api',  (req, res) => {
            res.send('Hello World')
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto',this.port);
        })
    }
}

module.exports = Server;