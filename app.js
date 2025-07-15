const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const callbackApi = require('./routes/callbackSearch');

app.use(bodyParser.json());

const PORT = 3000;

app.use('/', bookRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  callbackApi.getAllBooks((err, books) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('All Books:', books);
  }
});

callbackApi.searchByISBN('1234')
  .then(res => console.log('ISBN:', res.data))
  .catch(err => console.error('Error:', err.message));

callbackApi.searchByAuthor('Jane Doe')
  .then(res => console.log('Author:', res.data))
  .catch(err => console.error('Error:', err.message));

callbackApi.searchByTitle('Node Basics')
  .then(res => console.log('Title:', res.data))
  .catch(err => console.error('Error:', err.message));
});
