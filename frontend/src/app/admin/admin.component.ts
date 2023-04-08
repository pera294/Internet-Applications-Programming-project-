import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookdetailsComponent } from '../bookdetails/bookdetails.component';
import { Book } from '../models/book';
import { Borrow } from '../models/borrow';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('adminlogin'));

    this.userService.getPendingUsers().subscribe((users: User[]) => {
      this.pendingUsers = users;
    })

    this.userService.getRegisteredUsers().subscribe((users: User[]) => {
      this.registeredUsers = users;
    })

    this.userService.getTime().subscribe((time: number) => {
      this.time = time;
    })


    this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
      this.registeredBooks = books;
    })

    this.userService.unreturnedBorrows().subscribe((borrows: Borrow[]) => {
      this.unreturned = borrows;
    })

    this.userService.getPendingBooks().subscribe((books: Book[]) => {
      this.pendingBooks = books;
    })


  }

  user: User;

  pendingUsers: User[];
  registeredUsers: User[];
  message: string;



  title: string;
  authors: string;
  genre: string;
  publisher: string;
  year: string;
  language: string;
  picture: File = null;

  maxId: Number;

  one: Number = 1;

  pendingBooks: Book[] = [];
  registeredBooks: Book[] = [];
  selectedBook: Book;


  unreturned: Borrow[] = [];


  time: number;
  time2: number;
  flagtime: boolean = false;

  timeflag() { this.flagtime = !this.flagtime; }

  logOut() {
    localStorage.clear();
    this.router.navigate(['adminlogin']);
  }

  approveUser(idForm) {
    this.userService.approveUser(idForm).subscribe(respObj => {
      if (respObj['message'] == "ok") {
        this.message = "zahtev odobren"
        this.userService.getPendingUsers().subscribe((users: User[]) => {
          this.pendingUsers = users;
        })
        this.userService.getRegisteredUsers().subscribe((users: User[]) => {
          this.registeredUsers = users;
        })
      }
      else {
        this.message = "greska"
      }
    });
  }

  denyUser(idForm, picture) {
    this.userService.denyUser(idForm, picture).subscribe(respObj => {
      if (respObj['message'] == "ok") {
        this.message = "zahtev odbijen"
        this.userService.getPendingUsers().subscribe((users: User[]) => {
          this.pendingUsers = users;
        })
        this.userService.getRegisteredUsers().subscribe((users: User[]) => {
          this.registeredUsers = users;
        })
      }
      else {
        this.message = "greska"
      }
    });
  }

  gotoAdminRegister() {
    this.router.navigate(['adminregister']);
  }


  changeType(idForm) {
    this.userService.changeType(idForm).subscribe(respObj => {
      if (respObj['message'] == "ok") {

        this.userService.getRegisteredUsers().subscribe((users: User[]) => {
          this.registeredUsers = users;
        })
      }
      else {
        this.message = "greska"
      }
    });
  }

  changeBlocked(idForm) {
    this.userService.changeBlocked(idForm).subscribe(respObj => {
      if (respObj['message'] == "ok") {

        this.userService.getRegisteredUsers().subscribe((users: User[]) => {
          this.registeredUsers = users;
        })
      }
      else {
        this.message = "greska"
      }
    });
  }



  setTime(val) {
    if (!val) val = 14;
    this.userService.setTime(val).subscribe(respObj => {
      if (respObj['message'] == "ok") {

        this.userService.getTime().subscribe((days: number) => {
          this.time = days;
          this.timeflag();
        })
      }
      else {
        this.message = "greska"
      }
    });
  }



  bookDetails(idForm) {

    this.userService.getBook(idForm).subscribe((book: Book) => {
      this.selectedBook = book;

      localStorage.setItem('book', JSON.stringify(this.selectedBook));
      localStorage.setItem('login', JSON.stringify(this.user));
      this.router.navigate(['bookdetails']);

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

        data.append('status', "prihvacen")
        data.append('asker', this.user.id.toString());

        data.append('amount', this.one.toString());


        data.append('flag', 'book')
        data.append('id', this.maxId.toString())
        data.append('book_picture', this.picture)

        this.userService.addBook(data).subscribe(respObj => {
          if (respObj['message'] == "ok") {
            this.message = "Knjiga je dodata";
            this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
              this.registeredBooks = books;
            })

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





  canDeleteBook(bookid) {

    for (let i = 0; i < this.unreturned.length; i++) {
      if (bookid == this.unreturned[i].idBook) return false;
    }

    return true;

  }

  canDeleteUser(userid) {

    for (let i = 0; i < this.unreturned.length; i++) {
      if (userid == this.unreturned[i].idUser) return false;
    }

    return true;

  }


  deleteBook(bookid, picture) {
    this.userService.denyBook(bookid, picture).subscribe(resp => {

      this.userService.deleteReviewsforBook(bookid).subscribe(resp => {

        this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
          this.registeredBooks = books;

        })


      })
    })
  }


  deleteUser(userid, picture) {
    this.userService.denyUser(userid, picture).subscribe(resp => {
      this.userService.getRegisteredUsers().subscribe((users: User[]) => {
        this.registeredUsers = users;
      })


    })
  }


  changeUserProfile(userid) {
    this.userService.getUser(userid).subscribe((usr: User) => {
      localStorage.setItem('login', JSON.stringify(usr));
      this.router.navigate(['profile']);
    })
  }


  profilechange() {
    localStorage.setItem('adminlogin', JSON.stringify(this.user));
    localStorage.setItem('login', JSON.stringify(this.user));
    this.router.navigate(['profile']);

  }

  approveBook(idForm) {
    this.userService.approveBook(idForm).subscribe(respObj => {
      if (respObj['message'] == "ok") {
        this.message = "zahtev odobren"
        this.userService.getPendingBooks().subscribe((books: Book[]) => {
          this.pendingBooks = books;
        })
        this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
          this.registeredBooks = books;
        })
      }
      else {
        this.message = "greska"
      }
    });
  }

  denyBook(idForm, picture) {
    this.userService.denyBook(idForm, picture).subscribe(respObj => {
      if (respObj['message'] == "ok") {
        this.message = "zahtev odbijen"
        this.userService.getPendingBooks().subscribe((books: Book[]) => {
          this.pendingBooks = books;
        })
        this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
          this.registeredBooks = books;
        })
      }
      else {
        this.message = "greska"
      }
    });
  }


  getMyUserUsername(id){
    for(let i=0;i<this.registeredUsers.length;i++){
      if(this.registeredUsers[i].id==id) return this.registeredUsers[i].username
    }
    return "Nepoznato";
  }





}
