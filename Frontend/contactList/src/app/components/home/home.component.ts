import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {ContactsService} from '../../services/contacts.service';
import { Contact } from 'src/app/models/contact';
import { APIResponse } from 'src/app/models/Api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router:Router,private _formBuilder:FormBuilder, private _contactService:ContactsService) { }
  contacts: Contact[]=[];
  filterArray: any[] = [];
  currentPage: any[] = [];
  formGroup:FormGroup | any;
  search_name = "";
  searchArray:Contact[]=[];
  add = false;




  ngOnInit(): void {

    this._contactService.getContacts("contact/getAll").subscribe((response)=>{
      let obj= response as APIResponse;
      if(obj.status){
        let contactData=obj.Data;
        this.contacts=contactData;

        let length = this.contacts.length
        let pagesNumber = length / 5
        let pageIterator = 0
        let pageCodition = 5
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.contacts[j])
          }
          pageIterator += 5
          pageCodition += 5
        }
        // console.log("folter Array [0]",this.filterArray[0]);
        
        this.currentPage = this.filterArray[0]
      }
      else{
        alert(obj.message)

      }
    })

    this.formGroup= this._formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      phone:['',[Validators.required,Validators.minLength(11)]],
      address:['',[Validators.required]],
      notes:['',[Validators.required]]
    })
  }

  pagination(index: any) {
    this.currentPage = this.filterArray[index]
  }
  addContact(){
    let contact:Contact;

    contact=this.formGroup.value

    this._contactService.addContact('contact/addContact',contact).subscribe((response)=>{
      let obj=response as APIResponse;
      if(obj.status){
        contact=obj.Data;
        this.currentPage.push(contact)
        this.formGroup.reset()

        console.log(this.contacts)
        alert(obj.message)
        
      
      }
      else{
        alert("Error")
      }
    })

  }

  delete(id: any, index: any) {
    let confirmation=confirm("Are You Sure This Contact ")

    if(confirmation == true){

    console.log("deleted contact :" , id)

    this._contactService.deleteContact(`contact/delete/${id}`).subscribe((response:any) => {
      let obj = response as APIResponse
      if (obj.status) {
        this.currentPage.splice(index, 1);
        // console.log(obj.message)
      } else {
        // console.log(obj.message)
        alert(obj.message)

      }
    });
    }
  }

  serachByName(){

    if(this.search_name==''){
      this.filterArray=[];

      this._contactService.getContacts("contact/getAll").subscribe((response)=>{
        let obj= response as APIResponse;
        if(obj.status){
          let contactData=obj.Data;
          this.contacts=contactData;
  
          let length = this.contacts.length
          let pagesNumber = length / 5
          let pageIterator = 0
          let pageCodition = 5
          for (let i = 0; i < pagesNumber; i++) {
            this.filterArray[i] = new Array()
            for (let j = pageIterator; j < pageCodition && j < length; j++) {
              this.filterArray[i].push(this.contacts[j])
            }
            pageIterator += 5
            pageCodition += 5
          }
          
          this.currentPage=this.filterArray[0]
        }
        else{
          alert(obj.message)
  
        }
      })

    }
    else{
    this.filterArray=[];

    this._contactService.searchByName('contact/getbyName/'+this.search_name).subscribe((response)=>{

      let obj= response as APIResponse;
      if(obj.status){
        let contactData=obj.Data;
        this.contacts=contactData;

        let length = this.contacts.length
        let pagesNumber = length / 5
        let pageIterator = 0
        let pageCodition = 5
        for (let i = 0; i < pagesNumber; i++) {
          this.filterArray[i] = new Array()
          for (let j = pageIterator; j < pageCodition && j < length; j++) {
            this.filterArray[i].push(this.contacts[j])
          }
          pageIterator += 5
          pageCodition += 5
        }
        
        this.currentPage=this.filterArray[0]
      }
      else{
        alert(obj.message)

      }
    })


  }
  }

  logout(){
    // console.log("Hello form Logout");
    
    this._router.navigateByUrl('/login')
  }

}
