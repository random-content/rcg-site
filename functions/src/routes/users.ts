import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { DB } from '../db';

export const usersRouter = Router();

usersRouter.get('/', asyncHandler(async (req, res) => {
  const users = await DB.getUsers();

  res.set('Cache-Control', 'public, max-age=3600');
  return res.send(users);
}));
