import express from 'express';
const router = express();

import AuthorRouter from './author';
import BookRouter from './book';

router.use('/books', BookRouter);
router.use('/book', BookRouter);

router.use('/authors', AuthorRouter);
router.use('/author', AuthorRouter);

module.exports = router;
