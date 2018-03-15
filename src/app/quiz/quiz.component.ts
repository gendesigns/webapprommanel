import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShufflePipe } from 'ngx-pipes';

import * as firebase from 'firebase'

import { Bd } from '../bd.service'

import { Resposta } from '../shared/resposta.model'
import { Pergunta } from '../shared/pergunta.model'
import { Persona } from '../shared/persona.model'

import { PERGUNTAS } from './perguntas-mock'
import { RESPOSTAS_1, RESPOSTAS_2, RESPOSTAS_3, RESPOSTAS_4 } from './respostas-mock'
import { ALICE, BRENDA, DEBORA, DUDA, MARIA_ANTONIA, RAQUEL } from './personas-mock'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [ShufflePipe]
})
export class QuizComponent implements OnInit {

  // FUNÇÃO QUE EMBARALHA AS PERGUNTAS > JQUERY
  public shuffle() {
    $(".shuffledv").each(function () {
      var divs = $(this).find('div');
      for (var i = 0; i < divs.length; i++) $(divs[i]).remove();

      var i = divs.length;
      if (i == 0) return false;
      while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = divs[i];
        var tempj = divs[j];
        divs[i] = tempj;
        divs[j] = tempi;
      }
      for (var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
    });
  }

  // FUNÇÃO QUE EMBARALHA AS PERGUNTAS > JQUERY

  public perguntas: Pergunta[] = PERGUNTAS

  public respostas_1: Resposta[] = RESPOSTAS_1
  public respostas_2: Resposta[] = RESPOSTAS_2
  public respostas_3: Resposta[] = RESPOSTAS_3
  public respostas_4: Resposta[] = RESPOSTAS_4

  public alice: string = ALICE
  public brenda: string = BRENDA
  public debora: string = DEBORA
  public duda: string = DUDA
  public maria_antonia: string = MARIA_ANTONIA
  public raquel: string = RAQUEL

  public nomes_personas: Array<string> = ["alice", "brenda", "debora", "duda", "maria_antonia", "raquel"]
  public nome_persona: string

  public selectedQuestion
  public personaResult: string

  getResult() {
    if ($("#quiz-4 input[type='radio']").is(":checked")) {
      $("#quiz-4 .callout").hide();
      $('.form-wizard-catalogo').hide();
      $('#step-quiz-resultado').fadeIn();
      $( document ).scrollTop( 0 );

      if (this.selectedQuestion === 0) {
        this.personaResult = this.alice
        this.nome_persona = this.nomes_personas[0]
        this.savePersona()
      } else if (this.selectedQuestion === 1) {
        this.personaResult = this.brenda
        this.nome_persona = this.nomes_personas[1]
        this.savePersona()
      } else if (this.selectedQuestion === 2) {
        this.personaResult = this.debora
        this.nome_persona = this.nomes_personas[2]
        this.savePersona()
      } else if (this.selectedQuestion === 3) {
        this.personaResult = this.duda
        this.nome_persona = this.nomes_personas[3]
        this.savePersona()
      } else if (this.selectedQuestion === 4) {
        this.personaResult = this.maria_antonia
        this.nome_persona = this.nomes_personas[4]
        this.savePersona()
      } else if (this.selectedQuestion === 5) {
        this.personaResult = this.raquel
        this.nome_persona = this.nomes_personas[5]
        this.savePersona()
      } else {
        console.log("Ops! Vc não respondeu todas as perguntas.");
      }
    } else {
      $("#quiz-4 .callout").show();
    }
  }

  public email

  constructor(private router: Router, private bd: Bd) {

  }

  ngOnInit() {
    this.shuffle()
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })

    var altura_tela = $(window).height() - 250;
    $('.form-wizard-catalogo').css('min-height',altura_tela+'px');

    $('.nextBtn').click(function () {
      var next_fs = $(this).parents('.form-wizard-quiz').next();
      var next_id = "#" + $(this).parents('.form-wizard-quiz').attr('id');

      if ($(next_id + " input[type='radio']").is(":checked")) {
        $('.form-wizard-quiz').hide();
        $(next_id + " .callout").hide();
        next_fs.fadeIn('slow');
        $( document ).scrollTop( 0 );
      } else {
        $(next_id + " .callout").show();
      }
    });
    $('.grid-quiz-images div').each(function (e) {
      var ordem = Math.floor((Math.random() * 6) + 1);
      $(this).addClass('small-order-'+ordem);
    });
  }

  onSelectionChange(resposta) {
    this.selectedQuestion = resposta.valor
  }

  public savePersona(): void {
    this.bd.savePersona({
      email: this.email,
      nome_persona: this.nome_persona,
      personaHtml: this.personaResult
    })
  }

}
