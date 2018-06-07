import { Component, OnInit, Input } from '@angular/core';
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
import { Catalogo } from '../shared/catalogo';
import { Catalogo2018 } from './catalogo2018';

declare let Swiper: any;
declare let $: any

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  @Input() acoes;
  public href: string = "";
  public nome: any
  public nome_completo: any
  public email: any
  public emailencrypt: any
  public telefone: any
  public cidade: any
  public estado: any
  public mensagem: any
  public nome_persona: any
  public paginas: any
  public paramUrl: any
  public url_imagem: string
  public url: any = ''
  public catalogo2018: Catalogo[] = Catalogo2018


  constructor(private auth: Auth, private bd: Bd, private fb: FacebookService, private route: ActivatedRoute) {
    let initParams: InitParams = {
      appId: '1580936808840188',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  ngOnInit() {

    $(document).foundation();

    this.url = window.location.origin

    if (this.acoes) {
      firebase.auth().onAuthStateChanged((user) => {
        this.email = user.email
        this.emailencrypt = btoa(user.email)
        this.carregarInfos()
        this.carregaPersonas()
        this.carregaPaginas()
        this.carregarImagem()
      })
    } else {
      this.paramUrl = this.route.snapshot.params['id']
      this.carregarInfos()
      this.carregaPersonas()
      this.carregaPaginas()
      this.carregarImagem()
    }

    $('footer').hide();
    $('.swiper-container-share').append('<div class="loader-overlay"><div class="loader"></div></div>');

    function doOnOrientationChange() {
      if (screen.height < screen.width && ('ontouchstart' in document.documentElement)) {
        $('.fixar-topo').addClass('fixar-topo-landscape');
        $('#step-share .menu').addClass('menu-fixo');
        $('#step-share .show-share-buttons,.rommanel-ico,.btn-menu').css('display', 'inline-block');
        $('#step-share').css('margin-top', '110px');
        $('.buttons-share,.share-over,.box-paginacao,.dropdown.menu,.logo-rommanel-desk').hide();
      } else if (('ontouchstart' in document.documentElement)) {
        $('.fixar-topo').removeClass('fixar-topo-landscape');
        $('#step-share .menu').removeClass('menu-fixo');
        $('.buttons-share,.share-over,.box-paginacao').hide();
        $('#step-share .show-share-buttons').css('display', 'inline-block');
      }
    }
    window.addEventListener('orientationchange', doOnOrientationChange);
    doOnOrientationChange();

    var swiper_share;
    if (!('ontouchstart' in document.documentElement)) {
      var altura_tela = $(window).height() - 250;
      if (altura_tela > 690) {
        $('.swiper-container-share').css('max-height', altura_tela + 'px');
      } else {
        $('.swiper-container-share').css('max-height', '690px');
      }
    }

    function load_swiper() {
      $('html,body').scrollTop(0);
      swiper_share = new Swiper('.swiper-container-share', {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: false,
        },
        mousewheel: true,
      });

      swiper_share.slideTo(0, 0);

      swiper_share.on('slideChange', function () {
        var btn = $('.pagina-thumb[data-slide=' + this.activeIndex + ']');
        $('.pagina-thumb').removeClass('ativo');
        $(btn).addClass('ativo');
        $('.paginacao').animate({
          scrollTop: btn[0].offsetTop
        }, 0);
      });

      $('#step-share .menu,.show-share-buttons').css('z-index', '5');
      $('.catalogo-page .cell-prod').removeClass('small-6');
      $('.catalogo-page .cell-prod').addClass('small-4');

      if (('ontouchstart' in document.documentElement)) {
        $('.swiper-container-share .swiper-wrapper').removeClass('swiper-wrapper');
        swiper_share.destroy();
      }
      $('.loader-overlay').remove();
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
      if ($('.catalogo-page').hasClass('paginas-usuario') && $('.catalogo-page').hasClass('capa-usuario')) {
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
      var imgs = '';
      var i = 0;
      $(this).find('img').each(function (e) {
        imgs += '<img src="' + $(this).attr('src') + '"/>';
        i++;
      })
      var image = $(this).find('img').attr('src');
      var legenda = $(this).find('.caption').html();
      $('#zoom img').attr('src', image);
      $('#zoom .caption').html(legenda);
      if (i > 1) {
        $('#zoom .bullets').html(imgs);
      } else {
        $('#zoom .bullets').html('');
      }
      $('#zoom').foundation('open');
    });
    $(document).on('click', '#zoom .bullets img', function () {
      var image = $(this).attr('src');
      $('#zoom img#img-atual').attr('src', image);
      $('#zoom .bullets img').css('border-color', '#ccc');
      $(this).css('border-color', '#664a90');
    })
    //$(document).on('click', '#zoom', function () { $('#zoom').foundation('close'); });

  }

  share(url: string) {
    let params: UIParams = {
      href: `${url}/meuCatalogo/${btoa(this.email)}`,
      method: 'share',
      message: 'Rommanel - Meu Catálogo 2018',
      picture: 'https://webapprommanel-staging.herokuapp.com/assets/img/fb_catalogo_2018_995.jpg'
    };
    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }
  showShare() {
    $('.share-over,.buttons-share').css('display', 'block');
    $('.buttons-share').css('z-index', '12');
  }
  hideShare() {
    $('.share-over,.buttons-share').hide();
  }

  public carregarInfos(): void {
    let email = '';
    if (this.acoes) {
      email = this.email;
    } else {
      email = atob(this.paramUrl);
    }
    this.bd.consultaInfos(email)
      .then((infos: any) => {
        var x = infos.displayName.split(' ');
        this.nome = x[0]
        this.nome_completo = infos.displayName
        this.email = infos.email
        this.telefone = infos.telefone
        this.cidade = infos.cidade
        this.estado = infos.estado
        this.mensagem = infos.mensagem
      })
  }

  public carregaPersonas(): void {
    let email = '';
    if (this.acoes) {
      email = this.email;
    } else {
      email = atob(this.paramUrl);
    }
    this.bd.consultaPersona(email)
      .then((persona: any) => {
        this.nome_persona = persona.nome_persona
      })
  }

  public carregaPaginas(): void {
    let email = '';
    if (this.acoes) {
      email = this.email;
    } else {
      email = atob(this.paramUrl);
    }
    this.bd.consultaPaginasFavoritas(email)
      .then((pagina: any) => {
        this.paginas = pagina
      })
  }

  public carregarImagem(): void {
    let email = '';
    if (this.acoes) {
      email = this.email;
    } else {
      email = atob(this.paramUrl);
    }
    this.bd.carregaImagem(email)
      .then((url: string) => {
        this.url_imagem = url
      })
  }
}
