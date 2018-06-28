import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciador',
  templateUrl: './gerenciador.component.html',
  styleUrls: ['./gerenciador.component.css']
})
export class GerenciadorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).on('click', '.gcx', function () { 
      $('.gcx .capa').css('border','none')
      $(this).find('.capa').css('border','5px solid #664a90');
    });
  }

}
