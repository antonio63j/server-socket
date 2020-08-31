import { Router, Request, Response } from 'express';


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

    res.json ({
        ok: true,
        cuerpo,
        de,
        identificador: identificador
    })
})