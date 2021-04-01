import { Router } from 'express';
import config from 'config';
import request from 'request-promise';
import asyncHandler from 'express-async-handler';
import { GithubRepo } from '../core';

export const reposRouter = Router();

const reposUrl = `${config.get('github.baseUrl')}${config.get('github.repos')}`;

reposRouter.get('/', asyncHandler(async (req, res) => {
  const options = {
    method: 'GET',
    uri: reposUrl,
    headers: {
      'User-Agent': 'random-content/rcg-site'
    },
    json: true
  };

  const response = await request(options);

  const repos: GithubRepo[] = [];
  response.forEach((repo: any) => {
    repos.push({
      name: repo.name,
      url: repo.html_url,
      description: repo.description
    });
  });

  res.set('Cache-Control', 'public, max-age=3600');
  return res.send(repos);
}));
