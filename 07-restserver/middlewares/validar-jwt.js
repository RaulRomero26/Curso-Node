const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT = async (req = request ,res = response, next) => {
    const token = req.header('x-token') // como se especifique aqui es como el front debe de mandarlo

    if(!token){
        return res.status(401).json({
            msg: 'No hay token la peticion'
        })
    }
    
    try {
        //esto regresa el payload en claro
        const {uid} = jwt.verify( token , process.env.SECRET_KEY);//es necesario saber que le metes al payload
        //leer el usuario del uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe DB'
            })
        }

        //validar que el usuario siga activo
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivado'
            })
        }
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}