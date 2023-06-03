import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';

import ErrorResponse from "../utils/errorResponse";


const authProtect=(req:any,res:Response,next:NextFunction)=>{
      const token=req.headers.authorization?.split(' ')[1];
      if(!token) {
        return next(new ErrorResponse('Unauthorized',401));
      }

      jwt.verify(token,process.env.JWT_SECRET!,(err,data)=>{
        if(err) {
            return next(new ErrorResponse('Unauthorized',401));
        }
        req.authedUser=data;
        next();
      })

}   


export default authProtect;