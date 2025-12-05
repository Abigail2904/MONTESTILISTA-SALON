
require('dotenv').config();
const express = require('express'); 
const app = express();
const mongoose = require('mongoose'); //mongoose para mongodb
const path = require('path'); //path para rutas de archivos
const cors = require('cors'); //cors para permitir solicitudes entre dominios
const cookieParser = require('cookie-parser'); //cookie-parser para manejar cookies
const morgan = require('morgan'); //morgan para logs de solicitudes
const usersRouter = require('./controllers/users'); //importar el router de usuarios
const mongodb = require('mongodb'); //mongodb para la base de datos
const loginRouter = require('./controllers/login'); //importar el router de login
const todosRouter = require('./controllers/todos'); //importar el router de todos
const { userExtractor } = require('./middleware/auth'); //importar el middleware de autenticación
const logoutRouter = require('./controllers/logout'); //importar el router de logout
const { MONGO_URI } = require('./config'); //importar la URI de MongoDB desde la configuración

(async() => {
    try {
        await mongoose.connect(MONGO_URI);  
        console.log('Conectado a MongoDB');     
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }    
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Rutas frontend
app.use('/', express.static(path.resolve('views','home')));
app.use('/signup', express.static(path.resolve('views','signup')));
app.use('/login', express.static(path.resolve('views','login')));
app.use('/components', express.static(path.resolve('views','components')));
app.use('/imag', express.static(path.resolve('imag')));
app.use('/verify/:id/:token', express.static(path.resolve('views','verify')));
app.use('/todos', express.static(path.resolve('views', 'todos')));
app.use('/styles', express.static(path.resolve('views','styles')));
app.use('/promociones', express.static(path.resolve('views','promociones')));
app.use('/agenda', express.static(path.resolve('views','agenda')));
app.use('/servicios', express.static(path.resolve('views','servicios')));
app.use('/Produ', express.static(path.resolve('views','Produ')));

app.use(morgan('tiny'));


//Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/promociones', userExtractor, todosRouter);
app.use('/api/logout', logoutRouter);





module.exports = app;
