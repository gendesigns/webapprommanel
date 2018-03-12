import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import * as firebase from 'firebase';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';

declare let Swiper: any;
declare let $: any

@Component({
  selector: 'app-compartilhe',
  templateUrl: './compartilhe.component.html',
  styleUrls: ['./compartilhe.component.css']
})
export class CompartilheComponent implements OnInit {

  public nome: any
  public email: any
  public emailencrypt: any
  public telefone: any
  public cidade: any
  public estado: any
  public mensagem: any
  public nome_persona: any
  public paginas: any
  public url_imagem: string

  constructor(private auth: Auth, private bd: Bd, private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '1580936808840188',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.emailencrypt = btoa(user.email)
      this.carregarInfos()
      this.carregaPersonas()
      this.carregaPaginas()
      this.carregarImagem()
    })
    $('footer').hide();
    $('.swiper-container-share').append('<div class="loader-overlay"><div class="loader"></div></div>');
    $('.paginacao').append('<div class="loader-overlay"></div>');

    var swiper_share;

    function load_swiper() {
      swiper_share = new Swiper('.swiper-container-share', {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: false,
        },
        mousewheel: true,
      });

      swiper_share.on('slideChange', function () {
        var btn = $('.pagina-thumb[data-slide=' + this.activeIndex + ']');
        $('.pagina-thumb').removeClass('ativo');
        $(btn).addClass('ativo');
        var top = btn.offset().top - 115;
        $('.paginacao').animate({
          scrollTop: '+=' + top
        }, 500);
      });

      $('.loader-overlay').remove();
      $('.catalogo-page .cell-prod').removeClass('small-6');
      $('.catalogo-page .cell-prod').addClass('small-4');
    }
    $(document).on('click', '.pagina-thumb', function (e) {
      e.preventDefault();
      var slide = $(this).attr('data-slide');
      swiper_share.slideTo(slide, 0);
    });

    $(document).on('click', '.share-copy-btn', function (e) {
      $('#share-link').focus();
      $('#share-link').select();
      document.execCommand('copy');
      $(this).text("Copiado");
      setTimeout(function () { $('.share-copy-btn').text("Copiar"); }, 3000);
    });

    $(document).on('click', '#step-share .menu a', function (e) {
        e.preventDefault();
        var type = $(this).attr('data-grid');
        if (type == 'grid2') {
          $('.catalogo-page .cell').removeClass("small-4");
          $('.catalogo-page .cell').addClass("small-6");
        }
        if (type == 'grid3') {
          $('.catalogo-page .cell').removeClass("small-6");
          $('.catalogo-page .cell').addClass("small-4");
        }
        swiper_share.updateSize()
        swiper_share.updateSlides()
    });

    var carregou = function () {
      if ($('.catalogo-page').hasClass('paginas-usuario')) {
        load_swiper();
        load_pages_thumbs();
        clearInterval(intervalId);
      }
    }

    function load_pages_thumbs() {
      var cont = 0;
      $('.catalogo-page').each(function (e) {
        $('.paginacao').append('<div class="pagina-thumb" data-slide="' + cont + '">' + $(this).html() + '</div>');
        $('.paginacao .capa').addClass('capa-mini');
        $('.paginacao .pagina-thumb').eq(0).addClass('ativo');
        cont++;
      })
    }

    var intervalId = setInterval(carregou, 1000);



    $(document).on('click', '.catalogo-page .cell-prod', function () {
      var image = $(this).find('img').attr('src');
      var legenda = $(this).find('.caption').html();
      $('#zoom img').attr('src', image);
      $('#zoom .caption').html(legenda);
      $('#zoom').foundation('open');
    });
    $(document).on('click', '#zoom', function () { $('#zoom').foundation('close'); });

  }

  share(url: string) {

    let params: UIParams = {
      href: `${url}/${btoa(this.email)}`,
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));

  }
  

  showShare() {
    $('.share-over, .box-paginacao,.buttons-share').show();
  }
  hideShare() {
    $('.share-over, .box-paginacao,.buttons-share').hide();
  }

  public carregarInfos(): void {
    this.bd.consultaInfos(this.email)
      .then((infos: any) => {
        this.nome = infos.displayName
        this.email = infos.email
        this.telefone = infos.telefone
        this.cidade = infos.cidade
        this.estado = infos.estado
        this.mensagem = infos.mensagem
      })
  }

  public carregaPersonas(): void {
    this.bd.consultaPersona(this.email)
      .then((persona: any) => {
        this.nome_persona = persona.nome_persona
      })
  }

  public carregaPaginas(): void {
    this.bd.consultaPaginasFavoritas(this.email)
      .then((pagina: any) => {
        this.paginas = pagina
      })
  }

  public carregarImagem(): void {
    this.bd.carregaImagem(this.email)
      .then((url: string) => {
        this.url_imagem = url
      })
  }

}

