import { Router } from 'express';

export const suhhRouter = Router();

suhhRouter.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=86400');
  res.send('suhh dude');
});
