import express from 'express';
import models from '../../models';
import mongoose from 'mongoose';
const books = express.Router();

/*
 * Finds all books (with offset/limit as defined by client/src/listing.js)
 */
books.get('/', (req, res) => {
  models.Book.find({}, function(err, book) {
    if (err) {
      res.json(err);
    } else {
      if (!book && !book.length) {
        res.status(204).json('oh noes!');
      }
      res.json(book);
    }
  })
    .skip(parseInt(req?.query?.offset))
    .limit(parseInt(req?.query?.limit));
});

/*
 * Returns a detailed view of specified book information
 * by ID including all authors of that book
 */
books.get('/:id', (req, res) => {
  async function GetBooks() {
    await models.Book.findOne({ _id: req?.params?.id })
      .populate('authors')
      .exec(function(err, book) {
        if (err) throw err;
        return res.json(book);
      });
  }
  return GetBooks();
});

/*
 * Updates and existing book by ID
 */
books.put('/:id', (req, res) => {
  async function UpdateBook() {
    await models.Book.findByIdAndUpdate(
      { _id: req?.params?.id },
      {
        name: req?.body?.name,
        isbn: req?.body?.isbn,
      },
    ).exec(function(err, book) {
      if (err) throw err;
      return res.json(book);
    });
  }
  return UpdateBook();
});

/*
 * Create new book with optional author
 */
books.post('/', (req, res) => {
  const Book_id = new mongoose.Types.ObjectId();
  const Author_id = new mongoose.Types.ObjectId();

  const author = new models.Author({
    _id: Author_id,
    first_name: req.body.author_first_name,
    last_name: req.body.author_last_name,
    books: Book_id,
  });

  const book = new models.Book({
    _id: Book_id,
    name: req.body.name,
    isbn: req.body.isbn,
    authors: Author_id,
  });

  models.Book.create(book, function(err, books) {
    if (err) throw err;

    author.save(function(err) {
      if (err) throw err;
    });

    res.json(books);
  });
});

/*
 * Delete book by ID
 */
books.delete('/:id', (req, res) => {
  return models.Book.findByIdAndDelete({
    _id: req?.params?.id,
  }).exec();
});

module.exports = books;
