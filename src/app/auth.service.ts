import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Bd } from './bd.service'
import { Router } from '@angular/router';
import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';
import { UpdateFieldsUsuario } from './usuario/updateFieldsUsuario.model';

@Injectable()
export class Auth{

    public token_id: string

    public emailLoged
    public passwordLoged

    constructor(private router: Router, private bd: Bd) {}

    public cadastrarUsuario(usuario: Usuario) :Promise<any> {
        
        // console.log('Chegamos até o serviço: ', usuario)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.password)
            .then((resposta: any) => {
                this.emailLoged = usuario.email
                this.passwordLoged = usuario.password
                
                // remover a senha do atributo senha do objeto usuário
                delete usuario.password

                // registrando dados complementares do usuário no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set( usuario )
                    .then((usuario)=>{
                        this.autenticar( this.emailLoged, this.passwordLoged ) 
                        firebase.auth().signInWithEmailAndPassword(this.emailLoged, this.passwordLoged )
                        .then((resposta: any) => {
                            firebase.auth().currentUser.getIdToken()
                                .then((idToken: string) => {
                                    this.token_id = idToken
                                    localStorage.setItem('idToken', idToken)
                                    this.bd.consultaPersona(this.emailLoged)
                                    .then((persona: any) => {
                                        if(persona.nome_persona) {
                                            this.router.navigate(['/compartilhe/'])
                                        }else {
                                            this.router.navigate(['/quiz'])
                                        }
                                    })
                                })
                        })
                        
                    })
            })
            
    }

    public atualizarUsuario(usuarioUpdate: UpdateFieldsUsuario ): Promise<any>  {
        let usuario = firebase.auth().currentUser
        let nomeImagem = btoa(usuario.email)
        
       return firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
        .update( usuarioUpdate )  
    }

    public autenticar( email: string, senha: string) :Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        this.bd.consultaPersona(email)
                         .then((persona: any) => {
                            if(persona.nome_persona) {
                                this.router.navigate(['/compartilhe/'])
                            }else {
                                this.router.navigate(['/quiz'])
                            }
                        })
                    })
            })
    }

    public resetPassword(email: string) :Promise<any> {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
    }

    public autenticado(): boolean {

        if(this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined){
            this.router.navigate(['/'])
        }
        
        return this.token_id !== undefined
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
            })
    }
}