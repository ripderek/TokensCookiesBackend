const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
//const { dirname, join } = require('path');
//const { fileURLToPath } = require('url');
const { authenticateToken } = require('./middleware/authorization.js');


const usersRouter = require('./routes/user-routes.js');
const authRouter = require('./routes/auth-routes.js');
const taskRouter = require('./routes/task-routers.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = { credentials: true, origin: 'http://localhost:3000' };


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
//app.use('/', express.static(join(__dirname, 'public')));

//LAS RUTAS SEPARADAS POR ARCHIVOS ROUTES XD
app.use('/api/users', usersRouter);
//ESTAS DEPENDEN DE QUE SE TENGA UN TOKEN ACTIVO OSEA INICIO DE SESION
app.use('/api/auth', authRouter);
app.use('/api/taks', taskRouter);


app.listen(PORT, () => console.log('SERVER ON PORT' + PORT));



