import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  PORT:number = 5000;
  API_URL:string = `http://localhost:${this.PORT}/api/users/`;
  usersArray:any = 0;

  constructor(private http:HttpClient) { }

  
  getUser(username:string){
      return this.http.get<User>(this.API_URL+username);
  }

  

}
