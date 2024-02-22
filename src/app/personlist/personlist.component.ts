import { Component } from '@angular/core';
import { DebtService } from '../debt.service';
import { AsyncPipe } from '@angular/common';
import { Debt } from '../Models/Debt';
import { PersonService } from '../person.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-personlist',
  templateUrl: './personlist.component.html',
  styleUrl: './personlist.component.scss'
})
export class PersonlistComponent {
//!SANDBOX
  constructor(private _personService:PersonService, private _auth:AuthService){}
listobs:any;
list:any;
  
  ngOnInit(){
    this.listobs = this._personService.getPersonList(this._auth.getUserSession());
    this.list = 0;
    this.listobs.subscribe((v:any)=>{
      console.log(v)
      this.list = v;
    })
  }
}
