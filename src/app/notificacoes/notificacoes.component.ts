import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import { Auth } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  public contadorMsg: any = 0
  public notificacoes: Observable<any[]>
  public email: any
  public notificacao: any

  itemsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private auth: Auth) { 

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      
      this.itemsRef = db.list(`notificacoes/${btoa(this.email)}`);
      
      this.notificacoes = db.list(`notificacoes/${btoa(this.email)}`).valueChanges()
      this.notificacoes.subscribe(result => { 
        this.contadorMsg = result.length
        result.forEach((resultItem) => {
          if(resultItem.lida == true){
            this.contadorMsg --
          }
        })
      });
    })
  }

  ngOnInit() {
    
    // let tempo = Observable.interval(500)

    // tempo.subscribe((intervalo: any) => {
    //   // console.log(intervalo)
    // })
  }

  public notificacaoLida(notificacao):void{
    this.notificacao = (<HTMLInputElement>notificacao.target).value
    this.itemsRef.update(this.notificacao, { lida: true });
  }

}
