const { Usuario, Categoria, Producto } = require('../models');
const Role = require('../models/role');

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

const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`La categoria con el id: ${id}, no existe en la base datos`);
    }
}

const existeProductoPorId = async( id ) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`EL producto con el id: ${id}, no existe en la base datos`);
    }
}
//validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones =[]) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion  ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;

}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}