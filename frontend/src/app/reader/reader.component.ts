import { getLocaleTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Borrow } from '../models/borrow';
import { Review } from '../models/review';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('login'));
    localStorage.setItem('changed', JSON.stringify(this.user));


    this.userService.getRegisteredUsers().subscribe((users: User[]) => {
      this.registeredUsers = users;
    })



    this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
      this.allbooks = books;

      this.calculateTodayIndex();
      this.BookOfTheDay = this.allbooks[this.todayindex];

      this.userService.getBooksReviews(this.BookOfTheDay.id).subscribe((reviews: Review[]) => {
        this.myReviews = reviews;
        this.calculatemidStars();


      })

    })


    this.userService.getmyBorrowedBooksID(this.user.id).subscribe((booksIds: number[]) => {

      this.myBooksIDs = booksIds;

      this.myBooksIDs.forEach(bookID => {

        this.userService.getBook(bookID).subscribe((book: Book) => {
          this.myBooks.push(book);
        })

      });


      //console.log(this.myBooks);

      this.userService.getUsersBorrows(this.user.id).subscribe((borrows: Borrow[]) => {
        this.myBorrows = borrows;
        //console.log("my borrows");

        // console.log(this.myBorrows);

      })

    })






  }


  user: User;
  registeredUsers: User[] = [];


  title: string;
  authors: string;
  genre: string;
  publisher: string;
  year: string;
  language: string;
  picture: File = null;


  one: Number = 1;
  message: string;


  searchTitle: string;
  searchAuthors: string;

  searchGenre: string=null;
  searchYearFrom: string=null;
  searchYearTo: string=null;
  searchPublisher: string;

  searchflag: boolean = false;
  searchedBooks: Book[] = [];
  selectedBook: Book;

  maxId: Number;


  myBooksIDs: number[];
  myBooks: Book[] = [];
  myBorrows: Borrow[];


  todayindex: number;
  allbooks: Book[] = [];
  BookOfTheDay: Book;
  midstars: number;
  myReviews: Review[] = [];




  calculatemidStars() {
    this.midstars = 0;
    this.myReviews.forEach(element => {
      //console.log(element.stars);
      this.midstars += element.stars;
    });

    if (this.myReviews.length > 0) {
      this.midstars = this.midstars / this.myReviews.length;
    }
  }



  calculateTodayIndex() {
    let date = new Date(Date.now());
    this.todayindex = (date.getFullYear() + date.getMonth() + date.getDate()) % this.allbooks.length;
  }



  BasicSearchBooks(title, authors) {

    this.userService.BasicSearchBooks(title, authors).subscribe((data: Book[]) => {
      this.searchedBooks = data
      this.searchflag = true;
    })

  }



  AdvancedSearchBooks(title, authors,publisher) {
    this.searchedBooks=[];
    
    let yearfrom:number;
    let yearto:number;

    if(this.searchGenre==null){ this.searchGenre=''}
    let genres=(this.searchGenre.toString()).split(',');
    console.log(genres);

    if(this.searchYearFrom==null)yearfrom=0;
    else yearfrom=parseInt(this.searchYearFrom)

    if(this.searchYearTo==null)yearto=9999;
    else yearto=parseInt(this.searchYearTo)
    
    
   
    
    this.userService.preAdvancedSearchBooks(title,authors,publisher).subscribe((data: Book[]) => {

      data.forEach(element => {
        let yearnum=parseInt(element.year)
        
        
        if(yearnum>=yearfrom && yearnum<=yearto ){

          for(let i=0;i<genres.length;i++){
           if(element.genre.includes(genres[i])){
            this.searchedBooks.push(element);
            break;
           }
          }
         
        
        }


      });

      //this.searchedBooks = data
      this.searchflag = true;
      this.searchYearFrom=null;
      this.searchYearTo=null;
    })

  }


  bookDetails(idForm) {

    this.userService.getBook(idForm).subscribe((book: Book) => {
      this.selectedBook = book;

      localStorage.setItem('book', JSON.stringify(this.selectedBook));
      this.router.navigate(['bookdetails']);

    })

  }

  getmyBorrowedBooksID() {

    this.userService.getmyBorrowedBooksID(this.user.id).subscribe((books: Book[]) => {
      this.myBooks = books;
    })



  }


  addBook() {

    if (this.genre.length <= 3) {



      this.userService.getMaxIdBook().subscribe((id: number) => {

        this.maxId = id + 1;
        let data = new FormData()
        data.append('title', this.title)
        data.append('authors', this.authors)
        data.append('genre', this.genre.toString())
        data.append('publisher', this.publisher)
        data.append('year', this.year)
        data.append('language', this.language)

        data.append('status', "nije prihvacen")
        data.append('asker', this.user.id.toString());

        data.append('amount', this.one.toString());


        data.append('flag', 'book')
        data.append('id', this.maxId.toString())
        data.append('book_picture', this.picture)

        this.userService.addBook(data).subscribe(respObj => {
          if (respObj['message'] == "ok") {
            this.message = "Zahtev je poslat";


          }
          else {
            this.message = "greska";

          }
        })


      })



    }
    else {
      this.message = "Previse zanrova";
    }








  }




  setPicture(event) {
    this.picture = event.target.files[0]
  }



  calculateRemainingTime(idbook) {

    let today = (Date.now()).toString();

    let i = 0;
    for (i; i < this.myBorrows.length; i++) {
      if (this.myBorrows[i].idBook == idbook) {
        let remaining = parseInt(this.myBorrows[i].datedue) - parseInt(today)
        //console.log(remaining);
        return Math.round(remaining / 1000 / 60 / 60 / 24);

      }

    }
    return 0;


  }


  returnBook(bookid) {

    this.userService.returnBook(this.user.id, bookid).subscribe(respObj => {

      this.userService.getmyBorrowedBooksID(this.user.id).subscribe((booksIds: number[]) => {

        this.myBooksIDs = booksIds;

        this.myBooks = [];

        this.myBooksIDs.forEach(bookID => {

          this.userService.getBook(bookID).subscribe((book: Book) => {
            this.myBooks.push(book);
          })

        });

        //console.log(this.myBooks);

        this.userService.getUsersBorrows(this.user.id).subscribe((borrows: Borrow[]) => {
          this.myBorrows = borrows;
          console.log("my borrows");

         // console.log(this.myBorrows);

        })

      })






    })
  }


  gotoHistory() {

    this.router.navigate(['history']);

  }

  getMyUserUsername(id) {
    for (let i = 0; i < this.registeredUsers.length; i++) {
      if (this.registeredUsers[i].id == id) return this.registeredUsers[i].username
    }
    return "Nepoznato";
  }



  extendBorrow(bookid) {
    this.userService.getTime().subscribe((time: number) => {


      let borrow:Borrow=this.getmyBorrow(bookid);


      let temp = parseInt(borrow.datedue);
      temp = (temp + time * 24 * 60 * 60 * 1000);

      this.userService.changedatedue(borrow.id, temp.toString()).subscribe(resp => { 

        location.reload()
      })



    })


  }



  getmyBorrow(idbook){

    for (let i = 0; i < this.myBorrows.length; i++) {
      if (this.myBorrows[i].idBook == idbook) {
        return this.myBorrows[i];
        
      }
    }


    return null;
  }






  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }


}
