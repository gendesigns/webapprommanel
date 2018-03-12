import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth.service';
import { Bd } from '../bd.service';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

declare let Swiper: any;
declare let $: any

@Component({
  selector: 'app-meu-catalogo',
  templateUrl: './meu-catalogo.component.html',
  styleUrls: ['./meu-catalogo.component.css']
})
export class MeuCatalogoComponent implements OnInit {

  public nome: any
  public email: any
  public telefone: any
  public cidade: any
  public estado: any
  public mensagem: any
  public nome_persona: any
  public paginas: any
  public paramUrl: any
  public url_imagem: string

  constructor(
    private bd: Bd,
    private route: ActivatedRoute
  ) {

    // this.route.params.subscribe(res => {
    //   this.paramUrl = res.id
    // });
   
  }

  ngOnInit() {

    this.paramUrl = this.route.snapshot.params['id']
    
    this.carregarInfos()
    this.carregaPersonas()
    this.carregaPaginas()
    this.carregarImagem()

    var altura_tela = $(window).height() - 250;
    $('.swiper-container-share').css('max-height', altura_tela + 'px');

    var swiper_share = new Swiper('.swiper-container-share', {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"> Página ' + (index + 1) + '</span>';
        },
      },
      mousewheel: true,
    });


    $(window).scroll(function () {
      var scrolled_val = $(document).scrollTop().valueOf();
      if (scrolled_val >= 155) {
        $(".paginacao").css('padding-top', '50px');
      } else {
        $(".paginacao").css('padding-top', '160px');
      }
    });

    $('.catalogo-page .cell-prod').removeClass('small-6');
    $('.catalogo-page .cell-prod').addClass('small-4');

    $(document).foundation();
    
    $(document).on('click', '.catalogo-page .cell-prod', function () {
      var image = $(this).find('img').attr('src');
      var legenda = $(this).find('.caption').html();
      $('#zoom img').attr('src', image);
      $('#zoom .caption').html(legenda);
      $('#zoom').foundation('open');
    });
  }

  showShare() {
    $('.share-over, .paginacao,.buttons-share').show();
  }
  hideShare() {
    $('.share-over, .paginacao,.buttons-share').hide();
  }

  public carregarInfos(): void {
    this.bd.consultaInfos(atob(this.paramUrl))
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
    this.bd.consultaPersona(atob(this.paramUrl))
      .then((persona: any) => {
        this.nome_persona = persona.nome_persona
      })
  }

  public carregaPaginas(): void {
    this.bd.consultaPaginasFavoritas(atob(this.paramUrl))
      .then((pagina: any) => {
        this.paginas = pagina
      })
  }

  public carregarImagem():void {
    this.bd.carregaImagem(this.email)
    .then((url: string)=>{
      this.url_imagem = url
    })
  }

}

