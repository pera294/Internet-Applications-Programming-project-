
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Book = new Schema({
  
    title: {type: String},
    authors: {type: String},
    genre: {type: String},
    publisher: {type: String },
    year:{type: String},
    language:{type: String},
    picture:{type: String},

    status:{type:String},
    asker:{type:Number},

    amount:{type:Number},
    borrowcnt:{type:Number},
   
    id:{type:Number}


   
})

export default mongoose.model('BookModel', Book, 'books')