import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '../../clients.service';
import { NgModule } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {EventEmitter} from'@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from'@angular/material';
import {PageEvent,MatSortModule} from '@angular/material';
import {Client} from '../../../../Client';
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
import { AddclientdialogComponent } from '../addclientdialog/addclientdialog.component';
import { EditclientdialogComponent } from '../editclientdialog/editclientdialog.component';

 
@NgModule({
  imports: [
      FormsModule,
      MatSortModule,
      ReactiveFormsModule,
      MatTableModule,
      MatPaginator,
      MatDialog,
      MatDialogRef,
      MatCheckboxModule
  ]
})
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  text = '';
  clients: Array<Client>;
  displayedColumns = ['name','email','street','website','packageActive','paymentDue','actions'];
  test : Client = new Client();
  opened: boolean;
  @ViewChild('c') form: any;
  @ViewChild('e') editform: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;

  public financeChartLabel:string[] = ['Paid','Unpaid'];
  public financeData:number[] = [329.99,19.99];
  public chartType:string = 'doughnut';

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  constructor(private _clientService: ClientsService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getClient();
  }
  openDialog() {
    let dialogRef = this.dialog.open(AddclientdialogComponent, {
      width: '450px',
      height:"650px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('The dialog was closed ' + result);
        this._clientService.setClient(result);  
        this.getClient(); 
      }

    });
  }

  openModal(){
    this.openDialog()
  }
  closeModal(){
    
  }
  getClient(){
    this._clientService.getClients().subscribe(res => {
      this.dataSource = new MatTableDataSource<Client>(res);
      this.dataSource.paginator = this.paginator;
      this.clients = res;
      console.log(this.clients);
      this.iterator();
    });
  }
  editClientModal(cli:Client){
   let dialogRef = this.dialog.open(EditclientdialogComponent,{
      data: cli,
      width: '450px',
      height:"650px"
   });

   dialogRef.afterClosed().subscribe(result =>{
      if(result)
      {
        console.log("test");
        this._clientService.editClient(result);
      }

   });
  }

  addClient(c:NgForm){
    if(this.form.valid){
      
      this.form.reset();      
    }
  }

  deleteClient(cli: Client){
    this._clientService.deleteClient(cli);
    this.getClient(); 
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator(){
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.clients.slice(start, end);
    this.dataSource = part;

  }

  
}
