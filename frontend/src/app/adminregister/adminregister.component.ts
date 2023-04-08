import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('adminlogin'));
  }

  user:User;

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  password2:string;
  adress:string;
  phone:string;
  email:string;
  picture: string;

  message: string;
  message1: string;

  maxId:number;

  setPicture(event){
    this.picture = event.target.files[0]
  }
  
  logOut(){
    localStorage.clear();
    this.router.navigate(['adminlogin']);
  }
  

  try_to_register(){
    this.message=null;
    this.message1=null;

    if(this.password!=this.password2){
      this.message='Lozinke se ne poklapaju';
      this.message1=null
      
    }
    else{

      console.log(this.firstname);

      this.userService.checkUsername(this.username).subscribe(respObj1=>{
        if(respObj1['message']=="ok"){
         
          this.userService.checkEmail(this.email).subscribe(respObj2=>{
            if(respObj2['message']=="ok"){
             
              this.userService.getMaxId().subscribe((id:number)=>{

                this.maxId=id+1;
                let data = new FormData()
                data.append('firstname',this.firstname)
                data.append('lastname',this.lastname)
                data.append('username',this.username)
                data.append('password',this.password)
                data.append('adress',this.adress)
                data.append('phone',this.phone)
                data.append('email',this.email)
                data.append('type','reader')
                data.append('status','nije prihvacen')
                data.append('blocked','0')



                data.append('flag','profile')
                data.append('id',this.maxId.toString())
                data.append('profile_picture',this.picture)

                this.userService.register(data).subscribe(respObj3=>{
                  if(respObj3['message']=="ok"){

                    this.userService.approveUser(this.maxId).subscribe(respObj4=>{
                      if(respObj4['message']=="ok"){
                        this.message=null;
                        this.message1="Korisnik registrovan"
                      }
                      else {
                        this.message="greska";
                        this.message1=null
                      }


                    })
                    
                  
  
                  }
                  else {
                    this.message="greska";
                    this.message1=null
                  }
                })


              })



            }
            else {
              this.message="Email je vec registrovan";
              this.message1=null

            }
            
          });

        }
        else {
          this.message="Korisnicko ime vec postoji";
          this.message1=null

        }
        

      });



     

    }

   
  }




}
