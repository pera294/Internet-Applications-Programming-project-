import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{

      if(user){

        if(user.type=="admin"){
          this.message="administratori imaju posebnu formu";
         
        }
        else{
          localStorage.setItem('login', JSON.stringify(user));
          if(user.type=="reader"){
            this.ruter.navigate(['reader'])

          }
          else {
            this.ruter.navigate(['moderator'])
          }

        }

      }
      else{
        this.message = "Pogresno korisnicko ime ili lozinka";
      }
      
    })
  }

}
