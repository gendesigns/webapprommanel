import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import * as firebase from 'firebase'

import { Joia } from '../shared/joia.model'
import { Aneis, Brincos, Colares, Pulseiras, Pingentes } from './joias-mock'

declare let Swiper: any;
declare let $: any

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

  public titulo_pagina: string
  public email: string
  public html: string = ''

  constructor(private bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
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

    var customizeIntervalId = null;

    var carregou = function () {
      if ($('#pagina-de-aneis .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-aneis').css('display') != 'none') {
        load_swiper('#pagina-de-aneis .swiper-container');
        clearInterval(customizeIntervalId);
      }
      else if($('#pagina-de-brincos .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-brincos').css('display') != 'none'){
        load_swiper('#pagina-de-brincos .swiper-container');    
        clearInterval(customizeIntervalId);    
      } 
      else if($('#pagina-de-colares .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-colares').css('display') != 'none'){
        load_swiper('#pagina-de-colares .swiper-container');
        clearInterval(customizeIntervalId);    
      }
      else if($('#pagina-de-pulseiras .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-pulseiras').css('display') != 'none'){
        load_swiper('#pagina-de-pulseiras .swiper-container');   
        clearInterval(customizeIntervalId);    
      }
      else if($('#pagina-de-pingentes .swiper-container').find('.swiper-slide').length > 0 && $('#pagina-de-pingentes').css('display') != 'none'){
        load_swiper('#pagina-de-pingentes .swiper-container');   
        clearInterval(customizeIntervalId);    
      }
      else {
        clearInterval(customizeIntervalId);
      }
    }

    $(document).on('click', '.nextJoia, .box-persona button', function () {
      customizeIntervalId = setInterval(carregou, 1000);
      carregou();
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
    if(modal != 1){
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
      $('.catalogo-modal').foundation('close');
    }
    $('#' + pai + ' .box-prod').prepend($html);
    $('#' + res + ' .box-prod').prepend($html);
    $($this).addClass('prod-disabled');

    $('#' + res + ' .callout.success').fadeIn('slow', function () {
      $(this).delay(1000).fadeOut('slow');
    });
    $('#' + pai + ' .callout.success').show(function () {
      $(this).delay(1000).fadeOut('slow');
    });

    return false;
  }
  editar_informacoes() {
    $('.pagina-de-produtos').hide();
    $('#pagina-de-info').show();
  }

  proxima(id) {
    $('.pagina-de-produtos').hide();
    $(id).fadeIn('slow');
    $(document).scrollTop(0);
    localStorage.setItem("grid-op", '');

    if (this.html != undefined) {
      switch (id) {
        case "#pagina-de-brincos": {
          this.titulo_pagina = "Anéis"
          //this.salvarPagina()
          this.html = '';
          $('.step-info').text("Brincos");
        
          break;
        }
        case "#pagina-de-colares": {
          this.titulo_pagina = "Brincos"
          //this.salvarPagina()
          this.html = '';
          $('.step-info').text("Colares");
          break;
        }
        case "#pagina-de-pulseiras": {
          this.titulo_pagina = "Pingentes"
          //this.salvarPagina()
          this.html = '';
          $('.step-info').text("Pulseiras");
          break;
        }
        case "#pagina-de-pingentes": {
          this.titulo_pagina = "Colares"
          //this.salvarPagina()
          this.html = '';
          $('.step-info').text("Pingentes");
          break;
        }
        case "#pagina-de-info": {
          this.titulo_pagina = "Pulseiras"
          //this.salvarPagina()
          this.html = '';
          $('.step-info').text("Editar Informações");
          break;
        }
        default: {
          console.log("Invalid choice");
          break;
        }
      }
    }
  }

  public salvarPagina(): void {
    this.bd.salvarPagina({
      email: this.email,
      tituloPagina: this.titulo_pagina,
      paginaHtml: this.html,
    })
  }
  
  public aneis: Joia[] = Aneis
  public brincos: Joia[] = Brincos
  public colares: Joia[] = Colares
  public pulseiras: Joia[] = Pulseiras
  public pingentes: Joia[] = Pingentes
}
