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

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }


  onSubmit(){
    if (this.loginForm.valid){
      console.log("Login successful: ", this.loginForm.value)
    }
    
  }

  requiredGroupError(){
    return Object.values(this.loginForm.controls).some((control:any)=>control.hasError('required') && (control.dirty || control.touched))
  }
}
