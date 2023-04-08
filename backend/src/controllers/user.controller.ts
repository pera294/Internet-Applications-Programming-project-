import express from 'express'
import UserModel from '../models/user'
import BookModel from '../models/book'
import BorrowModel from '../models/borrow'
import DueModel from '../models/due'
import ReviewModel from '../models/review';


export class UserController{

  

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password ,'status':"prihvacen"}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response)=>{

        if(typeof req.body.picture === 'undefined'){
            req.body.picture = 'profile_default.png'
        }

        let user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            adress:req.body.adress,
            phone:req.body.phone,
            email:req.body.email,
            picture:req.body.picture,
            type:req.body.type,
            status:req.body.status,
            blocked:req.body.blocked,
            id:req.body.id
           
        })


        user.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }



    checkUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        
        UserModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            if(user){
                res.json({"message": "no"})
            }
            else res.json({"message": "ok"})
           
        })
    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;
        
        UserModel.findOne({'email': email}, (err, user)=>{
            if(err) console.log(err);
            if(user){
                res.json({"message": "no"})
            }
            else res.json({"message": "ok"})
           
        })

        
    }

    getMaxId = (req: express.Request, res: express.Response)=>{
        UserModel.find({}, (err, users)=>{
            if(err) console.log(err);
            else {
                let max=0;

                users.forEach(element => {
                    if(element.id>max) max=element.id;
                });

                res.json(max);
            }
           
        })

    }

    getUser = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
     
        UserModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    getPendingUsers = (req: express.Request, res: express.Response)=>{
     
        UserModel.find({'status': "nije prihvacen"}, (err, users)=>{
            if(err) console.log(err);
            else res.json(users)
        })
    }

    //'type':{$ne:'admin'}
    getRegisteredUsers = (req: express.Request, res: express.Response)=>{
     
        UserModel.find({'status': "prihvacen"}, (err, users)=>{
            if(err) console.log(err);
            else res.json(users)
        })
    }


    approveUser = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        
        UserModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            if(user){
                UserModel.updateOne({'id': id}, {$set: {'status':"prihvacen"}}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({"message": "ok"})
                });
            }
            else res.json({"message": "no"})
           
        })
    }



    denyUser = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        
        UserModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            if(user){
                UserModel.deleteOne({'id':id},(err,resp)=>{
                    if(err)console.log(err);
                    else res.json({"message": "ok"})
                })
                
            }
            else res.json({"message": "no"})
           
        })
    }

    changeUsername = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newusername=req.body.username;

        UserModel.updateOne({'id':id},{$set:{'username':newusername}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeEmail = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newemail=req.body.email;

        UserModel.updateOne({'id':id},{$set:{'email':newemail}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeFirstname = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newfirstname=req.body.firstname;

        UserModel.updateOne({'id':id},{$set:{'firstname':newfirstname}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeLastname = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newlastname=req.body.lastname;

        UserModel.updateOne({'id':id},{$set:{'lastname':newlastname}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeAdress = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newadress=req.body.adress;

        UserModel.updateOne({'id':id},{$set:{'adress':newadress}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changePhone= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newphone=req.body.phone;

        UserModel.updateOne({'id':id},{$set:{'phone':newphone}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changePassword= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let oldpass=req.body.password;
        let newpass=req.body.password2;


        UserModel.findOne({'id': id, 'password': oldpass}, (err, user)=>{
            if(err) console.log(err);
            else if(user) {

                UserModel.updateOne({'id':id},{$set:{'password':newpass}},(err,resp)=>{
                    if(err) console.log(err);
                    else res.json({"message": "ok"})
                   
                })

            }
            else{
                res.json({"message": "no"})
            }
        })

       
        
    }



    changeType = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
     
        UserModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            if(user){

                if(user.type == "reader"){
                    UserModel.updateOne({'id':id},{$set:{'type':"moderator"}},(err,resp)=>{
                        if(err) console.log(err);
                        else res.json({"message": "ok"})
                    })

                }
                else if(user.type == "moderator"){
                    UserModel.updateOne({'id':id},{$set:{'type':"reader"}},(err,resp)=>{
                        if(err) console.log(err);
                        else res.json({"message": "ok"})
                    })
                }
            }
        })
    }


    
    changePicture= (req: express.Request, res: express.Response)=>{
      
        if(typeof req.body.picture === 'undefined'){
            req.body.picture = 'profile_default.png'
        }
       
        let id=req.body.id;
        let picture=req.body.picture;
        

        UserModel.updateOne({'id':id},{$set:{'picture':picture}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({"message": "ok"})
        })
        
    }



    changeBlocked= (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
     
        UserModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            if(user){

                if(user.blocked == false){
                    UserModel.updateOne({'id':id},{$set:{'blocked':true}},(err,resp)=>{
                        if(err) console.log(err);
                        else res.json({"message": "ok"})
                    })

                }
                else if(user.blocked == true){
                    UserModel.updateOne({'id':id},{$set:{'blocked':false}},(err,resp)=>{
                        if(err) console.log(err);
                        else res.json({"message": "ok"})
                    })
                }
            }
        })
    }




    //---------------------------------------------------------------------------------------------------------


    addBook = (req: express.Request, res: express.Response)=>{

        if(typeof req.body.picture === 'undefined'){
            req.body.picture = 'book_default.jpg'
        }

       
       
    
        let book = new BookModel({
            title: req.body.title,
            authors: req.body.authors,
            genre: req.body.genre,
            publisher: req.body.publisher,
            year:req.body.year,
            language:req.body.language,
            picture:req.body.picture,

            status:req.body.status,
            asker:req.body.asker,

            amount:req.body.amount,
            borrowcnt:0,


            id:req.body.id
           
        })
    
    
        book.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })

    }


    getMaxIdBook = (req: express.Request, res: express.Response)=>{
        BookModel.find({}, (err, books)=>{
            if(err) console.log(err);
            else {
                let max=0;

                books.forEach(element => {
                    if(element.id>max) max=element.id;
                });

                res.json(max);
            }
           
        })

    }


    getBook = (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
     
        BookModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }


    getRegisteredBooks = (req: express.Request, res: express.Response)=>{
     
        BookModel.find({'status': "prihvacen"}, (err, books)=>{
            if(err) console.log(err);
            else res.json(books)
        })
    }

    getPendingBooks = (req: express.Request, res: express.Response)=>{
     
        BookModel.find({'status': "nije prihvacen"}, (err, books)=>{
            if(err) console.log(err);
            else res.json(books)
        })
    }

   
    approveBook = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        
        BookModel.findOne({'id': id}, (err, book)=>{
            if(err) console.log(err);
            if(book){
                BookModel.updateOne({'id': id}, {$set: {'status':"prihvacen"}}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({"message": "ok"})
                });
            }
            else res.json({"message": "no"})
           
        })
    }



    denyBook = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        
        BookModel.findOne({'id': id}, (err, book)=>{
            if(err) console.log(err);
            if(book){
                BookModel.deleteOne({'id':id},(err,resp)=>{
                    if(err)console.log(err);
                    else res.json({"message": "ok"})
                })
                
            }
            else res.json({"message": "no"})
           
        })
    }


    changeBookPicture= (req: express.Request, res: express.Response)=>{

        if(typeof req.body.picture === 'undefined'){
            req.body.picture = 'book_default.jpg'
        }
       
        let id=req.body.id;
        let picture=req.body.picture;
    

        BookModel.updateOne({'id':id},{$set:{'picture':picture}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({"message": "ok"})
        })
        
    }


    changeTitle= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newtitle=req.body.title;

        BookModel.updateOne({'id':id},{$set:{'title':newtitle}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeAuthors= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newauthors=req.body.authors;

        BookModel.updateOne({'id':id},{$set:{'authors':newauthors}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeGenre= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newgenre=req.body.genre;

        BookModel.updateOne({'id':id},{$set:{'genre':newgenre}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changePublisher= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newpublisher=req.body.publisher;

        BookModel.updateOne({'id':id},{$set:{'publisher':newpublisher}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeYear= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newyear=req.body.year;

        BookModel.updateOne({'id':id},{$set:{'year':newyear}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeLanguage= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newlanguage=req.body.language;

        BookModel.updateOne({'id':id},{$set:{'language':newlanguage}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

    changeAmount= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newamount=req.body.amount;

        BookModel.updateOne({'id':id},{$set:{'amount':newamount}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }

   
    BasicSearchBooks = (req: express.Request, res: express.Response)=>{
        let searchTitle=req.body.title;
        let searchAuthors=req.body.authors;

        if(searchTitle == null) searchTitle = ""
        if(searchAuthors == null) searchAuthors = ""

        BookModel.find({'title':{$regex: searchTitle},'authors':{$regex: searchAuthors},'status':"prihvacen"},(err,books)=>{
            if(err) console.log(err);
            else res.json(books);
        })

    }



    preAdvancedSearchBooks = (req: express.Request, res: express.Response)=>{
        let searchTitle=req.body.title;
        let searchAuthors=req.body.authors;
       
        let searchPublisher=req.body.publisher;

        if(searchTitle == null) searchTitle = ""
        if(searchAuthors == null) searchAuthors = ""
        
        if(searchPublisher == null) searchPublisher = ""


        BookModel.find({'title':{$regex: searchTitle},'authors':{$regex: searchAuthors},'publisher':{$regex: searchPublisher},'status':"prihvacen"},(err,books)=>{
            if(err) console.log(err);
            else res.json(books);
        })

    }

    //-----------------------------------------------------------------------------------------------------

    setTime=(req: express.Request, res: express.Response)=>{

        let newtime=req.body.time;
        //console.log(newtime);

        DueModel.updateOne({},{$set:{'duetime':newtime}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })


    }

    getTime = (req: express.Request, res: express.Response)=>{
        DueModel.findOne( {}, (err, due)=>{
           // console.log(due)
            if(err) console.log(err);
            else res.json(due.duetime)
           
        })

    }


    //-----------------------------------------------------------------------------------------------------

    borrowBook = (req: express.Request, res: express.Response)=>{

        let borrow = new BorrowModel({

            idUser: req.body.userid,
            idBook: req.body.bookid,
            date1:req.body.date1,
            date2:req.body.date2,
            datedue:req.body.datedue,
            extended:req.body.extended,
            returned:req.body.returned,

            id:req.body.id
           
        })
    
    
        borrow.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else{
                BookModel.updateOne({'id':req.body.bookid},{$inc:{'borrowcnt':1}},(err,resp)=>{
                    if(err) console.log(err);
                       else res.json({"message": "ok"})
                })




            }
        })

       

    }


    getMaxIdBorrow = (req: express.Request, res: express.Response)=>{
        BorrowModel.find({}, (err, borrows)=>{
            if(err) console.log(err);
            else {
                let max=0;

                borrows.forEach(element => {
                    if(element.id>max) max=element.id;
                });

               
                res.json(max);
            }
           
        })

    }

    getMyBorrowedBooksID=(req: express.Request, res: express.Response)=>{

        let userid=req.body.userid;

        BorrowModel.find({'idUser':userid,'returned':false}, (err, borrows)=>{


            let booksIds=[];
            borrows.forEach(element => {
                booksIds.push(element.idBook)
                
            });

           // console.log(booksIds);
            if(err) console.log(err);
               else res.json(booksIds)
        })


    }



    getUsersBorrows=(req: express.Request, res: express.Response)=>{

        let userid=req.body.userid;
       
        BorrowModel.find({'idUser':userid,'returned':false}, (err, borrows)=>{

            if(err) console.log(err);
               else res.json(borrows)
        })


    }



    getUsersHistory=(req: express.Request, res: express.Response)=>{

      
        let userid=req.body.userid;
       
        BorrowModel.find({'idUser':userid,'returned':true}, (err, borrows)=>{

            if(err) console.log(err);
               else res.json(borrows)
        })

      

    }

    unreturnedBorrows = (req: express.Request, res: express.Response)=>{
        BorrowModel.find({'returned':false}, (err, borrows)=>{
            if(err) console.log(err);
            else res.json(borrows);
            
           
        })

    }
    


   

    returnBook=(req: express.Request, res: express.Response)=>{

       
        let userid=req.body.userid;
        let bookid=req.body.bookid;



        let today= (Date.now()).toString();

        BorrowModel.updateOne({'idUser':userid,'idBook':bookid,'returned':false},{$set:{'date2':today,'returned':true}},(err,resp)=>{
            if(err) console.log(err);
               else {

                BookModel.updateOne({'id':bookid},{$inc:{'amount':1}},(err,resp)=>{
                    if(err) console.log(err);
                       else res.json({"message": "ok"})
                })


               }
        })


    }



    getBorrow=(req: express.Request, res: express.Response)=>{

        let userid=req.body.userid;
        
        let bookid=req.body.bookid;
       
        BorrowModel.findOne({'idUser':userid,'idBook':bookid,'returned':false , 'extended':false}, (err, borrow)=>{

            if(err) console.log(err);
               else res.json(borrow)
        })


    }


    changedatedue= (req: express.Request, res: express.Response)=>{
        let borrowid=req.body.borrowid;
        let newdatedue=req.body.datedue;
       
        BorrowModel.updateOne({'id':borrowid},{$set:{'datedue':newdatedue,'extended':true}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }



    //-----------------------------------------------------------------------------------------------------

    addReview = (req: express.Request, res: express.Response)=>{

        let review = new ReviewModel({

            idUser: req.body.userid,
            idBook: req.body.bookid,
            comment:req.body.comment,
            stars:req.body.stars,
            date:req.body.date,
            edited:req.body.edited,

            id:req.body.id
           
        })
    
    
        review.save((err, resp)=>{
            if(err) {
                console.log(err);
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })

    }


    getMaxIdReview = (req: express.Request, res: express.Response)=>{
        ReviewModel.find({}, (err, reviews)=>{
            if(err) console.log(err);
            else {
                let max=0;

                reviews.forEach(element => {
                    if(element.id>max) max=element.id;
                });

               
                res.json(max);
            }
           
        })

    }



    getBooksReviews=(req: express.Request, res: express.Response)=>{

        let bookid=req.body.bookid;
       
        ReviewModel.find({'idBook':bookid}, (err, reviews)=>{

            if(err) console.log(err);
               else res.json(reviews)
        })


    }



    changeReview= (req: express.Request, res: express.Response)=>{
        let id=req.body.id;
        let newcomment=req.body.comment;
        let newstars=req.body.stars;
        let newdate=req.body.date;
        ReviewModel.updateOne({'id':id},{$set:{'comment':newcomment,'stars':newstars,'data':newdate,'edited':true}},(err,resp)=>{
            if(err) console.log(err);
               else res.json({"message": "ok"})
        })
        
    }


    deleteReviewsforBook= (req: express.Request, res: express.Response)=>{
        let bookid=req.body.bookid;
       
        BorrowModel.deleteMany({'idBook':bookid},(err,resp)=>{
            if(err)console.log(err);
            else res.json({"message": "ok"})
        })
        
    }



}