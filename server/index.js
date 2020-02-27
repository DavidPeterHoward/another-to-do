import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import path from 'path';
import { connectDb } from './models';
import routes from './routes';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 4000;
const DB = mongoose.connection;
const app = express();
app.listen(PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONT_END_URL + ':' + process.env.PORT
        : 'http://localhost:3000',
  }),
);

if (isProduction) {
  app.use(express.static('client/build'));
  app.use('/api', routes);
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('client/build', 'index.html')),
  );
} else {
  app.use(express.static('public'));
  app.use('/api', routes);
}

connectDb();

DB.on('connected', () =>
  console.log(chalk.green('Mongoose: Connection Established')),
)
  .on('reconnected', () =>
    console.log(chalk.blueBright('Connection Reestablished')),
  )
  .on('disconnected', () =>
    console.log(chalk.redBright('Connection Disconnected')),
  )
  .on('close', () =>
    console.log(chalk.redBright('Connection Closed')),
  )
  .on('error', error =>
    console.log(chalk.redBright('ERROR: ' + error)),
  )
  .once('connected', () => {
    console.log(chalk.green('Mongoose has been connected'));
  });
