import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import * as firebase from 'firebase'

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
  public paginas: any

  constructor(private bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.carregaPaginas()
    })

    localStorage.setItem("grid-op", 'grid3');

    $(document).on('click', '.remover', function () {
      var $ref = $(this).attr('data-ref');
      $('#' + $ref).removeClass('prod-disabled');
      $('#mobile-' + $ref).removeClass('prod-disabled');
      $(this).parents('.cell-prod').remove();
    });

    var grid_op = 'grid3';
    grid_op = localStorage.getItem("grid-op");

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
          this.salvarPagina()
          this.html = '';
          $('.step-info').text("Brincos");
        
          break;
        }
        case "#pagina-de-colares": {
          this.titulo_pagina = "Brincos"
          this.salvarPagina()
          this.html = '';
          $('.step-info').text("Colares");
          break;
        }
        case "#pagina-de-pulseiras": {
          this.titulo_pagina = "Pingentes"
          this.salvarPagina()
          this.html = '';
          $('.step-info').text("Pulseiras");
          break;
        }
        case "#pagina-de-pingentes": {
          this.titulo_pagina = "Colares"
          this.salvarPagina()
          this.html = '';
          $('.step-info').text("Pingentes");
          break;
        }
        case "#pagina-de-info": {
          this.titulo_pagina = "Pulseiras"
          this.salvarPagina()
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


  public carregaPaginas(): void {
    this.bd.consultaPaginasFavoritas(this.email)
      .then((pagina: any) => {
        this.paginas = pagina
      })
      
  }
  
  public salvarPagina(): void {
    this.bd.salvarPagina({
      email: this.email,
      tituloPagina: this.titulo_pagina,
      paginaHtml: this.html,
    })
  }


  public aneis: Array<object> = [
    { 'img': 'assets/img/aneis/alice/512562.jpg', 'code': '512562', 'legenda': '512562', 'persona': 'alice' },
    { 'img': 'assets/img/aneis/alice/512576.jpg', 'code': '512576', 'legenda': '512576', 'persona': 'alice' },
    { 'img': 'assets/img/aneis/alice/512578.jpg', 'code': '512578', 'legenda': '512578', 'persona': 'alice' },
    { 'img': 'assets/img/aneis/alice/512579_a.jpg', 'code': '512579_a', 'legenda': '512579', 'persona': 'alice' },
    { 'img': 'assets/img/aneis/alice/512579_b.jpg', 'code': '512579_b', 'legenda': '512579*', 'persona': 'alice' },
    { 'img': 'assets/img/aneis/alice/512591.jpg', 'code': '512591', 'legenda': '512591', 'persona': 'alice' },

    { 'img': 'assets/img/aneis/brenda/512543.jpg', 'code': '512543', 'legenda': '512543*', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512544.jpg', 'code': '512544', 'legenda': '512544', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512551.jpg', 'code': '512551', 'legenda': '512551', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512552.jpg', 'code': '512552', 'legenda': '512552*', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512559.jpg', 'code': '512559', 'legenda': '512559*', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512560.jpg', 'code': '512560', 'legenda': '512560', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512561.jpg', 'code': '512561', 'legenda': '512561', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512576.jpg', 'code': '512576', 'legenda': '512576', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512581.jpg', 'code': '512581', 'legenda': '512581', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512586.jpg', 'code': '512586', 'legenda': '512586', 'persona': 'brenda' },
    { 'img': 'assets/img/aneis/brenda/512598.jpg', 'code': '512598', 'legenda': '512598', 'persona': 'brenda' },

    { 'img': 'assets/img/aneis/debora/512567.jpg', 'code': '512567', 'legenda': '512567', 'persona': 'debora' },
    { 'img': 'assets/img/aneis/debora/512570.jpg', 'code': '512570', 'legenda': '512570', 'persona': 'debora' },
    { 'img': 'assets/img/aneis/debora/512574.jpg', 'code': '512574', 'legenda': '512574', 'persona': 'debora' },
    { 'img': 'assets/img/aneis/debora/512575.jpg', 'code': '512575', 'legenda': '512575', 'persona': 'debora' },
    { 'img': 'assets/img/aneis/debora/512587.jpg', 'code': '512587', 'legenda': '512587', 'persona': 'debora' },
    { 'img': 'assets/img/aneis/debora/512589.jpg', 'code': '512589', 'legenda': '512589', 'persona': 'debora' },
    { 'img': 'assets/img/aneis/debora/512601.jpg', 'code': '512601', 'legenda': '512601', 'persona': 'debora' },

    { 'img': 'assets/img/aneis/duda/110771.jpg', 'code': '110771', 'legenda': '110771*', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/110773.jpg', 'code': '110773', 'legenda': '110773*', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/110777.jpg', 'code': '110777', 'legenda': '110777*', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512545.jpg', 'code': '512545', 'legenda': '512545', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512553.jpg', 'code': '512553', 'legenda': '512553', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512555.jpg', 'code': '512555', 'legenda': '512555', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512563.jpg', 'code': '512563', 'legenda': '512563*', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512566.jpg', 'code': '512566', 'legenda': '512566*', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512569.jpg', 'code': '512569', 'legenda': '512569', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512572.jpg', 'code': '512572', 'legenda': '512572', 'persona': 'duda' },
    { 'img': 'assets/img/aneis/duda/512576.jpg', 'code': '512576', 'legenda': '512576', 'persona': 'duda' },

    { 'img': 'assets/img/aneis/maria-antonia/512547.jpg', 'code': '512547', 'legenda': '512547', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512549_a.jpg', 'code': '512549_a', 'legenda': '512549', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512549_b.jpg', 'code': '512549_b', 'legenda': '512549', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512554.jpg', 'code': '512554', 'legenda': '512554', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512556.jpg', 'code': '512556', 'legenda': '512556*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512558.jpg', 'code': '512558', 'legenda': '512558', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512558_a.jpg', 'code': '512558_a', 'legenda': '512558', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512558_b.jpg', 'code': '512558_b', 'legenda': '512558*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512558_c.jpg', 'code': '512558_c', 'legenda': '512558', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512573.jpg', 'code': '512573', 'legenda': '512573', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512577.jpg', 'code': '512577', 'legenda': '512577', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512593_a.jpg', 'code': '512593_a', 'legenda': '512593', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512593_b.jpg', 'code': '512593_b', 'legenda': '512593', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512597.jpg', 'code': '512597', 'legenda': '512597', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/aneis/maria-antonia/512603.jpg', 'code': '512603', 'legenda': '512603', 'persona': 'maria-antonia' },

    { 'img': 'assets/img/aneis/raquel/110767.jpg', 'code': '110767', 'legenda': '110767*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/110769.jpg', 'code': '110769', 'legenda': '110769*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/110776.jpg', 'code': '110776', 'legenda': '110776*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512542.jpg', 'code': '512542', 'legenda': '512542', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512548_a.jpg', 'code': '512548_a', 'legenda': '512548', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512548_b.jpg', 'code': '512548_b', 'legenda': '512548', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512548_c.jpg', 'code': '512548_c', 'legenda': '512548', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512548_d.jpg', 'code': '512548_d', 'legenda': '512548', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512557.jpg', 'code': '512557', 'legenda': '512557*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512565.jpg', 'code': '512565', 'legenda': '512565', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512568_a.jpg', 'code': '512568_a', 'legenda': '512568*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512568_b.jpg', 'code': '512568_b', 'legenda': '512568', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512568_c.jpg', 'code': '512568_c', 'legenda': '512568', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512571.jpg', 'code': '512571', 'legenda': '512571*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512580.jpg', 'code': '512580', 'legenda': '512580', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512590.jpg', 'code': '512590', 'legenda': '512590*', 'persona': 'raquel' },
    { 'img': 'assets/img/aneis/raquel/512599.jpg', 'code': '512599', 'legenda': '512599*', 'persona': 'raquel' },
  ]
  public brincos: Array<object> = [
    { 'img': 'assets/img/brincos/alice/526006.jpg', 'code': '526006', 'legenda': '526006', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526030_a.jpg', 'code': '526030_a', 'legenda': '526030', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526030_b.jpg', 'code': '526030_b', 'legenda': '526030*', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526035.jpg', 'code': '526035', 'legenda': '526035', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526036.jpg', 'code': '526036', 'legenda': '526036', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526037.jpg', 'code': '526037', 'legenda': '526037', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526060.jpg', 'code': '526060', 'legenda': '526060', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526062.jpg', 'code': '526062', 'legenda': '526062*', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526063.jpg', 'code': '526063', 'legenda': '526063', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526066.jpg', 'code': '526066', 'legenda': '526066', 'persona': 'alice' },
    { 'img': 'assets/img/brincos/alice/526068.jpg', 'code': '526068', 'legenda': '526068', 'persona': 'alice' },

    { 'img': 'assets/img/brincos/brenda/525996.jpg', 'code': '525996', 'legenda': '525996', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/525997.jpg', 'code': '525997', 'legenda': '525997', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/525998.jpg', 'code': '525998', 'legenda': '525998*', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526002.jpg', 'code': '526002', 'legenda': '526002*', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526029.jpg', 'code': '526029', 'legenda': '526029', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526033.jpg', 'code': '526033', 'legenda': '526033', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526039.jpg', 'code': '526039', 'legenda': '526039', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526042.jpg', 'code': '526042', 'legenda': '526042', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526043.jpg', 'code': '526043', 'legenda': '526043', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526044.jpg', 'code': '526044', 'legenda': '526044', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526045.jpg', 'code': '526045', 'legenda': '526045', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526055.jpg', 'code': '526055', 'legenda': '526055', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526056.jpg', 'code': '526056', 'legenda': '526056*', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526066.jpg', 'code': '526066', 'legenda': '526066', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526071.jpg', 'code': '526071', 'legenda': '526071', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526074.jpg', 'code': '526074', 'legenda': '526074*', 'persona': 'brenda' },
    { 'img': 'assets/img/brincos/brenda/526076.jpg', 'code': '526076', 'legenda': '526076', 'persona': 'brenda' },

    { 'img': 'assets/img/brincos/debora/526013.jpg', 'code': '526013', 'legenda': '526013', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526015.jpg', 'code': '526015', 'legenda': '526015', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526016.jpg', 'code': '526016', 'legenda': '526016', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526017.jpg', 'code': '526017', 'legenda': '526017', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526018.jpg', 'code': '526018', 'legenda': '526018', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526021.jpg', 'code': '526021', 'legenda': '526021', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526022.jpg', 'code': '526022', 'legenda': '526022', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526027.jpg', 'code': '526027', 'legenda': '526027', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526038.jpg', 'code': '526038', 'legenda': '526038', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526057.jpg', 'code': '526057', 'legenda': '526057', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526058.jpg', 'code': '526058', 'legenda': '526058', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526077.jpg', 'code': '526077', 'legenda': '526077', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526078.jpg', 'code': '526078', 'legenda': '526078', 'persona': 'debora' },
    { 'img': 'assets/img/brincos/debora/526079.jpg', 'code': '526079', 'legenda': '526079', 'persona': 'debora' },

    { 'img': 'assets/img/brincos/duda/121678.jpg', 'code': '121678', 'legenda': '121678*', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/121694.jpg', 'code': '121694', 'legenda': '121694*', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/121695.jpg', 'code': '121695', 'legenda': '121695*', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526001.jpg', 'code': '526001', 'legenda': '526001', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526009.jpg', 'code': '526009', 'legenda': '526009*', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526011.jpg', 'code': '526011', 'legenda': '526011', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526012.jpg', 'code': '526012', 'legenda': '526012', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526014.jpg', 'code': '526014', 'legenda': '526014', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526023.jpg', 'code': '526023', 'legenda': '526023', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526024.jpg', 'code': '526024', 'legenda': '526024', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526031.jpg', 'code': '526031', 'legenda': '526031', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526032.jpg', 'code': '526032', 'legenda': '526032', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526034.jpg', 'code': '526034', 'legenda': '526034', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526054.jpg', 'code': '526054', 'legenda': '526054', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526066.jpg', 'code': '526066', 'legenda': '526066', 'persona': 'duda' },
    { 'img': 'assets/img/brincos/duda/526080.jpg', 'code': '526080', 'legenda': '526080', 'persona': 'duda' },

    { 'img': 'assets/img/brincos/maria-antonia/525966.jpg', 'code': '525966', 'legenda': '525966*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/525999.jpg', 'code': '525999', 'legenda': '525999', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526000.jpg', 'code': '526000', 'legenda': '526000', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526003.jpg', 'code': '526003', 'legenda': '526003', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526005.jpg', 'code': '526005', 'legenda': '526005*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526019.jpg', 'code': '526019', 'legenda': '526019', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526020.jpg', 'code': '526020', 'legenda': '526020*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526047.jpg', 'code': '526047', 'legenda': '526047', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526048.jpg', 'code': '526048', 'legenda': '526048*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526051_a.jpg', 'code': '526051_a', 'legenda': '526051', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526051_b.jpg', 'code': '526051_b', 'legenda': '526051', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526052_a.jpg', 'code': '526052_a', 'legenda': '526052*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526052_b.jpg', 'code': '526052_b', 'legenda': '526052', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526052_c.jpg', 'code': '526052_c', 'legenda': '526052', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526052_d.jpg', 'code': '526052_d', 'legenda': '526052', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/brincos/maria-antonia/526053.jpg', 'code': '526053', 'legenda': '526053', 'persona': 'maria-antonia' },

    { 'img': 'assets/img/brincos/raquel/121677.jpg', 'code': '121677', 'legenda': '121677*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/121681.jpg', 'code': '121681', 'legenda': '121681*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/121684.jpg', 'code': '121684', 'legenda': '121684*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/121697.jpg', 'code': '121697', 'legenda': '121697*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/525983.jpg', 'code': '525983', 'legenda': '525983*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526007.jpg', 'code': '526007', 'legenda': '526007', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526008.jpg', 'code': '526008', 'legenda': '526008*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526028.jpg', 'code': '526028', 'legenda': '526028', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526041.jpg', 'code': '526041', 'legenda': '526041*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526046.jpg', 'code': '526046', 'legenda': '526046*', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526061.jpg', 'code': '526061', 'legenda': '526061', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526064.jpg', 'code': '526064', 'legenda': '526064', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526072.jpg', 'code': '526072', 'legenda': '526072', 'persona': 'raquel' },
    { 'img': 'assets/img/brincos/raquel/526096.jpg', 'code': '526096', 'legenda': '526096*', 'persona': 'raquel' },

  ]
  public colares: Array<object> = [
    { 'img': 'assets/img/colares/alice/531869.jpg', 'code': '531869', 'legenda': '531869', 'persona': 'alice' },
    { 'img': 'assets/img/colares/alice/531870.jpg', 'code': '531870', 'legenda': '531870*', 'persona': 'alice' },
    { 'img': 'assets/img/colares/alice/531871.jpg', 'code': '531871', 'legenda': '531871', 'persona': 'alice' },

    { 'img': 'assets/img/colares/brenda/531852.jpg', 'code': '531852', 'legenda': '531852*', 'persona': 'brenda' },
    { 'img': 'assets/img/colares/brenda/531854.jpg', 'code': '531854', 'legenda': '531854', 'persona': 'brenda' },
    { 'img': 'assets/img/colares/brenda/531857.jpg', 'code': '531857', 'legenda': '531857', 'persona': 'brenda' },
    { 'img': 'assets/img/colares/brenda/531860.jpg', 'code': '531860', 'legenda': '531860', 'persona': 'brenda' },

    { 'img': 'assets/img/colares/debora/531858.jpg', 'code': '531858', 'legenda': '531858', 'persona': 'debora' },
    { 'img': 'assets/img/colares/debora/531876.jpg', 'code': '531876', 'legenda': '531876', 'persona': 'debora' },

    { 'img': 'assets/img/colares/duda/531855.jpg', 'code': '531855', 'legenda': '531855', 'persona': 'duda' },
    { 'img': 'assets/img/colares/duda/531856.jpg', 'code': '531856', 'legenda': '531856', 'persona': 'duda' },
    { 'img': 'assets/img/colares/duda/531868.jpg', 'code': '531868', 'legenda': '531868*', 'persona': 'duda' },
    { 'img': 'assets/img/colares/duda/531894.jpg', 'code': '531894', 'legenda': '531894', 'persona': 'duda' },

    { 'img': 'assets/img/colares/maria-antonia/531851.jpg', 'code': '531851', 'legenda': '531851', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531853.jpg', 'code': '531853', 'legenda': '531853', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531859.jpg', 'code': '531859', 'legenda': '531859*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531862.jpg', 'code': '531862', 'legenda': '531862', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531863.jpg', 'code': '531863', 'legenda': '531863', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531864_a.jpg', 'code': '531864_a', 'legenda': '531864', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531864_b.jpg', 'code': '531864_b', 'legenda': '531864', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531872.jpg', 'code': '531872', 'legenda': '531872*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531873.jpg', 'code': '531873', 'legenda': '531873*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/colares/maria-antonia/531874.jpg', 'code': '531874', 'legenda': '531874', 'persona': 'maria-antonia' },

    { 'img': 'assets/img/colares/raquel/130421.jpg', 'code': '130421', 'legenda': '130421*', 'persona': 'raquel' },
  ]
  public pingentes: Array<object> = [
    { 'img': 'assets/img/pingentes/alice/542080.jpg', 'code': '542080', 'legenda': '542080', 'persona': 'alice' },

    { 'img': 'assets/img/pingentes/brenda/542084.jpg', 'code': '542084', 'legenda': '542084', 'persona': 'brenda' },
    { 'img': 'assets/img/pingentes/brenda/542112.jpg', 'code': '542112', 'legenda': '542112*', 'persona': 'brenda' },

    { 'img': 'assets/img/pingentes/debora/542086.jpg', 'code': '542086', 'legenda': '542086', 'persona': 'debora' },

    { 'img': 'assets/img/pingentes/duda/140783_a.jpg', 'code': '140783_a', 'legenda': '140783*', 'persona': 'duda' },
    { 'img': 'assets/img/pingentes/duda/140783_b.jpg', 'code': '140783_b', 'legenda': '140783*', 'persona': 'duda' },
    { 'img': 'assets/img/pingentes/duda/140784.jpg', 'code': '140784', 'legenda': '140784*', 'persona': 'duda' },
    { 'img': 'assets/img/pingentes/duda/140786.jpg', 'code': '140786', 'legenda': '140786*', 'persona': 'duda' },
    { 'img': 'assets/img/pingentes/duda/140787.jpg', 'code': '140787', 'legenda': '140787*', 'persona': 'duda' },
    { 'img': 'assets/img/pingentes/duda/542081.jpg', 'code': '542081', 'legenda': '542081', 'persona': 'duda' },

    { 'img': 'assets/img/pingentes/maria-antonia/542060.jpg', 'code': '542060', 'legenda': '542060', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542061.jpg', 'code': '542061', 'legenda': '542061*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542062.jpg', 'code': '542062', 'legenda': '542062', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542063.jpg', 'code': '542063', 'legenda': '542063', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542066.jpg', 'code': '542066', 'legenda': '542066', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542067.jpg', 'code': '542067', 'legenda': '542067', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542068.jpg', 'code': '542068', 'legenda': '542068', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542069.jpg', 'code': '542069', 'legenda': '542069', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542072.jpg', 'code': '542072', 'legenda': '542072', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542074.jpg', 'code': '542074', 'legenda': '542074', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542075_a.jpg', 'code': '542075_a', 'legenda': '542075', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542075_b.jpg', 'code': '542075_b', 'legenda': '542075', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542075_c.jpg', 'code': '542075_c', 'legenda': '542075', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542075_d.jpg', 'code': '542075_d', 'legenda': '542075', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542076.jpg', 'code': '542076', 'legenda': '542076', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542077.jpg', 'code': '542077', 'legenda': '542077', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542087.jpg', 'code': '542087', 'legenda': '542087', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542089.jpg', 'code': '542089', 'legenda': '542089', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pingentes/maria-antonia/542090.jpg', 'code': '542090', 'legenda': '542090', 'persona': 'maria-antonia' },

    { 'img': 'assets/img/pingentes/raquel/542082.jpg', 'code': '542082', 'legenda': '542082', 'persona': 'raquel' },
  ]
  public pulseiras: Array<object> = [

    { 'img': 'assets/img/pulseiras/brenda/551527.jpg', 'code': '551527', 'legenda': '551527', 'persona': 'brenda' },

    { 'img': 'assets/img/pulseiras/debora/551522.jpg', 'code': '551522', 'legenda': '551522', 'persona': 'debora' },
    { 'img': 'assets/img/pulseiras/debora/551523.jpg', 'code': '551523', 'legenda': '551523', 'persona': 'debora' },
    { 'img': 'assets/img/pulseiras/debora/551528.jpg', 'code': '551528', 'legenda': '551528', 'persona': 'debora' },

    { 'img': 'assets/img/pulseiras/duda/150313.jpg', 'code': '150313', 'legenda': '150313*', 'persona': 'duda' },
    { 'img': 'assets/img/pulseiras/duda/551524.jpg', 'code': '551524', 'legenda': '551524', 'persona': 'duda' },
    { 'img': 'assets/img/pulseiras/duda/551529.jpg', 'code': '551529', 'legenda': '551529', 'persona': 'duda' },

    { 'img': 'assets/img/pulseiras/maria-antonia/551526.jpg', 'code': '551526', 'legenda': '551526*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pulseiras/maria-antonia/551533_a.jpg', 'code': '551533_a', 'legenda': '551533*', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pulseiras/maria-antonia/551533_b.jpg', 'code': '551533_b', 'legenda': '551533', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pulseiras/maria-antonia/551533_c.jpg', 'code': '551533_c', 'legenda': '551533', 'persona': 'maria-antonia' },
    { 'img': 'assets/img/pulseiras/maria-antonia/551533_d.jpg', 'code': '551533_d', 'legenda': '551533', 'persona': 'maria-antonia' },

    { 'img': 'assets/img/pulseiras/raquel/551537.jpg', 'code': '551537', 'legenda': '551537*', 'persona': 'raquel' },
    { 'img': 'assets/img/pulseiras/raquel/150310.jpg', 'code': '150310', 'legenda': '150310*', 'persona': 'raquel' },
    
  ]
  ngAfterContentInit() {

  }

}
