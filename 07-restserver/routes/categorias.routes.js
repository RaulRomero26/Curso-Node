const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria } = require('../controllers/categorias.controller')


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validatos');

const router = Router();
//Obtener todas las categorias - Publico 
router.get('/', obtenerCategorias)
//Obtener una categoria por id - Publico 
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],obtenerCategoria)
//Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],
actualizarCategoria)

//Borrar una categoria - privado ADMIN - cualquier persona con un token valido
router.delete('/:id', (req,res) => {
    res.json('delete')
})

module.exports = router;