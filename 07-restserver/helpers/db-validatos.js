const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado en la DB`);
    }
       
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con el id: ${id}, no existe en la base datos`);
    }
       
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}