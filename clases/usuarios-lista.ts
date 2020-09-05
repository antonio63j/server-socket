import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario []= [];

    constructor () {

    }
    
    public agrear (usuario: Usuario): Usuario {
        if (this.getUsuario(usuario.id) !== undefined) {
            console.log (`***** error el identificador de soket ya exite ******, id= ${usuario.id}`);
            const usuarioEliminado = this.borrarUsuario (usuario.id);
            console.log (`se ha eliminado el usuario: ${JSON.stringify(usuarioEliminado)} y se añadirá el nuevo `); 
        }
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre (id: string, nombre: string) {
        for( let usuario of this.lista) {
           if (usuario.id === id) {
               usuario.nombre = nombre;
               break;           
           }
        }
        console.log (this.lista); 
    }

    public getLista () {
        return this.lista
    }

    public getUsuario (id: string){
        return this.lista.find ( usuario => usuario.id === id);
    }

    public getUsuarioEnSala (sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala)
    }

    public borrarUsuario (id: string){
        const usuarioTemp = this.getUsuario(id);
        this.lista = this.lista.filter (usuario => {
            return usuario.id !== id;
        });
        return usuarioTemp;
    }







}