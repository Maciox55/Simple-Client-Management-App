import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable} from 'rxjs';
import { ReactiveFormsModule,FormsModule,FormGroup,FormControl,Validators,FormBuilder,NgModel,NgForm} from '@angular/forms';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { Router} from '@angular/router';
import { UserService} from '../../services/user.service';

class UserModel {
  constructor(
    public username:string ='',
    public password:string ='',
    public email:string =''
  ){}

}
@NgModule({
  imports: [
      FormsModule,
      ReactiveFormsModule,
      Response
  ]
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model : UserModel = new UserModel();
  @ViewChild('l') form: any;
  readonly ROOT_URL = 'http://localhost:3000';
  
  constructor(private http: Http, private router: Router, private user: UserService) { 
  }

  ngOnInit() {
  }
  onSubmit(f : NgForm){
    console.log("Clicked");
    if(this.form.valid){
      this.attemptLogin(this.model);
      this.form.reset();
    }
  }
  attemptLogin(u:UserModel){
    var data = {
      username: u.username,
      password: u.password
    }
    this.http.post(this.ROOT_URL+'/api/login',data).subscribe(res =>{
      if(res.status === 200){
        var resp = <Token>res.json();
        localStorage.setItem("token",resp.token);
        localStorage.setItem("auth",resp.auth);
        console.log(resp.token);
        this.user.setUserAuthed(true);
        this.router.navigate(['/dashboard']);
      }
   },error =>{
      console.log(error);
   });


   interface Token{
    token:string;
    auth:string;

   }

  }



}


