import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middleware/rateLimiter';

const app = express();
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  console.log('aki');

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});
const port = 3333;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
