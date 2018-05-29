import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router} from '@angular/router';

@Injectable()
export class UserService {

  private username:string;
  private isAuthed; 
  private token;
  constructor(private router: Router) { 
    this.isAuthed = new BehaviorSubject<boolean>(false);
  }

  setUserAuthed(islogged){
    this.isAuthed.next(islogged);
  }
  get getUserAuthed(){
    return this.isAuthed.asObservable();
  }
  setUsername(username){
    this.username = username;
  }
  getUsername(){
    return this.username;
  }
  logOut(){
    this.isAuthed.next(false);
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}
