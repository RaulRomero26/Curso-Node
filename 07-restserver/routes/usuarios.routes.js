
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

const router = Router();

//Nota: se pone / la ruta real se configura por el middleware .use() en la clase del server

router.get('/', usuariosGet ) //no se ejecuta se manda la referencia a la funcion

router.put('/:id', usuariosPut )

router.post('/',[
    check('correo','El correo no es válido').isEmail(),
], usuariosPost )

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )


module.exports = router;