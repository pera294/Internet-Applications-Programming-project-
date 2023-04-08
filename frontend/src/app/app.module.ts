import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReaderComponent } from './reader/reader.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { HistoryComponent } from './history/history.component';




@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    LoginComponent,
    RegisterComponent,
    ReaderComponent,
    AdminloginComponent,
    AdminComponent,
    ModeratorComponent,
    ProfileComponent,
    AdminregisterComponent,
    BookdetailsComponent,
    HistoryComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
