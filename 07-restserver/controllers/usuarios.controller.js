const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const {q,nombre,apikey} = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.status(201).json({
        ok: true,
        msg: 'put API - controlador',
        id
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

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
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