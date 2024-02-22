import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { PersonService } from '../person.service';
import { AuthService } from '../auth.service';
import { DebtService } from '../debt.service';

@Component({
  selector: 'app-personpage',
  templateUrl: './personpage.component.html',
  styleUrl: './personpage.component.scss'
})
export class PersonpageComponent {

  nameId:string | null = "";
  personInfo:any;
  debts:any = 0;
  debtsFinal:any[]=[];
  constructor(private route:ActivatedRoute, private _personService:PersonService, private _auth:AuthService, private _debtService:DebtService){

    this.route.params.subscribe(params=>{
      this.nameId = params['id'];
      this._personService.getPerson(this._auth.getUserSession(), this.nameId).subscribe(
        {
          next:(p)=>{
            this.personInfo = p
          },
          error:(err)=>{console.error("ERRORCONSOLE: "+err.message)}
        }
      )

    })
    let dbts = this._debtService.getDebtsList(this._auth.getUserSession())
    dbts.subscribe(v=>{
      this.debts = v
      this.debts.map((el: any)=>{
        if(el.person_nickname == this.nameId){
          this.debtsFinal.push(el)
        }
      })
    })
  }
}
