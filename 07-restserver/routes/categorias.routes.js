const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria } = require('../controllers/categorias.controller')


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');

const router = Router();

//Obtener todas las categorias - Publico 
router.get('/', (req,res) => {
    res.json('get')
})
//Obtener una categoria por id - Publico 
router.get('/:id', (req,res) => {
    res.json('get - id')
})
//Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', (req,res) => {
    res.json('put')
})

//Borrar una categoria - privado ADMIN - cualquier persona con un token valido
router.delete('/:id', (req,res) => {
    res.json('delete')
})

module.exports = router;