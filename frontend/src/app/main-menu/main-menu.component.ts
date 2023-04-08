import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getRegisteredUsers().subscribe((users:User[])=>{
      this.registeredUsers=users;
    })

    this.userService.getRegisteredBooks().subscribe((books:Book[])=>{
      this.allbooks=books;
      //console.log(this.allbooks);
      this.allbooks.sort((a,b)=> b.borrowcnt-a.borrowcnt)

      //console.log(this.allbooks);

      if(this.allbooks[0]) this.top3books[0]=this.allbooks[0];
      if(this.allbooks[1]) this.top3books[1]=this.allbooks[1];
      if(this.allbooks[2]) this.top3books[2]=this.allbooks[2];
      
    })




  }



  registeredUsers:User[];
  
  searchTitle: string;
  searchAuthors: string;
  searchedBooks:Book[];

  
  allbooks:Book[]=[];

  top3books:Book[]=[];
  currindex:number=0;


  currindexchange(mode){
    if(this.top3books.length>1){
      if(mode==true){
        this.currindex=(this.currindex+1)%this.top3books.length
      }
      else if(mode==false){
        this.currindex=(this.currindex-1+3)%this.top3books.length

      }
    }

  }
 
  BasicSearchBooks(title,authors){

      this.userService.BasicSearchBooks(title,authors).subscribe((data:Book[])=>{
        this.searchedBooks=data
        })
   
    }


    getMyUserUsername(id){
      for(let i=0;i<this.registeredUsers.length;i++){
        if(this.registeredUsers[i].id==id) return this.registeredUsers[i].username
      }
      return "Nepoznato";
    }
  






}
