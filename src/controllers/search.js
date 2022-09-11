const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')

const validCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async(term, res) => {

    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const user = await User.findById(term)
        return res.status(200).json({
            results:  [user] || []
        })
    }

    const regex = new RegExp(term, 'i')

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    })

    res.status(200).json({
        results: users
    })
}

const searchCategories = async(term, res) => {
    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const category = await Category.findById(term)
        return res.status(200).json({
            results:  category ?? []
        })
    }

    const regex = new RegExp(term, 'i')

    const categories = await Category.find({
        $or: [{name: regex}],
        $and: [{status: true}]
    })

    res.status(200).json({
        results: categories
    })
}

const searchProducts = async(term, res) => {
    const isMongoId = ObjectId.isValid(term)

    if(isMongoId){
        const product = await Product.findById(term)
        return res.json({
            results: [product] ?? []
        })
    }

    const regex = new RegExp(term, 'i')

    const products = await Product.find({
        $or: [{name: regex}],
        $and: [{status: true}]
    })

    res.status(200).json({
        results: products
    })
}

const search = (req, res) => {

    const { collection, term } = req.params

    if(!validCollections.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${collection}`
        })
    }

    switch (collection){
        case 'users':
            searchUsers(term, res)
            break;

        case 'categories':
            searchCategories(term, res)
            break;

        case 'products':
            searchProducts(term, res)
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta búsqueda'
            })
            break;
    }
}

module.exports = {  
    search
}