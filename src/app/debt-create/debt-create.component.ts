import { Component, EventEmitter, Output } from '@angular/core';
import { Type } from '../Models/Type';
import {Debt} from "../Models/Debt";
import { formatDate } from '@angular/common';
import { Sign } from '../Models/Sign';
import { PersonService } from '../person.service';
import { AuthService } from '../auth.service';
import { DebtService } from '../debt.service';

@Component({
  selector: 'app-debt-create',
  templateUrl: './debt-create.component.html',
  styleUrl: './debt-create.component.scss'
})
export class DebtCreateComponent {

  inputOn:boolean = false;

  @Output() private debtSubmitted = new EventEmitter();


  personList:any;
  constructor(private _personS:PersonService, private _auth:AuthService, private _debt:DebtService){}

  ngOnInit(){
    this._personS.getPersonList(this._auth.getUserSession()).subscribe((value)=>this.personList = value)
  }

  switchInput(){
    this.inputOn = !this.inputOn;
    this.clearSkel();
  }


  canSubmit():boolean
  {
    let nameCharacters = 0;
    this.skel.name.split('').map(()=>{
      nameCharacters+=1
    })
    if(this.skel.name != "" && this.skel.type != "" && this.skel.value != "" && this.skel.sign != "" && this.skel.personname != "" && this.skel.due_date != "" && nameCharacters <=24)
      return true;
    return false
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
      name:this.skel.name,
      type:this.convertToSignOrType(this.skel.type),
      value:this.skel.value,
      sign:this.convertToSignOrType(this.skel.sign),
      owner_nickname:this._auth.getUserSession(),
      person_nickname:this.skel.personname,
      due_date:this.skel.due_date,
      add_date:formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    console.log(newDebt);
    let obsPost = this._debt.addDebt(newDebt);
    this.clearSkel();
    obsPost.subscribe({next:()=>{
      
      console.log("Debt created!")
      this.debtSubmitted.emit()
  
  }, 
  error:(err)=>console.error(err.message)})

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
 

