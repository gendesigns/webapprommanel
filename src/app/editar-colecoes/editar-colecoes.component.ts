import { Component, OnInit } from '@angular/core';
import { Joia } from '../shared/joia.model'
// import { Aneis, Brincos, Colares, Pulseiras, Pingentes } from '../personalize/joias-mock'

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Bd } from '../bd.service';

@Component({
  selector: 'app-editar-colecoes',
  templateUrl: './editar-colecoes.component.html',
  styleUrls: ['./editar-colecoes.component.css']
})
export class EditarColecoesComponent implements OnInit{

  public email: string
  public paginas: Array<any> = []
  public paginasCarregadas: any

  public aneisJoias: Joia[]
  public brincosJoias: Joia[]
  public colaresJoias: Joia[]
  public pulseirasJoias: Joia[]
  public pingentesJoias: Joia[]

  public itemsRef: AngularFireList<any>;
  public items: Observable<any[]>;

  constructor( private dbFire: Bd  , private db: AngularFireDatabase) { 

    this.itemsRef = db.list('produtos/Anéis');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.items.subscribe((item) => {
    
      this.aneisJoias = item
      
    })
    
  }

  ngOnInit(){
    
  }



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
    joias: this.aneisJoias,
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
    joias: this.brincosJoias,
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
    joias: this.colaresJoias,
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
    joias: this.pulseirasJoias,
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
    joias: this.pingentesJoias,
    tituloPagina: 'Pingentes',
    edit: true,
    redirect: true
  }]
}
