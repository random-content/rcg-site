import express from 'express'
import cors from  'cors';
import config from 'config';

import { suhhRouter } from './routes/suhh';
import { pagesRouter } from './routes/pages';
import { usersRouter } from './routes/users';
import { reposRouter } from './routes/repos';
import { errorHandler } from './util';

const origin: string = config.get('origin');

export const app = express();

const corsOptions = {
  origin,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/', suhhRouter);
app.use('/pages', pagesRouter);
app.use('/users', usersRouter);
app.use('/repos', reposRouter);

app.use(errorHandler);
