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
    authed:boolean;
    temp;
    constructor(private user: UserService){}

    ngOnInit() {
      this.temp = this.user.getUserAuthed.subscribe(res => {
        console.log(res);
        this.authed = res;
      });
    }
    logOut(){
      this.user.logOut();
    }
    

}
