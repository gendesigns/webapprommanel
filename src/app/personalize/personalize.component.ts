import { Component, OnInit } from '@angular/core';
import { Joia } from '../shared/joia.model'
import { Aneis, Brincos, Colares, Pulseiras, Pingentes } from './joias-mock'
import { PaginaComponent } from './pagina/pagina.component';


@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

  public titulo_pagina: string
  public email: string
  public html: string = '';

  public aneisJoias: Joia[] = Aneis
  public brincosJoias: Joia[] = Brincos
  public colaresJoias: Joia[] = Colares
  public pulseirasJoias: Joia[] = Pulseiras
  public pingentesJoias: Joia[] = Pingentes


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
    nextTitleBtn: 'Personalizar página de Brincos',
    nextId: 'brincos',
    prevTitle:'',
    prevTitleBtn: '',
    prevId: false,
    saveId: false,
    joias: this.aneisJoias,
    tituloPagina: 'Anéis',
    edit: false,
    redirect: false
  }]
  public brincos = [{
    title: 'Meus brincos favoritos',
    callout: this.callout,
    id: 'brincos',
    nextTitle: 'Colares',
    nextTitleBtn: 'Personalizar página de Colares',
    nextId: 'colares',
    prevTitle:'',
    prevTitleBtn: '',
    prevId: false,
    saveId: false,
    joias: this.brincosJoias,
    tituloPagina: 'Brincos',
    edit: false,
    redirect: false
  }]
  public colares = [{
    title: 'Meus colares favoritos',
    callout: this.callout,
    id: 'colares',
    nextTitle: 'Pulseiras',
    nextTitleBtn: 'Personalizar página de Pulseiras',
    nextId: 'pulseiras',
    prevTitle:'',
    prevTitleBtn: '',
    prevId: false,
    saveId: false,
    joias: this.colaresJoias,
    tituloPagina: 'Colares',
    edit: false,
    redirect: false
  }]
  public pulseiras = [{
    title: 'Minhas pulseiras favoritos',
    callout: this.callout,
    id: 'pulseiras',
    nextTitle: 'Pingentes',
    nextTitleBtn: 'Personalizar página de Pingentes',
    nextId: 'pingentes',
    prevTitle:'',
    prevTitleBtn: '',
    prevId: false,
    saveId: false,
    joias: this.pulseirasJoias,
    tituloPagina: 'Pulseiras',
    edit: false,
    redirect: false
  }]
  public pingentes = [{
    title: 'Meus pingentes favoritos',
    callout: this.callout,
    id: 'pingentes',
    nextTitle: 'Editar Informações',
    nextTitleBtn: 'Editar Informações',
    nextId: 'info',
    prevTitle:'',
    prevTitleBtn: '',
    prevId: false,
    saveId: false,
    joias: this.pingentesJoias,
    tituloPagina: 'Pingentes',
    edit: false,
    redirect: false
  }]

  constructor() { }

  ngOnInit() {
  }
}
