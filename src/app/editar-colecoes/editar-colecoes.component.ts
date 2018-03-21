import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import * as firebase from 'firebase'
import { Router } from '@angular/router';

import { Joia } from '../shared/joia.model'
import { Aneis, Brincos, Colares, Pulseiras, Pingentes } from '../personalize/joias-mock'

declare let Swiper: any;
declare let $: any

@Component({
  selector: 'app-editar-colecoes',
  templateUrl: './editar-colecoes.component.html',
  styleUrls: ['./editar-colecoes.component.css']
})
export class EditarColecoesComponent implements OnInit {

  public titulo_pagina: string = ''
  public email: string
  public html: string = ''
  public htmlCarregado: string = ''
  public paginas: Array<any> = []

  public paginasCarregadas: any
  public callout: string = ''

  constructor(private bd: Bd, private router: Router) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.carregaPaginas()
      this.pagginasCarregadas()
    })

    function load_swiper(container) {
      var swiper = new Swiper(container, {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        mousewheel: true
      });
    }
    this.callout = `<div class="callout" data-closable>
    <button class="close-button" aria-label="Close alert" type="button" data-close>
    <span aria-hidden="true">&times;</span>
    </button>
    <p>Clique no botão “
    <span class="plus display-inline-block position-static">
    <i class="fas fa-plus"></i>
    </span> ” para adicionar um novo produto.</p>
    <p>Clique no botão “
    <span class="minus display-inline-block position-static">
    <i class="fas fa-minus"></i>
    </span> ” para excluir um  produto.</p>
    </div>`;
    
    var carregou = function () {
      if ($('#pagina-de-aneis .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-aneis').css('display') != 'none') {
        load_swiper('#pagina-de-aneis .swiper-container');
        clearInterval(customizeIntervalId);
      }
      else if ($('#pagina-de-brincos .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-brincos').css('display') != 'none') {
        load_swiper('#pagina-de-brincos .swiper-container');
        clearInterval(customizeIntervalId);
      }
      else if ($('#pagina-de-colares .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-colares').css('display') != 'none') {
        load_swiper('#pagina-de-colares .swiper-container');
        clearInterval(customizeIntervalId);
      }
      else if ($('#pagina-de-pulseiras .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-pulseiras').css('display') != 'none') {
        load_swiper('#pagina-de-pulseiras .swiper-container');
        clearInterval(customizeIntervalId);
      }
      else if ($('#pagina-de-pingentes .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-pingentes').css('display') != 'none') {
        load_swiper('#pagina-de-pingentes .swiper-container');
        clearInterval(customizeIntervalId);
      }
      else {
        clearInterval(customizeIntervalId);
      }
    }
    var carregouPages = function () {
      if ($('#pagina-de-aneis .box-prod').find('.catalogo-edit').length > 0 && $('#pagina-de-aneis').css('display') != 'none') {
        $('#pagina-de-aneis .catalogo-edit').append('<div class="cell small-4 margin-top-1 cell-prod"><div class="blank_space"><img src="assets/img/aneis/alice/512579_a.jpg" /><div class="box-blank-space"><button class="show-for-small-only plus position-static plus-big" data-open="catalogo-modal-aneis"><i class="fas fa-plus"></i></button></div></div></div>');
        $('#pagina-de-aneis .catalogo-edit .cell-prod').each(function (e) {
          if ($(this).find('.remover').attr('data-ref') != null) {
            var $ref = $(this).find('.remover').attr('data-ref').replace('mobile-', '')
            $('#' + $ref).addClass('prod-disabled');
            $('#mobile-' + $ref).addClass('prod-disabled');
          }
          clearInterval(customizeIntervalPages);
        })
      } else if ($('.box-prod').find('.catalogo-edit').length > 0 && $('#pagina-de-brincos').css('display') != 'none') {
        $('#pagina-de-brincos .catalogo-edit').append('<div class="cell small-4 margin-top-1 cell-prod"><div class="blank_space"><img src="assets/img/aneis/alice/512579_a.jpg" /><div class="box-blank-space"><button class="show-for-small-only plus position-static plus-big" data-open="catalogo-modal-brincos"><i class="fas fa-plus"></i></button></div></div></div>');
        $('#pagina-de-brincos .catalogo-edit .cell-prod').each(function (e) {
          if ($(this).find('.remover').attr('data-ref') != null) {
            var $ref = $(this).find('.remover').attr('data-ref').replace('mobile-', '')
            $('#' + $ref).addClass('prod-disabled');
            $('#mobile-' + $ref).addClass('prod-disabled');
          }
          clearInterval(customizeIntervalPages);
        })
      } else if ($('.box-prod').find('.catalogo-edit').length > 0 && $('#pagina-de-colares').css('display') != 'none') {
        $('#pagina-de-colares .catalogo-edit').append('<div class="cell small-4 margin-top-1 cell-prod"><div class="blank_space"><img src="assets/img/aneis/alice/512579_a.jpg" /><div class="box-blank-space"><button class="show-for-small-only plus position-static plus-big" data-open="catalogo-modal-colares"><i class="fas fa-plus"></i></button></div></div></div>');
        $('#pagina-de-colares .catalogo-edit .cell-prod').each(function (e) {
          if ($(this).find('.remover').attr('data-ref') != null) {
            var $ref = $(this).find('.remover').attr('data-ref').replace('mobile-', '')
            $('#' + $ref).addClass('prod-disabled');
            $('#mobile-' + $ref).addClass('prod-disabled');
          }
          clearInterval(customizeIntervalPages);
        })
      } else if ($('.box-prod').find('.catalogo-edit').length > 0 && $('#pagina-de-pulseiras').css('display') != 'none') {
        $('#pagina-de-pulseiras .catalogo-edit').append('<div class="cell small-4 margin-top-1 cell-prod"><div class="blank_space"><img src="assets/img/aneis/alice/512579_a.jpg" /><div class="box-blank-space"><button class="show-for-small-only plus position-static plus-big" data-open="catalogo-modal-pulseiras"><i class="fas fa-plus"></i></button></div></div></div>');
        $('#pagina-de-pulseiras .catalogo-edit .cell-prod').each(function (e) {
          if ($(this).find('.remover').attr('data-ref') != null) {
            var $ref = $(this).find('.remover').attr('data-ref').replace('mobile-', '')
            $('#' + $ref).addClass('prod-disabled');
            $('#mobile-' + $ref).addClass('prod-disabled');
          }
          clearInterval(customizeIntervalPages);
        })
      } else if ($('.box-prod').find('.catalogo-edit').length > 0 && $('#pagina-de-pingentes').css('display') != 'none') {
        $('#pagina-de-pingentes .catalogo-edit').append('<div class="cell small-4 margin-top-1 cell-prod"><div class="blank_space"><img src="assets/img/aneis/alice/512579_a.jpg" /><div class="box-blank-space"><button class="show-for-small-only plus position-static plus-big" data-open="catalogo-modal-pingentes"><i class="fas fa-plus"></i></button></div></div></div>');
        $('#pagina-de-pingentes .catalogo-edit .cell-prod').each(function (e) {
          if ($(this).find('.remover').attr('data-ref') != null) {
            var $ref = $(this).find('.remover').attr('data-ref').replace('mobile-', '')
            $('#' + $ref).addClass('prod-disabled');
            $('#mobile-' + $ref).addClass('prod-disabled');
          }
          clearInterval(customizeIntervalPages);
        })
      } else {
      }

    }

    var customizeIntervalId = setInterval(carregou, 1000);
    var customizeIntervalPages = setInterval(carregouPages, 1000);

    $(document).on('click', '.nextJoia, .prevJoia, .box-persona button', function () {
      carregou();
      carregouPages();
    });

    $(document).on('click', '.remover', function () {
      var $ref = $(this).attr('data-ref');
      $('#' + $ref).removeClass('prod-disabled');
      $('#mobile-' + $ref).removeClass('prod-disabled');
      $(this).parents('.cell-prod').remove();
    });

    localStorage.setItem("grid-op", 'grid3');
    var grid_op = localStorage.getItem("grid-op");

  }
  changeGrid($div, $type, modal) {
    if (modal != 1) {
      localStorage.setItem("grid-op", $type);
    }
    if ($type == 'grid2') {
      $($div).removeClass("small-4");
      $($div).addClass("small-6");
    }
    if ($type == 'grid3') {
      $($div).removeClass("small-6");
      $($div).addClass("small-4");
    }
    return false;
  }
  addImage(ref, mobile) {
    var $this = '#' + ref;
    if ($($this).hasClass('prod-disabled')) {
      return false;
    }
    var $image = $($this).find('img').attr('src');
    var $legenda = $($this).find('.caption').text();

    var $type = localStorage.getItem("grid-op");
    var $class = "small-4";

    if ($type == 'grid2') {
      $class = "small-6";
    }
    if ($type == 'grid3') {
      $class = "small-4";
    }

    var $html = '';
    $html += '<div class="cell ' + $class + ' margin-top-1 cell-prod">';
    $html += '<div>';
    $html += '<img src="' + $image + '" alt="">';
    $html += '<div class="caption">' + $legenda + '</div>';
    $html += '<a href="javascript:void(0);" class="remover" data-ref="' + ref + '">';
    $html += '<i class="fas fa-minus"></i>';
    $html += '</a>';
    $html += '</div>';
    $html += '</div>';

    this.html += $html

    var pai = $($this).parents('.pagina-de-produtos').attr('id');
    if (mobile == 1) {
      var qual_pai = $($this).parents('.catalogo-modal');
      var res = $($this).parents('.catalogo-modal').attr('id').replace("catalogo-modal", "pagina-de");
    }
    $('#' + pai + ' .box-prod .catalogo-edit').prepend($html);
    $('#' + res + ' .box-prod .catalogo-edit').prepend($html);

    $('#' + ref).addClass('prod-disabled');
    $('#mobile-' + ref).addClass('prod-disabled');

    if (!$('.snackbar').hasClass("show")) {
      $('.snackbar').addClass("show");
      setTimeout(function () { $('.snackbar').removeClass('show') }, 3000);
    }

    return false;
  }

  voltar(id) {
    $('.pagina-de-produtos').hide();
    $(id).fadeIn('slow');
    $(document).scrollTop(0);
    localStorage.setItem("grid-op", '');
    $('.snackbar').removeClass('show');
    switch (id) {
      case "#pagina-de-aneis": {
        this.titulo_pagina = "Brincos"
        $('#pagina-de-brincos .catalogo-edit .blank_space').parent().remove();
        this.htmlCarregado = $('#pagina-de-brincos .catalogo-edit').html()
        this.atualizarPagina()
        this.htmlCarregado = '';
        $('.step-info').text("Anéis");
        break;
      }
      case "#pagina-de-brincos": {
        this.titulo_pagina = "Colares"
        $('#pagina-de-colares .catalogo-edit .blank_space').parent().remove();
        this.htmlCarregado = $('#pagina-de-colares .catalogo-edit').html()
        this.atualizarPagina()
        this.htmlCarregado = '';
        $('.step-info').text("Brincos");
        break;
      }
      case "#pagina-de-colares": {
        this.titulo_pagina = "Pulseiras"
        $('#pagina-de-pulseiras .catalogo-edit .blank_space').parent().remove();
        this.htmlCarregado = $('#pagina-de-pulseiras .catalogo-edit').html()
        this.atualizarPagina()
        this.htmlCarregado = '';
        $('.step-info').text("Colares");
        break;
      }
      case "#pagina-de-pulseiras": {
        this.titulo_pagina = "Pingentes"
        $('#pagina-de-pingentes .catalogo-edit .blank_space').parent().remove();
        this.htmlCarregado = $('#pagina-de-pingentes .catalogo-edit').html()
        this.atualizarPagina()
        this.htmlCarregado = '';
        $('.step-info').text("Pulseiras");
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
  }
  salvar(id) {
    switch (id) {
      case "#pagina-de-aneis": {
        this.titulo_pagina = "Anéis"
        var teaser = $(id + ' .catalogo-edit').clone();
        teaser.find(".blank_space").parent().remove()
        this.htmlCarregado = teaser.html();
        this.atualizarPagina()
        break;
      }
      case "#pagina-de-brincos": {
        this.titulo_pagina = "Brincos"
        var teaser = $(id + ' .catalogo-edit').clone();
        teaser.find(".blank_space").parent().remove()
        this.htmlCarregado = teaser.html();
        this.atualizarPagina()
        break;
      }
      case "#pagina-de-colares": {
        this.titulo_pagina = "Colares"
        var teaser = $(id + ' .catalogo-edit').clone();
        teaser.find(".blank_space").parent().remove()
        this.htmlCarregado = teaser.html();
        this.atualizarPagina()
        break;
      }
      case "#pagina-de-pulseiras": {
        this.titulo_pagina = "Pulseiras"
        var teaser = $(id + ' .catalogo-edit').clone();
        teaser.find(".blank_space").parent().remove()
        this.htmlCarregado = teaser.html();
        this.atualizarPagina()
        break;
      }
      case "#pagina-de-pingentes": {
        this.titulo_pagina = "Pingentes"
        var teaser = $(id + ' .catalogo-edit').clone();
        teaser.find(".blank_space").parent().remove()
        this.htmlCarregado = teaser.html();
        this.atualizarPagina()
        break;
      }
    }
    //this.router.navigate(['/compartilhe/'])
    $('.snackbar').text('Alterações salvas com sucesso!');
    $('.snackbar').addClass('show');
    setTimeout(function () { $('.snackbar').removeClass('show'); $('.snackbar').text('Novo item adicionado.'); }, 3000);

  }
  proxima(id) {
    $('.pagina-de-produtos').hide();
    $(id).fadeIn('slow');
    $(document).scrollTop(0);
    localStorage.setItem("grid-op", '');
    $('.snackbar').removeClass('show');

    if (this.html != undefined) {
      switch (id) {
        case "#pagina-de-brincos": {
          this.titulo_pagina = "Anéis"
          $('#pagina-de-aneis .catalogo-edit .blank_space').parent().remove();
          this.htmlCarregado = $('#pagina-de-aneis .catalogo-edit').html()
          this.atualizarPagina()
          this.htmlCarregado = '';
          $('.step-info').text("Brincos");

          break;
        }
        case "#pagina-de-colares": {
          this.titulo_pagina = "Brincos"
          $('#pagina-de-brincos .catalogo-edit .blank_space').parent().remove();
          this.htmlCarregado = $('#pagina-de-brincos .catalogo-edit').html()
          this.atualizarPagina()
          this.htmlCarregado = '';
          $('.step-info').text("Colares");
          break;
        }
        case "#pagina-de-pulseiras": {
          this.titulo_pagina = "Colares"
          $('#pagina-de-colares .catalogo-edit .blank_space').parent().remove();
          this.htmlCarregado = $('#pagina-de-colares .catalogo-edit').html()
          this.atualizarPagina()
          this.htmlCarregado = '';
          $('.step-info').text("Pulseiras");
          break;
        }
        case "#pagina-de-pingentes": {
          this.titulo_pagina = "Pulseiras"
          $('#pagina-de-pulseiras .catalogo-edit .blank_space').parent().remove();
          this.htmlCarregado = $('#pagina-de-pulseiras .catalogo-edit').html()
          this.atualizarPagina()
          this.htmlCarregado = '';
          $('.step-info').text("Pingentes");
          break;
        }
        case "#pagina-de-info": {
          this.titulo_pagina = "Pingentes"
          $('#pagina-de-pingentes .catalogo-edit .blank_space').parent().remove();
          this.htmlCarregado = $('#pagina-de-pingentes .catalogo-edit').html()
          this.atualizarPagina()
          this.htmlCarregado = '';
          this.router.navigate(['/compartilhe/'])
          break;
        }
        default: {
          console.log("Invalid choice");
          break;
        }
      }
    }
  }

  public carregaPaginas(): void {
    this.bd.consultaPaginasFavoritas(this.email)
      .then((pagina: any) => {
        this.paginas = pagina
      })
  }

  public pagginasCarregadas(): void {
    this.bd.consultaPaginasSalva(this.email)
      .then((pagina: any) => {
        this.paginasCarregadas = pagina
      })
  }

  public atualizarPagina(): void {
    this.bd.atualizarPagina({
      email: this.email,
      tituloPagina: this.titulo_pagina,
      paginaHtml: this.htmlCarregado,
    })
  }
  public aneis: Joia[] = Aneis
  public brincos: Joia[] = Brincos
  public colares: Joia[] = Colares
  public pulseiras: Joia[] = Pulseiras
  public pingentes: Joia[] = Pingentes
}
