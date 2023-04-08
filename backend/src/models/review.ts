
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Review = new Schema({
  
    idUser: {type: Number},
    idBook: {type: Number},
    comment: {type: String},
    stars:{type: Number},
    date:{type: String},
    edited:{type: Boolean},
    
    id:{type:Number}
   
})

export default mongoose.model('ReviewModel', Review, 'reviews')