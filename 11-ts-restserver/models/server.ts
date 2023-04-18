import express, { Application } from 'express';
import userRoutes from '../routes/usuario.routes';//cuando tienes una exportacion por defecto no hace falta el *
//import * as userRoutes from '../routes/usuario.routes' cuando son muchas exportaciones dentro de un archivo


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        //definir mis rutas
        this.routes();
    }

    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto '+this.port);
        })
    }

}

export default Server;