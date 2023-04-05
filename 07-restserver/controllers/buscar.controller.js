const { response } = require("express");
const { ObjecId } = require('mongoose').Types;
const { isValidObjectId } = require('mongoose');

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response ) => {

    const esMongoId = isValidObjectId(termino);
    console.log('resultado', esMongoId)

    if(esMongoId) {
        const usuario = await Usuario.findById(termino);
        if(usuario !=null){

            return res.json({
                results:(usuario)? [ usuario ] :[]
            })
        }
    }

    const regex = new RegExp(termino,'i')//insensible a mayusculas es como un like

    const usuarios = await Usuario.find({//para contar en vez de find es count
        $or: [{nombre: regex},{correo: regex}],
        $and: [{estado: true}]
    })
    console.log('por  termino', usuarios)
    return res.json({
        results:(usuarios)? [usuarios] :[]
    })
}

const buscarCategorias = async( termino, res = response) =>{
    const esMongoId = isValidObjectId(termino);
    console.log('resultado', esMongoId)

    if(esMongoId) {
        const categoria = await Categoria.findById(termino);
        if(categoria !=null){

            return res.json({
                results:(categoria)? [ categoria ] :[]
            })
        }
    }

    const regex = new RegExp(termino,'i')//insensible a mayusculas es como un like

    const categorias = await Categoria.find({//para contar en vez de find es count
        nombre: regex, estado: true
    })
    console.log('por  termino', categorias)
    return res.json({
        results:(categorias)? [categorias] :[]
    })
} 

const buscarProductos = async( termino, res = response) =>{
    const esMongoId = isValidObjectId(termino);
    console.log('resultado', esMongoId)

    if(esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        if(producto !=null){

            return res.json({
                results:(producto)? [ producto ] :[]
            })
        }
    }

    const regex = new RegExp(termino,'i')//insensible a mayusculas es como un like

    const productos = await Producto.find({//para contar en vez de find es count
        nombre: regex, estado: true
    })
    .populate('categoria','nombre')
    console.log('por  termino', productos)
    return res.json({
        results:(productos)? [productos] :[]
    })
} 


const buscar = ( req, res = response) => {

    const { coleccion, termino } = req.params

    if( !coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitdas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categorias':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            });

            break;
    }
}

module.exports = {
    buscar
}