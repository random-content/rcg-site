import { Router } from 'express';

export const suhhRouter = Router();

suhhRouter.get('/', (req, res) => {
  res.send('suhh dude');
});
