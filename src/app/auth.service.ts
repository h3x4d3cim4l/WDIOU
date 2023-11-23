import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged:boolean = false;

  login():void {
    this.isLogged = true;
  }

  logout():void{
    this.isLogged = false;
  }
  
  checkLogged():boolean{
    return this.isLogged;
  }

}
