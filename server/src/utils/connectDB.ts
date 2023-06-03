import mongoose from 'mongoose'

const connectDb=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB connected at  ${conn.connection.host} `)
}

mongoose.connection.on('error',(err)=>{
    console.log(err.message);
})
 
export default connectDb;