const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { getUser, updateUser, saveUser, deleteUser} = require('../controllers/user');

const { validRole, userIdExists, emailExists } = require('../helpers');

const { validateCamps, validateJWT, hasRole } = require('../middlewares')

router.get('/', getUser);

router.put('/:id',[
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(userIdExists),
        check('role').custom(validRole),
        validateCamps
], updateUser)

router.post('/',[
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña debe tener más de 6 caracteres').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom(emailExists),
        check('role').custom(validRole),
        validateCamps
], saveUser)

router.delete('/:id', [
        validateJWT,
        hasRole('ADMIN_ROLE', 'USER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(userIdExists),
        validateCamps
], deleteUser)

module.exports = router