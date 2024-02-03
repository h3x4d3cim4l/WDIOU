import { Component } from '@angular/core';
import { Debt } from '../Models/Debt';
import { DebtComponent } from '../debt/debt.component';
import { Type } from '../Models/Type';
import { Sign } from '../Models/Sign';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-debtslist',
  templateUrl: './debtslist.component.html',
  styleUrl: './debtslist.component.scss'
})
export class DebtslistComponent {

  inputOn:boolean = false;

  debts:Debt[]=
  [
    {
      Id:"1",
      name:"Za cole",
      type:Type.cash,
      sign:Sign.negative,
      value:5,
      person:{Id:"2",name:"Seba",balanceWith:-100}
    },
    {
      Id:"2",
      name:"Za paliwo i cos tam jeszcze blelbelbelbl",
      type:Type.cash,
      sign:Sign.positive,
      value:20,
      person:{Id:"2",name:"Całka",balanceWith:-100}
    }
  ]

  switchInput(){
    this.inputOn = !this.inputOn;
    this.clearSkel();
  }

  skel:any={
    Id:uuidv4(),
    name:"",
    type:"",
    value:"",
    sign:"",
    person:{Id:"",name:"",balanceWith:0}

  }

  clearSkel(){
      this.skel = {
      Id:uuidv4(),
      name:"",
      type:"",
      value:"",
      sign:"",
      person:{Id:"",name:"",balanceWith:10}

    }

  }
  submitForm(){
    let newDebt:Debt|any={
      Id:this.skel.Id,
      name:this.skel.name,
      type:this.convertToSignOrType(this.skel.type),
      value:this.skel.value,
      sign:this.convertToSignOrType(this.skel.sign),
      person:this.skel.person
    }
    console.log(newDebt);
    this.usunDlug(newDebt.Id);
    this.debts.push(newDebt);
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

  usunDlug(id:string){

    let tempDebts:Debt[] = [];
    this.debts.map(el=>{
      if(el.Id != id)
        tempDebts.push(el)
    })
    this.debts = tempDebts;
  }

  edytujDlug(id:string){
    this.debts.map(el=>{
      if(el.Id == id){
        this.skel.Id = el.Id
        this.skel.name = el.name
        this.skel.type = el.type == Type.cash ? "Gotówka" : "Przedmiot"
        this.skel.value = el.value
        this.skel.sign = el.sign == Sign.positive ? "Do odebrania" : "Do spłacenia"
        this.skel.person = el.person;
        this.inputOn = true;
      }
    })
  }
}
