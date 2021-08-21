import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user_model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient:HttpClient) { }

  getUser(url:string,user:any){
    return this.httpclient.post(`${environment.APIURL}/${url}`,user)
  }

}
