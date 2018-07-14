import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ClientComponent } from './components/client/client.component';
import { ClientsService } from './clients.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterService } from './services/register.service';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserService} from './services/user.service';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddclientdialogComponent } from './components/addclientdialog/addclientdialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditclientdialogComponent } from './components/editclientdialog/editclientdialog.component';
import { ChartsModule } from 'ng2-charts';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
};

const appRoute: Routes =[
    {path:'dashboard', component: ClientComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},    
    {path:'', component:HomeComponent},
    {path:'**', component:PagenotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ClientComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PagenotfoundComponent,
    AddclientdialogComponent,
    EditclientdialogComponent
  ],
  entryComponents: [
    AddclientdialogComponent,
    EditclientdialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoute),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatMenuModule,
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatPaginatorModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        whitelistedDomains:['localhost:3000'],
        blacklistedRoutes:['localhost:3000/auth']
      }
    })
  ],
  exports: [
    RouterModule
    ],
  providers: [ClientsService,
  RegisterService,
  UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
