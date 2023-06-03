import dotenv from 'dotenv'
dotenv.config();
import http from 'http';
import app from "./app";
import connectDb from './utils/connectDB';


const PORT=8888;

const server=http.createServer(app);

server.listen(PORT,()=>{
    connectDb();
    console.log(`Server listening on port ${PORT}`)
})





