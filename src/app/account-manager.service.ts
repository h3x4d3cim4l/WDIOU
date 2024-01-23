import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './Models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {

  constructor(private http:HttpClient) { }

  checkEmailAvailability(email:string){
    //TODO GET usedEmails Array from api and compare, if inside, return false, else true
  }

  checkUsernameAvailability(username:string){
    //TODO GET usery from api, if exists, return false, else true
  }

  createAccount(user:User){
    //TODO POST user info into users and email into usedEmails
  }


}


