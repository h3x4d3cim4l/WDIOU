import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _auth:AuthService){

  }
  isLogged():boolean{
    return this._auth.getUserSession()!="";
  }
  title = 'WDIOU';
}
