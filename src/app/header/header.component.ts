import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import * as firebase from 'firebase';

declare let jQuery:any;
declare let $:any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public email: string
  public name: string
  public username: string
  public url_imagem: string
  public cidade: any
  public estado: any

  public paginas: any

  public mostraConteudo: any = false

  constructor(
    private auth: Auth, 
    private bd: Bd
  ) {}

  ngOnInit() {
    
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.carregarInfos()
      this.carregarImagem()
      this.carregaPaginas()
    })

    $(document).foundation();
  }

  public carregarInfos(): void{
    this.bd.consultaInfos(this.email)
      .then((infos: any) => {
        var x = infos.displayName.split(' ');
        this.username = x[0]
        this.name = infos.displayName
        this.cidade = infos.cidade
        this.estado = infos.estado
      })
  }

  public carregarImagem():void {
    this.bd.carregaImagem(this.email)
    .then((url: string)=>{
      this.url_imagem = url
    })
  }

  public carregaPaginas(): void {
    this.bd.consultaPaginasSalva(this.email)
      .then((pagina: any) => {
        this.paginas = pagina.length

        if(this.paginas > 0){
          this.mostraConteudo = true
        }else{
          this.mostraConteudo = false
        }

      })
  }

  public sair() {
    this.auth.sair();
  }

}
