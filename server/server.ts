
import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string;
  }
}

import { connectDatabase } from './src/config/db';
import { createServer } from './src/utils/createServer';
import { config } from '@/config/env';


const port = config.PORT;

const app = createServer();


connectDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
})



module.exports = app;