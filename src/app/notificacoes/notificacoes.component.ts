import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {

  public contadorMsg: any = 0
  public msg: Array<string> = [
      'Olá, veja a nova funcionalidade para editar seu catálogo',
      'Estamos ajustando tudo por aqui, em breve terá novidade. Aguarde!',
      'Estamos ajustando tudo por aqui, em breve terá novidade. Aguarde!',
    ]

  constructor() { 
    this.contador()
  }

  ngOnInit() {
  }

  public contador() {
    this.contadorMsg = this.msg.length
    console.log(this.contadorMsg)
  }

}
