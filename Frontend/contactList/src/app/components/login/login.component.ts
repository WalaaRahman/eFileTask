import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/Api-response';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user_model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user= new User();

  constructor(private _router:Router,private _loginService:LoginService) { }

  ngOnInit(): void {
  }

  login(username:any,password:any){
    this.user.user=username;
    this.user.password=password;
    // console.log("user:",this.user);
    // console.log("userName",this.user.user);
    // console.log("password",this.user.password);

    
    

    this._loginService.getUser('user/login',this.user).subscribe((response:any)=>{
      let obj=response as APIResponse;
      // console.log("Data retrieved",obj.Data);
      // console.log("response",response);
      
      if(obj.status)
      {
        this._router.navigateByUrl('/home')

        
      }
      else{
        alert(obj.message)      }

    })


  }

}
