import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
});

const Author = mongoose.model('Authors', authorSchema);

export default Author;
