import { Component } from '@angular/core';
import { Debt } from '../Models/Debt';
import { DebtComponent } from '../debt/debt.component';
import { Type } from '../Models/Type';
import { Sign } from '../Models/Sign';

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
  }
}
