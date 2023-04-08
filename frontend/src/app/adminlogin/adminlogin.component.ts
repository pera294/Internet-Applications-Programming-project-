import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user){

        if(user.type!="admin"){
          this.message="dozvoljeni su samo administratori";
        }
        else{
          localStorage.setItem('adminlogin', JSON.stringify(user));
        
          this.ruter.navigate(['admin']);

        }
       
      }
      else{
        this.message = "Pogresno korisnicko ime ili lozinka";
      }
      
    })
  }

}
