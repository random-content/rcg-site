import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { DB } from '../db';

export const pagesRouter = Router();

pagesRouter.get('/:pageId', asyncHandler(async (req, res) => {
  const pageId = req.params.pageId.toLowerCase();

  const page = await DB.getPage(pageId);

  res.set('Cache-Control', 'public, max-age=3600');
  return res.send(page);
}));
