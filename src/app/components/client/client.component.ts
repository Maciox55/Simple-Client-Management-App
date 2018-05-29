import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '../../clients.service';
import {MaterializeAction} from 'angular2-materialize';
import { NgModule } from '@angular/core';

import {EventEmitter} from'@angular/core';
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

class Client {
  constructor(
    public name:string ='',
    public address:string ='',
    public phoneNumber:string ='',
    public email:string='',
    public website:string = '',
    public packageActive:boolean=false,
    public packageExpires:string='',
    public _id:string ='',
    public paymentDue:number = null

  ){};

}
@NgModule({
  imports: [
      FormsModule,
      ReactiveFormsModule
  ]
})
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  text = '';
  clients: Array<any>;

  test : Client = new Client();
  @ViewChild('c') form: any;
  constructor(private _clientService: ClientsService) { 
    
  }

  ngOnInit() {
    this.getClient();
  }
  modalActions = new EventEmitter<string|MaterializeAction>();


  openModal(){
    this.modalActions.emit({action:"modal",params:['open']});
    
  }
  closeModal(){
    this.modalActions.emit({action:"modal",params:['close']});
    
  }
  getClient(){
    this._clientService.getClients().subscribe(res => this.clients = res);
  }

  addClient(c : NgForm){
    if(this.form.valid){
      this._clientService.setClient(this.test);  
      this.getClient(); 
      this.form.reset();      
    }
    this.modalActions.emit({action:"modal",params:['close']});

  }
  editClient(cli: Client){
    this.modalActions.emit({action:"modal2",params:['open']});
    console.log(cli._id);
  }
  deleteClient(cli: Client){
    this._clientService.deleteClient(cli);
    this.getClient(); 
  }
}
