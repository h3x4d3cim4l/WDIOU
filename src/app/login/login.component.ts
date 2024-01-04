import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder){
    
  }
  loginForm: any;
  wrongCreds:boolean = false;

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  


  onSubmit(){
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
     
    }
    
  }

  requiredGroupError(){
    return Object.values(this.loginForm.controls).some((control:any)=>control.hasError('required') && (control.dirty || control.touched))
  }
}
