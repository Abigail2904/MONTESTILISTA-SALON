const logoutRouter = require("express").Router();

//get se usa oara ejecutar la accion de cerrar sesion 
logoutRouter.get('/', async (request, response) => {
    const cookies = request.cookies; // extrae la cookies enviada al nav de user express cookie-parser
    if (!cookies?.accessToken) { //verifica que exista la cookie 
        return response.sendStatus(401); // si no existe devielve 401 no hay sesion activa 
    }
    const accessToken = cookies.accessToken;
//elimina la cookie 
    response.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });
    return response.sendStatus(204);

});

module.exports = logoutRouter;

