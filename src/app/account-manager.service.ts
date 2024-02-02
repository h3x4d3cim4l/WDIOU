import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './Models/User';
import { usedEmail } from './Models/usedEmail';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {

  usedEmails_URL:string;
  users_URL:string;
  PORT:number = 5000;

  constructor(private http:HttpClient, private router:Router) {
    this.usedEmails_URL = `http://localhost:${this.PORT}/api/usedEmails/`;
    this.users_URL = `http://localhost:${this.PORT}/api/users`;
   }

  checkEmailAvailability(femail:string){
    return this.http.get<usedEmail[]>(this.usedEmails_URL).pipe(
      map((response)=>{
        const foundEmail = response.find(email=>email.email == femail)
        return !foundEmail;
      })
    )
  }

  checkUsernameAvailability(username:string){
    return this.http.get<User[]>(this.users_URL).pipe(
      map(response=>{
        const foundUser = response.find(user=>user.username == username)
        return !foundUser;
      })
    )
  }

  createAccount(user:User){
    //TODO POST user info into users and email into usedEmails
    this.http.post<User>(this.users_URL, user).subscribe({next: val=>console.log("registered user"), error: err=>{console.error(err.message)}})
    this.http.post<usedEmail>(this.usedEmails_URL, {Id:"", email:user.email}).subscribe({next:()=>{}, error:(err)=>console.error(err.message)});
    this.router.navigate(["/login"])
  }

  deleteAccount(user:User){
    //TODO DELETE user info from users and email from usedEmails
  }

  


}


