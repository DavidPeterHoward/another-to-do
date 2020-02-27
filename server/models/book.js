import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  isbn: String,
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Authors' }],
});

const Book = mongoose.model('Books', bookSchema);

export default Book;
