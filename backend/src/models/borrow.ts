
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Borrow = new Schema({
  
    idUser: {type: Number},
    idBook: {type: Number},
    date1: {type: String},
    date2:{type: String},
    datedue:{type: String},
    extended:{type: Boolean},
    returned:{type: Boolean},
    
   
    id:{type:Number}


   
})

export default mongoose.model('BorrowModel', Borrow, 'borrows')