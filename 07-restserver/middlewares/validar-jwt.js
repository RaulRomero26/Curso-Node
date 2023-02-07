const jwt = require('jsonwebtoken')

const validarJWT = (req = request ,res = response, next) => {
    const token = req.header('x-token') // como se especifique aqui es como el front debe de mandarlo
}

module.exports = {
    validarJWT
}