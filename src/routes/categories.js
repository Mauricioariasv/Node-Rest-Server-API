const { Router } = require('express')
const router = Router()

const { check } = require('express-validator')
const { categoryExists } = require('../helpers')

const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories')
const { validateJWT, hasAdminRole, validateCamps } = require('../middlewares')

router.get('/', getCategories)

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categoryExists),
    validateCamps
], getCategory)

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    validateCamps,
], createCategory)

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categoryExists),
    check('name', 'Es necesario colocar el nuevo nombre').notEmpty(),
    validateCamps
], updateCategory)

router.delete('/:id',[
    validateJWT,
    hasAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(categoryExists),
    validateCamps
], deleteCategory)

module.exports = router