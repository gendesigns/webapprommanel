export class Usuario {
    constructor(
        public email: string,
        public fotoDoUsuario: string,
        public displayName: string,
        public password: string,
        public telefone: string,
        public cidade: string,
        public estado: string,
        public mensagem: string
    ) {}
}