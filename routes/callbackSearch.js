// services/axiosTasks.js
const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

// Task 10: Get all books – Using async + callback
async function getAllBooks(callback) {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    callback(null, response.data);  // success
  } catch (error) {
    callback(error);  // error
  }
}

// Task 11: Search by ISBN – Using Promises
function searchByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/isbn/${isbn}`);
}

// Task 12: Search by Author – Using Promises
function searchByAuthor(author) {
  return axios.get(`${BASE_URL}/books/author/${author}`);
}

// Task 13: Search by Title – Using Promises
function searchByTitle(title) {
  return axios.get(`${BASE_URL}/books/title/${title}`);
}

module.exports = {
  getAllBooks,
  searchByISBN,
  searchByAuthor,
  searchByTitle
};
