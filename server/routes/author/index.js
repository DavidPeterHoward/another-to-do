import express from 'express';
import models from '../../models';
const authors = express.Router();

/*
 * Finds all authors (with offset/limit as defined by client/src/listing.js)
 */
authors.get('/', (req, res) => {
  models.Author.find({}, function(err, authors) {
    if (err) {
      throw err;
    } else {
      res.json(authors);
    }
  })
    .skip(parseInt(req?.query?.offset))
    .limit(parseInt(req?.query?.limit));
});

/*
 * Returns a detailed view of specified author information
 * by ID including all books by that author
 */
authors.get('/:id', (req, res) => {
  async function GetAuthors() {
    await models.Author.findOne({ _id: req?.params?.id })
      .populate('books')
      .exec(function(err, author) {
        if (err) throw err;
        return res.json(author);
      });
  }
  return GetAuthors();
});

/*
 * Updates and existing author by ID
 */
authors.put('/:id', (req, res) => {
  async function UpdateAuthor() {
    await models.Author.findByIdAndUpdate(
      { _id: req?.params?.id },
      {
        first_name: req?.body?.first_name,
        last_name: req?.body?.last_name,
      },
    ).exec(function(err, author) {
      if (err) throw err;
      return res.json(author);
    });
  }
  return UpdateAuthor();
});

/*
 * Create new author
 */
authors.post('/', (req, res) => {
  models.Author.create(req.body, function(err, authors) {
    if (err) {
      throw err;
    }
    res.json(authors);
  });
});

/*
 * Delete author by ID
 */
authors.delete('/:id', (req, res) => {
  models.Author.findByIdAndDelete({ _id: req?.params?.id }).exec(
    function(err, author) {
      if (err) throw err;
      return res.json('Deleted');
    },
  );
});

module.exports = authors;
