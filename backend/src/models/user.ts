
import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
  
    username: {type: String},
    password: {type: String},
    firstname: {type: String},
    lastname: {type: String },
    adress:{type: String},
    phone:{type: String},
    email:{type: String},
    picture:{type: String},
    type: {type: String},
    status:{type:String},
    blocked:{type:Boolean},
    
    id:{type:Number}
   
})

export default mongoose.model('UserModel', User, 'users')