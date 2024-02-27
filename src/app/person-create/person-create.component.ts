import { Component, EventEmitter, Output } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../Models/Person';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.scss'
})
export class PersonCreateComponent 
{
  constructor(private _personS:PersonService, private _auth:AuthService){}

  @Output() onPersonSubmitted = new EventEmitter();
  @Output() onPersonNameTaken = new EventEmitter();
  
  inputOn:boolean = false;
  switchInput(){
    this.inputOn = !this.inputOn;
    this.clearSkel();
  }

  skel:string = ""; 

  clearSkel()
  {
    this.skel = "";
  }


  onSubmit(){
    let newPerson:Person|any={
      name:this.skel,
      owner_nickname:this._auth.getUserSession()
    }
    this._personS.checkPersonNameAvailability(newPerson.name, this._auth.getUserSession()).subscribe((next)=>{
      if(next){
        this._personS.addPerson(newPerson).subscribe({
          next:()=>{
            this.clearSkel()
            this.onPersonSubmitted.emit();
            this.switchInput();
          },
          error: (err)=>console.log(err.message)
        })
        console.log(newPerson);
      }
      else{
        console.log("Nazwa zajeta")
        this.switchInput();
        this.onPersonNameTaken.emit()
      }

    })



  }

  canSubmit(){
    if(this.skel != "")
      return true;
    return false
  }

}



