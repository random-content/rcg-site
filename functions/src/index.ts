import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

process.env.NODE_CONFIG_DIR = `${__dirname}/config`;
const functionConfig = functions.config();
const isDev = functionConfig.api && functionConfig.api.dev && functionConfig.api.dev === 'true';
if (isDev) {
  process.env.NODE_ENV = 'dev'
}

import { app } from './app';
import { DB } from './db';

admin.initializeApp();
DB.init();

export const api = functions.https.onRequest(app);
