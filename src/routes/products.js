const { Router } = require('express')
const router = Router()

const { check } = require('express-validator')

const { productExistsById, categoryExists } = require('../helpers')
const { validateJWT, hasAdminRole, validateCamps } = require('../middlewares')

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products')

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productExistsById),
    validateCamps
], getProduct)

router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('category', 'La categoria es obligatoria').notEmpty(),
    check('category', 'No es un id de Mongo').isMongoId(),
    check('category').custom(categoryExists),
    validateCamps,
], createProduct)

router.put('/:id', [
    validateJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('category', 'No es un id de Mongo').isMongoId(),
    check('id').custom(productExistsById),
    validateCamps
], updateProduct)

router.delete('/:id',[
    validateJWT,
    hasAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(productExistsById),
    validateCamps
], deleteProduct)

module.exports = router