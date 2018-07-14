import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';

@Injectable()
export class UserService {
  
  private username:string;
  public isAuthed:any = false; 
  public token:string;
  constructor(private router: Router, public jwtHelper: JwtHelperService) { 
    console.log(this.isAuthed);
  }
  
  public setUserAuthed = function(islogged:boolean){
    this.isAuthed = islogged;
    console.log(this.isAuthed);
  }
  
  public getUserAuthed = new Observable((observer)=>{
    setInterval(()=>{
      var test = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      console.log(test);
       if(this.jwtHelper.isTokenExpired(test) == true)
       {
        this.setUserAuthed(false);
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      }
      if(this.token != null && this.isAuthed == true && !this.jwtHelper.isTokenExpired(this.token)){
        console.log("OBVSERBABLE TEST");
        observer.next(true); 
      } else{
        observer.next(false); 
        this.logOut();
      }
    },1000);
    

  });
  
  setUsername(username){
    
    this.username = username;
  }
  setToken(tok)
  {
    this.token = tok;
    return tok;
  }
  getUsername(){
    return this.username;
  }
  logOut(){
    this.setUserAuthed(false);
    //localStorage.setItem("auth","false");
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
  
}