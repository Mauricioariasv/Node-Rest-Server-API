const { Category } = require('../models');

const getCategories = async (req, res) => {

    const categories = await Category.find().populate('user');
    const account = await Category.countDocuments();

    res.status(200).json({
        account,
        categories
    })
}

const getCategory = async (req, res) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user');

    if(!category.status){
        return res.status(400).json({
            msg: 'No existe la categoría'
        })
    }

    res.status(200).json(category)
}

const createCategory = async (req, res) => {
    
    const name = req.body.name.toUpperCase();
    
    const category = await Category.findOne({name})
    
    if(category){
        return res.status(400).json({
            msg: `La categoría ${name}, ya existe`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const newCategory = new Category(data)

    await newCategory.save()

    res.status(201).json(newCategory)
}

const updateCategory = async (req, res) => {

    const { id } = req.params;

    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase()
    data.user = req.user._id;

    const { name } = data

    const categoryExists = await Category.findOne({name})

    if(categoryExists){
        return res.status(400).json({
            msg: `La categoria ${name} ya existe`
        })
    } 

    const category = await Category.findByIdAndUpdate(id, data, {new: true})

    res.status(200).json({
        category
    })
}

const deleteCategory = async (req, res) => {

    const { id } = req.params;

    await Category.findByIdAndDelete(id)

    res.status(200).json({
        msg: `Categoría eliminada`
    })
}

module.exports = {
    getCategories,
    getCategory,
    updateCategory,
    createCategory,
    deleteCategory
};
