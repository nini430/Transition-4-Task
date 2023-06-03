import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface UserSchemInterface {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    status:string;
    lastLoginTime:Date;
    comparePassword:(candidatePassword:string)=>Promise<boolean>
    _doc:any;
}

const UserSchema=new mongoose.Schema<UserSchemInterface>({
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

UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')) {
        return next();
    };
    this.password=await bcrypt.hash(this.password,12);
    next();
})

UserSchema.methods.comparePassword=async function(candidatePassword:string) {
    const isPasswordCorrect=await bcrypt.compare(candidatePassword,this.password);
    return isPasswordCorrect;
}

export default mongoose.model('User',UserSchema);