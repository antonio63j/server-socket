import { Socket } from 'socket.io';
import SocketIO from 'socket.io';

import {UsuariosLista} from '../clases/usuarios-lista';
import { Usuario } from '../clases/usuario';

export const usuariosConectados = new UsuariosLista;

export const conectarCliente = (cliente: Socket ) => {
    const usuario = new Usuario (cliente.id);
    usuariosConectados.agrear(usuario);
}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log(`cliente desconectado con id= ${cliente.id}`)
        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('mensaje-usuarios-activos', usuariosConectados.getLista())
    })
}

export const escucharMensajes = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido:', payload);
        io.emit('mensaje-broadcast', payload)

    })
}

export const escucharLogin = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('mensaje-usuarios-activos', usuariosConectados.getLista())

        callback({ok: true, 
                  mensaje: `usuario ${payload.nombre} configurado`});
    });
}

export const escucharSolicitudMesajeUsuariosACtivos = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje-solicitud-usuarios-activos', () => {

        io.to( cliente.id ).emit('mensaje-usuarios-activos', usuariosConectados.getLista())

    });
}
