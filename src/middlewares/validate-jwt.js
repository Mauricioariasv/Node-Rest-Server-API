const jwt = require('jsonwebtoken')
const { User } = require('../models')

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token')
    
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid)

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existen en DB'
            })
        }
        
        if(!user.status){
            return res.status(401).json({
                msg: 'Token no válido - Usuario en false'
            })
        }

        req.user = user

        next()
    } catch (error) {

        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validateJWT
}