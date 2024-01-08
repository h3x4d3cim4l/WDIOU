import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private _auth:AuthService){
    
  }
  loginForm: any;
  wrongCreds:boolean = false;

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }
  
  
  login(username:string, password:string):void{
    let obs = this._auth.getUser(username) as Observable<User>;
    obs.subscribe(user=>{
      if(user){
        if(user.username === username && user.password === password){
          console.log("Login sucessc: ",user);
          this.wrongCreds = false;
        }
        else{
          this.wrongCreds = true;
        }
      }

      
    })
  }
  
  onSubmit(){
    if (this.loginForm.valid){
      this.login(this.loginForm.value.login,this.loginForm.value.password);
    }

  }

  requiredGroupError(){
    return Object.values(this.loginForm.controls).some((control:any)=>control.hasError('required') && (control.dirty || control.touched))
  }
}
