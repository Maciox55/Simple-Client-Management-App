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
  selector: 'app-addclientdialog',
  templateUrl: './addclientdialog.component.html',
  styleUrls: ['./addclientdialog.component.css']
})
export class AddclientdialogComponent implements OnInit {

  test : Client = new Client();
  @ViewChild('c') form: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddclientdialogComponent>) { }

  ngOnInit() {
  }
  addClient(c:NgForm){
    if(this.form.valid){
    // this.test = c.value;  
     this.dialogRef.close(this.test);
    }
  }

}
