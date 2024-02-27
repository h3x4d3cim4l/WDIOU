import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { PersonService } from '../person.service';
import { AuthService } from '../auth.service';
import { DebtService } from '../debt.service';
import { Location } from '@angular/common';
import { Person } from '../Models/Person';

@Component({
  selector: 'app-personpage',
  templateUrl: './personpage.component.html',
  styleUrl: './personpage.component.scss'
})
export class PersonpageComponent {

  nameId:string | any = "";
  personInfo:any;
  debts:any = 0;
  debtsFinal:any[]=[];
  constructor(private route:ActivatedRoute, private _personService:PersonService, private _auth:AuthService, private _debtService:DebtService, private location: Location){}
  ngOnInit(){
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

  goBack(){
    this.location.back();
  }


  //!EDIT AND DELETE (EDIT IS NOT OPTIMAL, DELETE ONLY)

  // isEdited:boolean = false;
  isDeleted:boolean = false;

  // switchEdition(){
  //   this.isEdited = !this.isEdited;
  //   this.clearSkel();
  // }
  switchDeletion(){
    this.isDeleted = !this.isDeleted;
  }

  deletePerson(){
    this._personService.deletePerson(this._auth.getUserSession(), this.nameId).subscribe({
      next:()=>{
        console.log("Person deleted!")
        //!DeleteALlPersonDebts
        this.goBack();
      }
    })
  }
//   //!EDIT
//   skel:string = "";
//   clearSkel(){
//     this.skel = "";
//   }
//   isNameTaken:boolean = false;

//   onSubmit(){
//     let newPerson:Person|any = {
//       id:this.personInfo.id,
//       name:this.skel,
//       owner_nickname:this._auth.getUserSession()
//     }
//     this._personService.checkPersonNameAvailability(newPerson.name, newPerson.owner_nickname).subscribe((next)=>{
//       if(next){
//         this.isNameTaken = false
//         this._personService.editPerson(newPerson.owner_nickname,this.nameId,newPerson).subscribe({next:()=>{
//           console.log("Person edited!")
//           this.switchEdition();
//           this.goBack();
//         }, error:(err)=>console.error(err.message)})
//       }
//       else{
//         this.isNameTaken = true
//       }
//     })
//   }
//   canSubmit(){
//     if(this.skel != "")
//       return true
//     return false
//   }
}
