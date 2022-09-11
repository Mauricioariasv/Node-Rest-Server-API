const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validateCamps } = require('../middlewares');

const { login } = require('../controllers/auth');

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateCamps
], login)

module.exports = router