import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Router } from '@angular/router';

@Injectable()
export class Bd {

    constructor(private router: Router, ) {}

    public getAneis(): Promise<any>{
        return new Promise((resolve) => {
            firebase.database().ref('produtos/Anéis')
            .once('value')
            .then((snapshot: any) => {
                let aneis = snapshot.val()
            resolve(aneis)        
            })
        })
    }

    public savePersona(persona: any): void{
        
        firebase.database().ref(`personas/${btoa(persona.email)}`)
            .push({ persona: persona.personaHtml, nome_persona: persona.nome_persona  })
            .then((persona)=>{
                this.router.navigate(['/quizResultado'])
            })
    }

    public salvarPagina(pagina: any): void{
        
        firebase.database().ref(`paginas_favoritas/${btoa(pagina.email)}`)
            .push({ pagina: pagina.paginaHtml, tituloPagina: pagina.tituloPagina  })
            .then((pagina)=>{
                
            })
    }
    public atualizarPagina(pagina: any): void{
        firebase.database().ref(`paginas_favoritas/${btoa(pagina.email)}`)
            .once('value')
            .then((snapshot:any)=>{
                snapshot.forEach((childSnapshot: any) =>{
                    firebase.database().ref()
                    .child(`paginas_favoritas/${childSnapshot.key}`)
                    .once('value')
                    .then((chave: any)=>{
                        if (childSnapshot.val().tituloPagina === pagina.tituloPagina) {
                            
                            let titulo = pagina.tituloPagina
                            let html = pagina.paginaHtml
                            
                            firebase.database().ref(`paginas_favoritas/${btoa(pagina.email)}/${chave.key}`)
                            .update({ pagina: html, tituloPagina: titulo })
                        }
                    })
                })
            })   
     
    }

    public salvarImagemDoPerfil(imagemDePerfil: any):void{
        
        firebase.database().ref(`imagem_perfil/${btoa(imagemDePerfil.email)}`)
            
            .push({ imagem_url: '' })
            .then((resposta: any)=>{
                let nomeImagem = resposta.key
                firebase.storage().ref()
                .child(`imagens/${nomeImagem}`)
                .put(imagemDePerfil.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    //acompanhamento do progreesso do upload
                    (snapshot: any) => {
                    },
                    (error) => {
                    },
                    () => {
                        // finalizacao do progresso
                        
                    }
                )
            })
        
    }

    public carregaImagem(emailUsuario: string) : Promise<any>{
        
        return new Promise((resolve, reject) => {
        
            firebase.database().ref(`imagem_perfil/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshot: any)=>{
                    snapshot.forEach((childSnapshot: any) =>{
                        firebase.storage().ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                let url_image = url
                            resolve(url_image)
                            })
                    })
                })
        })
    }

    public consultaInfos(emailUsuario: string): Promise<any> {
        
        return new Promise((resolve, reject) => {

            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                let infos = snapshot.val()
            resolve(infos)        
            })
            
        })
    }

    
    public consultaPersona(emaillUsuario: string): Promise<any> {
        
        return new Promise((resolve, reject) => {

            firebase.database().ref(`personas/${btoa(emaillUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                
                let personas: Array<any> = []
                
                snapshot.forEach((childSnapshot: any) => {
                    let personaHtml = childSnapshot.val()
                    personas = personaHtml
                });
                
                resolve(personas)    
            })
            
        })
    }

    public consultaPaginasFavoritas(emaillUsuario: string): Promise<any> {
        
        return new Promise((resolve, reject) => {

            firebase.database().ref(`paginas_favoritas/${btoa(emaillUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                 
                let paginas: Array<any> = []

                snapshot.forEach((childSnapshot: any) => {

                    firebase.database().ref(`paginas_favoritas/${btoa(emaillUsuario)}`)
                        .once('value')
                        .then((snapshot: any) =>{
                            let pagina = childSnapshot.val()
                            paginas.push(pagina)
                        })
                    })
                resolve(paginas)
            })
        })
    }

    public consultaPaginasSalva(emaillUsuario: string): Promise<any> {
        
        return new Promise((resolve, reject) => {

            firebase.database().ref(`paginas_favoritas/${btoa(emaillUsuario)}`)
            .once('value')
            .then((snapshot: any) => {
                let paginas: Array<any> = []
                snapshot.forEach((childSnapshot: any) => {
                        let pagina = childSnapshot.val()
                        paginas.push(pagina)
                    })
                resolve(paginas)
            })
        })
    }

    public getNotificacoes(): Promise<any> {

        return new Promise((resolve, reject) => {
            firebase.database().ref(`notificacoes`)
            .once('value')
            .then((snapshot: any) => {
                let notificacoes: Array<any> = []
                snapshot.forEach((childSnapshot: any) => {
                        let notificacao = childSnapshot.val()
                        notificacoes.push(notificacao)
                    })
                resolve(notificacoes)
            })

        })
            
    }
}