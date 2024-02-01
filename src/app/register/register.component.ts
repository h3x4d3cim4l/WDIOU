import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountManagerService } from '../account-manager.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private _accountManager:AccountManagerService){
    
  }

  showUsedEmailError:boolean = false;
  showUsedUsernameError:boolean = false;

  registrationForm: any;

  ngOnInit(): void {
      this.registrationForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }


  onSubmit(){
    if (this.registrationForm.valid){
      // console.log("Registration successful: ", this.registrationForm.value)
      this.checkAvailable(this.registrationForm.value.email, this.registrationForm.value.username);
    }
    
  }
  
  private checkAvailable(email: string, username:string):boolean | any
  {
    //TODO
    this._accountManager.checkUsernameAvailability(username).subscribe(next=>{
      if(next){
        this.showUsedUsernameError = false;
        this._accountManager.checkEmailAvailability(email).subscribe(nextt=>{
          if(nextt){
            this.showUsedEmailError = false
            this.newAccount();
          }
          else{
            this.showUsedEmailError = true;
          }
        })
      }
      else{
        this.showUsedUsernameError = true;
      }
    })
  }

  private newAccount(){
    let user:User = {
      Id: "",
      username: this.registrationForm.value.username,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    this._accountManager.createAccount(user);
  }

  requiredGroupError(){
    return Object.values(this.registrationForm.controls).some((control:any)=>control.hasError('required') && (control.dirty || control.touched))
  }
}
