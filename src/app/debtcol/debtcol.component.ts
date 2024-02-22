import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-debtcol',
  templateUrl: './debtcol.component.html',
  styleUrl: './debtcol.component.scss'
})
export class DebtcolComponent {

  constructor(){}
  
  @Input() debts:any;

  usunDlug(id:string){}
  edytujDlug(id:string){}
}
