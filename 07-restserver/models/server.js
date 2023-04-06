const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuarios: '/api/usuarios',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            auth: '/api/auth',
            uploads: '/api/uploads'
        }
        

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();



    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico la ruta base /
        this.app.use( express.static('public'))

        //fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        //aca se decide que ruta asignarle y de que archivo tomar las configuraciones
        this.app.use( this.paths.auth, require('../routes/auth.routes'));
        this.app.use( this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios.routes'));
        this.app.use( this.paths.productos, require('../routes/productos.routes'));
        this.app.use( this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use( this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto',this.port);
        })
    }
}

module.exports = Server;