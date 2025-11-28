import dotenv from 'dotenv';
dotenv.config();
import { connectDatabase } from './src/config/db';
import { createServer } from './src/utils/createServer';

const port = process.env.PORT;

const app = createServer();


connectDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
})



module.exports = app;