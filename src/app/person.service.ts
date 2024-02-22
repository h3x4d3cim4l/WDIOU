import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './Models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  PORT = 5000;
  API_URL = `http://localhost:${this.PORT}/api/person/`
  constructor(private http:HttpClient) { }

  getPersonList(username:string):Observable<any>{
    return this.http.get<Person[]>(this.API_URL+username)
  }

  getPerson(username:string, personname:string|null):Observable<any>{
    return this.http.get<Person>(this.API_URL+username+"/"+personname);
  }
}
