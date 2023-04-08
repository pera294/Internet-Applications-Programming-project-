
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Borrow } from '../models/borrow';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


import Chart from 'chart.js/auto';
import { getLocaleDateFormat } from '@angular/common';
import { Book } from '../models/book';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {



  constructor(private router: Router, private userService: UserService) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('login'));
   

    this.userService.getRegisteredBooks().subscribe((books: Book[]) => {
      this.allbooks = books;
    })





    this.userService.getUsersHistory(this.user.id).subscribe((hist: Borrow[]) => {
      this.history = hist;

      let prev = new Date();
      prev.setFullYear(this.curr.getFullYear() - 1);

      for (let i = 0; i < this.history.length; i++) {

        let temp = new Date(parseInt(this.history[i].date2))
        if (temp.getTime() >= prev.getTime()) {

          this.arrcnt[temp.getMonth() + this.delay]++;
        }



        let genres = this.getmyBook(this.history[i].idBook).genre.split(',');

        for (let j = 0; j < genres.length; j++) {
          this.gnrcnt[this.genrenumber(genres[j])]++;
        }






      }


      this.createChart1();
      this.createChart2();
    })

  }


  user: User;
  history: Borrow[] = [];

  allbooks: Book[] = [];

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  password2: string;
  password3: string;
  adress: string;
  phone: string;
  email: string;
  picture: File = null;

  messagePass: string;
  messageUser: string;
  messageEmail: string;

  flagFn: boolean = false;
  flagLn: boolean = false;
  flagUn: boolean = false;
  flagPass: boolean = false;
  flagAd: boolean = false;
  flagPh: boolean = false;
  flagEm: boolean = false;
  flagPic: boolean = false;

  chart1: any;
  chart2: any;


  curr = new Date();
  delay = 12 - this.curr.getMonth() - 1

  arrcnt: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  months: string[] = [
    this.monthName((this.curr.getMonth() + 2) % 12), this.monthName((this.curr.getMonth() + 3) % 12), this.monthName((this.curr.getMonth() + 4) % 12),
    this.monthName((this.curr.getMonth() + 5) % 12), this.monthName((this.curr.getMonth() + 6) % 12), this.monthName((this.curr.getMonth() + 7) % 12),
    this.monthName((this.curr.getMonth() + 8) % 12), this.monthName((this.curr.getMonth() + 9) % 12), this.monthName((this.curr.getMonth() + 10) % 12),
    this.monthName((this.curr.getMonth() + 11) % 12), this.monthName((this.curr.getMonth() + 12) % 12), this.monthName((this.curr.getMonth() + 1) % 12),
  ];



  gnrcnt: number[] = [0, 0, 0, 0, 0, 0];
  genres: string[] = ["Triler", "Horor", "Drama", "Fantastika", "Ljubavna", "Istorijska"]


  fnflag() { this.flagFn = !this.flagFn; }
  lnflag() { this.flagLn = !this.flagLn; }
  unflag() { this.flagUn = !this.flagUn; }
  passflag() { this.flagPass = !this.flagPass; }
  adflag() { this.flagAd = !this.flagAd; }
  phflag() { this.flagPh = !this.flagPh; }
  emflag() { this.flagEm = !this.flagEm; }
  picflag() { this.flagPic = !this.flagPic; }


  changeFirstname(id, firstname) {
    this.userService.changeFirstname(id, firstname).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getUser(this.user.id).subscribe((usr: User) => {
          if (usr) {
            this.user = usr;
            this.fnflag();


            localStorage.setItem('login', JSON.stringify(this.user));


            location.reload();
          }

        })
      }

    })
  }

  changeLastname(id, lastname) {
    this.userService.changeLastname(id, lastname).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getUser(this.user.id).subscribe((usr: User) => {
          if (usr) {
            this.user = usr;
            this.lnflag();


            localStorage.setItem('login', JSON.stringify(this.user));


            location.reload();
          }

        })
      }

    })
  }

  changeAdress(id, adress) {
    this.userService.changeAdress(id, adress).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getUser(this.user.id).subscribe((usr: User) => {
          if (usr) {
            this.user = usr;
            this.adflag();


            localStorage.setItem('login', JSON.stringify(this.user));


            location.reload();
          }

        })
      }

    })
  }

  changePhone(id, phone) {
    this.userService.changePhone(id, phone).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getUser(this.user.id).subscribe((usr: User) => {
          if (usr) {
            this.user = usr;
            this.phflag();


            localStorage.setItem('login', JSON.stringify(this.user));


            location.reload();
          }

        })
      }

    })
  }


  changePassword(id, password, password2, password3) {

    if (password2 != password3) {
      this.messagePass = "Lozinke se ne poklapaju";
    }
    else {

      this.userService.changePassword(id, password, password2).subscribe(respObj => {

        if (respObj['message'] == "ok") {
          this.userService.getUser(this.user.id).subscribe((usr: User) => {
            if (usr) {
              this.user = usr;
              this.passflag();


              localStorage.setItem('login', JSON.stringify(this.user));


              this.logOut();
            }

          })
        }
        else {
          this.messagePass = "Pogresna lozinka";
        }

      })

    }

  }


  changeUsername(id, username) {

    this.userService.checkUsername(username).subscribe(respObj => {
      if (respObj['message'] == "ok") {

        this.userService.changeUsername(id, username).subscribe(respObj => {

          if (respObj['message'] == "ok") {
            this.userService.getUser(this.user.id).subscribe((usr: User) => {
              if (usr) {
                this.user = usr;
                this.unflag();


                localStorage.setItem('login', JSON.stringify(this.user));


                location.reload();
              }

            })
          }

        })



      }

      else {
        this.messageUser = "Korisnicko ime vec postoji";
      }
    })




  }


  changeEmail(id, email) {

    this.userService.checkEmail(email).subscribe(respObj => {
      if (respObj['message'] == "ok") {

        this.userService.changeEmail(id, email).subscribe(respObj => {

          if (respObj['message'] == "ok") {
            this.userService.getUser(this.user.id).subscribe((usr: User) => {
              if (usr) {
                this.user = usr;
                this.emflag();


                localStorage.setItem('login', JSON.stringify(this.user));


                location.reload();
              }

            })
          }

        })



      }

      else {
        this.messageEmail = "Email vec postoji";
      }
    })




  }



  changePicture(id) {

    let data = new FormData();

    data.append('flag', "profile");
    data.append('id', id.toString());
    data.append('profile_picture', this.picture);

    this.userService.changePicture(data).subscribe(respObj => {

      if (respObj['message'] == "ok") {
        this.userService.getUser(this.user.id).subscribe((usr: User) => {
          if (usr) {
            this.user = usr;
            this.picflag();


            localStorage.setItem('login', JSON.stringify(this.user));


            location.reload();
          }

        })
      }



    });

  }


  setPicture(event) {
    this.picture = event.target.files[0]
  }



  createChart1() {


    this.chart1 = new Chart("MyChart1", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.months,
        datasets: [
          {
            label: "Procitane knjige",
            data: this.arrcnt,
            backgroundColor: 'blue'
          },

        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }


  createChart2() {


    this.chart2 = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.genres,
        datasets: [
          {
            label: "Procitane knjige",
            data: this.gnrcnt,
            backgroundColor: 'blue'
          },

        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }





  monthName(num) {
    let name: string;
    switch (num) {
      case 1: name = "Januar"; break;
      case 2: name = "Februar"; break;
      case 3: name = "Mart"; break;
      case 4: name = "April"; break;
      case 5: name = "Maj"; break;
      case 6: name = "Jun"; break;
      case 7: name = "Jul"; break;
      case 8: name = "Avgust"; break;
      case 9: name = "Septembar"; break;
      case 10: name = "Oktobar"; break;
      case 11: name = "Novembar"; break;
      case 0: name = "Decembar"; break;
    }
    return name;
  }

  genrenumber(genre) {

    let nmb: number = null;
    switch (genre) {
      case "Triler": nmb = 0; break;
      case "Horor": nmb = 1; break;
      case "Drama": nmb = 2; break;
      case "Fantastika": nmb = 3; break;
      case "Ljubavna": nmb = 4; break;
      case "Istorijska": nmb = 5; break;

    }
    return nmb;

  }


  getmyBook(idbook) {

    for (let i = 0; i < this.allbooks.length; i++) {
      if (this.allbooks[i].id == idbook) {
        return this.allbooks[i];

      }
    }


    return null;
  }




  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
