import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientsService {
  result:any;
  readonly ROOT_URL = 'http://localhost:3000';
  
  constructor(private _http: Http, private router: Router) { }
  getClients(){
    if(localStorage.getItem("token")!= null){
      return this._http.get('/api/clients', {params: {token:localStorage.getItem("token")}}).map(result => this.result = result.json().data);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  setClient(t:Client){
    if(localStorage.getItem("token") != null){
      this._http.post(this.ROOT_URL+'/api/clients', {params: {token:localStorage.getItem("token"), client:t}}).subscribe((response: any)=>{
        if(response.status === 200){
          console.log('success');
        }
     });
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  deleteClient(t:Client){
    if(localStorage.getItem("token") != null){
      this._http.delete(this.ROOT_URL+'/api/clients',{params:{token:localStorage.getItem("token"),client:t._id}}).subscribe((response: any)=>{
        if(response.status === 200){
          console.log('delete success');
        }
    });
  }
  else{
    this.router.navigate(['/login']);
  }
}

}

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
