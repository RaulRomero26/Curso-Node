import express, { Application } from 'express';
import userRoutes from '../routes/usuario.routes';//cuando tienes una exportacion por defecto no hace falta el *
//import * as userRoutes from '../routes/usuario.routes' cuando son muchas exportaciones dentro de un archivo
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        //definir mis rutas
        this.routes();
    }

    async dbConnection (){
        try{

            await db.authenticate();
            console.log('database online')

        }catch(error:any){
            throw new Error(error);
        }
    }

    middlewares(){
        //cors
        this.app.use( cors())      
        //lectura del body
        this.app.use(express.json())
        //carpeta publica
        this.app.use(express.static('public'));

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