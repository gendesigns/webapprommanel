import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import { Usuario } from "../acesso/usuario.model";
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import { UpdateFieldsUsuario } from './updateFieldsUsuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})



export class UsuarioComponent implements OnInit {
  
  private formulario: FormGroup = new FormGroup({
    'email': new FormControl({value: null,  disabled: true}),
    'displayName': new FormControl(null),
    'cidade': new FormControl(null),
    'estado': new FormControl(null),
    'telefone': new FormControl(null),
    'mensagem': new FormControl(null)
  })
  
  public email: string
  public displayName: string
  
  constructor(
    private router: Router,
    private auth: Auth, 
    private bd: Bd) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.carregarInfos()
    })
    
  }

  public carregarInfos(): void{
    this.bd.consultaInfos(this.email)
      .then((infos: any) => {
        if(infos){
          this.email = infos.email
          this.displayName = infos.displayName
          this.formulario.setValue({
              email:this.email, 
              displayName:this.displayName, 
              telefone: infos.telefone, 
              cidade: infos.cidade, 
              estado: infos.estado, 
              mensagem: infos.mensagem
            }) 
        }else{
          this.email = infos.email
          this.displayName = infos.displayName
          this.formulario.setValue({
              email:this.email, 
              displayName:this.displayName, 
              telefone:'', 
              cidade:'', 
              estado:'', 
              mensagem:''
            }) 
        }
      })
  }

  public atualizarUsuario(): void {

    let usuario: UpdateFieldsUsuario = new UpdateFieldsUsuario(
        this.formulario.value.displayName,
        this.formulario.value.telefone,
        this.formulario.value.cidade,
        this.formulario.value.estado,
        this.formulario.value.mensagem
    )
    
    this.auth.atualizarUsuario(usuario)
      .then((resposta) => {
        this.router.navigate(['/compartilhe/'])
      })
  }

}
