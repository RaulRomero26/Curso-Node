const { Router } = require('express');
const { check } = require('express-validator');



const { validarCampos } = require('../middlewares/validar-campos');

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
router.post('/', (req,res) => {
    res.json('post')
})

//Actualizar - privado - cualquier persona con un token valido
router.put('/:id', (req,res) => {
    res.json('put')
})

//Borrar una categoria - privado ADMIN - cualquier persona con un token valido
router.delete('/:id', (req,res) => {
    res.json('delete')
})

module.exports = router;