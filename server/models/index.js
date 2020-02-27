import mongoose from 'mongoose';

import Book from './book';
import Author from './author';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/sleepylibrary';

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const connectDb = () => {
  return mongoose.connect(MONGODB_URI, MONGO_OPTIONS);
};

const models = { Book, Author };

export { connectDb };

export default models;
