import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Debt } from './Models/Debt';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  private PORT = 5000
  private API_URL = `http://localhost:${this.PORT}/api/debt/`;
  constructor(private http:HttpClient) { }


  getDebtsList(username:string):Observable<any>{
    return this.http.get<Debt[]>(this.API_URL+username);
  }

  getDebt(username:string, id:string):Observable<Debt>{
    return this.http.get<Debt>(this.API_URL+username+"/"+id);
  }


  addDebt(debt:Debt|any){
    return this.http.post<Debt>(this.API_URL,debt)
    }
}
