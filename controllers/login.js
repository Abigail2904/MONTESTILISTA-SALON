//Encabezado / importaciones
const loginRouter = require("express").Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Ruta POST / (login)
loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;  //Obtener credenciales 
     console.log(email, password);
    const userExist = await User.findOne({ email }) //Buscar el usuario en la base de datos
     console.log('este es el user exist', userExist); 

     //Validacion de existencia del usuario
    if (!userExist) {
        return response.status(400).json({ error: 'Email o contraseña invalida'});
    }

    //Validacion de verificación de email
    if (!userExist.verified) {
        return response.status(400).json({ error: 'Tu imail no ha sido verificado'});
    }

    //Comparar contraseña usando bcrypt
    const isCorrect = await bcrypt.compare(password, userExist.passwordHash);
    // console.log(isCorrect);
    
    if (!isCorrect) {
        return response.status(400).json({ error: 'Email o contraseña invalida'});
    }

    //Preparar payload para el token
    const userForToken = {
        id: userExist.id,
    }

    //Generar JWT (access token)
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });

    // console.log(accessToken);

    //console.log(new Date());


    //Poner el token en una cookie
    response.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });

    //Respuesta con exito
    return response.sendStatus(200);
});



module.exports = loginRouter;