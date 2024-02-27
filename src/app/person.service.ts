import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person } from './Models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private PORT = 5000;
  private API_URL = `http://localhost:${this.PORT}/api/person/`
  constructor(private http:HttpClient) { }

  getPersonList(username:string):Observable<any>{
    return this.http.get<Person[]>(this.API_URL+username)
  }

  getPerson(username:string, personname:string|null):Observable<any>{
    return this.http.get<Person>(this.API_URL+username+"/"+personname);
  }
  
  addPerson(person: Person|any){
    return this.http.post<Person>(this.API_URL,person);
  }

  editPerson(username:string, personname:string, newPerson:Person|any){
    return this.http.put<Person>(this.API_URL+username+"/"+personname,newPerson);
  }

  deletePerson(username:string, personname:string){
    return this.http.delete(this.API_URL+username+"/"+personname);
  }

  checkPersonNameAvailability(pname:string, username:string){
    return this.getPersonList(username).pipe(
      map(response=>{
        const found = response.find((person:any)=>person.name == pname)
        return !found
      })
    )
  }
}
