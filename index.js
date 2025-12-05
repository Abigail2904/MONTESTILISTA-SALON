const app = require('./app');
const http = require('http');

const server = http.createServer(app);

// Render asigna el puerto en process.env.PORT
const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});