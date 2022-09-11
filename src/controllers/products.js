const { Product } = require('../models');

const getProducts = async (req, res) => {

    const product = await Product.find().populate('user');
    const account = await Product.countDocuments();

    res.status(200).json({
        account,
        product
    })
}

const getProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate('user')

    if(!product.status){
        return res.status(400).json({
            msg: 'No existe la categoría'
        })
    }

    res.status(200).json(product)
}

const createProduct = async (req, res) => {
    
    const { status, user, name, ...body } = req.body;

    const productExists = await Product.findOne({name})
    
    if(productExists){
        return res.status(400).json({
            msg: `El producto ${productExists.name}, ya existe`
        })
    }

    const data = {
        ...body,
        name, 
        user: req.user._id
    }

    const product = new Product(data)

    await product.save()

    res.status(201).json(product)
}

const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if(data.name) {
        data.name = data.name.toUpperCase()
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true})

    res.status(200).json(product)
}

const deleteProduct = async (req, res) => {

    const { id } = req.params;
    await Product.findByIdAndDelete(id)

    res.status(200).json({
        msg: `Producto eliminado`
    })
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
