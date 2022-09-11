const { Role, User, Product, Category } = require('../models')

const validRole = async (role) => {
    const roleExists = await Role.findOne({role})

    if(!roleExists){
        throw new Error('El rol no está registrado en la BD')
    }
}

const emailExists = async (email) => {
    const emailExists = await User.findOne({email})

    if(emailExists){
        throw new Error('El correo ya está registrado')
    }
}

const userIdExists = async (id) => {
    const userIdExists = await User.findById(id)

    if (!userIdExists) {
        throw new Error('El id no existe')
    }
}

const categoryExists = async (id) => {
    const categoryExists = await Category.findById(id)

    if(!categoryExists){
        throw new Error('La categoría no existe')
    }
}

const productExistsById = async (id) => {
    const productExists = await Product.findById(id)

    if(!productExists){
        throw new Error('El producto no existe')
    }
}

const validCollections = (collection, collections = []) => {
    const included = collections.includes(collection);

    if(!included){
        throw new Error(`La colección ${collection} no es permitida, ${collections}`)
    }

    return true
}

module.exports = {
    validRole, 
    emailExists, 
    userIdExists, 
    categoryExists, 
    productExistsById,
    validCollections
}