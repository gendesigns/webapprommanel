import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  public contadorMsg: any
  public notificacoes: Observable<any[]>
  // item: Observable<any>;

  constructor(db: AngularFireDatabase) { 
    // this.contador()
    this.notificacoes = db.list('notificacoes').valueChanges();
    this.notificacoes.subscribe(result => { this.contadorMsg = result.length});
    this.notificacoes.subscribe(result => { console.log( result)});
  }

  ngOnInit() {
    
    // let tempo = Observable.interval(500)

    // tempo.subscribe((intervalo: any) => {
    //   // console.log(intervalo)
    // })
  }
  public notificacaoLida(event):void{
    // console.log(htm)
  }


}
