import { Component, OnInit } from '@angular/core';

declare let jQuery:any;
declare let $:any

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).foundation();
  }

}
