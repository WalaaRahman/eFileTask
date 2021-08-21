import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpclient:HttpClient) { }
  
  getContacts(url:string){
    
      return this.httpclient.get(`${environment.APIURL}/${url}`)
    }

  getOne(url:string){
    return this.httpclient.get(`${environment.APIURL}/${url}`)
  }
  
  addContact(url:string,contact:any){
    return this.httpclient.post(`${environment.APIURL}/${url}`,contact)
  }

  editContact(url:string,contact:any){
    return this.httpclient.put(`${environment.APIURL}/${url}`,contact)
  }
  deleteContact(url:string){
    return this.httpclient.delete(`${environment.APIURL}/${url}`)
  }
  searchByName(url:string){
    return this.httpclient.get(`${environment.APIURL}/${url}`)

  }
  
}
