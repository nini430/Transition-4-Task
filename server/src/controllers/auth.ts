import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { LoginInput, RegisterInput } from '../types/auth';
import ErrorResponse from '../utils/errorResponse';

const registerUser = asyncHandler(
  async (req: Request<{}, {}, RegisterInput>, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const user=await User.findOne({email});
    if(user && user.status==='deleted') {
      user.status='active';
      user.password=password;
      user.firstName=firstName;
      user.lastName=lastName;
      await user.save();
      return res.status(200).json(user);
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json('registered');
  }
);

const loginUser = asyncHandler(
  async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );

    

    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    if(user?.status==='blocked' || user?.status==='deleted') {
      return next(new ErrorResponse(`You have been ${user.status} ${user.status==='deleted'? 'You can re-register':''}`,400));
   }

    const isPasswordCorrect = await user.comparePassword(req.body.password);

    if (!isPasswordCorrect) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    user.lastLoginTime = new Date();
    const updatedUser = await user.save();
    const { password: pass, ...rest } = updatedUser._doc;
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    });

    return res.status(200).json({ token: accessToken, user: rest });
  }
);

export { registerUser, loginUser };
