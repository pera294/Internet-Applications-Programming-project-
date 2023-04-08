
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Due = new Schema({
  
    duetime: {type: Number},
   
})

export default mongoose.model('DueModel', Due, 'due')