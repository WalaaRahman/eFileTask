import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { APIResponse } from 'src/app/models/Api-response';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  retrievedContact = new Contact;
  contactID:any;
  formGroup:FormGroup | any;
  constructor(private _router:Router,private _formBuilder:FormBuilder,private _activatedRoute:ActivatedRoute , private _contactService:ContactsService ) { }

  ngOnInit(): void {

    this._activatedRoute.queryParams.subscribe(params=>{​​​​​

      this.contactID = params['ID']
      // console.log("contact ID: ",  this.contactID )

      this._contactService.getOne('contact/getOne/'+ this.contactID).subscribe((response)=>{
        let obj= response as APIResponse;
        if(obj.status){
          this.retrievedContact=obj.Data[0]
          // console.log(this.retrievedContact.name);
          
        }
        
      })

      this.formGroup= this._formBuilder.group({
        name:['',[Validators.required,Validators.minLength(5)]],
        phone:['',[Validators.required,Validators.minLength(11)]],
        address:['',[Validators.required]],
        notes:['',[Validators.required]]
      })
  

    })



  }

  updateContact(){
    let updatedContact:Contact;

    updatedContact=this.formGroup.value
    console.log('Updated Contact',updatedContact);
    console.log('idddd :',this.contactID);
    
      

    this._contactService.editContact('contact/edit/'+this.contactID,updatedContact).subscribe((response)=>{
      let obj=response as APIResponse;
      // console.log("obj",obj);
      
      if(obj.status){
        alert(obj.message)
        this._router.navigateByUrl('/home')
      }
      else{
        alert("Error")
      }
    })

  }

}
