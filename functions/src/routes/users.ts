import { Router } from 'express';
import * as config from 'config';
import * as request from 'request-promise';
import * as asyncHandler from 'express-async-handler';
import { WpUser } from '../core';

export const usersRouter = Router();

const usersUrl = `${config.get('wordpress.baseUrl')}${config.get('wordpress.users')}`;

usersRouter.get('/', asyncHandler(async (req, res) => {
  const options = {
    method: 'GET',
    uri: usersUrl,
    json: true
  };

  const response = await request(options);

  console.log(process.env.NODE_ENV);

  const users: WpUser[] = [];
  response.forEach((user: any) => {
    const avatars = user.avatar_urls;
    users.push({
      id: user.id,
      name: user.name,
      description: user.description,
      linkedIn: user.url,
      twitter: user.meta.twitter,
      avatar: avatars['96'] || avatars['48'] || avatars['24']
    });
  });

  res.set('Cache-Control', 'public, max-age=86400');
  return res.send(users);
}));
