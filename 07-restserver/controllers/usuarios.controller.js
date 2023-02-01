const { response, request } = require('express');

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

const usuariosPost = (req, res) => {
    const {nombre,edad} = req.body; //se recomienda desestructurar para validar y obligar a que manden esas propiedades
    res.json({
        ok: true,
        msg: 'post API - controlador',
        enviaron: {nombre,edad}
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