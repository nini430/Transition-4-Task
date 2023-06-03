import mongoose from 'mongoose'

const User=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    status:{
        type:String,
        default:'active'
    },
    lastLoginTime:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

export default User;