const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res= response) => {

    const {correo, password} = req.body;
    try {
    
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario inactivado'
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login ok',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async (req, res = response ) => {
   
    const {id_token} = req.body;

    try {
        const {nombre,img,correo} = await googleVerify(id_token)

        res.json({
            msg: 'todo bien!',
            id_token
        }) 
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se puedo verificar'
        }) 
    }

}

module.exports = {
    login,
    googleSignIn
}