import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    public httpServer: http.Server;

    private static _instance: Server;

    // implementación de singleton
    public static get instance () {
      return this._instance || (this._instance = new (this)); 
    }


    private constructor () {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSocket();
    }

    start (callback: Function ) {
        this.httpServer.listen (this.port, callback ());
    }

    private escucharSocket() {
        console.log ('escuchando conexiones - sockets');
        
        this.io.on ('connection', cliente => {
            console.log ('cliente conectado');
            
            socket.escucharMensajes (cliente, this.io);
            
            socket.desconectar(cliente);

           

            })
        }

}