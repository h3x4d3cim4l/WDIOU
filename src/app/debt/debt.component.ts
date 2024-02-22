import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Debt } from '../Models/Debt';
import { Person } from '../Models/Person';
import { Type } from '../Models/Type';
import { Sign } from '../Models/Sign';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss'
})
export class DebtComponent {

  @Input() Id:string = "";
  @Input() name:string = "";
  @Input() type:Type = Type.empty;
  @Input() sign:Sign = Sign.empty;
  @Input() value: string|number = "";
  @Input() personname: string = ""
  @Input() add_date:string = ""
  @Input() due_date:string = ""
  typePrintable:string = "";
  signPrintable:string = "";

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();

  ngOnInit(){

    if(this.type == Type.cash)
      this.typePrintable = "Gotówka"
    else if(this.type == Type.item){
      this.typePrintable = "Przedmiot"
    }

    if(this.sign == Sign.positive)
      this.signPrintable = "Do odebrania"
    else if(this.sign = Sign.negative)
      this.signPrintable = "Do spłacenia"
  }

  usunDlug(){
    this.delete.emit(this.Id)
  }

  edytujDlug(){
   this.edit.emit(this.Id)
  }

}
