import { Router, Request, Response, response } from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/socket';


export const router = Router();

router.get ('/mensajes',  (req: Request, res: Response )  => {
    res.json ({
        ok: true,
        mensaje: 'Todo está bien !!!'
    })
})

// post sin parametros
router.post ('/mensajes',  (req: Request, res: Response )  => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    }
    server.io.emit('mensaje-broadcast', payload);
    res.json ({
        ok: true,
        cuerpo,
        de
    })
})

// post con parametros
router.post ('/mensajes/:id',  (req: Request, res: Response )  => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const identificador = req.params.id;

    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    }
    server.io.in(identificador).emit('mensaje-privado', payload);

    res.json ({
        ok: true,
        cuerpo,
        de,
        identificador: identificador
    })
})

// lista interna de Server.io, solo contiene id de socket
router.get ('/usuarios',  (req: Request, res: Response )  => {
   
    const server = Server.instance;

    server.io.clients((err: any, clients: string []) => {
      if (err){
          return res.json ({ 
              ok: false,
              err
          })
      }
      res.json ({
        ok: true,
        clients})
    }) 
})

router.get ('/usuarios/detalle',  (req: Request, res: Response )  => {
       
    const lista = usuariosConectados.getLista();
    res.json ({
       ok: true,
       lista
    }) 
})
