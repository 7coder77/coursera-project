// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

let books = [
  { isbn: '1234', title: 'Node Basics', author: 'John Doe', reviews: {} },
  { isbn: '5678', title: 'Express Guide', author: 'Jane Doe', reviews: {} },
];

// Public Routes
router.get('/books', (req, res) => {
  res.json(books);
});

router.get('/books/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  res.json(book || { error: 'Book not found' });
});

router.get('/books/author/:author', (req, res) => {
  const result = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  res.json(result);
});

router.get('/books/title/:title', (req, res) => {
  const result = books.filter(b => b.title.toLowerCase() === req.params.title.toLowerCase());
  res.json(result);
});

router.get('/books/:isbn/review', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  res.json(book ? book.reviews : { error: 'Book not found' });
});

// Protected Routes
router.post('/books/:isbn/review', authenticateToken, (req, res) => {
  const { review } = req.body;
  const username = req.user.username;
  const book = books.find(b => b.isbn === req.params.isbn);

  if (book) {
    book.reviews[username] = review;
    res.json({ message: 'Review added/updated' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

router.delete('/books/:isbn/review', authenticateToken, (req, res) => {
  const username = req.user.username;
  const book = books.find(b => b.isbn === req.params.isbn);

  if (book && book.reviews[username]) {
    delete book.reviews[username];
    res.json({ message: 'Review deleted' });
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
});

module.exports = router;
