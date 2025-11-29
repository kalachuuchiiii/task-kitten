import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    locals: {
      [key: string]: any;
    };
  }
}
