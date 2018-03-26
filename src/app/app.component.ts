import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FacebookService, InitParams } from 'ngx-facebook';
import {Router, NavigationEnd} from "@angular/router";
import { FirebaseConfig } from './../environments/firebase.config';

declare let jQuery:any;
declare let $:any
declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {

  
    firebase.initializeApp(FirebaseConfig);
    $(document).foundation();
  }
}
