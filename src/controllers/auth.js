const { User } = require('../models')

const bcryptjs = require('bcryptjs')

const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

        if(!user.status){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

        const token = await generateJWT(user.id)

        res.status(200).json({
            msg: 'Sesión iniciada',
            user, 
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

module.exports = {
    login
}