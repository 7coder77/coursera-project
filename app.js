const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
// const axiosTasks = require('./services/axiosTasks');

app.use(bodyParser.json());

const PORT = 3000;

// Routes
app.use('/', bookRoutes);
app.use('/', userRoutes);

// Run express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  // Trigger Axios methods as demo
//   axiosTasks.getAllBooks();
//   axiosTasks.searchByISBN('1234');
//   axiosTasks.searchByAuthor('Jane Doe');
//   axiosTasks.searchByTitle('Node Basics');
});
