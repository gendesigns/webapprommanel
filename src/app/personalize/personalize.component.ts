import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import * as firebase from 'firebase'

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


    $(document).on('click', '.remover', function () {
      var $ref = $(this).attr('data-ref');
      $('#' + $ref).removeClass('prod-disabled');
      $('#mobile-' + $ref).removeClass('prod-disabled');
      $(this).parents('.cell-prod').remove();
    });



    var grid_op = 'grid3';
    grid_op = localStorage.getItem("grid-op");
    //this.changeGrid('.customize .page .cell-prod', grid_op);

    /* window.onload = function () {
      var swiper = new Swiper('.swiper-container-custom', {
        direction: 'vertical',
        slidesPerView: 7,
        spaceBetween: 10,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } */

  }
  getHeight($input) {
    var h = $($input).height();
    return Math.round(h) + 'px';
  }
  changeGrid($div, $type) {
    localStorage.setItem("grid-op", $type);

    if ($type == 'grid2') {
      $($div).removeClass("small-4");
      $($div).addClass("small-6");
    }
    if ($type == 'grid3') {
      $($div).removeClass("small-6");
      $($div).addClass("small-4");
    }
    var $height = this.getHeight($div);
    $($div + ' .blank_space').css('height', $height);
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

    return false;
  }
  editar_informacoes() {
    $('.pagina-de-produtos').hide();
    $('#pagina-de-info').show();
  }

  proxima(id) {
    //$('.pagina-de-produtos').removeClass('pagina-de-produtos-active');
    //$(id).addClass('pagina-de-produtos-active');
    $('.pagina-de-produtos').hide();
    $(id).fadeIn('slow');

    $( document ).scrollTop( 0 );

    if (this.html != undefined) {
      switch (id) {
        case "#pagina-de-brincos": {
          this.titulo_pagina = "Anéis"
          this.salvarPagina()
          this.html = ''
          break;
        }
        case "#pagina-de-colares": {
          this.titulo_pagina = "Brincos"
          this.salvarPagina()
          this.html = ''
          break;
        }
        case "#pagina-de-pingentes": {
          this.titulo_pagina = "Colares"
          this.salvarPagina()
          this.html = ''
          break;
        }
        case "#pagina-de-pulseiras": {
          this.titulo_pagina = "Pingentes"
          this.salvarPagina()
          this.html = ''
          break;
        }
        case "#pagina-de-info": {
          this.titulo_pagina = "Pulseiras"
          this.salvarPagina()
          this.html = ''
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


public aneis: Array<object> = [
  {'img': 'assets/img/aneis/alice/512562.jpg','code':'512562'},
  {'img': 'assets/img/aneis/alice/512576.jpg','code':'512576'},
  {'img': 'assets/img/aneis/alice/512578.jpg','code':'512578'},
  {'img': 'assets/img/aneis/alice/512579_a.jpg','code':'512579'},
  {'img': 'assets/img/aneis/alice/512579_b.jpg','code':'512579'},
  {'img': 'assets/img/aneis/alice/512591.jpg','code':'512591'},

  {'img': 'assets/img/aneis/brenda/','code':'512543'},
  {'img': 'assets/img/aneis/brenda/','code':'512544'},
  {'img': 'assets/img/aneis/brenda/','code':'512551'},
  {'img': 'assets/img/aneis/brenda/','code':'512552'},
  {'img': 'assets/img/aneis/brenda/','code':'512559'},
  {'img': 'assets/img/aneis/brenda/','code':'512560'},
  {'img': 'assets/img/aneis/brenda/','code':'512561'},
  {'img': 'assets/img/aneis/brenda/','code':'512576'},
  {'img': 'assets/img/aneis/brenda/','code':'512581'},
  {'img': 'assets/img/aneis/brenda/','code':'512586'},
  {'img': 'assets/img/aneis/brenda/','code':'512598'},

  {'img': 'assets/img/aneis/debora/','code':''},
  {'img': 'assets/img/aneis/debora/','code':''},
  {'img': 'assets/img/aneis/debora/','code':''},
  {'img': 'assets/img/aneis/debora/','code':''},
  {'img': 'assets/img/aneis/debora/','code':''},
  {'img': 'assets/img/aneis/debora/','code':''},
  {'img': 'assets/img/aneis/debora/','code':''},

  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},
  {'img': 'assets/img/aneis/duda/','code':''},

  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},
  {'img': 'assets/img/aneis/maria-antonia/','code':''},

  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},
  {'img': 'assets/img/aneis/raquel/','code':''},

]

  public alice_aneis: Array<string> = ['512562', '512576', '512578', '512579_a', '512579_b', '512591']
  public alice_brincos: Array<string> = ['526006', '526030_a', '526030_b', '526035', '526036', '526037','526060','526062','526063','526066','526068']
  public alice_colares: Array<string> = ['531869', '531870', '531871']
  public alice_pingentes: Array<string> = []
  public alice_pulseiras: Array<string> = ['542080']

  public brenda_aneis: Array<string> = ['512543', '512544', '512551', '512552', '512559', '512560', '512561', '512576', '512581', '512586', '512598']
  public brenda_brincos: Array<string> = ['525996', '525997', '525998', '526002', '526029', '526033','526039','526042','526043','526044','526045','526055','526056','526066','526071','526074','526076']
  public brenda_colares: Array<string> = ['531852', '531854', '531857', '531860']
  public brenda_pingentes: Array<string> = ['542084', '542112']
  public brenda_pulseiras: Array<string> = ['551527']

  public debora_aneis: Array<string> = ['512567', '512570', '512574', '512575', '512587', '512589', '512601']
  public debora_brincos: Array<string> = ['526013', '526015', '526016', '526017', '526018', '526021','526022','526027','526038','526057','526058','526077','526078','526079']
  public debora_colares: Array<string> = ['531858', '531876']
  public debora_pingentes: Array<string> = ['542086']
  public debora_pulseiras: Array<string> = ['551522', '551523', '551528']

  public duda_aneis: Array<string> = ['110771', '110773', '110777', '512545', '512553', '512555', '512563', '512566', '512569', '512572', '512576']
  public duda_brincos: Array<string> = ['121678', '121694', '121695', '526001', '526009', '526011','526012','526014','526023','526024','526031','526032','526034','526054','526066','526080']
  public duda_colares: Array<string> = ['531855', '531856', '531868', '531894']
  public duda_pingentes: Array<string> = ['140783_a', '140783_b', '140784', '140786', '140787', '542081']
  public duda_pulseiras: Array<string> = ['150313', '551524', '551529']

  public maria_aneis: Array<string> = ['512547', '512549_a', '512549_b', '512554', '512556', '512558', '512558_a', '512558_b', '512558_c', '512573', '512577','512593_a','512593_b','512597','512603']
  public maria_brincos: Array<string> = ['525966', '525999', '526000', '526003', '526005', '526019','526020','526047','526048','526051_a','526051_b','526052_a','526052_b','526052_c','526052_d','526053']
  public maria_colares: Array<string> = ['531851', '531853', '531859', '531862', '531863', '531864_a','531864_b','531872','531873','531874']
  public maria_pingentes: Array<string> = ['542060', '542061', '542062', '542063', '542066', '542067','542068','542069','542072','542074','542075_a','542075_b','542075_c','542075_d','542076','542077','542087','542089','542090']
  public maria_pulseiras: Array<string> = ['551526', '551533_a', '551533_b', '551533_c', '551533_d']

  public raquel_aneis: Array<string> = ['110767', '110769', '110776', '512542', '512548_a', '512548_b', '512548_c', '512548_d', '512557', '512565', '512568_a','512568_b','512568_c','512571','512580','512590','512599']
  public raquel_brincos: Array<string> = ['121677', '121681', '121684', '121697', '525983', '526007','526008','526028','526041','526046','526061','526064','526072','526096']
  public raquel_colares: Array<string> = ['130421']
  public raquel_pingentes: Array<string> = ['542082']
  public raquel_pulseiras: Array<string> = []

  ngAfterContentInit() {

  }
}
