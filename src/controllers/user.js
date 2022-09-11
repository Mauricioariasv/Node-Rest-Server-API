const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const getUser = async (req, res) => {

    const { limit = 5 , to = 2 } = req.query

    const rep = await Promise.all([
        User.countDocuments(),
        User.find()
        .limit(Number(limit))
        .skip(Number(to))
    ])
    
    res.status(200).json({
        msg: 'Usuario enviado',
        rep
    })
}

const updateUser = async (req, res) => {

    const { id } = req.params;
    
    const { _id, password, email, ...rest } = req.body;

    if(password && password.length >= 6){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.status(200).json({
        msg: 'Datos del usuario actualizados',
        user
    })
}

const saveUser = async (req, res) => {

    const { name, email, password, role } = req.body;

    const user = new User({name, email, password, role})

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.status(201).json({
        msg: 'Usuario guardado',
        user
    })
}

const deleteUser = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false})
    
    res.status(200).json({
        msg: 'Usuario eliminado', 
        user
    })
}

module.exports = {
    getUser,
    saveUser,
    updateUser,
    deleteUser
}