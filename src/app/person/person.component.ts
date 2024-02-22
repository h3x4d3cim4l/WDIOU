import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {


  @Input() Id:string = "";
  @Input() name:string = "";
  
}
