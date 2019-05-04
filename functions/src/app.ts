import * as express from 'express'
import * as cors from 'cors';
import * as config from 'config';

import { testRouter } from './routes/test';
import { pagesRouter } from './routes/pages';
import { usersRouter } from './routes/users';
import { reposRouter } from './routes/repos';

const origin: string = config.get('origin');

export const app = express();

const corsOptions = {
  origin,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/', testRouter);
app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/repos', reposRouter);
