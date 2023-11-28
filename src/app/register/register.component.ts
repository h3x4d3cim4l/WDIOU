import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder){
    
  }
  registrationForm: any;

  ngOnInit(): void {
      this.registrationForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }


  onSubmit(){
    if (this.registrationForm.valid){
      console.log("Registration successful: ", this.registrationForm.value)
    }
    
  }

  requiredGroupError(){
    return Object.values(this.registrationForm.controls).some((control:any)=>control.hasError('required') && (control.dirty || control.touched))
  }
}
