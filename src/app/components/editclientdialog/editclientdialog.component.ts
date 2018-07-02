import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import {MatInputModule, MatFormFieldModule,MatDialog,MatDialogRef} from '@angular/material';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
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


@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    NgModel,
    NgForm
  ]
})

@Component({
  selector: 'app-editclientdialog',
  templateUrl: './editclientdialog.component.html',
  styleUrls: ['./editclientdialog.component.css']
})
export class EditclientdialogComponent implements OnInit {
  
  
  test : Client = new Client();
  @ViewChild('e') form: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditclientdialogComponent>) { }
  
  ngOnInit() {
    this.test = this.data;
    console.log(this.data);
  }
  editClient(e:Client){
    if(this.form.valid){
    this.test = e;  
    console.log(this.test);
    this.dialogRef.close(e);
    }
  }
}
    