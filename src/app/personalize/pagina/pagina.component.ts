import { Component, OnInit, Input } from '@angular/core';
import { Bd } from '../../bd.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Auth } from '../../auth.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  @Input() pagina;
  public id;
  public title;
  public callout;
  public nextTitle;
  public nextTitleBtn;
  public nextId;
  public prevTitle;
  public prevTitleBtn;
  public prevId;
  public btnPlus;
  public paginaId;
  public modalId;
  public joias;
  public tituloPagina
  public edit;
  public saveId;
  public redirect;

  public titulo_pagina: string
  public email: string
  public html: string = '';
  public htmlCarregado: string = '';
  public paginas: Array<any> = []
  public paginasCarregadas: any
  public btnPlusHTML;

  public itemAneis: AngularFireList<any>;
  public items: Observable<any[]>;

  public itemBrincos: AngularFireList<any>;
  public itemsb: Observable<any[]>;

  public itemColares: AngularFireList<any>;
  public itemsc: Observable<any[]>;

  public itemPingentes: AngularFireList<any>;
  public itemsp: Observable<any[]>;

  public itemPulseiras: AngularFireList<any>;
  public itemspu: Observable<any[]>;

  public aneis;
  public brincos;
  public colares;
  public pingentes;
  public pulseiras;

  constructor(private firebase: Auth, private db:AngularFireDatabase,   private bd: Bd, private router: Router) {

    this.itemAneis = db.list('produtos/Anéis/');
    this.items = this.itemAneis.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.items.subscribe( res => {  this.aneis = res } )

    this.itemBrincos = db.list('produtos/Brincos/');
    this.itemsb = this.itemBrincos.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsb.subscribe( res => {  this.brincos = res } )

    this.itemColares = db.list('produtos/Colares/');
    this.itemsc = this.itemColares.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsc.subscribe( res => {  this.colares = res } )

    this.itemPingentes = db.list('produtos/Pingentes/');
    this.itemsp = this.itemPingentes.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemsp.subscribe( res => {  this.pingentes = res } )

    this.itemPulseiras = db.list('produtos/Pulseiras/');
    this.itemspu = this.itemPulseiras.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.itemspu.subscribe( res => {  this.pulseiras = res } )

  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.carregaPaginas()
      this.pagginasCarregadas()
    })

    this.id = this.pagina[0].id;
    this.title = this.pagina[0].title;
    this.callout = this.pagina[0].callout;
    this.nextTitle = this.pagina[0].nextTitle;
    this.nextTitleBtn = this.pagina[0].nextTitleBtn;
    this.nextId = this.pagina[0].nextId;
    this.prevTitle = this.pagina[0].prevTitle;
    this.prevTitleBtn = this.pagina[0].prevTitleBtn;
    this.prevId = this.pagina[0].prevId;
    this.btnPlus = '<button class="plus position-static plus-big" data-open="catalogo-modal-' + this.id + '"><i class="fas fa-plus"></i></button>';
    this.paginaId = 'pagina-de-' + this.id;
    this.modalId = 'catalogo-modal-' + this.id;
    this.joias = this.pagina[0].joias;
    this.tituloPagina = this.pagina[0].tituloPagina;
    this.edit = this.pagina[0].edit;
    this.redirect = this.pagina[0].redirect;
    this.saveId = this.pagina[0].saveId;
    this.btnPlusHTML = '<div class="cell small-4 margin-top-1 cell-prod"><div class="blank_space"><img src="assets/img/aneis/alice/512579_a.jpg" /><div class="box-blank-space"><button class="plus position-static plus-big" data-open="catalogo-modal-' + this.id + '"><i class="fas fa-plus"></i></button></div></div></div>';
    localStorage.setItem("grid-op", '');

    $(document).on('click', '.remover', function () { 
      var ref = $(this).attr('data-ref').replace('#', '');
      var spt = ref.split('-');
      var ref1 = ref.replace(spt[1], 'joia');
      var ref2 = ref.replace(spt[2], 'joia');
      $('#'+ref1).removeClass('prod-disabled');
      $('#'+ref2).removeClass('prod-disabled');
      $(this).parents('.cell-prod').remove();
    });
    var carregouPages = function () {
      desabilitar('#pagina-de-aneis','anel');
      desabilitar('#pagina-de-brincos', 'brinco');
      desabilitar('#pagina-de-colares', 'colar');
      desabilitar('#pagina-de-pulseiras', 'pulseira');
      desabilitar('#pagina-de-pingentes', 'pingente');
    }
    var customizeIntervalPages = setInterval(carregouPages, 1000);

    function desabilitar(pagina, sub) {
      
      if ($(pagina+' .box-prod').find('.catalogo-edit').length > 0) {    
        $(pagina + ' .catalogo-edit .cell-prod').each(function (e) {     
          if ($(this).find('.remover').attr('data-ref') != null) { 
            var ref = $(this).find('.remover').attr('data-ref').replace('#', ''); 
            var ref1 = ref.replace(sub, 'joia');   
            var ref2 = ref;
            $('#' + ref1).addClass('prod-disabled');
            $('#' + ref2).addClass('prod-disabled');
          }
          clearInterval(customizeIntervalPages);
        })
      } else {
        return;
      }
    }
  }
  changeGrid(id, grid, conteiner, modal) {
    var classes = '';
    for (var i = 1; i <= 12; i++) {
      classes += 'small-' + i + ' medium-' + i + ' ';
    }
    if (!modal) {
      localStorage.setItem("grid-op", grid);
    }
    $('#' + conteiner + '-' + id + ' .cell-prod').removeClass(classes);
    $('#' + conteiner + '-' + id + ' .cell-prod').addClass(grid);
  }
  add(ref, id) {
    ref = '#' + ref;
    var editClass = '';
    if (this.edit) {
      editClass = '.catalogo-edit';
    }
    if ($(ref).hasClass('prod-disabled')) {
      return false;
    }
    var $image = $(ref).find('img').attr('src');
    var $legenda = $(ref).find('.caption').text();
    var grid = localStorage.getItem("grid-op");
    var $class = '';
    if (grid != '' && grid != undefined && grid != null) {
      $class = 'small-' + grid;
    } else {
      $class = 'small-4';
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

    $('#pagina-de-' + id + ' .box-prod ' + editClass).prepend($html);
    $(ref).addClass('prod-disabled');

    if (!$('.snackbar').hasClass("show")) {
      $('.snackbar').addClass("show");
      setTimeout(function () { $('.snackbar').removeClass('show') }, 3000);
    }
    this.html += $html;
    return false;
  }
  // salvar, voltar e proxima
  acao(atual, proxima, titulo, info, acao) {
    this.mudarPagina(proxima);
    if (this.html != undefined) {
      this.titulo_pagina = titulo;
      if (this.edit) {
        var clone = $('#' + atual + ' .catalogo-edit').clone();
        clone.find('.blank_space').parent().remove();
        this.htmlCarregado = clone.html();
        //this.atualizarPagina();
      } else {
        //this.salvarPagina();
      }
      $('.step-info').text(info);
      this.htmlCarregado = '';
      this.html = '';

      if(this.redirect && acao == 1){
        this.router.navigate(['/compartilhe/'])
      }
    }
    return false;
  }
  mudarPagina(pageid) {
    $('.pagina-de-produtos').hide();
    $(pageid).fadeIn('slow');
    $(document).scrollTop(0);
    localStorage.setItem("grid-op", '');
    $('.snackbar').removeClass('show');
  }
  public salvarPagina(): void {
    this.bd.salvarPagina({
      email: this.email,
      tituloPagina: this.titulo_pagina,
      paginaHtml: this.html,
    })
  }
  public atualizarPagina(): void {
    this.bd.atualizarPagina({
      email: this.email,
      tituloPagina: this.titulo_pagina,
      paginaHtml: this.htmlCarregado,
    })
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
}
