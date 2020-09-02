import Server        from './clases/server';
import { router }    from './routers/router'
import bodyParser    from 'body-parser';
import cors          from 'cors';

const server = Server.instance;

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// cors
server.app.use (cors ({origin: true, credentials: true}));

// rutas
server.app.use('/', router);

server.start ( () => {
    console.log (`Servidor httpServer corriendo en puerto ${server.port}`);
})

