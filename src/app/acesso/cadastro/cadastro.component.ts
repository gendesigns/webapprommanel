import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { Usuario } from "../usuario.model";
import { Auth } from '../../auth.service';

declare let jQuery: any;
declare let $: any

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public messageError: string = ''

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'fotoPerfil': new FormControl(null),
    'displayName': new FormControl(null),
    'password': new FormControl(null),
    'telefone': new FormControl(null),
    'cidade': new FormControl(null),
    'estado': new FormControl(null),
    'mensagem': new FormControl(null)
  })

  constructor(private auth: Auth) { }

  ngOnInit() {

  }

  openLogin() {
    $('#signup').removeClass("is-active");
    $('#signup-label').attr("aria-selected", false);

    // Select tab 2
    $('#login').addClass("is-active");
    $('#login-label').attr("aria-selected", true);
  }

  public cadastrarUsuario(): void {
    $('#signup button[type="submit"] .loader').css('display', 'inline-block');
    $('#signup button[type="submit"] i').hide();
    $('#signup button[type="submit"]').prop('disabled',true);
    // console.log(this.formulario);
    this.formulario.patchValue({ fotoPerfil: '' })
    this.formulario.patchValue({ telefone: '' })
    this.formulario.patchValue({ cidade: '' })
    this.formulario.patchValue({ estado: '' })
    this.formulario.patchValue({ mensagem: '' })

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.fotoPerfil,
      this.formulario.value.displayName,
      this.formulario.value.password,
      this.formulario.value.telefone,
      this.formulario.value.cidade,
      this.formulario.value.estado,
      this.formulario.value.mensagem
    )
    this.auth.cadastrarUsuario(usuario)
      // .then(() => this.openLogin())
      .then()
      .catch((error) => {
        $('#signup button[type="submit"] .loader').hide();
        $('#signup button[type="submit"] i').show();
        $('#signup button[type="submit"]').prop('disabled',false);
        switch (error.code) {
          case 'auth/weak-password':
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>A senha deve ter pelo menos 6 caracteres.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;
          case 'auth/email-already-in-use':
            this.messageError = `
              <div class="callout alert" style="background:none; color:red;" data-closable>
                <small>O endereço de e-mail já está sendo usado por outra conta.<small>
                <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              `
            break

          default:
            break;
        }
      })
  }

}
