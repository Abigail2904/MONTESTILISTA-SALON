const logoutRouter = require("express").Router();

// GET se usa para ejecutar la acción de cerrar sesión
logoutRouter.get('/', (req, res) => {
  const cookies = req.cookies; // extrae las cookies enviadas por el navegador

  if (!cookies?.accessToken) {
    return res.sendStatus(401); // no hay sesión activa
  }

  // elimina la cookie
  res.clearCookie('accessToken', {
    secure: process.env.NODE_ENV === 'production', // true si usas HTTPS en producción
    httpOnly: true,
    sameSite: 'strict' // recomendable para seguridad
  });

  return res.sendStatus(204); // éxito sin contenido
});

module.exports = logoutRouter;
