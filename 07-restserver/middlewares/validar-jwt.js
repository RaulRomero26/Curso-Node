const jwt = require('jsonwebtoken')

const validarJWT = (req = request ,res = response, next) => {
    const token = req.header('x-token') // como se especifique aqui es como el front debe de mandarlo

    if(!token){
        return res.status(401).json({
            msg: 'No hay toquen la peticion'
        })
    }
    
    try {

        const {uid} = jwt.verify( token , process.env.SECRET_KEY);//es necesario saber que le metes al payload
        req.uid = uid ;
        
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