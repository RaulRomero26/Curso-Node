
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos, validarJWT, esAdminRole, tieneRole
} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validatos');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

const router = Router();

//Nota: se pone / la ruta real se configura por el middleware .use() en la clase del server

router.get('/', usuariosGet ) //no se ejecuta se manda la referencia a la funcion

router.put('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut )

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']), check en duro
    check('rol').custom( esRoleValido ), //tip de js cuando lo que le mandas la funcion es o se llama exactamente igual se puede omitir quedando: (rol) => esRoleValido(rol)
    check('correo').custom( emailExiste ),
    validarCampos
], usuariosPost )

router.delete('/:id',[
    validarJWT,
    //esAdminRole, //este middleware es solo para adminsitrador 
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete )

router.patch('/', usuariosPatch )


module.exports = router;