import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import { UploadFotoPerfil } from './uploadFotoPerfil.model'

@Component({
  selector: 'app-foto-do-perfil',
  templateUrl: './foto-do-perfil.component.html',
  styleUrls: ['./foto-do-perfil.component.css']
})
export class FotoDoPerfilComponent implements OnInit {

   public imagem: any
   public email: string
   public nome: string
   public url_imagem: string

  constructor(
    private auth: Auth, 
    private bd: Bd
  ) { }

  ngOnInit() {
    
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.nome = user.displayName
      this.carregarImagem()
    })
    
    
    $("#foto").change(function() {
      readURL(this);
    });
    
    function readURL(input) {
      if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = (e: Event & { target: { result: string } }) => {
          $("#perfil").html('<img  src="'+e.target.result+'"/>');
          $('#perfil').hide();
          $('#perfil').fadeIn(650);  
        }
        reader.readAsDataURL(input.files[0]);

      }
    }
  }
  public preparaImagemUpload(event: Event): void{
    this.imagem = (<HTMLInputElement>event.target).files
    this.bd.salvarImagemDoPerfil({
      email: this.email,
      nome: this.nome,
      imagem: this.imagem[0]
    })
  }
    
public carregarImagem():void {
  this.bd.carregaImagem(this.email)
  .then((url: string)=>{
    this.url_imagem = url
    if(url){
      $("#perfil").html('<img  src="'+url+'"/>');
    }
  })
}

}
