import { Component, EventEmitter, Output } from '@angular/core';
import { DebtService } from '../debt.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { formatDate } from '@angular/common';
import { Debt } from '../Models/Debt'; 
import { Type } from '../Models/Type';
import { Sign } from '../Models/Sign';

@Component({
  selector: 'app-debtpage',
  templateUrl: './debtpage.component.html',
  styleUrl: './debtpage.component.scss'
})
export class DebtpageComponent {
  constructor(private _debtS:DebtService, private _personS:PersonService , private _auth:AuthService, private route:ActivatedRoute, private router:Router){}
  Id:any;
  debtInfo:any = {};
  isEdited:boolean = false;
  isDeleted:boolean = false;


  ngOnInit()
  {
    this.route.params.subscribe((params)=>this.Id = params["id"])
    let debtInfoObs = this._debtS.getDebt(this._auth.getUserSession(), this.Id)
    debtInfoObs.subscribe((v)=>{
      this.debtInfo = v
      this.clearSkel()
    })
    this._personS.getPersonList(this._auth.getUserSession()).subscribe((value)=>this.personList = value)
  }

  switchEdition():void{
    this.isEdited = !this.isEdited;
  }

  switchDeletion():void{
    this.isDeleted = !this.isDeleted;
  }

  //!EDIT

  personList:any;

  

  skel:any={
    name:"",
    type:"",
    value:"",
    sign:"",
    person_nickname:"",
    due_date:"",
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

  getDebtType(){
    return this.skel.type;
  }

  submitForm(){
    if(this.skel.type === Type.cash){
      this.skel.type = this.skel.type as number;
    }
    let newDebt:Debt|any={
      id:this.debtInfo.id,
      name:this.skel.name,
      type:this.convertToSignOrType(this.skel.type),
      value:this.skel.value,
      sign:this.convertToSignOrType(this.skel.sign),
      owner_nickname:this._auth.getUserSession(),
      person_nickname:this.skel.person_nickname,
      due_date:this.skel.due_date,
      add_date:formatDate(new Date(), 'yyyy-MM-dd', 'en')
    }
    console.log(newDebt);
    let obsPut = this._debtS.editDebt(newDebt.id, this._auth.getUserSession(),newDebt)
    this.clearSkel();
    this.switchEdition();
    obsPut.subscribe({next:()=>{
      console.log("Debt edited!")
      this.ngOnInit()


      
  
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

convertToSignOrTypeReverse(x:string){
    switch(x){
      case Type.cash:
        return "Gotówka";
      case Type.item:
        return "Przedmiot";
      case Sign.negative:
        return "Do spłacenia";
      case Sign.positive:
        return "Do odebrania";
      default:
        throw Error("Wrong convertion");
    }
  }


  clearSkel(){
    this.skel = {
      name:this.debtInfo.name,
      type:this.convertToSignOrTypeReverse(this.debtInfo.type),
      value:this.debtInfo.value,
      sign:this.convertToSignOrTypeReverse(this.debtInfo.sign),
      person_nickname: this.debtInfo.person_nickname,
      due_date:this.debtInfo.due_date,
    }

  }

  //!DELETE

  deleteDebt(){
    let obsdel = this._debtS.deleteDebt(this.debtInfo.id, this._auth.getUserSession());
    obsdel.subscribe(
      {
        next:()=>{
          console.log("Debt deleted!")
          this.router.navigate(["/debts"])
        }
      }
    )
  }
}

