const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String, 
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String, 
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model('User', UserSchema);