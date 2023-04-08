import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Borrow } from '../models/borrow';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('login'));

    this.userService.getUsersHistory(this.user.id).subscribe((hist:Borrow[])=>{
      this.history=hist;

      this.userService.getRegisteredBooks().subscribe((books:Book[])=>{
        this.allBooks=books;

       
        for( let i=0;i<this.history.length;i++){

          for(let j=0;j<this.allBooks.length;j++){

            if(this.history[i].idBook==this.allBooks[j].id){

              //sredi datume
              this.formatDate(this.history[i].date1,);
              this.formatDate(this.history[i].date2,);





              let data=({
                title:this.allBooks[j].title,
                authors:this.allBooks[j].authors,
                date1:this.formatDate(this.history[i].date1,),
                date2:this.formatDate(this.history[i].date2,),

                //pomocni deo za sortirajne
                date1ms:this.history[i].date1,
                date2ms:this.history[i].date2,
                surname:this.getSurname(this.allBooks[j].authors)
              })

             
              this.datatable.push(data);
              break;
            }




          }



        }
     
        this.sortmode="date2";
        this.sortTable();

      })

        

    })


    


  }



  
  user:User;

  selectedBook:Book;

 
  allBooks:Book[]=[];
  
  history:Borrow[];

  datatable=[];


  sortmode:string;



  formatDate(datestring){
    let datems=parseInt(datestring);
    let date=new Date(datems);
    let str=date.getDate().toString()+"."+(date.getMonth()+1).toString()+"."+date.getFullYear().toString();
    return str;
  }

  getSurname(authors){

  let str= (authors.split(' ')[1]).split(',')[0];
  return str;

  }


  sortTable(){

    switch(this.sortmode){

      case "title": //title

      
      this.datatable.sort( (a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));


      break;

      case "authors": //surname

      this.datatable.sort( (a,b) => (a.surname > b.surname) ? 1 : ((b.surname > a.surname) ? -1 : 0));
        

      break;

      case "date1": //date1

      this.datatable.sort( (a,b)=> b.date1ms-a.date1ms);
        

      break;

      case "date2": //date2

      this.datatable.sort( (a,b)=> b.date2ms-a.date2ms);

      break;
      


    }

  }
  



  bookDetails(idForm){
   
    this.userService.getBook(idForm).subscribe((book:Book)=>{
     this.selectedBook=book;
 
     localStorage.setItem('book', JSON.stringify(this.selectedBook));
     this.router.navigate(['bookdetails']);
 
    })
     
  }


  

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
