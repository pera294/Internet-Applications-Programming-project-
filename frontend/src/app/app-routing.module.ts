import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { ReaderComponent } from './reader/reader.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: MainMenuComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'adminlogin', component: AdminloginComponent},
  {path: 'adminregister', component: AdminregisterComponent},
  {path: 'bookdetails', component: BookdetailsComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'reader', component: ReaderComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: MainMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
