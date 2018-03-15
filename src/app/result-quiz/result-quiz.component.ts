import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.css']
})
export class ResultQuizComponent implements OnInit, OnChanges {

  @Input() public resultQuiz

  public email: string
  public name: string
  public persona: string = ''

  constructor(private auth: Auth, private bd: Bd) { }

  ngOnChanges() {

  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.carregarPersona()
    })
    var altura_tela = $(window).height() - 280;
    $('.form-wizard-catalogo').css('min-height',altura_tela+'px');
    $(document).on('click', '.box-persona button', function () {
      $('.form-wizard-catalogo').hide();
      $('#step-customize').fadeIn('slow');
      $('#step-customize-lk').addClass('is-active');
      $(document).scrollTop(0);
      $('#pagina-de-aneis').show();

    })
    $('footer').css('position', 'fixed');
    var carregou = function () {
      if ($('#step-quiz-resultado').find('.persona').length > 0) {
        $('footer').css('position', 'absolute');
        $('.loader-overlay').hide();
        clearInterval(intervalId);
      } else {
        $('.loader-overlay').show();
      }
    }
    var intervalId = setInterval(carregou, 1000);
  }


  public carregarPersona(): void {
    this.bd.consultaPersona(this.email)
      .then((infos: any) => {
        this.persona = infos.persona
      })
  }

}
