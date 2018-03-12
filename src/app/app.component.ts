import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FacebookService, InitParams } from 'ngx-facebook';

declare let jQuery:any;
declare let $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  ngOnInit() {

  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBIFtE1wbHL3ygRXHSNlqTCmOjz15ZOdNg",
      authDomain: "catalogo2018-26fdc.firebaseapp.com",
      databaseURL: "https://catalogo2018-26fdc.firebaseio.com",
      projectId: "catalogo2018-26fdc",
      storageBucket: "catalogo2018-26fdc.appspot.com",
      messagingSenderId: "403989062683"
    
    };

    firebase.initializeApp(config);
    $(document).foundation();
  }
}
