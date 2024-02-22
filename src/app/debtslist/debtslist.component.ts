import { Component } from '@angular/core';
import { Debt } from '../Models/Debt';
import { DebtComponent } from '../debt/debt.component';
import { Type } from '../Models/Type';
import { Sign } from '../Models/Sign';
import {v4 as uuidv4} from 'uuid';
import { DebtService } from '../debt.service';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-debtslist',
  templateUrl: './debtslist.component.html',
  styleUrl: './debtslist.component.scss'
})
export class DebtslistComponent {

  inputOn:boolean = false;

  debts:any;



  constructor(private _debtS:DebtService, private _auth:AuthService){}

  ngOnInit()
  {
    this._debtS.getDebtsList(this._auth.getUserSession()).subscribe(
      {
        next: (v)=>this.debts = v,
        error: (err)=>console.error("ERRORCNSL: "+err.message)
      }
    )
  }

  switchInput(){
    this.inputOn = !this.inputOn;
    this.clearSkel();
  }

  skel:any={
    name:"",
    type:"",
    value:"",
    sign:"",
    personname:"",
    due_date:"",
  }

  clearSkel(){
      this.skel = {
      name:"",
      type:"",
      value:"",
      sign:"",
      personname: "",
      due_date:"",
    }

  }
  submitForm(){
    if(this.skel.type === Type.cash){
      this.skel.type = this.skel.type as number;
    }
    let newDebt:Debt|any={
      Id:this.skel.Id,
      name:this.skel.name,
      type:this.convertToSignOrType(this.skel.type),
      value:this.skel.value,
      sign:this.convertToSignOrType(this.skel.sign),
      personname:this.skel.personname,
      due_date:this.skel.due_date,
      add_date:formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    console.log(newDebt);
    this.clearSkel();
  }

  convertToSignOrType(x:string){
    switch(x){
      case "Gotówka":
        return Type.cash;
      case "Przedmiot":
        return Type.item;
      case "Do spłacenia":
        return Sign.negative;
      case "Do odebrania":
        return Sign.positive;
      default:
        throw Error("Wrong convertion");
    }
  }

  

  getDebtType(){
    return this.skel.type;
  }
}
