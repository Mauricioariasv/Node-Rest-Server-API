const validateJWT = require('./validate-jwt');
const validateCamps = require('./validate-camps');
const tieneRole = require('./validate-roles');
const filesComes = require('./file-comes');

module.exports = {
    ...validateJWT,
    ...validateCamps,
    ...tieneRole,
    ...filesComes
}