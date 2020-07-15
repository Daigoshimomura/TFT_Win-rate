import Reack from 'react';

import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post(
  '/endpoint',
  (_req: Request, _res: Response, _next: NextFunction) => {
    console.log('req');
    console.log(_req.body);

    return _res.status(200).json('success');
  }
);

export default router;
