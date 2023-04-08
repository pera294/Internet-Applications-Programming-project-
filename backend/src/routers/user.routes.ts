import express from 'express'
import { UserController } from '../controllers/user.controller';

const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'../frontend/src/assets/')
    },
    filename : function(req,file,cb){
        if(file){

            if(req.body.flag=="profile"){
                let name = 'profile_' + req.body.id + '.' + file.originalname.split('.')[1]
                req.body.picture = name
                cb(null,req.body.picture)

            }
            else if(req.body.flag=="book"){
                let name = 'book_' + req.body.id + '.' + file.originalname.split('.')[1]
                req.body.picture = name
                cb(null,req.body.picture)

            }
           
        }
    }
})

const upload = multer({storage: storage})

const userRouter = express.Router();


userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    upload.single('profile_picture'),
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/checkUsername').post(
    (req, res)=>new UserController().checkUsername(req, res)
)

userRouter.route('/checkEmail').post(
    (req, res)=>new UserController().checkEmail(req, res)
)

userRouter.route('/getMaxId').get(
    (req, res)=>new UserController().getMaxId(req, res)
)

userRouter.route('/getUser').post(
    (req, res)=>new UserController().getUser(req, res)
)
userRouter.route('/getPendingUsers').get(
    (req, res)=>new UserController().getPendingUsers(req, res)
)

userRouter.route('/getRegisteredUsers').get(
    (req, res)=>new UserController().getRegisteredUsers(req, res)
)

userRouter.route('/approveUser').post(
    (req, res)=>new UserController().approveUser(req, res)
)

userRouter.route('/denyUser').post(
    async (req, res)=>{

        if(req.body.picture !='profile_default.png'){
            await fs.unlinkSync('../frontend/src/assets/' + req.body.picture)
        }
       
        new UserController().denyUser(req, res)
    }
)

userRouter.route('/changeUsername').post(
    (req, res)=>new UserController().changeUsername(req, res)
)

userRouter.route('/changeEmail').post(
    (req, res)=>new UserController().changeEmail(req, res)
)

userRouter.route('/changeFirstname').post(
    (req, res)=>new UserController().changeFirstname(req, res)
)

userRouter.route('/changeLastname').post(
    (req, res)=>new UserController().changeLastname(req, res)
)

userRouter.route('/changeAdress').post(
    (req, res)=>new UserController().changeAdress(req, res)
)

userRouter.route('/changePhone').post(
    (req, res)=>new UserController().changePhone(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)

userRouter.route('/changeType').post(
    (req, res)=>new UserController().changeType(req, res)
)


userRouter.route('/changeBlocked').post(
    (req, res)=>new UserController().changeBlocked(req, res)
)

userRouter.route('/changePicture').post(
    upload.single('profile_picture'),
    (req, res)=>new UserController().changePicture(req, res)
)


//---------------------------------------------------------------------------------------------------------



userRouter.route('/addBook').post(
    upload.single('book_picture'),
    (req, res)=>new UserController().addBook(req, res)
)


userRouter.route('/getMaxIdBook').get(
    (req, res)=>new UserController().getMaxIdBook(req, res)
)

userRouter.route('/getBook').post(
    (req, res)=>new UserController().getBook(req, res)
)

userRouter.route('/getPendingBooks').get(
    (req, res)=>new UserController().getPendingBooks(req, res)
)

userRouter.route('/getRegisteredBooks').get(
    (req, res)=>new UserController().getRegisteredBooks(req, res)
)

userRouter.route('/approveBook').post(
    (req, res)=>new UserController().approveBook(req, res)
)

userRouter.route('/denyBook').post(
    async (req, res)=>{

        if(req.body.picture !='book_default.jpg'){
            await fs.unlinkSync('../frontend/src/assets/' + req.body.picture)
        }
       
        new UserController().denyBook(req, res)
    }
)

userRouter.route('/changeBookPicture').post(
    upload.single('book_picture'),
    (req, res)=>new UserController().changeBookPicture(req, res)
)

userRouter.route('/changeTitle').post(
    (req, res)=>new UserController().changeTitle(req, res)
)

userRouter.route('/changeAuthors').post(
    (req, res)=>new UserController().changeAuthors(req, res)
)

userRouter.route('/changeGenre').post(
    (req, res)=>new UserController().changeGenre(req, res)
)

userRouter.route('/changePublisher').post(
    (req, res)=>new UserController().changePublisher(req, res)
)

userRouter.route('/changeYear').post(
    (req, res)=>new UserController().changeYear(req, res)
)

userRouter.route('/changeLanguage').post(
    (req, res)=>new UserController().changeLanguage(req, res)
)

userRouter.route('/changeAmount').post(
    (req, res)=>new UserController().changeAmount(req, res)
)

userRouter.route('/BasicSearchBooks').post(
    (req, res)=>new UserController().BasicSearchBooks(req, res)
)


userRouter.route('/preAdvancedSearchBooks').post(
    (req, res)=>new UserController().preAdvancedSearchBooks(req, res)
)


//---------------------------------------------------------------------------------------------------------

userRouter.route('/getTime').get(
    (req, res)=>new UserController().getTime(req, res)
)

userRouter.route('/setTime').post(
    (req, res)=>new UserController().setTime(req, res)

)

//---------------------------------------------------------------------------------------------------------


userRouter.route('/borrowBook').post(
    (req, res)=>new UserController().borrowBook(req, res)
)

userRouter.route('/getMaxIdBorrow').get(
    (req, res)=>new UserController().getMaxIdBorrow(req, res)

)

  
userRouter.route('/getMyBorrowedBooksID').post(
    (req, res)=>new UserController().getMyBorrowedBooksID(req, res)
)


userRouter.route('/getUsersBorrows').post(
    (req, res)=>new UserController().getUsersBorrows(req, res)
)

userRouter.route('/getUsersHistory').post(
    (req, res)=>new UserController().getUsersHistory(req, res)
)

userRouter.route('/returnBook').post(
    (req, res)=>new UserController().returnBook(req, res)
)


userRouter.route('/getBorrow').post(
    (req, res)=>new UserController().getBorrow(req, res)
)

userRouter.route('/changedatedue').post(
    (req, res)=>new UserController().changedatedue(req, res)
)


//---------------------------------------------------------------------------------------------------------

userRouter.route('/addReview').post(
    (req, res)=>new UserController().addReview(req, res)
)

userRouter.route('/getMaxIdReview').get(
    (req, res)=>new UserController().getMaxIdReview(req, res)

)
userRouter.route('/getBooksReviews').post(
    (req, res)=>new UserController().getBooksReviews(req, res)
)

userRouter.route('/changeReview').post(
    (req, res)=>new UserController().changeReview(req, res)
)

userRouter.route('/unreturnedBorrows').get(
    (req, res)=>new UserController().unreturnedBorrows(req, res)

)

userRouter.route('/deleteReviewsforBook').post(
    (req, res)=>new UserController().deleteReviewsforBook(req, res)
)




export default userRouter;