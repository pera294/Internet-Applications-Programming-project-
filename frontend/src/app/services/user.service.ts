import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ReadVarExpr } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameForm, passwordForm) {
    const data = {
      username: usernameForm,
      password: passwordForm,
    }

    return this.http.post(`${this.uri}/user/login`, data);
  }

  register(data) {
    return this.http.post(`${this.uri}/user/register`, data)
  }


  checkUsername(usernameForm) {

    const data = {
      username: usernameForm
    }
    return this.http.post(`${this.uri}/user/checkUsername`, data)

  }

  checkEmail(emailForm) {

    const data = {
      email: emailForm
    }

    return this.http.post(`${this.uri}/user/checkEmail`, data)

  }

  getMaxId() {
    return this.http.get(`${this.uri}/user/getMaxId`);
  }

  getUser(idForm) {
    const data = {
      id: idForm
    }

    return this.http.post(`${this.uri}/user/getUser`, data);
  }

  getPendingUsers() {
    return this.http.get(`${this.uri}/user/getPendingUsers`);
  }

  getRegisteredUsers() {
    return this.http.get(`${this.uri}/user/getRegisteredUsers`);
  }

  approveUser(userId) {
    const data = {
      id: userId
    }
    return this.http.post(`${this.uri}/user/approveUser`, data)

  }

  denyUser(userId, picture) {
    const data = {
      id: userId,
      picture: picture
    }
    return this.http.post(`${this.uri}/user/denyUser`, data)
  }

  changeUsername(userId, usernameForm) {
    const data = {
      id: userId,
      username: usernameForm
    }
    return this.http.post(`${this.uri}/user/changeUsername`, data)
  }

  changePassword(userId, passwordForm, password2Form) {
    const data = {
      id: userId,
      password: passwordForm,
      password2: password2Form
    }
    return this.http.post(`${this.uri}/user/changePassword`, data)
  }

  changeFirstname(userId, firstnameForm) {
    const data = {
      id: userId,
      firstname: firstnameForm
    }
    return this.http.post(`${this.uri}/user/changeFirstname`, data)
  }

  changeLastname(userId, lastnameForm) {
    const data = {
      id: userId,
      lastname: lastnameForm
    }
    return this.http.post(`${this.uri}/user/changeLastname`, data)
  }

  changeAdress(userId, adressForm) {
    const data = {
      id: userId,
      adress: adressForm
    }
    return this.http.post(`${this.uri}/user/changeAdress`, data)
  }

  changePhone(userId, phoneForm) {
    const data = {
      id: userId,
      phone: phoneForm
    }
    return this.http.post(`${this.uri}/user/changePhone`, data)
  }

  changeEmail(userId, emailForm) {
    const data = {
      id: userId,
      email: emailForm
    }
    return this.http.post(`${this.uri}/user/changeEmail`, data)
  }

  changePicture(data) {
    return this.http.post(`${this.uri}/user/changePicture`, data)
  }

  changeType(userId) {
    const data = {
      id: userId
    }
    return this.http.post(`${this.uri}/user/changeType`, data)
  }

  changeBlocked(userId) {
    const data = {
      id: userId
    }
    return this.http.post(`${this.uri}/user/changeBlocked`, data)
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  addBook(data) {
    return this.http.post(`${this.uri}/user/addBook`, data)
  }

  getMaxIdBook() {
    return this.http.get(`${this.uri}/user/getMaxIdBook`);
  }

  getBook(idForm) {
    const data = {
      id: idForm
    }

    return this.http.post(`${this.uri}/user/getBook`, data);
  }

  getRegisteredBooks() {
    return this.http.get(`${this.uri}/user/getRegisteredBooks`);
  }

  getPendingBooks() {
    return this.http.get(`${this.uri}/user/getPendingBooks`);
  }



  approveBook(bookId) { //change status to "prihvacen"
    const data = {
      id: bookId
    }
    return this.http.post(`${this.uri}/user/approveBook`, data)

  }

  denyBook(bookId, picture) {
    const data = {
      id: bookId,
      picture: picture
    }
    return this.http.post(`${this.uri}/user/denyBook`, data)
  }

  changeBookPicture(data) {
    return this.http.post(`${this.uri}/user/changeBookPicture`, data)
  }

  changeTitle(userId, title) {
    const data = {
      id: userId,
      title: title
    }
    return this.http.post(`${this.uri}/user/changeTitle`, data)
  }

  changeAuthors(userId, authors) {
    const data = {
      id: userId,
      authors: authors
    }
    return this.http.post(`${this.uri}/user/changeAuthors`, data)
  }

  changeGenre(userId, genre) {
    const data = {
      id: userId,
      genre: genre
    }
    return this.http.post(`${this.uri}/user/changeGenre`, data)
  }

  changePublisher(userId, publisher) {
    const data = {
      id: userId,
      publisher: publisher
    }
    return this.http.post(`${this.uri}/user/changePublisher`, data)
  }

  changeYear(userId, year) {
    const data = {
      id: userId,
      year: year
    }
    return this.http.post(`${this.uri}/user/changeYear`, data)
  }

  changeLanguage(userId, language) {
    const data = {
      id: userId,
      language: language
    }
    return this.http.post(`${this.uri}/user/changeLanguage`, data)
  }

  changeAmount(userId, amount) {
    const data = {
      id: userId,
      amount: amount
    }
    return this.http.post(`${this.uri}/user/changeAmount`, data)
  }


  BasicSearchBooks(title, authors) {
    const data = {
      title: title,
      authors: authors,

    }

    return this.http.post(`${this.uri}/user/BasicSearchBooks`, data);

  }


  preAdvancedSearchBooks(title, authors,publisher) {
    const data = {
      title: title,
      authors: authors,
     
      publisher: publisher,

    }

    return this.http.post(`${this.uri}/user/preAdvancedSearchBooks`, data);

  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  getTime() {
    return this.http.get(`${this.uri}/user/getTime`);

  }


  setTime(time) {
    const data = {
      time: time
    }
    return this.http.post(`${this.uri}/user/setTime`, data)
  }



  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




  getMaxIdBorrow() {
    return this.http.get(`${this.uri}/user/getMaxIdBorrow`);
  }

  borrowBook(idUser, idBook, date1, date2, datedue, returned, id) {

    const data = {
      userid: idUser,
      bookid: idBook,
      date1: date1,
      date2: date2,
      datedue: datedue,
      extended: false,
      returned: returned,
      id: id

    }

    return this.http.post(`${this.uri}/user/borrowBook`, data);
  }


  getmyBorrowedBooksID(userid) {
    const data = {
      userid: userid
    }

    return this.http.post(`${this.uri}/user/getMyBorrowedBooksID`, data)
  }


  getUsersBorrows(userid) {
    const data = {
      userid: userid
    }

    return this.http.post(`${this.uri}/user/getUsersBorrows`, data);

  }

  getUsersHistory(userid) {
    const data = {
      userid: userid
    }

    return this.http.post(`${this.uri}/user/getUsersHistory`, data);

  }

  getBorrowTime(userid, bookid) {
    const data = {
      userid: userid,
      bookid: bookid
    }

    return this.http.post(`${this.uri}/user/getBorrowTime`, data);

  }

  returnBook(userid, bookid) {
    const data = {
      userid: userid,
      bookid: bookid
    }

    return this.http.post(`${this.uri}/user/returnBook`, data);

  }

  unreturnedBorrows() {
    return this.http.get(`${this.uri}/user/unreturnedBorrows`);
  }
  
  getBorrow(userid,bookid){
    const data = {
      userid: userid,
      bookid: bookid,
    }

    return this.http.post(`${this.uri}/user/getBorrow`, data);

  }

  changedatedue(borrowid,datedue){
    const data = {
      borrowid: borrowid,
      datedue: datedue,
    }

    return this.http.post(`${this.uri}/user/changedatedue`, data);

  }




  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  getMaxIdReview() {
    return this.http.get(`${this.uri}/user/getMaxIdReview`);
  }


  addReview(idUser, idBook, comment, stars, date, edited, id) {

    const data = {
      userid: idUser,
      bookid: idBook,
      comment: comment,
      stars: stars,
      date: date,
      edited: edited,
      id: id

    }

    return this.http.post(`${this.uri}/user/addReview`, data);
  }


  getBooksReviews(idBook) {

    const data = {
      bookid: idBook,
    }

    return this.http.post(`${this.uri}/user/getBooksReviews`, data);
  }

  changeReview(id, comment,stars,date) {
    const data = {
      id: id,
      comment: comment,
      stars: stars,
      date: date
    }
    return this.http.post(`${this.uri}/user/changeReview`, data)
  }


 

  deleteReviewsforBook(bookid) {
    const data = {
      bookid: bookid,
     
    }
    return this.http.post(`${this.uri}/user/deleteReviewsforBook`, data)
  }




}




