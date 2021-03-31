import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { PageData } from '../core';
import { Data } from '../data';

export const pagesRouter = Router();

pagesRouter.get('/:pageId', asyncHandler(async (req, res) => {
  if (!req.params.pageId) {
    return res.sendStatus(400);
  }

  const pageId = req.params.pageId.toUpperCase();

  let page: PageData;
  if (pageId === 'ABOUT') {
    page = Data.ABOUT;
  } else if (pageId === 'CONTACT') {
    page = Data.CONTACT;
  } else if (pageId === 'BLOG_HEADER') {
    page = Data.BLOG_HEADER;
  } else if (pageId === 'PROJECTS') {
    page = Data.PROJECTS;
  } else {
    return res.sendStatus(404);
  }

  res.set('Cache-Control', 'public, max-age=86400');
  return res.send(page);
}));
