import { Component, OnInit } from '@angular/core';
import { Bd } from '../bd.service'
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';

import { Joia } from '../shared/joia.model'
//import { Aneis, Brincos, Colares, Pulseiras, Pingentes } from '../personalize/joias-mock';
import { Auth } from '../auth.service';

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

  // public aneis

  // public aneis
  // public brincos: Joia[] = Brincos
  // public colares: Joia[] = Colares
  // public pulseiras: Joia[] = Pulseiras
  // public pingentes: Joia[] = Pingentes
  public itemAneis: AngularFireList<any>;
  public items: Observable<any[]>;
  public callout = `<div class="callout" data-closable>
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


  public aneis = [{
    title: 'Meus anéis favoritos',
    callout: this.callout,
    id: 'aneis',
    nextTitle: 'Brincos',
    nextTitleBtn: 'Editar Brincos',
    nextId: 'brincos',
    prevTitle:'',
    prevTitleBtn: '',
    prevId: '',
    saveId: true,
    tituloPagina: 'Anéis',
    edit: true,
    redirect: false
  }]
  public brincos = [{
    title: 'Meus brincos favoritos',
    callout: this.callout,
    id: 'brincos',
    nextTitle: 'Colares',
    nextTitleBtn: 'Editar Colares',
    nextId: 'colares',
    prevTitle:'Anéis',
    prevTitleBtn: 'Editar Anéis',
    prevId: 'aneis',
    saveId: true,
    tituloPagina: 'Brincos',
    edit: true,
    redirect: false
  }]
  public colares = [{
    title: 'Meus colares favoritos',
    callout: this.callout,
    id: 'colares',
    nextTitle: 'Pulseiras',
    nextTitleBtn: 'Editar Pulseiras',
    nextId: 'pulseiras',
    prevTitle:'Brincos',
    prevTitleBtn: 'Editar Brincos',
    prevId: 'brincos',
    saveId: true,
    tituloPagina: 'Colares',
    edit: true,
    redirect: false
  }]
  public pulseiras = [{
    title: 'Minhas pulseiras favoritos',
    callout: this.callout,
    id: 'pulseiras',
    nextTitle: 'Pingentes',
    nextTitleBtn: 'Editar Pingentes',
    nextId: 'pingentes',
    prevTitle:'Colares',
    prevTitleBtn: 'Editar Colares',
    prevId: 'colares',
    saveId: true,
    tituloPagina: 'Pulseiras',
    edit: true,
    redirect: false
  }]
  public pingentes = [{
    title: 'Meus pingentes favoritos',
    callout: this.callout,
    id: 'pingentes',
    nextTitle: '',
    nextTitleBtn: '',
    nextId: '',
    prevTitle:'Pulseiras',
    prevTitleBtn: 'Editar Pulseiras',
    prevId: 'pulseiras',
    saveId: true,
    tituloPagina: 'Pingentes',
    edit: true,
    redirect: true
  }]

  constructor( private firebase: Auth, private db:AngularFireDatabase,   private bd: Bd, private router: Router ) { 
   
/*     this.itemAneis = db.list('produtos/Anéis/');
    this.items = this.itemAneis.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
   
    this.items.subscribe( res => {  this.aneis = res } ) */

  }


  ngOnInit() {

  }
}
