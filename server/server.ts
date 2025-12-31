
import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string;
  }
}



import { connectDatabase } from './src/config/db';
import { createServer } from './src/utils/createServer';
import { config } from '@/config/env';
import { resetDb } from '@/utils';
import { redisClient } from '@/config/redis';
import { Credentials } from '@/models';


const port = config.PORT;

const app = createServer();


connectDatabase().then(() => {
   redisClient.connect().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
   })
})





module.exports = app;