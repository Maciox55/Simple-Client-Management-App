import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { FormsModule} from '@angular/forms';
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
import { MaterializeModule } from "angular2-materialize";


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
    PagenotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoute),
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterializeModule
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
