import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Borrow } from '../models/borrow';
import { Due } from '../models/due';
import { Review } from '../models/review';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('login'));
    this.book = JSON.parse(localStorage.getItem('book'));

    if (this.user.type != "reader") this.privilege = true;
    else this.privilege = false;

    if(this.user.type=="admin") this.adminflag=true;
    else this.adminflag=false;


    console.log(this.adminflag);

    this.userService.getTime().subscribe((tm: number) => {

      this.timeDays = tm;
      this.timeMs = this.timeDays * 24 * 60 * 60 * 1000;


    })

    this.userService.getUsersBorrows(this.user.id).subscribe((borrows: Borrow[]) => {
      this.myBorrows = borrows;

      this.cntborrowed = this.myBorrows.length;

      let i = 0;
      for (i; i < this.myBorrows.length; i++) {
        if (this.myBorrows[i].returned == false && this.myBorrows[i].idBook == this.book.id) this.havethisbook = true;
        if (this.myBorrows[i].returned == false && this.calculateRemainingTime(this.myBorrows[i].idBook) <= 0) this.cntlate++;
      }

    })

    this.userService.getUsersHistory(this.user.id).subscribe((borrows: Borrow[]) => {

      this.myhistory = borrows;

    })



    this.userService.getRegisteredUsers().subscribe((users: User[]) => {

      this.allUsers = users;

    })

    this.userService.getBooksReviews(this.book.id).subscribe((reviews: Review[]) => {

      this.myReviews = reviews;

      this.calculatemidStars();
      


      this.myReviews.sort((a, b) => parseInt(b.date) - parseInt(a.date));

    })



  }


  user: User;
  book: Book;

  privilege: boolean;

  title: string;
  authors: string;
  genre: string;
  publisher: string;
  year: string;
  language: string;
  amount: number;
  picture: File = null;

  maxId: Number;

  timeDays: number;
  timeMs: number;

  myBorrows: Borrow[] = [];
  myhistory: Borrow[] = [];


  havethisbook: boolean = false;
  cntborrowed: number;
  cntlate: number = 0;



  flagTi: boolean = false;
  flagAu: boolean = false;
  flagGe: boolean = false;
  flagPu: boolean = false;
  flagYe: boolean = false;
  flagLa: boolean = false;
  flagAm: boolean = false;
  flagPic: boolean = false;

  message: string;

  message1000: string;
  message10: string;
  message0: string;

  adminflag:boolean=false;



  tiflag() { this.flagTi = !this.flagTi; }
  auflag() { this.flagAu = !this.flagAu; }
  geflag() { this.flagGe = !this.flagGe; }
  puflag() { this.flagPu = !this.flagPu; }
  yeflag() { this.flagYe = !this.flagYe; }
  laflag() { this.flagLa = !this.flagLa; }
  amflag() { this.flagAm = !this.flagAm; }
  picflag() { this.flagPic = !this.flagPic; }

  errflag: boolean = false;


  allUsers: User[] = [];
  myReviews: Review[] = [];
  maxIdReview: number;
  comment: string;
  stars: number;


  midstars:number=0;





  borrowBook(idbook) {

    this.errflag = this.havethisbook || this.cntborrowed >= 3 || this.cntlate > 0 || this.book.amount == 0;

    if (this.errflag == false) {

      this.userService.getMaxIdBorrow().subscribe((id: number) => {

        this.maxId = id + 1;

        this.userService.borrowBook(this.user.id, idbook, (Date.now()).toString(), null, (Date.now() + this.timeMs).toString(), false, this.maxId).subscribe(respObj => {
          this.amount = this.book.amount - 1;
         
          this.changeAmount(idbook, this.amount);
         
          // this.router.navigate(['reader']);

        })

      })



    }



  }


  calculatemidStars(){
    this.midstars=0;
    this.myReviews.forEach(element => {
      console.log(element.stars);
      this.midstars+=element.stars;
    });

    if(this.myReviews.length>0){
      this.midstars=this.midstars/this.myReviews.length;
    }
    }
  



  calculateRemainingTime(idbook) {

    let today = (Date.now()).toString();

    let i = 0;
    for (i; i < this.myBorrows.length; i++) {
      if (this.myBorrows[i].idBook == idbook) {
        let remaining = parseInt(this.myBorrows[i].datedue) - parseInt(today)
        console.log(remaining);
        return Math.round(remaining / 1000 / 60 / 60 / 24);

      }

    }
    return 0;
  }

  getlocalUsername(userid) {

    let i = 0;
    for (i; i < this.allUsers.length; i++) {
      if (this.allUsers[i].id == userid) {
        return this.allUsers[i].username;

      }

    }
    return 0;

  }







  setPicture(event) {
    this.picture = event.target.files[0]
  }


  changeBookPicture(id) {

    let data = new FormData();
    data.append('flag', "book");
    data.append('id', id.toString());
    data.append('book_picture', this.picture);

    this.userService.changeBookPicture(data).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((book: Book) => {
          if (book) {
            this.book = book;
            this.picflag();

             //localStorage.clear();
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('book', JSON.stringify(this.book));



            location.reload();
          }

        })
      }



    });

  }

  changeTitle(id, title) {
    this.userService.changeTitle(id, title).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((bk: Book) => {
          if (bk) {
            this.book = bk;
            this.tiflag();

            localStorage.setItem('book', JSON.stringify(this.book));


            location.reload();
          }

        })
      }

    })
  }

  changeAuthors(id, authors) {
    this.userService.changeAuthors(id, authors).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((bk: Book) => {
          if (bk) {
            this.book = bk;
            this.auflag();

            localStorage.setItem('book', JSON.stringify(this.book));


            location.reload();
          }

        })
      }

    })
  }

  changeGenre(id, genre) {

    if (this.genre.length <= 3) {
      this.userService.changeGenre(id, genre.toString()).subscribe(respObj => {

        if (respObj['message'] == "ok") {
          this.userService.getBook(this.book.id).subscribe((bk: Book) => {
            if (bk) {
              this.book = bk;
              this.geflag();

              localStorage.setItem('book', JSON.stringify(this.book));


              location.reload();
            }

          })
        }

      })


    }
    else {
      this.message = "Previse zanrova"
    }

  }

  changePublisher(id, publisher) {
    this.userService.changePublisher(id, publisher).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((bk: Book) => {
          if (bk) {
            this.book = bk;
            this.puflag();

            localStorage.setItem('book', JSON.stringify(this.book));


            location.reload();
          }

        })
      }

    })
  }

  changeYear(id, year) {
    this.userService.changeYear(id, year).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((bk: Book) => {
          if (bk) {
            this.book = bk;
            this.yeflag();

            localStorage.setItem('book', JSON.stringify(this.book));


            location.reload();
          }

        })
      }

    })
  }

  changeLanguage(id, language) {
    this.userService.changeLanguage(id, language).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((bk: Book) => {
          if (bk) {
            this.book = bk;
            this.laflag();

            localStorage.setItem('book', JSON.stringify(this.book));


            location.reload();
          }

        })
      }

    })
  }

  changeAmount(id, amount) {
    this.userService.changeAmount(id, amount).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getBook(this.book.id).subscribe((bk: Book) => {
          if (bk) {
            this.book = bk;
           
            localStorage.setItem('book', JSON.stringify(this.book));


            location.reload();
          }

        })
      }

    })
  }



  addReview() {

    if (this.checkReviewForm()) {
      this.userService.getMaxIdReview().subscribe((id: number) => {

        this.maxIdReview = id + 1;

        this.userService.addReview(this.user.id, this.book.id, this.comment, this.stars, Date.now().toString(), false, this.maxIdReview).subscribe(respObj => {

          this.userService.getBooksReviews(this.book.id).subscribe((reviews: Review[]) => {

            this.myReviews = reviews;
            this.calculatemidStars();
            this.myReviews.sort((a, b) => parseInt(b.date) - parseInt(a.date));

          })

        })


      })


    }




  }



  checkReviewForm() {

    let ret = true;
    let retfor = false;

    this.message0 = "Nikada niste vratili ovu knjigu"

    if (this.comment.length > 1000) {
      this.message1000 = "Predugacak komentar"
      ret = false;
    }

    if (this.stars < 1 || this.stars > 10) {
      this.message10 = "Ocena mora biti od 1 do 10"
      ret = false;
    }

    console.log(this.myBorrows);
    for (let i = 0; i < this.myhistory.length; i++) {

      if (this.book.id == this.myhistory[i].idBook) {
        retfor = true;
        this.message0 = "";

        break;
      }

    }


    return ret && retfor;

  }


  changeReview(id) {

    if (this.checkReviewForm()) {
      this.userService.changeReview(id, this.comment, this.stars, Date.now().toString()).subscribe(respObj => {

        this.userService.getBooksReviews(this.book.id).subscribe((reviews: Review[]) => {

          this.myReviews = reviews;

          this.calculatemidStars();
          this.myReviews.sort((a, b) => parseInt(b.date) - parseInt(a.date));

        })


      })



    }



  }


  canaddReview() {

    for (let i = 0; i < this.myReviews.length; i++) {
      if (this.user.id == this.myReviews[i].idUser) return false
    }
    return true;

  }

  getmyReviewId() {
    for (let i = 0; i < this.myReviews.length; i++) {
      if (this.user.id == this.myReviews[i].idUser) return this.myReviews[i].id;
    }
    return null;

  }





  formatDate(datestring) {
    let datems = parseInt(datestring);
    let date = new Date(datems);
    let str = date.getHours() + "h:" + date.getMinutes() + "m  " + date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString();
    return str;
  }


  formatStars(nmbr) {
    let limit = parseInt(nmbr);
    let str = '';

    for (let i = 0; i < limit; i++) {
      str = str + '*';
    }

    return str;
  }


  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
