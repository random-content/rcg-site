import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { UserData } from '../core';
import { Data } from '../data';

export const usersRouter = Router();

usersRouter.get('/', asyncHandler(async (req, res) => {
  const users: UserData[] = Data.USERS;

  res.set('Cache-Control', 'public, max-age=86400');
  return res.send(users);
}));
