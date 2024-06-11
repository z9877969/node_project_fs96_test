import { connect } from 'mongoose';
import { app } from './app.js';
import 'dotenv/config';

const { DB_HOST, PORT = 4000 } = process.env;

const startServer = async () => {
  try {
    await connect(DB_HOST);
    app.listen(PORT, () => {
      console.log('DATABASE succsesfully works!');
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
