import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../models/User';
import ErrorResponse from '../utils/errorResponse'

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({ status: { $not: { $eq: 'deleted' } } });
    return res.status(200).json(users);
  }
);

const changeStatus = asyncHandler(
  async (
    req: Request<{}, {}, {  status: string, ids: string[]}>,
    res: Response,
    next: NextFunction
  ) => {
    const users=await User.find({_id:{$in:req.body.ids}});

    const updatedUsers=await Promise.all(users.map(async user=>{
      user.status=req.body.status;
      await user.save();
    }))

    return res.status(200).json(updatedUsers);

  }
);

export { getAllUsers, changeStatus };
