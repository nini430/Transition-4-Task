import express,{Request,Response} from 'express';
import cors from 'cors'
import path from 'path'

import apiRouter from './routes/api';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname,'..','public')));

app.use('/api/v1', apiRouter);

app.get('/*',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})


app.use(errorHandler);

export default app;
