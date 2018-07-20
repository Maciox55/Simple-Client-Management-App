import { Component, OnInit  } from '@angular/core';
import { UserService} from '../app/services/user.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    username;
    authed:any;
    temp;
    constructor(private user: UserService){
      this.user.getUserAuthed.subscribe(res=>{
        console.log(res + " Auth Observable Test");
        this.authed = res;
        this.username = this.user.getUsername();
      });

    }
    
    ngOnInit() {
      // this.temp = this.user.getUserAuthed();
      //   console.log(this.temp);
      //   this.authed = this.temp;
         
      //   if(this.authed == true){
      //     this.username = this.user.getUsername();
      //     console.log(this.username);
      //   }
    }

    logOut() {
      this.user.logOut();
    }
}
