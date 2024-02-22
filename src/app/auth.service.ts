import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Models/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private PORT:number = 5000;
  private API_URL:string = `http://localhost:${this.PORT}/api/users/`;
  constructor(private http:HttpClient, private cookieService:CookieService) { }

  
  getUser(username:string){
      return this.http.get<User>(this.API_URL+username);
  }


  setUserSession(username:string){
    this.cookieService.set("session", username);
  }
  getUserSession(){
    return this.cookieService.get("session");
  }

  logoutUserSession(){
    this.cookieService.delete("session");
  }
  

}
