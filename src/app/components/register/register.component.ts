import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { Observable} from 'rxjs';
import { Router} from '@angular/router';
import { UserService} from '../../services/user.service';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  NgModel,
  NgForm
} from '@angular/forms';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';

class NewUser {
  constructor(
    public username:string ='',
    public password:string ='',
    public email:string =''
  ){}

}


@NgModule({
  imports: [
      FormsModule,
      ReactiveFormsModule
  ]
})
@Component({
  selector: 'app-register',
  templateUrl:'./register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : NewUser = new NewUser();
  @ViewChild('f') form: any;
  readonly ROOT_URL = 'http://localhost:3000';

  constructor(private _http: Http, private router: Router, private user: UserService) { 
    
  }

  ngOnInit() {

  }

  onSubmit(f : NgForm){
    console.log("Clicked");
    if(this.form.valid){
      this.registerUser(this.model);
      this.form.reset();
    }
  }
  registerUser(u:NewUser){
    const data ={
      username: u.username,
      password: u.password,
      email: u.email
    }
   this._http.post(this.ROOT_URL+'/api/register',data).subscribe((response: any)=>{
      if(response.status === 200){
        console.log('success');
      }
   });
  }
  
}

