const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    const {limite = 5,desde = 0 } = req.query;
    const query = {estado: true}
    //recordatorio con el await es  espera a que resuelva la promesa
    //sin el await es la promesa en si, sin resolver
    //promise all ejecuta ambas promesas o fetch de manera simultanea y
    //no continua hasta que ambas funcionen, si una da error  ambas dan error
    const [total,usuarios] = await Promise.all(
        [Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))])

    res.json({
        ok: true,
        msg: 'get API - controlador',
        total,
        usuarios
    })
}

const usuariosPut = async (req, res) => {

    const id = req.params.id;
    const { _id, password, google,correo, ...resto } = req.body;
    //Todo validar contra DB
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.status(201).json({
        ok: true,
        msg: 'put API - controlador',
        usuario
    })
}

const usuariosPost = async (req, res) => {

    const {nombre,correo,password,rol} = req.body; //se recomienda desestructurar para validar y obligar a que manden esas propiedades
    
    const usuario = new Usuario({nombre,correo,password,rol});

    //encriptar la passowrd
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);


    //guardar en db
    
    await usuario.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    //ojo que esto viene enlasado de las validaciones jwt
    //se cambia el estado a false
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    const usuarioAutenticado = req.usuario;

    res.json({
        ok: true,
        msg: 'delete API - controlador',
        usuario,
        usuarioAutenticado,
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}