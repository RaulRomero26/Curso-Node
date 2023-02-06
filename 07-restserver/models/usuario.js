const { Schema, model } = require('mongoose');

const UsuarioScheema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});
//esto esta sobreescriendo una funcion propia de mongoose debde de ser en funcion normal 
//o no jala, se sacan los valores que no queremos regresar como respuesta
//pero si se guardan en db
UsuarioScheema.methods.toJSON = function (){
    const {__v,password,...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioScheema);