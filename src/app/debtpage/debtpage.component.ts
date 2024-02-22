import { Component } from '@angular/core';
import { DebtService } from '../debt.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debtpage',
  templateUrl: './debtpage.component.html',
  styleUrl: './debtpage.component.scss'
})
export class DebtpageComponent {
  constructor(private _debtS:DebtService, private _auth:AuthService, private route:ActivatedRoute){}
  Id:any;
  debtInfo:any;
  ngOnInit()
  {
    this.route.params.subscribe((params)=>this.Id = params["id"])
    let debtInfoObs = this._debtS.getDebt(this._auth.getUserSession(), this.Id)
    debtInfoObs.subscribe((v)=>this.debtInfo = v)
  }
}
