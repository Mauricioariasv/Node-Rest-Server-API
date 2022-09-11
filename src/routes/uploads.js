const { Router } = require('express');
const { check } = require('express-validator');

const { validCollections } = require('../helpers');

const { saveFile, updateCloudinaryImage, showImage, updateImage } = require('../controllers/uploads');

const { fileComes, validateCamps } = require('../middlewares');

const router = Router();

router.post('/', fileComes, saveFile);

router.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    fileComes,
    validateCamps
], updateCloudinaryImage)
// or updateImage (system)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => validCollections( c, ['users', 'products'])),
    validateCamps
], showImage)

module.exports = router