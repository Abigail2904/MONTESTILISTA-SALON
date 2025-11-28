const mongoose = require('mongoose');// dependencia para manejar MongoDB

const userSchema = new mongoose.Schema({ //tabla usuarios
    name: String, 
    email: String,
    passwordHash: String,
    verified: {
        type: Boolean,
        default: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo' // Referencia al modelo Todo
    }]
});
//configuración para que al convertir a JSON no muestre ciertos campos
userSchema.set('toJSON', { // Configuración para transformar el objeto al convertirlo a JSON solo cuando se envía como respuesta
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash; // No mostrar el passwordHash
    }
    //userschema es el esquema del modelo de usuario

});

const User = mongoose.model('User', userSchema); //crea el modelo

module.exports = User;
