import { Router } from 'express';
import * as config from 'config';
import * as request from 'request-promise';
import * as asyncHandler from 'express-async-handler';
import { Pages, WpContent } from '../core';

export const pagesRouter = Router();

const pageUrl = `${config.get('wordpress.baseUrl')}${config.get('wordpress.pages')}`;

pagesRouter.get('/:pageId', asyncHandler(async (req, res) => {
  const pageId = req.params.pageId;
  if (!pageId) {
    return res.sendStatus(400);
  }

  const pageNumber = Pages[pageId.toUpperCase()];
  const options = {
    method: 'GET',
    uri: `${pageUrl}/${pageNumber}`,
    json: true
  };

  const response = await request(options);

  const page: WpContent = {
    title: response.title.rendered,
    content: response.content.rendered
  };

  res.set('Cache-Control', 'public, max-age=86400');
  return res.send(page);
}));
