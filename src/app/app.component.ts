import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _auth:AuthService, private router: Router){

  }
  isLogged():boolean{
    return this._auth.getUserSession()!="";
  }
  title = 'WDIOU';

  logout(){
    this._auth.logoutUserSession();
    this.router.navigate(["/"])
  }
}
