import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { Auth } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public messageError: any = ''
  public emailForReset: string = ''

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null)
  })

  constructor(
    private auth: Auth
  ) { }

  ngOnInit() {
  }

  public autenticar(): void {
    $('#login button[type="submit"] .loader').css('display', 'inline-block');
    $('#login button[type="submit"] i').hide();
    $('#login button[type="submit"]').prop('disabled', true);
    this.auth.autenticar(this.formulario.value.email, this.formulario.value.password)
      .then()
      .catch((error) => {
        $('#login button[type="submit"] .loader').hide();
        $('#login button[type="submit"] i').show();
        $('#login button[type="submit"]').prop('disabled', false);
        switch (error.code) {
          case "auth/argument-error":
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>Preencha os dados para fazer o login.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;

          case "auth/user-not-found":
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>Verifique se o e-mail está correto e tente novamente.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;

          case "auth/wrong-password":
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>A senha é inválida.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;

          default:
            break;
        }

      })
  }

  public resetPassword(): void {
    this.auth.resetPassword(this.emailForReset)

      .then((email) => {
        this.messageError = `
          <div class="callout" style="background-color: #e6f7d9!important;" data-closable>
            <small style="color: #0a0a0a!important;">Enviamos um e-mail com o link de redefinição de senha.<small>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          `
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/argument-error":
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>Preencha os dados para fazer o login.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;

          case "auth/user-not-found":
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>Verifique se o e-mail está correto e tente novamente.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;

          case "auth/wrong-password":
            this.messageError = `
            <div class="callout alert" style="background:none; color:red;" data-closable>
              <small>A senha é inválida.<small>
              <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            `
            break;
          case "auth/invalid-email":
            this.messageError = `
          <div class="callout alert" data-closable>
            <small>Preencha o campo e-mail para recuperar a senha.<small>
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          `
            break;

          default:
            break;
        }

      })
  }

}
